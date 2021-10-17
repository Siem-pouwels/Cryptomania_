<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    public function create(Request $request)
    {
        User::create([

        ]);
    }

    public function login(Request $request)
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            return response()->json(['notification' => "Succesful logged in"], 401);
        }
        else {
            return response()->json(['notification' => "Something went wrong"], 401);
        }
    }
    
}
