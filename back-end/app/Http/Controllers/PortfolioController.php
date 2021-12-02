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
        $cryptofolio = Cryptofolio::where('user_id', '=', 1)->where('name', '=', $request->id)->first();
        if ($cryptofolio) {
            $amount = $cryptofolio->amount;
            $amount = $amount + $request->amount;
            $priceUsd = $request->priceUsd;
            $cryptofolio->amount = $amount;
            $cryptofolio->price = $priceUsd;
            $cryptofolio->total_value = $priceUsd * $amount;
            $cryptofolio->save();

            return response()->json('updated the fields');
        }

        $price = $request->priceUsd * $request->amount;
        $cryptofolio = Cryptofolio::create([
            'user_id' => 1,
            'name' => $request->id,
            'price' => $request->priceUsd,
            'amount' => $request->amount,
            'total_value' => $price,
            'bought_on' => Carbon::now(),
        ]);
        $cryptofolio->save();
        return response()->json('succes');
    }
}
