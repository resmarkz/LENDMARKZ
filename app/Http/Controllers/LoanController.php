<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAdminLoanRequest;
use App\Http\Requests\StoreClientLoanRequest;
use App\Http\Requests\UpdateLoanRequest;
use App\Models\Loan;
use App\Models\User;
use App\Services\LoanService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoanController extends Controller
{
    protected $loanService;

    public function __construct(LoanService $loanService)
    {
        $this->loanService = $loanService;
    }

    public function index(Request $request)
    {
        $userRole = Auth::check() ? Auth::user()->role : null;

        if ($userRole === 'admin') {
            [$loans, $collectors] = $this->loanService->getLoansForAdmin($request);
            return Inertia::render('Admin/Loans/Index', [
                'loans' => $loans,
                'filters' => $request->all([
                    'search',
                    'status',
                    'collector_id',
                    'start_date',
                    'end_date',
                    'min_principal',
                    'max_principal',
                    'min_interest',
                    'max_interest'
                ]),
                'collectors' => $collectors,
            ]);
        } elseif ($userRole === 'client') {
            $loans = $this->loanService->getLoansForClient($request);
            return Inertia::render('Client/Index', [
                'loans' => $loans,
            ]);
        } elseif ($userRole === 'collector') {
            $loans = $this->loanService->getLoansForCollector($request);
            return Inertia::render('Collector/Index', [
                'loans' => $loans,
                'filters' => $request->all(['loan_id', 'due_date', 'status']),
            ]);
        } else {
            abort(403, 'Unauthorized action.');
        }
    }

    public function create()
    {
        $userRole = Auth::check() ? Auth::user()->role : null;

        if ($userRole === 'admin') {
            $clients = User::where('role', 'client')->get();
            $collectors = User::where('role', 'collector')->get();
            return Inertia::render('Admin/Loans/Create', [
                'clients'    => $clients,
                'collectors' => $collectors,
            ]);
        } elseif ($userRole === 'client') {
            return Inertia::render('Client/CreateLoan');
        } else {
            abort(403, 'Unauthorized action.');
        }
    }

    public function store(Request $request)
    {
        $userRole = Auth::check() ? Auth::user()->role : null;

        if ($userRole === 'admin') {
            $this->loanService->handleAdminStore(app(StoreAdminLoanRequest::class)->validated());
            return redirect()->route('admin.loans.index')->with('success', 'Loan created successfully.');
        } elseif ($userRole === 'client') {
            $this->loanService->handleClientStore(app(StoreClientLoanRequest::class)->validated());
            return redirect()->route('client.loans.index')->with('success', 'Loan application submitted successfully.');
        } else {
            abort(403, 'Unauthorized action.');
        }
    }

    public function show(Loan $loan)
    {
        $userRole = Auth::check() ? Auth::user()->role : null;

        if ($userRole === 'admin') {
            $loanData = $this->loanService->getLoanForAdmin($loan);
            return Inertia::render('Admin/Loans/Show', ['loan' => $loanData]);
        } elseif ($userRole === 'client') {
            $loanData = $this->loanService->getLoanForClient($loan);
            return Inertia::render('Client/Show', ['loan' => $loanData]);
        } else {
            abort(403, 'Unauthorized action.');
        }
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

    public function update(UpdateLoanRequest $request, Loan $loan)
    {
        $this->loanService->updateLoan($loan, $request->validated());

        return redirect()->route('admin.loans.index')
            ->with('success', 'Loan updated successfully.');
    }

    public function destroy(Loan $loan)
    {
        $this->loanService->deleteLoan($loan);

        return redirect()->route('admin.loans.index')
            ->with('success', 'Loan deleted successfully.');
    }
}
