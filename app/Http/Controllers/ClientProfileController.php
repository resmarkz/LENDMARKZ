<?php

namespace App\Http\Controllers;

use App\Models\ClientProfile;
use App\Models\User;
use Hash;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ClientProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clients = User::where('role', 'client')->get();
        $clients->load('clientProfile');
        return Inertia::render('Admin/ManageUsers/Clients/Index', [
            'clients' => $clients,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/ManageUsers/Clients/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'address' => 'required|string|max:255',
            'contact_number' => 'required|string|max:20',
            'date_of_birth' => 'required|date',
            'source_of_income' => ['required', 'string', Rule::in(['Employed', 'Business', 'Freelancer', 'Other'])],
        ]);

        $user = User::create([
            'first_name' => $validatedData['first_name'],
            'last_name' => $validatedData['last_name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'role' => 'client',
        ]);

        if (!$user) {
            return redirect()->back()->withErrors(['error' => 'Failed to create user. Please try again.']);
        }

        $user->clientProfile()->create([
            'address' => $validatedData['address'],
            'contact_number' => $validatedData['contact_number'],
            'date_of_birth' => $validatedData['date_of_birth'],
            'source_of_income' => $validatedData['source_of_income'],
        ]);

        return redirect()->intended('/admin/manage-users/clients');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $client)
    {
        $client->load('clientProfile.contactReferences');
        if (!$client) {
            return redirect()->back()->withErrors(['error' => 'Client not found.']);
        }
        return Inertia::render('Admin/ManageUsers/Clients/Show', [
            'client' => $client,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $client)
    {
        $client->load('clientProfile.contactReferences');
        if (!$client) {
            return redirect()->back()->withErrors(['error' => 'Client not found.']);
        }
        return Inertia::render('Admin/ManageUsers/Clients/Edit', [
            'client' => $client,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $client)
    {
        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($client->id),
            ],
            'current_password' => 'nullable|string|min:8',
            'password' => 'nullable|string|min:8',
            'address' => 'required|string|max:255',
            'contact_number' => 'required|string|max:20',
            'date_of_birth' => 'required|date',
            'source_of_income' => ['required', 'string', Rule::in(['Employed', 'Business', 'Freelancer', 'Other'])],
        ]);

        $client->first_name = $validatedData['first_name'];
        $client->last_name = $validatedData['last_name'];
        $client->email = $validatedData['email'];

        if (!empty($validatedData['current_password']) && !empty($validatedData['password'])) {
            if (Hash::check($validatedData['current_password'], $client->password)) {
                $client->password = Hash::make($validatedData['password']);
            } else {
                return redirect()->back()->withErrors(['error' => 'Current password is incorrect.']);
            }
        }

        $client->save();

        $client->clientProfile()->update([
            'address' => $validatedData['address'],
            'contact_number' => $validatedData['contact_number'],
            'date_of_birth' => $validatedData['date_of_birth'],
            'source_of_income' => $validatedData['source_of_income'],
        ]);

        return redirect()->intended('/admin/manage-users/clients');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $client)
    {
        if (!$client) {
            return redirect()->back()->withErrors(['error' => 'Client not found.']);
        }
        if ($client->clientProfile) {
            $client->clientProfile()->delete();
        }
        $client->delete();
        return redirect()->intended('/admin/manage-users/clients');
    }
}
