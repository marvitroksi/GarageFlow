<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use App\Models\ServiceOrder;
use App\Models\Payment;
use App\Models\InventoryItem;
use Inertia\Inertia;

class DashboardController extends Controller
{

    public function index()
    {

        $totalVehicles = Vehicle::count();


        $activeRepairs = ServiceOrder::whereIn(
            'status',
            [
                'pending',
                'in_progress'
            ]
        )->count();



        $completedRepairs = ServiceOrder::where(
            'status',
            'completed'
        )->count();



        $revenue = Payment::where(
            'status',
            'paid'
        )->sum('amount');



        $recentOrders = ServiceOrder::with([
            'vehicle',
            'mechanic'
        ])
        ->latest()
        ->take(5)
        ->get();



        $lowStockItems = InventoryItem::where(
            'quantity',
            '<',
            5
        )
        ->orderBy('quantity')
        ->take(5)
        ->get();


        $statusChart = [
            [
                'name' => 'Pending',
                'value' => ServiceOrder::where('status', 'pending')->count(),
            ],

            [
                'name' => 'In Progress',
                'value' => ServiceOrder::where('status', 'in_progress')->count(),
            ],

            [
                'name' => 'Completed',
                'value' => ServiceOrder::where('status', 'completed')->count(),
            ],
        ];

        return Inertia::render('Admin/Dashboard', [

            'stats' => [

                'vehicles' => $totalVehicles,

                'activeRepairs' => $activeRepairs,

                'completedRepairs' => $completedRepairs,

                'revenue' => $revenue,

            ],


            'recentOrders' => $recentOrders,

            'lowStockItems' => $lowStockItems,

            'statusChart' => $statusChart,

        ]);

    }

}