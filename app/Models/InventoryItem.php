<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Http\Request;

class InventoryItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'category',
        'quantity',
        'price',
        'supplier',
    ];



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
}


