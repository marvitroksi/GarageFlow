<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ServiceOrder;
use App\Models\Vehicle;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;


class ServiceOrderController extends Controller
{

    public function index()
    {
        $orders = ServiceOrder::with([
            'vehicle',
            'mechanic'
        ])->get();


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
            'mechanic'
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
}