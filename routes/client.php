<?php

use App\Http\Controllers\ClientDashboardController;
use App\Http\Controllers\ClientProfileController;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', "role:client"])->prefix('client')->name('client.')->group(function () {
    Route::get('/dashboard', ClientDashboardController::class)->name('dashboard');

    Route::get('/loans', [LoanController::class, 'index'])->name('loans.index');

    Route::get('/loans/create-loan', [LoanController::class, 'create'])->name('loans.create-loan');
    Route::post('/loans/apply', [LoanController::class, 'store'])->name('loans.apply');

    Route::get('/payments', [PaymentController::class, 'index'])->name('payments.index');

    Route::get('/payments/{payment}/pay', [PaymentController::class, 'create'])->name('payments.pay');

    Route::get('/loans/{loan}', [LoanController::class, 'show'])->name('loans.show');

    Route::get('/profile', [ClientProfileController::class, 'showClientProfile'])->name('profile.show');
    Route::post('/profile', [ClientProfileController::class, 'updateClientProfile'])->name('profile.update');
    Route::post('/password', [ClientProfileController::class, 'updateClientPassword'])->name('password.update');
});
