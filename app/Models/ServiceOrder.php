<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ServiceOrder extends Model
{
    use HasFactory;


    protected $fillable = [
        'vehicle_id',
        'mechanic_id',
        'description',
        'status',
        'labor_cost',
        'notes',
    ];



    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }



    public function mechanic()
    {
        return $this->belongsTo(User::class, 'mechanic_id');
    }

    public function items()
    {
        return $this->hasMany(ServiceOrderItem::class);
    }
}