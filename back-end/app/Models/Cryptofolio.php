<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cryptofolio extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'price',
        'amount',
        'total_value',
        'bought_on',
    ];
}
