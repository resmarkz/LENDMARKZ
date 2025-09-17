<?php

namespace App\Http\Controllers;

use App\Models\CollectorProfile;
use App\Models\User;
use Hash;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CollectorProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $collectors = User::where('role', 'collector')->paginate(10);
        $collectors->load('collectorProfile');
        return Inertia::render('Admin/ManageUsers/Collectors/Index', [
            'collectors' => $collectors,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/ManageUsers/Collectors/Create');
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
            'contact_number' => 'required|string|max:20',
            'date_of_birth' => 'required|date',
            'status' => 'nullable|in:active,inactive',
        ]);

        $user = User::create([
            'first_name' => $validatedData['first_name'],
            'last_name' => $validatedData['last_name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
            'role' => 'collector',
        ]);

        if (!$user) {
            return redirect()->back()->withErrors(['error' => 'Failed to create user. Please try again.']);
        }

        $user->collectorProfile()->create([
            'contact_number' => $validatedData['contact_number'],
            'date_of_birth' => $validatedData['date_of_birth'],
            'status' => $validatedData['status'] ?? 'active',
        ]);

        return redirect()->intended('/admin/manage-users/collectors');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $collector)
    {
        $collector->load('collectorProfile');
        if (!$collector) {
            return redirect()->back()->withErrors(['error' => 'Collector not found.']);
        }
        return Inertia::render('Admin/ManageUsers/Collectors/Show', [
            'collector' => $collector,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $collector)
    {
        $collector->load('collectorProfile');
        if (!$collector) {
            return redirect()->back()->withErrors(['error' => 'Collector not found.']);
        }
        return Inertia::render('Admin/ManageUsers/Collectors/Edit', [
            'collector' => $collector,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $collector)
    {
        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($collector->id),
            ],
            'current_password' => 'nullable|string|min:8',
            'password' => 'nullable|string|min:8',
            'contact_number' => 'required|string|max:20',
            'date_of_birth' => 'required|date',
            'status' => 'nullable|in:active,inactive',
        ]);

        $collector->first_name = $validatedData['first_name'];
        $collector->last_name = $validatedData['last_name'];
        $collector->email = $validatedData['email'];

        if (!empty($validatedData['current_password']) && !empty($validatedData['password'])) {
            if (Hash::check($validatedData['current_password'], $collector->password)) {
                $collector->password = Hash::make($validatedData['password']);
            } else {
                return redirect()->back()->withErrors(['error' => 'Current password is incorrect.']);
            }
        }

        $collector->save();

        $collector->collectorProfile()->update([
            'contact_number' => $validatedData['contact_number'],
            'date_of_birth' => $validatedData['date_of_birth'],
            'status' => $validatedData['status'] ?? 'active',
        ]);

        return redirect()->intended('/admin/manage-users/collectors');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $collector)
    {
        if (!$collector) {
            return redirect()->back()->withErrors(['error' => 'Collector not found.']);
        }
        if ($collector->collectorProfile) {
            $collector->collectorProfile()->delete();
        }
        $collector->delete();
        return redirect()->intended('/admin/manage-users/collectors');
    }
}
