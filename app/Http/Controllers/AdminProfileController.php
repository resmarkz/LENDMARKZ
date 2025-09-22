<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAdminProfileRequest;
use App\Http\Requests\UpdateAdminProfileRequest;
use App\Models\User;
use App\Services\AdminProfileService;
use Inertia\Inertia;

class AdminProfileController extends Controller
{
    protected $adminProfileService;

    public function __construct(AdminProfileService $adminProfileService)
    {
        $this->adminProfileService = $adminProfileService;
    }

    public function index()
    {
        $admins = User::where('role', 'admin')->paginate(10);
        $admins->load('adminProfile');

        return Inertia::render('Admin/ManageUsers/Admins/Index', [
            'admins' => $admins,
        ]);
    }

    public function create()
    {
        //
    }

    public function store(StoreAdminProfileRequest $request)
    {
        $user = $this->adminProfileService->store($request->validated());

        if (!$user) {
            return back()->withErrors([
                'email' => 'Registration failed, please try again.',
            ])->onlyInput('email');
        }

        return redirect()->intended('/admin/manage-users/admins');
    }

    public function show(User $admin)
    {
        $admin->load('adminProfile');
        return Inertia::render('Admin/ManageUsers/Admins/Show', [
            'admin' => $admin,
        ]);
    }

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

    public function update(UpdateAdminProfileRequest $request, User $admin)
    {
        $this->adminProfileService->update($admin, $request->validated());

        return redirect()->intended('/admin/manage-users/admins');
    }

    public function destroy(User $admin)
    {
        $this->adminProfileService->destroy($admin);

        return redirect()->intended('/admin/manage-users/admins');
    }
}