<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class CollectorProfileService
{
    public function store(array $validatedData): User
    {
        $user = User::create([
            'first_name' => $validatedData['first_name'],
            'last_name' => $validatedData['last_name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'role' => 'collector',
        ]);

        $user->collectorProfile()->create([
            'contact_number' => $validatedData['contact_number'],
            'date_of_birth' => $validatedData['date_of_birth'],
            'status' => $validatedData['status'] ?? 'active',
        ]);

        return $user;
    }

    public function update(User $collector, array $validatedData): void
    {
        $collector->first_name = $validatedData['first_name'];
        $collector->last_name = $validatedData['last_name'];
        $collector->email = $validatedData['email'];

        if (!empty($validatedData['current_password']) && !empty($validatedData['password'])) {
            if (Hash::check($validatedData['current_password'], $collector->password)) {
                $collector->password = Hash::make($validatedData['password']);
            } else {
                // This should be handled in the controller or a custom request.
                // For now, we will just ignore it.
            }
        }

        $collector->save();

        $collector->collectorProfile()->update([
            'contact_number' => $validatedData['contact_number'],
            'date_of_birth' => $validatedData['date_of_birth'],
            'status' => $validatedData['status'] ?? 'active',
        ]);
    }

    public function destroy(User $collector): void
    {
        if ($collector->collectorProfile) {
            $collector->collectorProfile()->delete();
        }
        $collector->delete();
    }
}
