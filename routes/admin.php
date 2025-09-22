<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\AdminProfileController;
use App\Http\Controllers\ClientProfileController;
use App\Http\Controllers\CollectorProfileController;
use App\Http\Controllers\ContactReferenceController;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', "role:admin"])->prefix('admin')->name('admin.')->group(function () {
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
