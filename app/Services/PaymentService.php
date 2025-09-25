<?php

namespace App\Services;

use App\Models\ClientProfile;
use App\Models\CollectorProfile;
use App\Models\Payment;
use App\Models\User;

class PaymentService
{
    public function getPaymentsForAdmin()
    {
        $filters = request()->only(['client_id', 'collector_id', 'status', 'start_date', 'end_date', 'reference_no', 'loan_id']);

        $payments = Payment::with(['loan.clientProfile.user', 'loan.collectorProfile.user'])
            ->when($filters['reference_no'] ?? null, fn($q, $ref) => $q->where('reference_no', 'like', "%{$ref}%"))
            ->when($filters['loan_id'] ?? null, fn($q, $loanId) => $q->where('loan_id', $loanId))
            ->when($filters['client_id'] ?? null, fn($q, $clientId) =>
            $q->whereHas('loan.clientProfile', fn($q2) => $q2->where('id', $clientId)))
            ->when($filters['collector_id'] ?? null, fn($q, $collectorId) =>
            $q->whereHas('loan.collectorProfile', fn($q2) => $q2->where('id', $collectorId)))
            ->when($filters['status'] ?? null, function ($q, $status) {
                if ($status === 'overdue') {
                    $q->where('due_date', '<', now())->where('status', 'pending');
                } else {
                    $q->where('status', $status);
                }
            })
            ->when($filters['start_date'] ?? null, fn($q, $start) => $q->whereDate('payment_date', '>=', $start))
            ->when($filters['end_date'] ?? null, fn($q, $end) => $q->whereDate('payment_date', '<=', $end))
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
            "id"               => $currentLoan->id,
            "principal_amount" => $currentLoan->principal_amount,
            "interest_rate"    => $currentLoan->interest_rate,
            "term_months"      => $currentLoan->term_months,
        ];

        return [$currentLoanData, $currentLoan->payments, null];
    }

    public function getPaymentsForCollector(User $collector)
    {
        $filters = request()->only(['client_id', 'status', 'start_date', 'end_date', 'reference_no', 'loan_id']);

        $payments = Payment::with(['loan.clientProfile.user', 'loan.collectorProfile.user'])
            ->whereHas('loan', fn($q) => $q->where('collector_profile_id', $collector->collectorProfile->id))
            ->when($filters['reference_no'] ?? null, fn($q, $ref) => $q->where('reference_no', 'like', "%{$ref}%"))
            ->when($filters['loan_id'] ?? null, fn($q, $loanId) => $q->where('loan_id', $loanId))
            ->when(
                $filters['client_id'] ?? null,
                fn($q, $userId) =>
                $q->whereHas('loan.clientProfile.user', fn($q2) => $q2->where('id', $userId))
            )
            ->when($filters['status'] ?? null, function ($q, $status) {
                if ($status === 'overdue') {
                    $q->where('due_date', '<', now())->where('status', 'pending');
                } else {
                    $q->where('status', $status);
                }
            })
            ->paginate(10);

        return [$payments, $filters];
    }

    public function getClientsForCollector(User $collector)
    {
        $collector->load('collectorProfile.loans.clientProfile.user');

        return $collector->collectorProfile->loans
            ->pluck('clientProfile.user')
            ->unique('id')
            ->values();
    }

    public function getPaymentData(Payment $payment)
    {
        $payment->load(['loan.clientProfile.user', 'loan.collectorProfile.user']);

        return [
            'id'                  => $payment->id,
            'loan_id'             => $payment->loan_id,
            'collector_id'        => $payment->loan->collectorProfile->id,
            'collector_first_name' => $payment->loan->collectorProfile->user->first_name,
            'collector_last_name' => $payment->loan->collectorProfile->user->last_name,
            'client_id'           => $payment->loan->clientProfile->id,
            'client_first_name'   => $payment->loan->clientProfile->user->first_name,
            'client_last_name'    => $payment->loan->clientProfile->user->last_name,
            'client_email'        => $payment->loan->clientProfile->user->email,
            'principal_amount'    => $payment->principal_amount,
            'interest_amount'     => $payment->interest_amount,
            'total_amount'        => $payment->total_amount,
            'amount_paid'         => $payment->amount_paid,
            'due_date'            => $payment->due_date?->format('Y-m-d'),
            'payment_date'        => $payment->payment_date?->format('Y-m-d'),
            'payment_method'      => $payment->payment_method,
            'reference_no'        => $payment->reference_no,
            'is_paid'             => $payment->is_paid,
            'status'              => $payment->status,
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
