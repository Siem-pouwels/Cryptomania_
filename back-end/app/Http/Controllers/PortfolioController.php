<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Portfolio;

class PortfolioController extends Controller
{
    public function get()
    {
        $portfolio = Portfolio::get();
        return response()->json($portfolio);
    }
}
