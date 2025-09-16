<?php

namespace App\Http\Controllers\PaymentIntegration;

use App\Http\Controllers\Controller;
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
            'return_url' => 'required|string',
        ]);

        $intentId = $validated['intent_id'];

        $response = Http::withBasicAuth(env('PAYMONGO_SECRET_KEY'), '')
            ->post("https://api.paymongo.com/v1/payment_intents/{$intentId}/attach", [
                'data' => [
                    'attributes' => [
                        'payment_method' => $validated['payment_method_id'],
                        'return_url' => $validated['return_url'],
                    ],
                ],
            ]);

        return $response->json();
    }

    public function verify(Request $request)
    {
        $intentId = $request->query('payment_intent_id');

        $response = Http::withBasicAuth(env('PAYMONGO_SECRET_KEY'), '')
            ->get("https://api.paymongo.com/v1/payment_intents/{$intentId}");

        $paymentIntent = $response->json();
        $status = $paymentIntent['data']['attributes']['status'];

        if ($status === 'succeeded') {
            return redirect()->route('dashboard')
                ->with('success', 'Payment successful!');
        }

        return redirect()->route('dashboard')
            ->with('error', "Payment status: {$status}");
    }
}
