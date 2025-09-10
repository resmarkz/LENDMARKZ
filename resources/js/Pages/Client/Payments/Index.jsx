import React from "react";
import { Link } from "@inertiajs/react";
import ClientDashboardLayout from "@/Layouts/ClientDashboardLayout";

const ClientPaymentIndex = ({ auth }) => {
    const currentLoan = {
        id: 1,
        marketing_id: "LNDMK-001",
        principal_amount: 10000.0,
        interest_rate: 0.05,
        loan_term_months: 12,
        start_date: "2024-01-01",
    };

    const currentPayments = [
        {
            id: 1,
            loan_id: 1,
            principal_amount: 816.67,
            interest_amount: 41.67,
            total_amount: 858.34,
            amount_paid: 858.34,
            due_date: "2024-02-01",
            payment_date: "2024-01-30",
            payment_method: "Gcash",
            reference_no: "GCASH123",
            is_paid: true,
            status: "completed",
        },
        {
            id: 2,
            loan_id: 1,
            principal_amount: 820.08,
            interest_amount: 38.26,
            total_amount: 858.34,
            amount_paid: null,
            due_date: "2024-03-01",
            payment_date: null,
            payment_method: null,
            reference_no: null,
            is_paid: false,
            status: "pending",
        },
        {
            id: 3,
            loan_id: 1,
            principal_amount: 823.5,
            interest_amount: 34.84,
            total_amount: 858.34,
            amount_paid: null,
            due_date: "2024-04-01",
            payment_date: null,
            payment_method: null,
            reference_no: null,
            is_paid: false,
            status: "pending",
        },
    ];

    const actualPayments = currentPayments.filter(
        (p) => p.amount_paid !== null
    );

    const handlePayClick = (payment) => {
        window.location.href = `/client/payments/create`;
    };

    return (
        <ClientDashboardLayout auth={auth}>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Loan Payment Details: {currentLoan.marketing_id}
                </h1>

                <div className="mb-8 p-6 bg-indigo-50 rounded-lg shadow-inner">
                    <h2 className="text-xl font-semibold mb-4 text-indigo-800">
                        Loan Overview
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-indigo-700">
                        <div>
                            <strong>Principal Amount:</strong> ₱
                            {currentLoan.principal_amount.toFixed(2)}
                        </div>
                        <div>
                            <strong>Interest Rate:</strong>{" "}
                            {(currentLoan.interest_rate * 100).toFixed(2)}%
                        </div>
                        <div>
                            <strong>Loan Term:</strong>{" "}
                            {currentLoan.loan_term_months} months
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">
                        Scheduled Payments
                    </h2>
                    <div className="overflow-x-auto shadow-md rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        #
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Due Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Scheduled Principal
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Scheduled Interest
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Scheduled Total
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {currentPayments.map((item) => (
                                    <tr
                                        key={item.id}
                                        className={
                                            item.is_paid ? "bg-green-50" : ""
                                        }
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {item.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {item.due_date}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            ₱{item.principal_amount.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            ₱{item.interest_amount.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            ₱{item.total_amount.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {item.status}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                                            {!item.is_paid && (
                                                <button
                                                    onClick={() =>
                                                        handlePayClick(item)
                                                    }
                                                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                >
                                                    Pay
                                                </button>
                                            )}
                                            {item.is_paid && (
                                                <span className="text-green-600">
                                                    Paid
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">
                        Payment History (Actual Payments)
                    </h2>
                    <div className="overflow-x-auto shadow-md rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Payment ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Amount Paid
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Payment Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Method
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Reference No.
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {actualPayments && actualPayments.length > 0 ? (
                                    actualPayments.map((payment) => (
                                        <tr key={payment.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {payment.id}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                ₱
                                                {payment.amount_paid.toFixed(2)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {payment.payment_date}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {payment.payment_method}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {payment.reference_no}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {payment.status}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="px-6 py-4 text-center text-sm text-gray-500"
                                        >
                                            No actual payments recorded yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </ClientDashboardLayout>
    );
};

export default ClientPaymentIndex;
