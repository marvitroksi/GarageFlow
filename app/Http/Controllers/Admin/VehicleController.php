<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Http\Request;

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
            'mechanic_id' => 'required',
        ]);


        Vehicle::create([
            'license_plate' => $request->license_plate,
            'brand' => $request->brand,
            'model' => $request->model,
            'year' => $request->year,
            'owner_name' => $request->owner_name,
            'mechanic_id' => $request->mechanic_id,
        ]);


        return redirect()->route('admin.vehicles');
    }
}
