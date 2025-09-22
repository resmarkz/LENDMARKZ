<?php

namespace App\Services;

use App\Models\ClientProfile;
use App\Models\CollectorProfile;
use App\Models\Payment;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class PaymentService
{
    public function getPaymentsForAdmin()
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
            ->when(request()->input('start_date'), function ($query, $start_date) {
                $query->whereDate('payment_date', '>=', $start_date);
            })
            ->when(request()->input('end_date'), function ($query, $end_date) {
                $query->whereDate('payment_date', '<=', $end_date);
            })
            ->paginate(10);

        return [$payments, $filters];
    }

    public function getPaymentsForClient(User $client)
    {
        $client->load('clientProfile.loans.payments');

        if ($client->clientProfile->loans->isEmpty()) {
            return [null, null, 'You do not have any loans yet. Please apply for a loan first.'];
        }

        $currentLoan = $client->clientProfile->loans->where('status', 'active')->first();

        if (!$currentLoan) {
            return [null, null, 'You do not have an active loan at the moment.'];
        }

        $currentLoanData = [
            "id" => $currentLoan->id,
            "principal_amount" => $currentLoan->principal_amount,
            "interest_rate" => $currentLoan->interest_rate,
            "term_months" => $currentLoan->term_months,
        ];

        return [$currentLoanData, $currentLoan->payments, null];
    }

    public function getPaymentData(Payment $payment)
    {
        $payment->load(['loan.clientProfile.user', 'loan.collectorProfile.user']);

        return [
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
    }

    public function update(Payment $payment, array $validatedData): void
    {
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
    }
}