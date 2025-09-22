<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home/index');
})->name('home');

require __DIR__ . '/auth.php';
require __DIR__ . '/payment.php';
require __DIR__ . '/client.php';
require __DIR__ . '/admin.php';
require __DIR__ . '/collector.php';

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return match (Auth::user()->role) {
            'admin' => redirect()->route('admin.dashboard'),
            'client' => redirect()->route('client.dashboard'),
            'collector' => redirect()->route('collector.dashboard'),
            default => abort(403, 'Unauthorized action.'),
        };
    })->name('dashboard');

    Route::get('/profile', function () {
        return Inertia::render('Profile/Edit');
    })->name('profile.edit');
});
