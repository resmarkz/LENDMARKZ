<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('welcome');

Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

Route::get('/register', function () {
    return Inertia::render('Auth/Register');
})->name('register');

Route::get('/register', function () {
    return Inertia::render('Auth/Register');
})->name('register');

Route::prefix('client')->name('client.')->group(function () {
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

Route::prefix('admin')->name('admin.')->group(function () {
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

    // Admin User Management Routes
    Route::prefix('manage-users')->name('manage-users.')->group(function () {
        Route::prefix('admins')->name('admins.')->group(function () {
            Route::get('/', function () {
                return Inertia::render('Admin/ManageUsers/Admins/Index');
            })->name('index');
            Route::get('/create', function () {
                return Inertia::render('Admin/ManageUsers/Admins/Create');
            })->name('create');
            Route::get('/{id}', function () {
                return Inertia::render('Admin/ManageUsers/Admins/Show');
            })->name('show');
            Route::get('/{id}/edit', function () {
                return Inertia::render('Admin/ManageUsers/Admins/Edit');
            })->name('edit');
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

Route::prefix('collector')->name('collector.')->group(function () {
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
        return Inertia::render('Collector/Create'); // Reusing Create for payment record
    })->name('payments.create');

    Route::get('/loans/{id}/record-payment', function () {
        return Inertia::render('Collector/Create'); // Reusing Create for payment record
    })->name('loans.record-payment');
});
