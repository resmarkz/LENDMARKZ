<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactReferenceRequest;
use App\Http\Requests\UpdateContactReferenceRequest;
use App\Models\ContactReference;
use App\Models\User;
use App\Services\ContactReferenceService;
use Inertia\Inertia;

class ContactReferenceController extends Controller
{
    protected $contactReferenceService;

    public function __construct(ContactReferenceService $contactReferenceService)
    {
        $this->contactReferenceService = $contactReferenceService;
    }

    public function index()
    {
        //
    }

    public function create(User $client)
    {
        return Inertia::render('Admin/ManageUsers/Clients/ContactReferences/Create', [
            'client' => $client,
        ]);
    }

    public function store(StoreContactReferenceRequest $request)
    {
        $this->contactReferenceService->store($request->validated());

        return redirect()->intended("/admin/manage-users/clients/" . $request->validated()['client_id']);
    }

    public function show(ContactReference $contactReference)
    {
        //
    }

    public function edit(User $client, ContactReference $contactReference)
    {
        return Inertia::render('Admin/ManageUsers/Clients/ContactReferences/Edit', [
            'client' => $client,
            'contactReference' => $contactReference,
        ]);
    }

    public function update(UpdateContactReferenceRequest $request, User $client, ContactReference $contactReference)
    {
        $this->contactReferenceService->update($contactReference, $request->validated());

        return redirect()->intended("/admin/manage-users/clients/{$client->id}/edit");
    }

    public function destroy(User $client, ContactReference $contactReference)
    {
        $this->contactReferenceService->destroy($contactReference);

        return redirect()->intended("/admin/manage-users/clients/{$client->id}/edit");
    }
}