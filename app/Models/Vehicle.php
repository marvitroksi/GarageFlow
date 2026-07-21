<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'license_plate',
        'brand',
        'model',
        'year',
        'owner_name',
        'mechanic_id',
        'status',
    ];


    public function mechanic()
    {
        return $this->belongsTo(User::class, 'mechanic_id');
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }
}