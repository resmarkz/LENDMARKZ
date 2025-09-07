<?php

namespace App\Http\Controllers;

use App\Models\User;
use Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function showLogin(Request $request)
    {
        return Inertia::render('Auth/Login');
    }

    public function showRegister(Request $request)
    {
        return Inertia::render('Auth/Register');
    }

    public function login(Request $request)
    {
        $validatedData = $request->validate(([
            'email' => 'required|email',
            'password' => 'required|string',
        ]));

        if (Auth::attempt($validatedData)) {
            $request->session()->regenerate();
            if (Auth::user()->role == 'admin') {
                return redirect()->intended('/admin/dashboard');
            } elseif (Auth::user()->role === 'client') {
                return redirect()->intended('/client/dashboard');
            } elseif (Auth::user()->role === 'collector') {
                return redirect()->intended('/collector/dashboard');
            } else {
                Auth::logout();
                return redirect('/login')->withErrors([
                    'email' => 'Unauthorized role.',
                ])->onlyInput('email');
            }
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }

    public function register(Request $request)
    {
        $validatedData = $request->validate(([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'address' => 'required|string|max:255',
            'contact_number' => 'required|string|max:20',
            'date_of_birth' => 'required|date',
            'source_of_income' => 'required|string|max:255',
        ]));

        $user = User::create([
            'first_name' => $validatedData['first_name'],
            'last_name' => $validatedData['last_name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'role' => 'client',
        ]);

        if (!$user) {
            return back()->withErrors([
                'email' => 'Registration failed, please try again.',
            ])->onlyInput('email');
        }

        $user->clientProfile()->create([
            'address' => $validatedData['address'],
            'contact_number' => $validatedData['contact_number'],
            'date_of_birth' => $validatedData['date_of_birth'],
            'source_of_income' => $validatedData['source_of_income'],
        ]);


        Auth::login($user);
        return redirect()->intended('/client/dashboard');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }
}
