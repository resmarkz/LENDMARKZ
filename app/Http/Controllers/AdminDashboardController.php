<?php

namespace App\Http\Controllers;

use App\Services\AdminDashboardService;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    protected $adminDashboardService;

    public function __construct(AdminDashboardService $adminDashboardService)
    {
        $this->adminDashboardService = $adminDashboardService;
    }

    public function __invoke()
    {
        $data = $this->adminDashboardService->getData();

        return Inertia::render('Admin/Dashboard', $data);
    }
}