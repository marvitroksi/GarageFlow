<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\ServiceOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{

    public function create(ServiceOrder $serviceOrder)
    {
        $serviceOrder->load([
            'vehicle',
            'items'
        ]);


        $partsCost = $serviceOrder->items->sum(function ($item) {

            return $item->price * $item->quantity;

        });


        $serviceOrder->total_cost =
            $serviceOrder->labor_cost + $partsCost;


        return Inertia::render('Admin/CreatePayment', [
            'serviceOrder' => $serviceOrder,
        ]);
    }



    public function store(Request $request, ServiceOrder $serviceOrder)
    {
        $request->validate([

            'notes' => 'nullable|string',

        ]);


        $existingPayment = $serviceOrder->payments()
            ->where('status', 'paid')
            ->exists();


        if ($existingPayment) {

            return redirect()
                ->route('admin.payments')
                ->withErrors([
                    'payment' => 'This service order has already been paid.'
                ]);

        }

        $serviceOrder->load('items');

        $partsCost = $serviceOrder->items->sum(function ($item) {

            return $item->price * $item->quantity;

        });

        $totalCost = $serviceOrder->labor_cost + $partsCost;

        Payment::create([

            'service_order_id' => $serviceOrder->id,
            'amount' => $totalCost,
            'method' => 'cash',
            'status' => 'paid',
            'notes' => $request->notes,

        ]);



        return redirect()

            ->route('admin.payments')

            ->with(
                'success',
                'Payment added successfully.'
            );
    }

    public function index(Request $request)
    {
        $serviceOrders = ServiceOrder::with([
            'vehicle',
            'payments',
            'items'
        ])
        ->when($request->search, function ($query) use ($request) {

            $search = $request->search;

            $query->whereHas('vehicle', function ($q) use ($search) {

                $q->where('brand', 'like', "%{$search}%")
                ->orWhere('model', 'like', "%{$search}%")
                ->orWhere('license_plate', 'like', "%{$search}%");

            });

        })
        ->latest()
        ->get();


        $serviceOrders->each(function ($order) {

            $partsCost = $order->items->sum(function ($item) {

                return $item->price * $item->quantity;

            });

            $order->total_cost = $order->labor_cost + $partsCost;

            $order->payment_status = $order->payments->count() > 0
                ? 'paid'
                : 'pending';

        });


        return Inertia::render('Admin/Payments', [

            'serviceOrders' => $serviceOrders,

            'filters' => [
                'search' => $request->search
            ]

        ]);
    }

    public function show(Payment $payment)
    {
        $payment->load([
            'serviceOrder.vehicle',
            'serviceOrder.mechanic'
        ]);


        return Inertia::render('Admin/ShowPayment', [
            'payment' => $payment
        ]);
    }

    public function destroy(Payment $payment)
    {
        $payment->delete();


        return redirect()
            ->route('admin.payments')
            ->with(
                'success',
                'Payment deleted successfully.'
            );
    }
}