<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('user/login', 'App\Http\Controllers\AuthController@login');

// Route::middleware(['auth'])->group(function () {
//     Route::prefix('portfolio')->group(function () {
//         Route::post('', 'App\Http\Controllers\PortfolioController@add');
//     });
// });
Route::post('portfolio', 'App\Http\Controllers\PortfolioController@add');
Route::get('portfolio', 'App\Http\Controllers\PortfolioController@get');
Route::post('portfolio/delete/{id}', 'App\Http\Controllers\PortfolioController@delete');
// Route::prefix('portfolio')->group(function () {
// });
Route::prefix('user')->group(function () {
    Route::post('create', 'App\Http\Controllers\AuthController@create');
});
