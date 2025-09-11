<?php

namespace App\Http\Controllers;

use App\Models\Loan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
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


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'collector_profile_id' => 'required|exists:collector_profiles,id',
            'client_profile_id'    => 'required|exists:client_profiles,id',
            'principal_amount'    => 'required|numeric|min:0',
            'interest_rate'      => 'required|numeric|min:0',
            'term_months'      => 'required|integer|min:1',
            'release_date',
            'status',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Loan $loan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Loan $loan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Loan $loan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Loan $loan)
    {
        //
    }
}
