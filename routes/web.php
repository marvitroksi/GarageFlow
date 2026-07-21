<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Admin\VehicleController;
use App\Http\Controllers\Admin\ServiceOrderController;
use App\Http\Controllers\Admin\InventoryController;
use App\Http\Controllers\Admin\PaymentController;
use App\Http\Controllers\Admin\AppointmentController;

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

    Route::get('/service-orders', [ServiceOrderController::class, 'index'])
        ->name('admin.service-orders');

    Route::get('/service-orders/create', [ServiceOrderController::class, 'create'])
        ->name('admin.service-orders.create');

    Route::post('/service-orders', [ServiceOrderController::class, 'store'])
        ->name('admin.service-orders.store');

    Route::get('/service-orders/{serviceOrder}', [ServiceOrderController::class, 'show'])
        ->name('admin.service-orders.show');

    Route::get('/service-orders/{serviceOrder}/edit', [ServiceOrderController::class, 'edit'])
        ->name('admin.service-orders.edit');

    Route::put('/service-orders/{serviceOrder}', [ServiceOrderController::class, 'update'])
        ->name('admin.service-orders.update');

    Route::delete('/service-orders/{serviceOrder}', [ServiceOrderController::class, 'destroy'])
        ->name('admin.service-orders.destroy');
        
    Route::get('/inventory', [InventoryController::class, 'index'])
        ->name('admin.inventory');

    Route::get('/inventory/create', [InventoryController::class, 'create'])
        ->name('admin.inventory.create');

    Route::post('/inventory', [InventoryController::class, 'store'])
        ->name('admin.inventory.store');

    Route::get('/inventory/{inventoryItem}/edit', [InventoryController::class, 'edit'])
        ->name('admin.inventory.edit');

    Route::put('/inventory/{inventoryItem}', [InventoryController::class, 'update'])
        ->name('admin.inventory.update');

    Route::delete('/inventory/{inventoryItem}', [InventoryController::class, 'destroy'])
        ->name('admin.inventory.destroy');

    Route::get(
        '/service-orders/{serviceOrder}/items/create',
        [ServiceOrderController::class, 'createItem']
    )->name('admin.service-orders.items.create');

    Route::post(
         '/service-orders/{serviceOrder}/items',
         [ServiceOrderController::class, 'storeItem']
    )->name('admin.service-orders.items.store');

    Route::get(
        '/service-order-items/{item}/edit',
        [ServiceOrderController::class, 'editItem']
    );

    Route::put(
        '/service-order-items/{item}',
        [ServiceOrderController::class, 'updateItem']
    );

    Route::patch(
        '/service-orders/{serviceOrder}/labor-cost',
        [ServiceOrderController::class, 'updateLaborCost']
    )->name('admin.service-orders.labor-cost');

    Route::patch(
        '/service-orders/{serviceOrder}/mechanic',
        [ServiceOrderController::class, 'updateMechanic']
    )->name('admin.service-orders.mechanic');

    Route::patch(
        '/service-orders/{serviceOrder}/description',
        [ServiceOrderController::class, 'updateDescription']
    )->name('admin.service-orders.description');

    Route::patch(
        '/service-orders/{serviceOrder}/notes',
        [ServiceOrderController::class, 'updateNotes']
    )->name('admin.service-orders.notes');

    Route::get(
        '/service-orders/{serviceOrder}/payments/create',
        [PaymentController::class, 'create']
    )->name('admin.payments.create');

    Route::post(
        '/service-orders/{serviceOrder}/payments',
        [PaymentController::class, 'store']
    )->name('admin.payments.store');

    Route::get('/payments', [PaymentController::class, 'index'])
        ->name('admin.payments');

    Route::get('/payments/{payment}', [PaymentController::class, 'show'])
        ->name('admin.payments.show');

    Route::delete('/payments/{payment}', [PaymentController::class, 'destroy'])
        ->name('admin.payments.destroy');

    Route::patch(
        '/service-orders/{serviceOrder}/status',
        [ServiceOrderController::class, 'updateStatus']
    )->name('admin.service-orders.status');

    Route::resource('appointments', AppointmentController::class)
        ->names('admin.appointments');

    Route::post(
        '/appointments/{appointment}/start-repair',
        [AppointmentController::class, 'startRepair']
    )
    ->name('appointments.startRepair');
});

    
require __DIR__.'/auth.php';
