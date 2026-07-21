<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\ServiceOrder;
use App\Models\Vehicle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AppointmentController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Appointments', [

            'appointments' => Appointment::with('vehicle')
                ->orderBy('appointment_date')
                ->orderBy('appointment_time')
                ->get(),

            'vehicles' => Vehicle::orderBy('brand')->get(),

        ]);
    }

    public function store(Request $request)
    {
        $request->validate([

            'vehicle_id' => 'required|exists:vehicles,id',

            'appointment_date' => 'required|date',

            'appointment_time' => 'required',

            'notes' => 'nullable|string',

        ]);

        Appointment::create([

            'vehicle_id' => $request->vehicle_id,

            'appointment_date' => $request->appointment_date,

            'appointment_time' => $request->appointment_time,

            'notes' => $request->notes,

            'status' => 'scheduled',

        ]);

        return redirect()
            ->route('admin.appointments.index')
            ->with(
                'success',
                'Appointment created successfully.'
            );
    }

    public function startRepair(Appointment $appointment)
    {

        // If repair already exists, open it
        if ($appointment->service_order_id) {

            return redirect()
                ->route(
                    'admin.service-orders.show',
                    $appointment->service_order_id
                );

        }


        $serviceOrder = ServiceOrder::create([

            'vehicle_id' => $appointment->vehicle_id,

            'mechanic_id' => $appointment->vehicle->mechanic_id,

            'description' => $appointment->notes 
                ?? 'Created from appointment',

            'status' => 'pending',

            'labor_cost' => 0,

        ]);



        $appointment->update([

            'service_order_id' => $serviceOrder->id,

            'status' => 'in_progress'

        ]);



        return redirect()
            ->route(
                'admin.service-orders.show',
                $serviceOrder->id
            );

    }
}