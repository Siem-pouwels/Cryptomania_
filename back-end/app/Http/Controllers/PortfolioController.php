<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cryptofolio;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class PortfolioController extends Controller
{
    public function add(Request $request)
    {
        // return response()->json("hello");
        $totalValue = $request->price * $request->amount;
        Cryptofolio::create([
            // 'user_id' => auth()->user()->id,
            'user_id' => 1,
            'name' => $request->name,
            'price' => $request->price,
            'amount' => $request->amount,
            'total_value' => $totalValue,
            'bought_on' => Carbon::now(),
        ]);
        return response()->json($request);
    }
}
