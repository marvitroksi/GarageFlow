<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $mechanics = User::where('role', 'mechanic')->get();

        return Inertia::render('Admin/Employees', [
            'mechanics' => $mechanics
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/CreateEmployee');
    }


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
        ]);


        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'mechanic',
        ]);


        return redirect()->route('admin.employees');

    }
    
    public function edit(User $user)
    {
        return Inertia::render('Admin/EditEmployee', [
            'mechanic' => $user
        ]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
        ]);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
        ]);

        if ($request->password) {
            $user->update([
                'password' => Hash::make($request->password),
            ]);
        }

        return redirect()->route('admin.employees');
    }
    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('admin.employees');
    }
}