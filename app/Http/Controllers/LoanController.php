<?php

namespace App\Http\Controllers;

use App\Models\Loan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoanController extends Controller
{
    public function index()
    {
        $loans = Loan::with(['clientProfile.user', 'collectorProfile.user'])->get();
        return Inertia::render('Admin/Loans/Index', [
            'loans' => $loans,
        ]);
    }

    public function create()
    {
        $clients = User::where('role', 'client')->get();
        $collectors = User::where('role', 'collector')->get();
        $userRole = Auth::user()->role;

        return match ($userRole) {
            'admin'  => Inertia::render('Admin/Loans/Create', [
                'clients'    => $clients,
                'collectors' => $collectors,
            ]),
            'client' => Inertia::render('Client/Loans/Create'),
            default  => abort(403, 'Unauthorized action.'),
        };
    }

    public function store(Request $request)
    {
        $userRole = Auth::user()->role;

        return match ($userRole) {
            'admin'  => $this->handleAdminStore($request),
            'client' => $this->handleClientStore($request),
            default  => abort(403, 'Unauthorized action.'),
        };
    }

    private function handleAdminStore(Request $request)
    {
        $validatedData = $request->validate([
            'collector_id'     => 'required|exists:users,id',
            'client_id'        => 'required|exists:users,id',
            'principal_amount' => 'required|numeric|min:0',
            'interest_rate'    => 'required|numeric|min:0',
            'term_months'      => 'required|integer|min:1',
            'status'           => 'required|in:pending,active',
        ]);

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
        ]);

        return redirect()->route('admin.loans.index')
            ->with('success', 'Loan created successfully.');
    }

    private function handleClientStore(Request $request) {}

    public function show(Loan $loan)
    {
        $loan->load(['clientProfile.user', 'collectorProfile.user', 'payments']);

        return Inertia::render('Admin/Loans/Show', [
            'loan' => [
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
            ],
        ]);
    }

    public function edit(Loan $loan)
    {
        $clients = User::where('role', 'client')->get();
        $collectors = User::where('role', 'collector')->get();

        return Inertia::render('Admin/Loans/Edit', [
            'clients' => $clients,
            'collectors' => $collectors,
            'loan' => [
                'id' => $loan->id,
                'collector_id' => $loan->collectorProfile->user->id,
                'client_id' => $loan->clientProfile->user->id,
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
            ],
        ]);
    }

    public function update(Request $request, Loan $loan)
    {
        $validatedData = $request->validate([
            'collector_id'     => 'required|exists:users,id',
            'client_id'        => 'required|exists:users,id',
            'principal_amount' => 'required|numeric|min:0',
            'interest_rate'    => 'required|numeric|min:0',
            'term_months'      => 'required|integer|min:1',
            'status'           => 'required|in:pending,active',
        ]);

        $client    = User::find($validatedData['client_id']);
        $collector = User::find($validatedData['collector_id']);

        $computed = $this->computeFields(
            $validatedData['principal_amount'],
            $validatedData['interest_rate'],
            $validatedData['term_months']
        );

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
        ]);

        return redirect()->route('admin.loans.index')
            ->with('success', 'Loan updated successfully.');
    }

    public function destroy(Loan $loan)
    {
        $loan->delete();
        return redirect()->route('admin.loans.index')
            ->with('success', 'Loan deleted successfully.');
    }

    private function computeFields($principal, $interestRate, $termMonths)
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

        $totalPayable = round($rawMonthlyPayment * $termMonths, 2);

        return [
            'monthly_payment' => $monthlyPayment,
            'total_payable'   => $totalPayable,
        ];
    }
}
