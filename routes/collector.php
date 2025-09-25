<?php

use App\Http\Controllers\CollectorDashboardController;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', "role:collector"])->prefix('collector')->name('collector.')->group(function () {
    Route::get('/dashboard', [CollectorDashboardController::class, '__invoke'])->name('dashboard');

    Route::get('/loans', [LoanController::class, 'index'])->name('loans.index');

    Route::get('/loans/{id}', function () {
        return Inertia::render('Collector/Show');
    })->name('loans.show');

    Route::get('/payments', [PaymentController::class, 'index'])->name('payments.index');

    Route::get('/loans/{id}/record-payment', function () {
        return Inertia::render('Collector/Create');
    })->name('loans.record-payment');
});
