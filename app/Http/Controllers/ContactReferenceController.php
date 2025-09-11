<?php

namespace App\Http\Controllers;

use App\Models\ContactReference;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactReferenceController extends Controller
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
    public function create(User $client)
    {
        return Inertia::render('Admin/ManageUsers/Clients/ContactReferences/Create', [
            'client' => $client,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'client_id' => 'required|exists:users,id',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'contact_number' => 'required|string|max:20',
            'relationship' => 'required|string|max:255',
        ]);

        $user = User::find($validatedData['client_id']);
        if (!$user) {
            return redirect()->back()->withErrors(['client_id' => 'Client not found.']);
        }
        $user->clientProfile->contactReferences()->create([
            'first_name' => $validatedData['first_name'],
            'last_name' => $validatedData['last_name'],
            'contact_number' => $validatedData['contact_number'],
            'relationship' => $validatedData['relationship'],
        ]);
        return redirect()->intended("/admin/manage-users/clients/$user->id");
    }

    /**
     * Display the specified resource.
     */
    public function show(ContactReference $contactReference)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $client, ContactReference $contactReference)
    {
        return Inertia::render('Admin/ManageUsers/Clients/ContactReferences/Edit', [
            'client' => $client,
            'contactReference' => $contactReference,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $client, ContactReference $contactReference)
    {
        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'contact_number' => 'required|string|max:20',
            'relationship' => 'required|string|max:255',
        ]);

        $contactReference->update($validatedData);

        return redirect()->intended("/admin/manage-users/clients/{$client->id}/edit");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $client, ContactReference $contactReference)
    {
        $contactReference->delete();
        return redirect()->intended("/admin/manage-users/clients/{$client->id}/edit");
    }
}
