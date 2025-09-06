<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::inertia('/', 'Home/index')->name('home');

Route::get('/page2', function () {
    return Inertia::render('Page2/index', [
        'message' => 'This is page 2',
    ]);
})->name('page2');