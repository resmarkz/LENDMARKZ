<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClientProfileRequest;
use App\Http\Requests\UpdateClientOwnProfileRequest;
use App\Http\Requests\UpdateClientPasswordRequest;
use App\Http\Requests\UpdateClientProfileRequest;
use App\Models\User;
use App\Services\ClientProfileService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClientProfileController extends Controller
{
    protected $clientProfileService;

    public function __construct(ClientProfileService $clientProfileService)
    {
        $this->clientProfileService = $clientProfileService;
    }

    public function showClientProfile()
    {
        $client = $this->clientProfileService->showClientProfile();
        return Inertia::render('Client/Profile/Show', [
            'client' => $client,
        ]);
    }

    public function updateClientProfile(UpdateClientOwnProfileRequest $request)
    {
        $this->clientProfileService->updateClientProfile(Auth::user(), $request->validated());

        return back()->with('success', 'Profile updated.');
    }

    public function updateClientPassword(UpdateClientPasswordRequest $request)
    {
        $this->clientProfileService->updateClientPassword(Auth::user(), $request->validated());

        return back()->with('success', 'Password updated.');
    }

    public function index()
    {
        $clients = User::where('role', 'client')->paginate(10);
        $clients->load('clientProfile');
        return Inertia::render('Admin/ManageUsers/Clients/Index', [
            'clients' => $clients,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/ManageUsers/Clients/Create');
    }

    public function store(StoreClientProfileRequest $request)
    {
        $user = $this->clientProfileService->store($request->validated());

        if (!$user) {
            return redirect()->back()->withErrors(['error' => 'Failed to create user. Please try again.']);
        }

        return redirect()->intended('/admin/manage-users/clients');
    }

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

    public function update(UpdateClientProfileRequest $request, User $client)
    {
        $this->clientProfileService->update($client, $request->validated());

        return redirect()->intended('/admin/manage-users/clients');
    }

    public function destroy(User $client)
    {
        $this->clientProfileService->destroy($client);

        return redirect()->intended('/admin/manage-users/clients');
    }
}
