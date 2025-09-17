import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import AdminDashboardLayout from "@/Layouts/AdminDashboardLayout";
import axios from "axios";

const PaymentCreate = ({ auth, payment }) => {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("gcash");
    const [loading, setLoading] = useState(false);

    const paymentData = {
        ...payment,
        principal_amount: parseFloat(payment.principal_amount),
        interest_amount: parseFloat(payment.interest_amount),
        total_amount: parseFloat(payment.total_amount),
        amount_paid: payment.amount_paid
            ? parseFloat(payment.amount_paid)
            : null,
    };

    const { data, setData } = useForm({
        scheduled_payment_id: paymentData.id,
        loan_id: paymentData.loan_id,
        amount: paymentData.total_amount,
        currency: "PHP",
        payment_method_type: "gcash",
    });

    const handlePaymentMethodChange = (method) => {
        setSelectedPaymentMethod(method);
        setData("payment_method_type", method);
    };

    const handleSubmitPayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const intentResponse = await axios.post("/payment-intent", {
                amount: data.amount,
                payment_method: data.payment_method_type,
            });

            const intentId = intentResponse.data.data.id;

            const methodResponse = await axios.post("/payment-method", {
                type: data.payment_method_type,
                name: `${paymentData.client_first_name} ${paymentData.client_last_name}`,
                email: paymentData.client_email,
            });

            const paymentMethodId = methodResponse.data.data.id;

            const attachResponse = await axios.post("/payment-attach", {
                intent_id: intentId,
                payment_method_id: paymentMethodId,
                payment_id: data.scheduled_payment_id,
            });

            const checkoutUrl =
                attachResponse.data.data.attributes.next_action.redirect.url;

            window.location.href = checkoutUrl;
        } catch (error) {
            console.error(
                "Payment Error:",
                error.response?.data || error.message
            );
            alert("Payment failed. Please check console.");
        } finally {
            setLoading(false);
        }
    };

    const paymentMethods = [
        { id: "gcash", name: "GCash", icon: "fas fa-mobile-alt" },
        { id: "paymaya", name: "PayMaya", icon: "fas fa-credit-card" },
    ];

    return (
        <AdminDashboardLayout auth={auth}>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Process Payment for Scheduled Installment
                </h1>

                <div className="mb-6 p-6 bg-blue-50 rounded-lg shadow-inner">
                    <h2 className="text-xl font-semibold mb-4 text-blue-800">
                        Client & Collector Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-700">
                        <div>
                            <strong>Client:</strong>{" "}
                            {paymentData.client_first_name}{" "}
                            {paymentData.client_last_name}
                        </div>
                        <div>
                            <strong>Client ID:</strong> {paymentData.client_id}
                        </div>
                        <div>
                            <strong>Collector:</strong>{" "}
                            {paymentData.collector_first_name}{" "}
                            {paymentData.collector_last_name}
                        </div>
                        <div>
                            <strong>Collector ID:</strong>{" "}
                            {paymentData.collector_id}
                        </div>
                    </div>
                </div>

                <div className="mb-8 p-6 bg-indigo-50 rounded-lg shadow-inner">
                    <h2 className="text-xl font-semibold mb-4 text-indigo-800">
                        Scheduled Payment Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-indigo-700">
                        <div>
                            <strong>Payment ID:</strong> {paymentData.id}
                        </div>
                        <div>
                            <strong>Loan ID:</strong> {paymentData.loan_id}
                        </div>
                        <div>
                            <strong>Due Date:</strong> {paymentData.due_date}
                        </div>
                        <div>
                            <strong>Status:</strong> {paymentData.status}
                        </div>
                        <div>
                            <strong>Principal Amount:</strong> ₱
                            {paymentData.principal_amount.toFixed(2)}
                        </div>
                        <div>
                            <strong>Interest Amount:</strong> ₱
                            {paymentData.interest_amount.toFixed(2)}
                        </div>
                        <div>
                            <strong>Total Amount:</strong> ₱
                            {paymentData.total_amount.toFixed(2)}
                        </div>
                        <div>
                            <strong>Amount Paid:</strong>{" "}
                            {paymentData.amount_paid
                                ? `₱${paymentData.amount_paid.toFixed(2)}`
                                : "Not paid yet"}
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-gray-50 rounded-lg shadow-inner">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">
                        Select Payment Method
                    </h2>
                    <form onSubmit={handleSubmitPayment} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Amount to Pay:
                            </label>
                            <input
                                type="text"
                                value={`₱${paymentData.total_amount.toFixed(
                                    2
                                )}`}
                                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed sm:text-sm"
                                readOnly
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            {paymentMethods.map((method) => (
                                <div
                                    key={method.id}
                                    className={`flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all duration-200
                                        ${
                                            selectedPaymentMethod === method.id
                                                ? "border-indigo-600 bg-indigo-100 shadow-md"
                                                : "border-gray-300 bg-white hover:border-indigo-400 hover:shadow-sm"
                                        }`}
                                    onClick={() =>
                                        handlePaymentMethodChange(method.id)
                                    }
                                >
                                    <i
                                        className={`${method.icon} text-5xl mb-3
                                        ${
                                            selectedPaymentMethod === method.id
                                                ? "text-indigo-600"
                                                : "text-gray-500"
                                        }`}
                                    ></i>
                                    <span
                                        className={`text-lg font-semibold
                                        ${
                                            selectedPaymentMethod === method.id
                                                ? "text-indigo-800"
                                                : "text-gray-700"
                                        }`}
                                    >
                                        {method.name}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-end gap-4 mt-6">
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white 
                                    bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                disabled={loading}
                            >
                                {loading && (
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                        ></path>
                                    </svg>
                                )}
                                {loading ? "Processing..." : "Pay Now"}
                            </button>

                            <Link
                                href={`/admin/payments/${paymentData.loan_id}`}
                                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default PaymentCreate;
