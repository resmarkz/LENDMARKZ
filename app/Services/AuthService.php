<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function login(array $credentials): bool
    {
        if (Auth::attempt($credentials)) {
            request()->session()->regenerate();
            return true;
        }

        return false;
    }

    public function register(array $validatedData): User
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

        Auth::login($user);

        return $user;
    }

    public function logout(): void
    {
        Auth::logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();
    }

    public function getRedirectRoute(): string
    {
        $user = Auth::user();

        return match ($user->role) {
            'admin' => '/admin/dashboard',
            'client' => '/client/dashboard',
            'collector' => '/collector/dashboard',
            default => '/login',
        };
    }
}
