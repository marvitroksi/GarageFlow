<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    protected $fillable = [

        'vehicle_id',

        'appointment_date',

        'appointment_time',

        'notes',

        'status',

    ];


    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function serviceOrder()
    {
        return $this->belongsTo(ServiceOrder::class);
    }
}