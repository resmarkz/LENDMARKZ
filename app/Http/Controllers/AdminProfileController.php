<?php

namespace App\Http\Controllers;

use App\Models\AdminProfile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AdminProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $admins = User::where('role', 'admin')->get();
        $admins->load('adminProfile');

        return Inertia::render('Admin/ManageUsers/Admins/Index', [
            'admins' => $admins,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'first_name' => $validatedData['first_name'],
            'last_name' => $validatedData['last_name'],
            'email' => $validatedData['email'],
            'password' => $validatedData['password'],
            'role' => 'admin',
        ]);

        if (!$user) {
            return back()->withErrors([
                'email' => 'Registration failed, please try again.',
            ])->onlyInput('email');
        }

        $user->adminProfile()->create();

        return redirect()->intended('/admin/manage-users/admins');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $admin)
    {
        $admin->load('adminProfile');
        return Inertia::render('Admin/ManageUsers/Admins/Show', [
            'admin' => $admin,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $admin)
    {
        $admin->load('adminProfile');
        return Inertia::render('Admin/ManageUsers/Admins/Edit', [
            'admin' => [
                'id' => $admin->id,
                'first_name' => $admin->first_name,
                'last_name' => $admin->last_name,
                'email' => $admin->email,
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $admin)
    {
        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($admin->id),
            ],
            'current_password' => 'nullable|string|min:8',
            'password' => 'nullable|string|min:8',
        ]);

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
        return redirect()->intended('/admin/manage-users/admins');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $admin)
    {
        if ($admin->adminProfile) {
            $admin->adminProfile()->delete();
        }
        $admin->delete();
        return redirect()->intended('/admin/manage-users/admins');
    }
}
