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
        return Inertia::render('Admin/CreatePayment', [
            'serviceOrder' => $serviceOrder,
        ]);
    }



    public function store(Request $request, ServiceOrder $serviceOrder)
    {
        $request->validate([

            'amount' => 'required|numeric|min:0',

            'status' => 'required|in:pending,paid',

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



        Payment::create([

            'service_order_id' => $serviceOrder->id,

            'amount' => $request->amount,

            'method' => 'cash',

            'status' => $request->status,

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
        $payments = Payment::with([
            'serviceOrder.vehicle'
        ])
        ->when($request->search, function ($query) use ($request) {

            $search = $request->search;

            $query->whereHas('serviceOrder.vehicle', function ($q) use ($search) {

                $q->where('brand', 'like', "%{$search}%")
                ->orWhere('model', 'like', "%{$search}%")
                ->orWhere('license_plate', 'like', "%{$search}%");

            });

        })
        ->latest()
        ->get();


        return Inertia::render('Admin/Payments', [
            'payments' => $payments,
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