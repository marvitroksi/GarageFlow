<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\VehicleController;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/admin/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth'])
    ->name('admin.dashboard');

Route::middleware(['auth'])->prefix('admin')->group(function () {

    Route::get('/employees', [UserController::class, 'index'])
        ->name('admin.employees');

    Route::get('/employees/create', [UserController::class, 'create'])
        ->name('admin.employees.create');

    Route::post('/employees', [UserController::class, 'store'])
        ->name('admin.employees.store');

    Route::get('/employees/{user}/edit', [UserController::class, 'edit'])
        ->name('admin.employees.edit');

    Route::put('/employees/{user}', [UserController::class, 'update'])
        ->name('admin.employees.update');    

    Route::delete('/employees/{user}', [UserController::class, 'destroy'])
        ->name('admin.employees.destroy');

    Route::get('/vehicles', [VehicleController::class, 'index'])
        ->name('admin.vehicles');

    Route::get('/vehicles/create', [VehicleController::class, 'create'])
        ->name('admin.vehicles.create');

    Route::post('/vehicles', [VehicleController::class, 'store'])
        ->name('admin.vehicles.store');

    Route::get('/vehicles/{vehicle}/edit', [VehicleController::class, 'edit'])
        ->name('admin.vehicles.edit');

    Route::put('/vehicles/{vehicle}', [VehicleController::class, 'update'])
        ->name('admin.vehicles.update');

    Route::delete('/vehicles/{vehicle}', [VehicleController::class, 'destroy'])
        ->name('admin.vehicles.destroy');
});

    
require __DIR__.'/auth.php';
