<?php

namespace App\Http\Controllers;

use App\Models\ClientProfile;
use App\Models\CollectorProfile;
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
        $filters = request()->only(['client_id', 'collector_id', 'status', 'start_date', 'end_date', 'reference_no', 'loan_id']);

        $payments = Payment::with(['loan.clientProfile.user', 'loan.collectorProfile.user'])
            ->when(request()->input('reference_no'), function ($query, $reference_no) {
                $query->where('reference_no', 'like', "%{$reference_no}%");
            })
            ->when(request()->input('loan_id'), function ($query, $loan_id) {
                $query->where('loan_id', $loan_id);
            })
            ->when(request()->input('client_id'), function ($query, $client_id) {
                $query->whereHas('loan.clientProfile', function ($q) use ($client_id) {
                    $q->where('id', $client_id);
                });
            })
            ->when(request()->input('collector_id'), function ($query, $collector_id) {
                $query->whereHas('loan.collectorProfile', function ($q) use ($collector_id) {
                    $q->where('id', $collector_id);
                });
            })
            ->when(request()->input('status'), function ($query, $status) {
                if ($status === 'overdue') {
                    $query->where('due_date', '<', now())->where('status', 'pending');
                } else {
                    $query->where('status', $status);
                }
            })
            ->paginate(10);

        return Inertia::render('Admin/Payments/Index', [
            'payments' => $payments,
            'filters' => $filters,
            'clients' => ClientProfile::with('user')->get(),
            'collectors' => CollectorProfile::with('user')->get(),
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
            'client_email' => $payment->loan->clientProfile->user->email,
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
        $validatedData = $request->validate([
            'payment_date' => 'required|date',
            'payment_method' => 'required|string|max:255',
            'reference_no' => 'nullable|string|max:255',
            'amount_paid' => 'required|numeric|min:0',
        ]);

        $payment->update([
            'payment_date'   => $validatedData['payment_date'],
            'payment_method' => $validatedData['payment_method'],
            'reference_no'   => $validatedData['reference_no'],
            'amount_paid'    => $validatedData['amount_paid'],
            'is_paid'        => true,
            'status'         => 'paid',
        ]);

        $loan = $payment->loan;
        $totalPaid = $loan->payments()->sum('amount_paid');
        $remaining = max(0, $loan->total_amount - $totalPaid);

        $loan->update([
            'remaining_balance' => $remaining,
        ]);

        return redirect()->back()->with('success', 'Payment updated and loan balance recalculated.');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        //
    }
}
