<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Payment extends Model
{
    use HasFactory;


    protected $fillable = [
        'service_order_id',
        'amount',
        'method',
        'status',
        'notes',
    ];


    public function serviceOrder()
    {
        return $this->belongsTo(ServiceOrder::class);
    }
}