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
        $cryptofolio = Cryptofolio::where('user_id', '=', 1)->where('name', '=', 'bitcoin')->first();
        // dd($cryptofolio);
        return response()->json($cryptofolio);
        Cryptofolio::create([
            'user_id' => 1,
            'name' => 'bitcoin',
            'price' => 100,
            'amount' => 69,
            'total_value' => 6900,
            'bought_on' => Carbon::now(),
        ]);
        return response()->json('succes');
    }
}
