import React, { useState } from "react";
import axios from "axios";

const PaymentMethods = () => {
    const [method, setMethod] = useState("gcash");
    const [amount, setAmount] = useState(1000); // default ₱1000
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);

        try {
            // 1. Create Payment Intent from backend
            const intentRes = await axios.post("/payment-intent", {
                amount,
                payment_method: method,
            });

            const clientKey = intentRes.data.data.attributes.client_key;
            const intentId = intentRes.data.data.id;

            // 2. Create Payment Method (PayMongo API - public key)
            const pmRes = await axios.post(
                "https://api.paymongo.com/v1/payment_methods",
                {
                    data: {
                        attributes: {
                            type: method,
                            // TODO: Replace with dynamic billing information from user profile
                            billing: {
                                name: "Juan Dela Cruz",
                                email: "juan@example.com",
                                phone: "+639171234567",
                            },
                        },
                    },
                },
                {
                    auth: {
                        username: import.meta.env.VITE_PAYMONGO_PUBLIC_KEY,
                        password: "",
                    },
                }
            );

            const pmId = pmRes.data.data.id;

            // 3. Attach Payment Method to Intent (via backend)
            const attachRes = await axios.post("/payment-attach", {
                intent_id: intentId,
                payment_method_id: pmId,
                return_url: `${window.location.origin}/payment/verify?payment_intent_id=${intentId}`,
            });

            // 4. Redirect if needed
            const redirectUrl =
                attachRes.data.data.attributes.next_action?.redirect?.url;
            if (redirectUrl) {
                window.location.href = redirectUrl;
            } else {
                alert("Payment completed!");
            }
        } catch (error) {
            console.error(error.response?.data || error.message);
            alert("Payment failed. Check console for details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-xl font-bold">Choose Payment Method</h1>

            <div>
                <label className="block mb-1">Amount (₱)</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="border px-3 py-2 w-48"
                />
            </div>

            <div>
                <label className="block mb-1">Payment Method</label>
                <select
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                    className="border px-3 py-2 w-48"
                >
                    <option value="gcash">GCash</option>
                    <option value="paymaya">Paymaya</option>
                    <option value="card">Card</option>
                </select>
            </div>

            <button
                onClick={handlePayment}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                {loading ? "Processing..." : "Pay Now"}
            </button>
        </div>
    );
};

export default PaymentMethods;
