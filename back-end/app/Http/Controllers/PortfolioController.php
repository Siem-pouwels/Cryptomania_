<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cryptofolio;
use Carbon\Carbon;

class PortfolioController extends Controller
{

    public function get(Request $request)
    {
        $cryptofolio = Cryptofolio::where('user_id', '=', $request->id)->get();
        return response()->json($cryptofolio);
    }

    public function add(Request $request)
    {
        $cryptofolio = Cryptofolio::where('user_id', '=', $request->id)->where('name', '=', $request->cryptoId)->first();
        if ($cryptofolio) {
            $amount = $cryptofolio->amount + $request->amount;
            $cryptofolio->amount = $amount;
            $cryptofolio->price = $request->priceUsd;
            $cryptofolio->total_value = $request->priceUsd * $amount;
            $cryptofolio->save();

            return response()->json('updated the fields');
        }

        $price = $request->priceUsd * $request->amount;
        $cryptofolio = Cryptofolio::create([
            'user_id' => $request->id,
            'name' => $request->cryptoId,
            'price' => $request->priceUsd,
            'amount' => $request->amount,
            'total_value' => $price,
            'bought_on' => Carbon::now(),
        ]);
        $cryptofolio->save();
        return response()->json('succes');
    }
}
