import React, { useState } from "react";
import axios from "axios";

const Test = () => {
    const [loading, setLoading] = useState(false);

    const payWithGCash = async () => {
        setLoading(true);

        try {
            // Step 1: Create Payment Intent
            const intentRes = await axios.post("/payment-intent", {
                amount: 100, // test ₱100
                payment_method: "gcash",
            });

            const intent = intentRes.data.data;
            const intentId = intent.id;

            // Step 2: Create Payment Method (GCash)
            const methodRes = await axios.post(
                "https://api.paymongo.com/v1/payment_methods",
                {
                    data: {
                        attributes: {
                            type: "gcash",
                            billing: {
                                name: "Test User",
                                email: "test@example.com",
                                phone: "09171234567",
                            },
                        },
                    },
                },
                {
                    auth: {
                        username: import.meta.env.VITE_PAYMONGO_PUBLIC_KEY, // Public key
                        password: "",
                    },
                }
            );
            const methodId = methodRes.data.data.id;

            // Step 3: Attach Method → get checkout URL
            const attachRes = await axios.post("/payment-attach", {
                intent_id: intentId,
                payment_method_id: methodId,
                return_url: `${window.location.origin}/payment/verify?payment_intent_id=${intentId}`,
            });

            const checkoutUrl =
                attachRes.data.data.attributes.next_action.redirect.url;

            // Step 4: Redirect to GCash
            window.location.href = checkoutUrl;
        } catch (err) {
            console.error(err);
            alert("Payment failed. Check console.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">PayMongo GCash Test</h1>
            <button
                onClick={payWithGCash}
                disabled={loading}
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                {loading ? "Processing..." : "Pay ₱100 with GCash"}
            </button>
        </div>
    );
};

export default Test;
