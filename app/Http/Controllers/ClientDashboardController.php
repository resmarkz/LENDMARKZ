<?php

namespace App\Http\Controllers;

use App\Services\ClientDashboardService;
use Inertia\Inertia;

class ClientDashboardController extends Controller
{
    protected $clientDashboardService;

    public function __construct(ClientDashboardService $clientDashboardService)
    {
        $this->clientDashboardService = $clientDashboardService;
    }

    public function __invoke()
    {
        $data = $this->clientDashboardService->getData();

        return Inertia::render('Client/Dashboard', $data);
    }
}