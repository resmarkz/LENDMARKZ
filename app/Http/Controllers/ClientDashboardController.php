<?php

namespace App\Http\Controllers;

use App\Models\Loan;
use App\Models\Payment;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClientDashboardController extends Controller
{
    public function __invoke()
    {
        $user = Auth::user();
        $clientProfile = $user->clientProfile;

        if (!$clientProfile) {
            return Inertia::render('Client/Dashboard', [
                'loans' => [],
                'payments' => [],
                'totalLoanAmount' => 0,
                'totalAmountPaid' => 0,
                'nextDueDate' => 'N/A',
            ]);
        }

        $loans = Loan::where('client_profile_id', $clientProfile->id)->get();
        $payments = Payment::whereIn('loan_id', $loans->pluck('id'))->get();

        $totalLoanAmount = $loans->sum('principal_amount');
        $totalAmountPaid = $payments->where('status', 'paid')->sum('amount_paid');

        $nextDuePayment = Payment::whereIn('loan_id', $loans->pluck('id'))
            ->where('status', 'pending')
            ->where('due_date', '>=', now()->startOfDay())
            ->orderBy('due_date', 'asc')
            ->first();

        $nextDueDate = $nextDuePayment ? $nextDuePayment->due_date->toDateString() : 'N/A';

        return Inertia::render('Client/Dashboard', [
            'loans' => $loans,
            'payments' => $payments,
            'totalLoanAmount' => $totalLoanAmount,
            'totalAmountPaid' => $totalAmountPaid,
            'nextDueDate' => $nextDueDate,
        ]);
    }
}
