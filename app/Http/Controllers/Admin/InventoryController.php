<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\InventoryItem;
use Inertia\Inertia;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
    public function index()
    {
        $items = InventoryItem::all();

        return Inertia::render('Admin/Inventory', [
            'items' => $items,
        ]);
    }


    public function create()
    {
        return Inertia::render('Admin/CreateInventoryItem');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'category' => 'required',
            'quantity' => 'required|integer',
            'price' => 'required',
        ]);


        InventoryItem::create([
            'name' => $request->name,
            'category' => $request->category,
            'quantity' => $request->quantity,
            'price' => $request->price,
            'supplier' => $request->supplier,
        ]);


        return redirect()->route('admin.inventory');
    
    
    }

    public function edit(InventoryItem $inventoryItem)
    {
        return Inertia::render('Admin/EditInventoryItem', [
            'item' => $inventoryItem,
        ]);
    }

    public function update(Request $request, InventoryItem $inventoryItem)
    {
        $request->validate([
            'name' => 'required',
            'category' => 'required',
            'quantity' => 'required|integer',
            'price' => 'required',
        ]);


        $inventoryItem->update([
            'name' => $request->name,
            'category' => $request->category,
            'quantity' => $request->quantity,
            'price' => $request->price,
            'supplier' => $request->supplier,
        ]);


        return redirect()->route('admin.inventory');
    }
    public function destroy(InventoryItem $inventoryItem)
    {
        $inventoryItem->delete();

        return redirect()->route('admin.inventory');
    }
}