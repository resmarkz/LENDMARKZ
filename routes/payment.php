<?php

use App\Http\Controllers\PaymentIntegration\PaymongoController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    // Paymongo Routes
    Route::post('/payment-intent', [PaymongoController::class, 'createIntent']);
    Route::post('/payment-attach', [PaymongoController::class, 'attachMethod']);
    Route::get('/payment/verify', [PaymongoController::class, 'verify'])->name('paymongo.verify');
    Route::post('/payment-method', [PaymongoController::class, 'createPaymentMethod']);
    // End Paymongo Routes
});
