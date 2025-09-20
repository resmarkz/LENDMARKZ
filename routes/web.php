<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AdminProfileController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientDashboardController;
use App\Http\Controllers\ClientProfileController;
use App\Http\Controllers\CollectorProfileController;
use App\Http\Controllers\ContactReferenceController;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\PaymentIntegration\PaymongoController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home/index');
})->name('home');

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login.post');

    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register'])->name('register.post');
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    // Paymongo Routes
    Route::post('/payment-intent', [PaymongoController::class, 'createIntent']);
    Route::post('/payment-attach', [PaymongoController::class, 'attachMethod']);
    Route::get('/payment/verify', [PaymongoController::class, 'verify'])->name('paymongo.verify');
    Route::post('/payment-method', [PaymongoController::class, 'createPaymentMethod']);
    // End Paymongo Routes

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
    Route::prefix('client')->name('client.')->middleware("role:client")->group(function () {
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

    Route::prefix('admin')->name('admin.')->middleware("role:admin")->group(function () {
        Route::get('/dashboard', AdminDashboardController::class)->name('dashboard');

        Route::prefix('loans')->name('loans.')->group(function () {
            Route::get('/', [LoanController::class, 'index'])->name('index');
            Route::get('/create', [LoanController::class, 'create'])->name('create');
            Route::post('/create', [LoanController::class, 'store'])->name('store');
            Route::get('/{loan}', [LoanController::class, 'show'])->name('show');
            Route::get('/{loan}/edit', [LoanController::class, 'edit'])->name('edit');
            Route::post('/{loan}/edit', [LoanController::class, 'update'])->name('update');
            Route::post('/{loan}/delete', [LoanController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('payments')->name('payments.')->group(function () {
            Route::get('/', [PaymentController::class, 'index'])->name('index');
            Route::get('{payment}/pay', [PaymentController::class, 'create'])->name('pay');
            Route::get('/{id}', function () {
                return Inertia::render('Admin/Payments/Show');
            })->name('show');
            Route::get('/{id}/edit', function () {
                return Inertia::render('Admin/Payments/Edit');
            })->name('edit');
        });

        Route::get('/reports', function () {
            return Inertia::render('Admin/Reports/Index');
        })->name('reports');

        Route::prefix('manage-users')->name('manage-users.')->group(function () {
            Route::prefix('admins')->name('admins.')->group(function () {
                Route::get('/', [AdminProfileController::class, 'index'])->name('index');
                Route::get('/create', function () {
                    return Inertia::render('Admin/ManageUsers/Admins/Create');
                })->name('create');
                Route::post('/create', [AdminProfileController::class, 'store'])->name('store');
                Route::get('/{admin}', [AdminProfileController::class, 'show'])->name('show');
                Route::get('/{admin}/edit', [AdminProfileController::class, 'edit'])->name('edit');
                Route::post('/{admin}/edit', [AdminProfileController::class, 'update'])->name('update');
                Route::post('/{admin}/delete', [AdminProfileController::class, 'destroy'])->name('destroy');
            });

            Route::prefix('clients')->name('clients.')->group(function () {
                Route::get('/', [ClientProfileController::class, 'index'])->name('index');
                Route::get('/create', [ClientProfileController::class, 'create'])->name('create');
                Route::post('/create', [ClientProfileController::class, 'store'])->name('store');
                Route::get('/{client}', [ClientProfileController::class, 'show'])->name('show');
                Route::get('/{client}/edit', [ClientProfileController::class, 'edit'])->name('edit');
                Route::post('/{client}/edit', [ClientProfileController::class, 'update'])->name('update');
                Route::post('/{client}/delete', [ClientProfileController::class, 'destroy'])->name('destroy');

                Route::get('/{client}/contact-references/create', [ContactReferenceController::class, 'create'])->name('contact-references.create');
                Route::post('/{client}/contact-references/create', [ContactReferenceController::class, 'store'])->name('contact-references.store');
                Route::get('/{client}/contact-references/{contactReference}/edit', [ContactReferenceController::class, 'edit'])->name('contact-references.edit');
                Route::post('/{client}/contact-references/{contactReference}', [ContactReferenceController::class, 'update'])->name('contact-references.update');
                Route::post('/{client}/contact-references/{contactReference}', [ContactReferenceController::class, 'destroy'])->name('contact-references.destroy');
            });

            Route::prefix('collectors')->name('collectors.')->group(function () {
                Route::get('/', [CollectorProfileController::class, 'index'])->name('index');
                Route::get('/create', [CollectorProfileController::class, 'create'])->name('create');
                Route::post('/create', [CollectorProfileController::class, 'store'])->name('store');
                Route::get('/{collector}', [CollectorProfileController::class, 'show'])->name('show');
                Route::get('/{collector}/edit', [CollectorProfileController::class, 'edit'])->name('edit');
                Route::post('/{collector}/edit', [CollectorProfileController::class, 'update'])->name('update');
                Route::post('/{collector}/delete', [CollectorProfileController::class, 'destroy'])->name('destroy');
            });
        });
    });

    Route::prefix('collector')->name('collector.')->middleware("role:collector")->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('Collector/Dashboard');
        })->name('dashboard');

        Route::get('/loans', function () {
            return Inertia::render('Collector/Index');
        })->name('loans.index');

        Route::get('/loans/{id}', function () {
            return Inertia::render('Collector/Show');
        })->name('loans.show');

        Route::get('/payments/create', function () {
            return Inertia::render('Collector/Create');
        })->name('payments.create');

        Route::get('/loans/{id}/record-payment', function () {
            return Inertia::render('Collector/Create');
        })->name('loans.record-payment');
    });
});
