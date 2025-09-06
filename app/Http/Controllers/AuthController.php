<?php

namespace App\Http\Controllers;

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

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }
}
