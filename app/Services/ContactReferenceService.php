<?php

namespace App\Services;

use App\Models\ContactReference;
use App\Models\User;

class ContactReferenceService
{
    public function store(array $validatedData): void
    {
        $user = User::find($validatedData['client_id']);
        $user->clientProfile->contactReferences()->create([
            'first_name' => $validatedData['first_name'],
            'last_name' => $validatedData['last_name'],
            'contact_number' => $validatedData['contact_number'],
            'relationship' => $validatedData['relationship'],
        ]);
    }

    public function update(ContactReference $contactReference, array $validatedData): void
    {
        $contactReference->update($validatedData);
    }

    public function destroy(ContactReference $contactReference): void
    {
        $contactReference->delete();
    }
}
