<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ServiceOrder;
use App\Models\Vehicle;
use App\Models\InventoryItem;
use App\Models\ServiceOrderItem;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;


class ServiceOrderController extends Controller
{

    public function index()
    {
        $orders = ServiceOrder::with([
            'vehicle',
            'mechanic',
            'items',
            'payments'
        ])->get();

        $orders->each(function ($order) {

            $partsCost = $order->items->sum(function ($item) {

                return $item->price * $item->quantity;

            });

            $order->total_cost = $order->labor_cost + $partsCost;

        });


        return Inertia::render('Admin/ServiceOrders', [
            'orders' => $orders
        ]);
    }



    public function create()
    {
        $vehicles = Vehicle::all();

        $mechanics = User::where('role', 'mechanic')->get();


        return Inertia::render('Admin/CreateServiceOrder', [
            'vehicles' => $vehicles,
            'mechanics' => $mechanics
        ]);
    }

    public function store(Request $request)
    {

        $request->validate([

            'vehicle_id' => 'required',
            'mechanic_id' => 'nullable',
            'description' => 'required',
            'status' => 'required',
            'labor_cost' => 'required',

        ]);

        ServiceOrder::create([

            'vehicle_id' => $request->vehicle_id,
            'mechanic_id' => $request->mechanic_id,
            'description' => $request->description,
            'status' => $request->status,
            'labor_cost' => $request->labor_cost,
            'notes' => $request->notes,

        ]);

        return redirect()->route('admin.service-orders');

    }

    public function show(ServiceOrder $serviceOrder)
    {
        $serviceOrder->load([
            'vehicle',
            'mechanic',
            'items.inventoryItem'
        ]);

        return Inertia::render('Admin/ShowServiceOrder', [
            'order' => $serviceOrder
        ]);
    }

    public function edit(ServiceOrder $serviceOrder)
    {
        return Inertia::render('Admin/EditServiceOrder', [
            'order' => $serviceOrder,
            'vehicles' => Vehicle::all(),
            'mechanics' => User::where('role','mechanic')->get()
        ]);
    }

    public function destroy(ServiceOrder $serviceOrder)
    {
        $serviceOrder->delete();

        return redirect()->route('admin.service-orders');
    }

    public function update(Request $request, ServiceOrder $serviceOrder)
    {
        $request->validate([

            'vehicle_id' => 'required',
            'mechanic_id' => 'nullable',
            'description' => 'required',
            'status' => 'required',
            'labor_cost' => 'required',

        ]);


        $serviceOrder->update([

            'vehicle_id' => $request->vehicle_id,
            'mechanic_id' => $request->mechanic_id,
            'description' => $request->description,
            'status' => $request->status,
            'labor_cost' => $request->labor_cost,
            'notes' => $request->notes,

        ]);


        return redirect()->route('admin.service-orders');
    }

    public function createItem(ServiceOrder $serviceOrder)
    {
        $inventoryItems = InventoryItem::orderBy('name')->get();

        return Inertia::render('Admin/AddServiceOrderItem', [
            'serviceOrder' => $serviceOrder,
            'inventoryItems' => $inventoryItems,
        ]);
    }

    public function storeItem(Request $request, ServiceOrder $serviceOrder)
    {
        $request->validate([
            'inventory_item_id' => 'required|exists:inventory_items,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $item = InventoryItem::findOrFail($request->inventory_item_id);

        if ($item->quantity < $request->quantity) {
            return back()->withErrors([
                'quantity' => 'Not enough stock available.'
            ]);
        }

        ServiceOrderItem::create([
            'service_order_id' => $serviceOrder->id,
            'inventory_item_id' => $item->id,
            'quantity' => $request->quantity,
            'price' => $item->price,
        ]);

        $item->decrement('quantity', $request->quantity);

        return redirect()
            ->route('admin.service-orders.show', $serviceOrder)
            ->with('success', 'Part added successfully.');
    }

    public function editItem(ServiceOrderItem $item)
    {
        $item->load('inventoryItem', 'serviceOrder');

        return Inertia::render('Admin/EditServiceOrderItem', [
            'item' => $item,
        ]);
    }

    public function updateItem(Request $request, ServiceOrderItem $item)
    {
        $request->validate([
            'quantity' => 'required|integer|min:0',
        ]);


        $oldQuantity = $item->quantity;

        $newQuantity = $request->quantity;


        $difference = $newQuantity - $oldQuantity;


        $inventoryItem = $item->inventoryItem;


        // Increasing quantity
        if ($difference > 0) {

            if ($inventoryItem->quantity < $difference) {

                return back()->withErrors([
                    'quantity' => 'Not enough stock available.'
                ]);

            }

            $inventoryItem->decrement(
                'quantity',
                $difference
            );

        }


        // Decreasing quantity
        if ($difference < 0) {

            $inventoryItem->increment(
                'quantity',
                abs($difference)
            );

        }


        // If quantity becomes zero, remove the entry
        if ($newQuantity == 0) {

            $item->delete();

        } else {

            $item->update([
                'quantity' => $newQuantity,
            ]);

        }


        return redirect()
            ->route(
                'admin.service-orders.show',
                $item->serviceOrder
            )
            ->with(
                'success',
                'Part updated successfully.'
            );
    }

    public function updateStatus(Request $request, ServiceOrder $serviceOrder)
    {
        $request->validate([
            'status' => 'required|in:pending,in_progress,completed'
        ]);


        $serviceOrder->update([
            'status' => $request->status
        ]);


        return back()
            ->with(
                'success',
                'Service order status updated.'
            );
    }
}