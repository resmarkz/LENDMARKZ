<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AdminProfileService
{
    public function store(array $validatedData): User
    {
        $user = User::create([
            'first_name' => $validatedData['first_name'],
            'last_name' => $validatedData['last_name'],
            'email' => $validatedData['email'],
            'password' => $validatedData['password'],
            'role' => 'admin',
        ]);

        $user->adminProfile()->create();

        return $user;
    }

    public function update(User $admin, array $validatedData): User
    {
        $admin->first_name = $validatedData['first_name'];
        $admin->last_name = $validatedData['last_name'];
        $admin->email = $validatedData['email'];

        if (!empty($validatedData['current_password']) && !empty($validatedData['password'])) {
            if (Hash::check($validatedData['current_password'], $admin->password)) {
                $admin->password = $validatedData['password'];
            } else {
                return back()->withErrors([
                    'current_password' => 'Current password is incorrect.',
                ])->onlyInput('current_password');
            }
        }

        $admin->save();

        return $admin;
    }

    public function destroy(User $admin): void
    {
        if ($admin->adminProfile) {
            $admin->adminProfile()->delete();
        }
        $admin->delete();
    }
}
