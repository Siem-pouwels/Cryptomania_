<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('user/login', 'App\Http\Controllers\AuthController@login');
//route to login

Route::get('portfolio', 'App\Http\Controllers\PortfolioController@get');
//route to get the portfolio data

Route::post('portfolio', 'App\Http\Controllers\PortfolioController@add');
Route::post('portfolio/edit/{id}', 'App\Http\Controllers\PortfolioController@edit');
Route::post('portfolio/delete/{id}', 'App\Http\Controllers\PortfolioController@delete');
//routes to add, edit and delete

Route::prefix('user')->group(function () {
    Route::post('create', 'App\Http\Controllers\AuthController@create');
    //route to create user
});
