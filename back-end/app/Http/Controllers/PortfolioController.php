<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cryptofolio;
use Carbon\Carbon;

class PortfolioController extends Controller
{
    public function add(Request $request)
    {
        dd($request->amount);
        $totalValue = $request->price * $request->amount;
        Cryptofolio::create([
            'name' => $request->name,
            'price' => $request->price,
            'amount' => $request->amount,
            'total_value' => $totalValue,
            'bought_on' => Carbon::now(),
        ]);
    }
}
