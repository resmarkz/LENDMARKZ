<?php

use App\Http\Controllers\AdminManagementController;
use App\Http\Controllers\AdminProfileController;
use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('welcome');

Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login.post');

    Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
    Route::post('/register', [AuthController::class, 'register'])->name('register.post');
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::get('/profile', function () {
        return Inertia::render('Profile/Edit');
    })->name('profile.edit');
    Route::prefix('client')->name('client.')->middleware("role:client")->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('Client/Dashboard');
        })->name('dashboard');

        Route::get('/loans', function () {
            return Inertia::render('Client/Index');
        })->name('loans.index');

        Route::get('/loans/create-loan', function () {
            return Inertia::render('Client/CreateLoan');
        })->name('loans.create-loan');

        Route::get('/loans/{id}/pay', function () {
            return Inertia::render('Client/PayLoan');
        })->name('loans.pay');

        Route::get('/loans/{id}', function () {
            return Inertia::render('Client/Show');
        })->name('loans.show');
    });

    Route::prefix('admin')->name('admin.')->middleware("role:admin")->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('Admin/Dashboard');
        })->name('dashboard');

        Route::prefix('loans')->name('loans.')->group(function () {
            Route::get('/', function () {
                return Inertia::render('Admin/Loans/Index');
            })->name('index');
            Route::get('/create', function () {
                return Inertia::render('Admin/Loans/Create');
            })->name('create');
            Route::get('/{id}', function () {
                return Inertia::render('Admin/Loans/Show');
            })->name('show');
            Route::get('/{id}/edit', function () {
                return Inertia::render('Admin/Loans/Edit');
            })->name('edit');
        });

        Route::prefix('payments')->name('payments.')->group(function () {
            Route::get('/', function () {
                return Inertia::render('Admin/Payments/Index');
            })->name('index');
            Route::get('/create', function () {
                return Inertia::render('Admin/Payments/Create');
            })->name('create');
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
                Route::put('/{admin}/edit', [AdminProfileController::class, 'update'])->name('update');
                Route::delete('/{admin}/delete', [AdminProfileController::class, 'destroy'])->name('destroy');
            });

            Route::prefix('clients')->name('clients.')->group(function () {
                Route::get('/', function () {
                    return Inertia::render('Admin/ManageUsers/Clients/Index');
                })
                    ->name('index');
                Route::get('/create', function () {
                    return Inertia::render('Admin/ManageUsers/Clients/Create');
                })->name('create');
                Route::get('/{id}', function () {
                    return Inertia::render('Admin/ManageUsers/Clients/Show');
                })->name('show');
                Route::get('/{id}/edit', function () {
                    return Inertia::render('Admin/ManageUsers/Clients/Edit');
                })->name('edit');
            });

            Route::prefix('collectors')->name('collectors.')->group(function () {
                Route::get('/', function () {
                    return Inertia::render('Admin/ManageUsers/Collectors/Index');
                })->name('index');
                Route::get('/create', function () {
                    return Inertia::render('Admin/ManageUsers/Collectors/Create');
                })->name('create');
                Route::get('/{id}', function () {
                    return Inertia::render('Admin/ManageUsers/Collectors/Show');
                })->name('show');
                Route::get('/{id}/edit', function () {
                    return Inertia::render('Admin/ManageUsers/Collectors/Edit');
                })->name('edit');
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
