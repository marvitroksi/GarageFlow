<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use App\Models\User;
use App\Models\ServiceOrder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehicleController extends Controller
{
    public function index()
    {
        $vehicles = Vehicle::with('mechanic')->get();

        return Inertia::render('Admin/Vehicles', [
            'vehicles' => $vehicles
        ]);
    }


    public function create()
    {
        $mechanics = User::where('role', 'mechanic')->get();

        return Inertia::render('Admin/CreateVehicle', [
            'mechanics' => $mechanics
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'license_plate' => 'required|unique:vehicles',
            'brand' => 'required',
            'model' => 'required',
            'year' => 'required',
            'owner_name' => 'required',
            'mechanic_id' => 'nullable',
            'status' => 'required',
        ]);


        $vehicle = Vehicle::create([
            'license_plate' => $request->license_plate,
            'brand' => $request->brand,
            'model' => $request->model,
            'year' => $request->year,
            'owner_name' => $request->owner_name,
            'mechanic_id' => $request->mechanic_id,
            'status' => $request->status,
        ]);

        ServiceOrder::create([

            'vehicle_id' => $vehicle->id,

            'mechanic_id' => $vehicle->mechanic_id,

            'description' => 'Vehicle inspection pending',

            'status' => 'pending',

            'labor_cost' => 0,

        ]);


        return redirect()->route('admin.vehicles');
    }


    public function edit(Vehicle $vehicle)
    {
        $mechanics = User::where('role', 'mechanic')->get();

        return Inertia::render('Admin/EditVehicle', [
            'vehicle' => $vehicle,
            'mechanics' => $mechanics,
        ]);
    }


    public function update(Request $request, Vehicle $vehicle)
    {
        $request->validate([
            'license_plate' => 'required|unique:vehicles,license_plate,' . $vehicle->id,
            'brand' => 'required',
            'model' => 'required',
            'year' => 'required',
            'owner_name' => 'required',
            'mechanic_id' => 'required',
            'status' => 'required',
        ]);


        $vehicle->update([
            'license_plate' => $request->license_plate,
            'brand' => $request->brand,
            'model' => $request->model,
            'year' => $request->year,
            'owner_name' => $request->owner_name,
            'mechanic_id' => $request->mechanic_id,
            'status' => $request->status,
        ]);


        return redirect()->route('admin.vehicles');
    }

    public function destroy(Vehicle $vehicle)
    {
        $vehicle->delete();

        return redirect()->route('admin.vehicles');
    }
}