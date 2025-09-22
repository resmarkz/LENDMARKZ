<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Services\AuthService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AuthController extends Controller
{
    protected $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function showLogin(Request $request)
    {
        return Inertia::render('Auth/Login');
    }

    public function showRegister(Request $request)
    {
        return Inertia::render('Auth/Register');
    }

    public function login(LoginRequest $request)
    {
        $authenticated = $this->authService->login($request->validated());

        if ($authenticated) {
            return redirect()->intended($this->authService->getRedirectRoute());
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ])->onlyInput('email');
    }

    public function register(RegisterRequest $request)
    {
        $user = $this->authService->register($request->validated());

        if (!$user) {
            return back()->withErrors([
                'email' => 'Registration failed, please try again.',
            ])->onlyInput('email');
        }

        return redirect()->intended($this->authService->getRedirectRoute());
    }

    public function logout(Request $request)
    {
        $this->authService->logout();

        return redirect('/');
    }
}