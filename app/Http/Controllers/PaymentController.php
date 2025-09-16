<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PaymentController extends Controller
{
    private $userRole;

    public function __construct()
    {
        $this->userRole = Auth::check() ? Auth::user()->role : null;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return match ($this->userRole) {
            'admin' => $this->viewPaymentAdmin(),
            'collector' => "",
            'client' => "",
            default => abort(403, 'Unauthorized action.'),
        };
    }

    public function viewPaymentAdmin()
    {
        $payments = Payment::with(['loan.clientProfile.user', 'loan.collectorProfile.user'])
            ->get()
            ->map(fn($payment) => [
                'id' => $payment->id,
                'loan_id' => $payment->loan_id,
                'collector_id' => $payment->loan->collectorProfile->id,
                'collector_first_name' => $payment->loan->collectorProfile->user->first_name,
                'collector_last_name' => $payment->loan->collectorProfile->user->last_name,
                'client_id' => $payment->loan->clientProfile->id,
                'client_first_name' => $payment->loan->clientProfile->user->first_name,
                'client_last_name' => $payment->loan->clientProfile->user->last_name,
                'principal_amount' => $payment->principal_amount,
                'interest_amount' => $payment->interest_amount,
                'total_amount' => $payment->total_amount,
                'amount_paid' => $payment->amount_paid,
                'due_date' => $payment->due_date ? $payment->due_date->format('Y-m-d') : null,
                'payment_date' => $payment->payment_date ? $payment->payment_date->format('Y-m-d') : null,
                'payment_method' => $payment->payment_method,
                'reference_no' => $payment->reference_no,
                'is_paid' => $payment->is_paid,
                'status' => $payment->status,
            ]);

        return Inertia::render('Admin/Payments/Index', [
            'payments' => $payments
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create(Payment $payment)
    {
        return match ($this->userRole) {
            'admin' => $this->viewCreatePaymentAdmin($payment),
            'collector' => "",
            'client' => "",
            default => abort(403, 'Unauthorized action.'),
        };
    }

    public function viewCreatePaymentAdmin(Payment $payment)
    {
        $payment->load(['loan.clientProfile.user', 'loan.collectorProfile.user']);

        $paymentData = [
            'id' => $payment->id,
            'loan_id' => $payment->loan_id,
            'collector_id' => $payment->loan->collectorProfile->id,
            'collector_first_name' => $payment->loan->collectorProfile->user->first_name,
            'collector_last_name' => $payment->loan->collectorProfile->user->last_name,
            'client_id' => $payment->loan->clientProfile->id,
            'client_first_name' => $payment->loan->clientProfile->user->first_name,
            'client_last_name' => $payment->loan->clientProfile->user->last_name,
            'principal_amount' => $payment->principal_amount,
            'interest_amount' => $payment->interest_amount,
            'total_amount' => $payment->total_amount,
            'amount_paid' => $payment->amount_paid,
            'due_date' => $payment->due_date ? $payment->due_date->format('Y-m-d') : null,
            'payment_date' => $payment->payment_date ? $payment->payment_date->format('Y-m-d') : null,
            'payment_method' => $payment->payment_method,
            'reference_no' => $payment->reference_no,
            'is_paid' => $payment->is_paid,
            'status' => $payment->status,
        ];

        return Inertia::render('Admin/Payments/PayLoan', [
            'payment' => $paymentData
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {}

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payment $payment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Payment $payment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        //
    }
}
