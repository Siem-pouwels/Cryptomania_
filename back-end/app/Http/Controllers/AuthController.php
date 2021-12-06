<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Contracts\Session\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'min:3']
        ]);

        User::create([
            'name' => $request->email,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'succes'], 200);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);
        if (Auth::attempt($request->only('email', 'password'))) {
            $userData = Auth::user();
            $deleteCookie = time() + 3600;
            $user['id'] = $userData->id;
            $user['email'] = $userData->email;
            $user['delete_timestamp'] = $deleteCookie;
            return response()->json(['message' => 'succesful', 'user' => $user], 200);
        }
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorect.']
        ]);
    }

}
