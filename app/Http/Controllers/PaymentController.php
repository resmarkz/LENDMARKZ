<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdatePaymentRequest;
use App\Models\ClientProfile;
use App\Models\CollectorProfile;
use App\Models\Payment;
use App\Models\User;
use App\Services\PaymentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PaymentController extends Controller
{
    protected $paymentService;

    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }

    public function index()
    {
        $user = Auth::user();
        $userRole = Auth::check() ? Auth::user()->role : null;

        if ($userRole === 'admin') {
            [$payments, $filters] = $this->paymentService->getPaymentsForAdmin();

            return Inertia::render('Admin/Payments/Index', [
                'payments' => $payments,
                'filters' => $filters,
                'clients' => ClientProfile::with('user')->get(),
                'collectors' => CollectorProfile::with('user')->get(),
            ]);
        } elseif ($userRole === 'client') {
            [$currentLoanData, $payments, $error] = $this->paymentService->getPaymentsForClient($user);

            if ($error) {
                return redirect()->route('client.loans.index')->with('error', $error);
            }

            return Inertia::render('Client/Payments/Index', [
                'currentLoan' => $currentLoanData,
                'payments' => $payments,
            ]);
        } elseif ($userRole === 'collector') {
            return "";
        } else {
            return abort(403, 'Unauthorized action.');
        }
    }

    public function create(Payment $payment)
    {
        if ($payment->is_paid || $payment->status === 'paid') {
            return redirect()->back()->with('error', 'This payment has already been made.');
        }

        $paymentData = $this->paymentService->getPaymentData($payment);

        return Inertia::render('Client/Payments/Create', [
            'payment' => $paymentData
        ]);
    }

    public function store(Request $request) {}

    public function show(User $client) {}

    public function edit(Payment $payment) {}

    public function update(UpdatePaymentRequest $request, Payment $payment)
    {
        $this->paymentService->update($payment, $request->validated());

        return redirect()->back()->with('success', 'Payment updated and loan balance recalculated.');
    }

    public function destroy(Payment $payment) {}
}
