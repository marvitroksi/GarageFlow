<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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


    public function serviceOrderItems()
    {
        return $this->hasMany(ServiceOrderItem::class);
    }
}