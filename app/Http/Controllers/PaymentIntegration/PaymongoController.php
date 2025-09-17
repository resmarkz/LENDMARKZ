<?php

namespace App\Http\Controllers\PaymentIntegration;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PaymongoController extends Controller
{
    public function createIntent(Request $request)
    {
        $validated = $request->validate([
            'amount' => 'required|numeric|min:1',
            'payment_method' => 'required|string',
        ]);

        $response = Http::withBasicAuth(env('PAYMONGO_SECRET_KEY'), '')
            ->post('https://api.paymongo.com/v1/payment_intents', [
                'data' => [
                    'attributes' => [
                        'amount' => $validated['amount'] * 100, // cents
                        'currency' => 'PHP',
                        'payment_method_allowed' => [$validated['payment_method']],
                        'capture_type' => 'automatic',
                    ]
                ]
            ]);

        return $response->json();
    }

    public function attachMethod(Request $request)
    {
        $validated = $request->validate([
            'intent_id' => 'required|string',
            'payment_method_id' => 'required|string',
            'payment_id' => 'required|integer', // your Payment record
        ]);

        $intentId = $validated['intent_id'];
        $paymentId = $validated['payment_id'];

        // Build return_url with payment_id included
        $returnUrl = route('paymongo.verify', [
            'payment_intent_id' => $intentId,
            'payment_id' => $paymentId,
        ]);

        $response = Http::withBasicAuth(env('PAYMONGO_SECRET_KEY'), '')
            ->post("https://api.paymongo.com/v1/payment_intents/{$intentId}/attach", [
                'data' => [
                    'attributes' => [
                        'payment_method' => $validated['payment_method_id'],
                        'return_url' => $returnUrl,
                    ],
                ],
            ]);

        return $response->json();
    }

    public function verify(Request $request)
    {
        $intentId   = $request->query('payment_intent_id');
        $paymentId  = $request->query('payment_id');

        $response = Http::withBasicAuth(env('PAYMONGO_SECRET_KEY'), '')
            ->get("https://api.paymongo.com/v1/payment_intents/{$intentId}");

        $paymentIntent = $response->json();
        $status = $paymentIntent['data']['attributes']['status'];

        if ($status === 'succeeded') {
            $paymongoPayment = $paymentIntent['data']['attributes']['payments'][0] ?? null;

            if ($paymongoPayment && $paymentId) {
                $payment = Payment::findOrFail($paymentId);

                $payment->update([
                    'amount_paid'    => $paymongoPayment['attributes']['amount'] / 100,
                    'payment_date'   => now(),
                    'payment_method' => $paymongoPayment['attributes']['source']['type'] ?? 'gcash',
                    'reference_no'   => $paymongoPayment['id'],
                    'is_paid'        => true,
                    'status'         => 'paid',
                ]);

                $loan = $payment->loan;
                $loan->update([
                    'remaining_balance' => max(0, $loan->remaining_balance - $payment->amount_paid),
                ]);

                return redirect()->route('dashboard')
                    ->with('success', 'Payment successful and updated!');
            }
        }

        return redirect()->route('dashboard')
            ->with('error', "Payment status: {$status}");
    }

    public function createPaymentMethod(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|string|in:gcash,paymaya',
            'name' => 'required|string',
            'email' => 'required|email',
        ]);

        $response = Http::withBasicAuth(env('PAYMONGO_SECRET_KEY'), '')
            ->post('https://api.paymongo.com/v1/payment_methods', [
                'data' => [
                    'attributes' => [
                        'type' => $validated['type'],
                        'billing' => [
                            'name' => $validated['name'],
                            'email' => $validated['email'],
                        ],
                    ],
                ],
            ]);

        return $response->json();
    }
}
