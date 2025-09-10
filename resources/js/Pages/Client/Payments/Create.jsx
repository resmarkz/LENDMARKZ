import React, { useState } from "react";
import { Link, useForm } from "@inertiajs/react";
import ClientDashboardLayout from "@/Layouts/ClientDashboardLayout";

const ClientPaymentCreate = ({ auth }) => {
    const currentScheduledPayment = {
        id: 999,
        loan_id: 1,
        principal_amount: 850.0,
        interest_amount: 50.0,
        total_amount: 900.0,
        due_date: "2024-05-01",
        status: "pending",
    };

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");

    const { data, setData, processing } = useForm({
        scheduled_payment_id: currentScheduledPayment.id,
        loan_id: currentScheduledPayment.loan_id,
        amount: currentScheduledPayment.total_amount,
        currency: "PHP",
        description: `Payment for installment ${currentScheduledPayment.id} of loan ${currentScheduledPayment.loan_id}`,
        payment_method_type: selectedPaymentMethod,
        billing_name: "John Doe",
        billing_email: "john.doe@example.com",
        billing_phone: "+639171234567",
    });

    const handlePaymentMethodChange = (method) => {
        setSelectedPaymentMethod(method);
        setData("payment_method_type", method);
    };

    const handleSubmitPayment = (e) => {
        e.preventDefault();

        console.log("Simulating payment intent creation with:", data);
        alert(
            `Simulating redirection for ₱${data.amount.toFixed(
                2
            )} via ${selectedPaymentMethod} to PayMongo/Payment Gateway...`
        );
    };

    const paymentMethods = [
        {
            id: "card",
            name: "Credit/Debit Card",
            icon: "fas fa-credit-card",
        },
        {
            id: "gcash",
            name: "GCash",
            icon: "fas fa-mobile-alt",
        },
        {
            id: "grabpay",
            name: "GrabPay",
            icon: "fas fa-wallet",
        },
        {
            id: "paymaya",
            name: "PayMaya",
            icon: "fas fa-credit-card",
        },
        {
            id: "qrph",
            name: "QRPH",
            icon: "fas fa-qrcode",
        },
    ];

    return (
        <ClientDashboardLayout auth={auth}>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Process Payment for Scheduled Installment
                </h1>

                <div className="mb-8 p-6 bg-indigo-50 rounded-lg shadow-inner">
                    <h2 className="text-xl font-semibold mb-4 text-indigo-800">
                        Scheduled Payment Details
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-indigo-700">
                        <div>
                            <strong>Installment ID:</strong>{" "}
                            {currentScheduledPayment.id}
                        </div>
                        <div>
                            <strong>Due Date:</strong>{" "}
                            {currentScheduledPayment.due_date}
                        </div>
                        <div>
                            <strong>Scheduled Principal:</strong> ₱
                            {currentScheduledPayment.principal_amount.toFixed(
                                2
                            )}
                        </div>
                        <div>
                            <strong>Scheduled Interest:</strong> ₱
                            {currentScheduledPayment.interest_amount.toFixed(2)}
                        </div>
                        <div>
                            <strong>Scheduled Total:</strong> ₱
                            {currentScheduledPayment.total_amount.toFixed(2)}
                        </div>
                        <div>
                            <strong>Status:</strong>{" "}
                            {currentScheduledPayment.status}
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
                                value={`₱${currentScheduledPayment.total_amount.toFixed(
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
                                        }
                                    `}
                                    ></i>
                                    <span
                                        className={`text-lg font-semibold
                                        ${
                                            selectedPaymentMethod === method.id
                                                ? "text-indigo-800"
                                                : "text-gray-700"
                                        }
                                    `}
                                    >
                                        {method.name}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-end gap-4 mt-6">
                            <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                disabled={processing}
                            >
                                {processing ? "Processing..." : "Pay Now"}
                            </button>
                            <Link
                                href={`/client/payments/${currentScheduledPayment.loan_id}`}
                                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </ClientDashboardLayout>
    );
};

export default ClientPaymentCreate;
