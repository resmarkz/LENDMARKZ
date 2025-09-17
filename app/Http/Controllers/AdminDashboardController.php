<?php

namespace App\Http\Controllers;

use App\Models\Loan;
use App\Models\Payment;
use App\Models\User;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function __invoke()
    {
        $totalClients = User::where('role', 'client')->count();
        $totalCollectors = User::where('role', 'collector')->count();
        $totalAdmins = User::where('role', 'admin')->count();

        $totalLoans = Loan::count();
        $pendingLoans = Loan::where('status', 'pending')->count();
        $activeLoans = Loan::where('status', 'active')->count();
        $paidLoans = Loan::where('status', 'paid')->count();
        $overdueLoans = Loan::where('due_date', '<', now())->where('status', 'pending')->count();

        $totalLoanAmount = Loan::sum('principal_amount');
        $totalAmountPaid = Payment::where('status', 'paid')->sum('amount_paid');
        $totalAmountOverdue = Loan::where('due_date', '<', now())->where('status', 'pending')->sum('total_payable');

        $recentLoans = Loan::with('clientProfile.user')->latest()->take(5)->get();
        $recentPayments = Payment::with('loan.clientProfile.user')->where('status', 'paid')->latest()->take(5)->get()
            ->map(function ($payment) {
                return [
                    'id' => $payment->id,
                    'loan' => [
                        'client_profile' => [
                            'user' => [
                                'first_name' => $payment->loan->clientProfile->user->first_name,
                                'last_name' => $payment->loan->clientProfile->user->last_name,
                            ]
                        ]
                    ],
                    'amount_paid' => $payment->amount_paid,
                    'payment_date' => $payment->payment_date->format('Y-m-d'),
                ];
            });

        return Inertia::render('Admin/Dashboard', [
            'totalClients' => $totalClients,
            'totalCollectors' => $totalCollectors,
            'totalAdmins' => $totalAdmins,
            'totalLoans' => $totalLoans,
            'pendingLoans' => $pendingLoans,
            'activeLoans' => $activeLoans,
            'paidLoans' => $paidLoans,
            'overdueLoans' => $overdueLoans,
            'totalLoanAmount' => $totalLoanAmount,
            'totalAmountPaid' => $totalAmountPaid,
            'totalAmountOverdue' => $totalAmountOverdue,
            'recentLoans' => $recentLoans,
            'recentPayments' => $recentPayments,
        ]);
    }
}
