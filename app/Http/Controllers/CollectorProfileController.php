<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCollectorProfileRequest;
use App\Http\Requests\UpdateCollectorProfileRequest;
use App\Models\User;
use App\Services\CollectorProfileService;
use Inertia\Inertia;

class CollectorProfileController extends Controller
{
    protected $collectorProfileService;

    public function __construct(CollectorProfileService $collectorProfileService)
    {
        $this->collectorProfileService = $collectorProfileService;
    }

    public function index()
    {
        $collectors = User::where('role', 'collector')->paginate(10);
        $collectors->load('collectorProfile');
        return Inertia::render('Admin/ManageUsers/Collectors/Index', [
            'collectors' => $collectors,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/ManageUsers/Collectors/Create');
    }

    public function store(StoreCollectorProfileRequest $request)
    {
        $user = $this->collectorProfileService->store($request->validated());

        if (!$user) {
            return redirect()->back()->withErrors(['error' => 'Failed to create user. Please try again.']);
        }

        return redirect()->intended('/admin/manage-users/collectors');
    }

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

    public function update(UpdateCollectorProfileRequest $request, User $collector)
    {
        $this->collectorProfileService->update($collector, $request->validated());

        return redirect()->intended('/admin/manage-users/collectors');
    }

    public function destroy(User $collector)
    {
        $this->collectorProfileService->destroy($collector);

        return redirect()->intended('/admin/manage-users/collectors');
    }
}