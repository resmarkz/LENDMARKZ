<?php

namespace App\Services;

use App\Models\CollectorProfile;
use App\Models\Loan;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoanService
{
    public function getLoansForAdmin(Request $request)
    {
        $loans = Loan::with(['clientProfile.user', 'collectorProfile.user'])
            ->when($request->input('search'), function ($query, $search) {
                $query->whereHas('clientProfile.user', function ($q) use ($search) {
                    $q->where('first_name', 'like', "%{$search}%")
                        ->orWhere('last_name', 'like', "%{$search}%");
                });
            })
            ->when($request->input('status'), fn($query, $status) => $query->where('status', $status))
            ->when($request->input('collector_id'), function ($query, $collector_id) {
                $query->whereHas('collectorProfile', fn($q) => $q->where('user_id', $collector_id));
            })
            ->when($request->input('start_date'), fn($query, $start_date) => $query->whereDate('release_date', '>=', $start_date))
            ->when($request->input('end_date'), fn($query, $end_date) => $query->whereDate('release_date', '<=', $end_date))
            ->when($request->input('min_principal'), fn($query, $min_principal) => $query->where('principal_amount', '>=', $min_principal))
            ->when($request->input('max_principal'), fn($query, $max_principal) => $query->where('principal_amount', '<=', $max_principal))
            ->when($request->input('min_interest'), fn($query, $min_interest) => $query->where('interest_rate', '>=', $min_interest))
            ->when($request->input('max_interest'), fn($query, $max_interest) => $query->where('interest_rate', '<=', $max_interest))
            ->paginate(10)
            ->withQueryString();

        $collectors = User::where('role', 'collector')->get();

        return [$loans, $collectors];
    }

    public function getLoansForClient(Request $request)
    {
        $client = Auth::user();

        $loansQuery = $client->clientProfile->loans()
            ->when($request->input('loan_id'), fn($q, $loanId) => $q->where('id', $loanId))
            ->when($request->input('status'), fn($q, $status) => $q->where('status', $status))
            ->when($request->input('due_date'), fn($q, $due) => $q->whereDate('due_date', $due));

        return $loansQuery->paginate(10)
            ->through(fn($loan) => [
                'id'               => $loan->id,
                'principal_amount' => $loan->principal_amount,
                'interest_rate'    => $loan->interest_rate,
                'term_months'      => $loan->term_months,
                'monthly_payment'  => $loan->monthly_payment,
                'total_payable'    => $loan->total_payable,
                'release_date'     => $loan->release_date?->toDateString(),
                'due_date'         => $loan->due_date?->toDateString(),
                'status'           => $loan->status,
            ]);
    }

    public function getLoanForAdmin(Loan $loan)
    {
        $loan->load(['clientProfile.user', 'collectorProfile.user', 'payments']);

        return [
            'id' => $loan->id,
            'collector' => $loan->collectorProfile?->user?->first_name . ' ' . $loan->collectorProfile?->user?->last_name,
            'client' => $loan->clientProfile?->user?->first_name . ' ' . $loan->clientProfile?->user?->last_name,
            'principal_amount' => $loan->principal_amount,
            'interest_rate' => $loan->interest_rate,
            'term_months' => $loan->term_months,
            'monthly_payment' => $loan->monthly_payment,
            'release_date' => $loan->release_date,
            'due_date' => $loan->due_date,
            'remaining_balance' => $loan->remaining_balance,
            'total_payable' => $loan->total_payable,
            'status' => $loan->status,
            'created_at' => $loan->created_at->toDateString(),
        ];
    }

    public function getLoanForClient(Loan $loan)
    {
        return [
            'id' => $loan->id,
            'principal_amount' => $loan->principal_amount,
            'interest_rate' => $loan->interest_rate,
            'term_months' => $loan->term_months,
            'monthly_payment' => $loan->monthly_payment,
            'total_payable' => $loan->total_payable,
            'release_date' => $loan->release_date->toDateString(),
            'due_date' => $loan->due_date->toDateString(),
            'status' => $loan->status,
        ];
    }

    public function handleAdminStore(array $validatedData)
    {
        $client    = User::find($validatedData['client_id']);
        $collector = User::find($validatedData['collector_id']);

        $computed = $this->computeFields(
            $validatedData['principal_amount'],
            $validatedData['interest_rate'],
            $validatedData['term_months']
        );

        $loan = Loan::create([
            'collector_profile_id' => $collector->collectorProfile->id,
            'client_profile_id'    => $client->clientProfile->id,
            'principal_amount'     => $validatedData['principal_amount'],
            'interest_rate'        => $validatedData['interest_rate'],
            'term_months'          => $validatedData['term_months'],
            'status'               => $validatedData['status'],
            'monthly_payment'      => $computed['monthly_payment'],
            'total_payable'        => $computed['total_payable'],
            'remaining_balance'    => $computed['total_payable'],
            'release_date'         => $validatedData['status'] === 'active' ? now() : null,
            'due_date'             => $validatedData['status'] === 'active'
                ? now()->copy()->addMonths((int) $validatedData['term_months'])
                : null,
        ]);

        if ($loan->status === 'active') {
            $loan->generateAmortizationSchedule();
        }

        return $loan;
    }

    public function handleClientStore(array $validatedData)
    {
        $client = Auth::user();
        $existingLoan = $client->clientProfile->loans()
            ->whereIn('status', ['pending', 'active'])
            ->first();

        if ($existingLoan) {
            return redirect()->route('client.loans.index')
                ->with('error', 'You already have a pending or active loan application.');
        }

        $interestRate = match ($validatedData['term_months']) {
            "6"  => 12.0,
            "12" => 15.0,
            "18" => 20.0,
            "24" => 25.0,
            "36" => 30.0,
            "48" => 35.0,
            default => 45.0
        };

        $computed = $this->computeFields(
            $validatedData['principal_amount'],
            $interestRate,
            $validatedData['term_months']
        );

        $collector = CollectorProfile::withCount(['loans as active_loans_count' => function ($q) {
            $q->where('status', 'active');
        }])
            ->orderBy('active_loans_count', 'asc')
            ->inRandomOrder()
            ->first();

        $collectorProfileId = $collector?->id ?? null;

        return $client->clientProfile->loans()->create([
            'collector_profile_id' => $collectorProfileId,
            'principal_amount'     => $validatedData['principal_amount'],
            'interest_rate'        => $interestRate,
            'term_months'          => $validatedData['term_months'],
            'status'               => 'pending',
            'monthly_payment'      => $computed['monthly_payment'],
            'total_payable'        => $computed['total_payable'],
            'remaining_balance'    => $computed['total_payable'],
            'release_date'         => null,
            'due_date'             => null,
        ]);
    }

    public function updateLoan(Loan $loan, array $validatedData)
    {
        $client    = User::find($validatedData['client_id']);
        $collector = User::find($validatedData['collector_id']);

        $computed = $this->computeFields(
            $validatedData['principal_amount'],
            $validatedData['interest_rate'],
            $validatedData['term_months']
        );

        $releaseDateValue = $loan->release_date ?? ($validatedData['status'] === 'active' ? now() : null);
        $releaseDate = $releaseDateValue ? Carbon::parse($releaseDateValue) : null;

        $dueDate = $validatedData['status'] === 'active' && $releaseDate
            ? ($releaseDate->copy()->addMonths((int) $validatedData['term_months']))
            : $loan->due_date;

        $loan->update([
            'collector_profile_id' => $collector->collectorProfile->id,
            'client_profile_id'    => $client->clientProfile->id,
            'principal_amount'     => $validatedData['principal_amount'],
            'interest_rate'        => $validatedData['interest_rate'],
            'term_months'          => $validatedData['term_months'],
            'status'               => $validatedData['status'],
            'monthly_payment'      => $computed['monthly_payment'],
            'total_payable'        => $computed['total_payable'],
            'remaining_balance'    => $computed['total_payable'],
            'release_date'         => $releaseDate,
            'due_date'             => $dueDate,
        ]);

        if ($loan->status === 'active') {
            $loan->generateAmortizationSchedule();
        }

        return $loan;
    }

    public function deleteLoan(Loan $loan)
    {
        $loan->delete();
    }

    public function computeFields($principal, $interestRate, $termMonths)
    {
        $monthlyRate = ($interestRate / 100) / 12;

        if ($monthlyRate == 0) {
            $rawMonthlyPayment = $principal / $termMonths;
        } else {
            $rawMonthlyPayment = $principal * (
                ($monthlyRate * pow(1 + $monthlyRate, $termMonths)) /
                (pow(1 + $monthlyRate, $termMonths) - 1)
            );
        }

        $monthlyPayment = round($rawMonthlyPayment, 2);
        $totalPayable   = round($rawMonthlyPayment * $termMonths,.2);

        return [
            'monthly_payment' => $monthlyPayment,
            'total_payable'   => $totalPayable,
        ];
    }
}