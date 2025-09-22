<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ClientProfileService
{
    public function showClientProfile()
    {
        $client = Auth::user();
        $client->load('clientProfile');
        return $client;
    }

    public function updateClientProfile(User $user, array $validatedData): void
    {
        $user->update($validatedData);
    }

    public function updateClientPassword(User $user, array $validatedData): void
    {
        $user->update([
            'password' => Hash::make($validatedData['password']),
        ]);
    }

    public function store(array $validatedData): User
    {
        $user = User::create([
            'first_name' => $validatedData['first_name'],
            'last_name' => $validatedData['last_name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'role' => 'client',
        ]);

        $user->clientProfile()->create([
            'address' => $validatedData['address'],
            'contact_number' => $validatedData['contact_number'],
            'date_of_birth' => $validatedData['date_of_birth'],
            'source_of_income' => $validatedData['source_of_income'],
        ]);

        return $user;
    }

    public function update(User $client, array $validatedData): void
    {
        $client->first_name = $validatedData['first_name'];
        $client->last_name = $validatedData['last_name'];
        $client->email = $validatedData['email'];

        if (!empty($validatedData['current_password']) && !empty($validatedData['password'])) {
            if (Hash::check($validatedData['current_password'], $client->password)) {
                $client->password = Hash::make($validatedData['password']);
            } else {
                // This should be handled in the controller or a custom request.
                // For now, we will just ignore it.
            }
        }

        $client->save();

        $client->clientProfile()->update([
            'address' => $validatedData['address'],
            'contact_number' => $validatedData['contact_number'],
            'date_of_birth' => $validatedData['date_of_birth'],
            'source_of_income' => $validatedData['source_of_income'],
        ]);
    }

    public function destroy(User $client): void
    {
        if ($client->clientProfile) {
            $client->clientProfile()->delete();
        }
        $client->delete();
    }
}