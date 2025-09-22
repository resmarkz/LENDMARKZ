<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CollectorDashboardController extends Controller
{
    public function __invoke()
    {
        $collector = Auth::user();
        $collector->load('collectorProfile.loans.payments');
        $assignedLoansCount = $collector->collectorProfile->loans->count();
        $paymentCollectedToday = $collector->collectorProfile->loans->flatMap(function ($loan) {
            return $loan->payments->where('payment_date', '>=', now()->startOfDay());
        })->sum('amount_paid');
        $overduePaymentsCount = $collector->collectorProfile->loans->flatMap(function ($loan) {
            return $loan->payments->where('due_date', '<', now())->where('status', 'pending');
        })->count();
        return Inertia::render('Collector/Dashboard', [
            'assignedLoansCount' => $assignedLoansCount,
            'paymentCollectedToday' => $paymentCollectedToday,
            'overduePaymentsCount' => $overduePaymentsCount,
        ]);
    }
}
