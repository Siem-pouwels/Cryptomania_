<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::middleware(['auth'])->group(function () {
    Route::prefix('portfolio')->group(function () {
        Route::post('', 'App\Http\Controllers\PortfolioController@add');
    });
    Route::prefix('users')->group(function () {
        Route::post('create', 'App\Http\Controllers\AuthController@create');
    });
});