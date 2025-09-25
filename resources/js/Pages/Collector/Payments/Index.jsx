import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import CollectorDashboardLayout from "@/Layouts/CollectorDashboardLayout";
import Pagination from "@/Components/Pagination";
import formatCurrency from "@/Utils/formatCurrency";
import formatDate from "@/Utils/formatDate";

const CollectorPaymentIndex = ({ auth, payments, clients, filters = {} }) => {
    const [clientId, setClientId] = useState(filters.client_id || "");
    const [status, setStatus] = useState(filters.status || "");
    const [dueDate, setDueDate] = useState(filters.due_date || "");

    const paymentList = Array.isArray(payments)
        ? payments
        : payments?.data ?? [];
    const clientList = Array.isArray(clients)
        ? clients
        : clients?.data ?? clients ?? [];

    const handleFilter = (e) => {
        e.preventDefault();
        router.get(
            "/collector/payments",
            {
                client_id: clientId,
                status,
                due_date: dueDate,
            },
            { preserveState: true }
        );
    };

    const handleClear = () => {
        setClientId("");
        setStatus("");
        setDueDate("");
        router.get("/collector/payments", {}, { preserveState: true });
    };

    const actualPayments = paymentList.filter((p) => p.amount_paid !== null);

    return (
        <CollectorDashboardLayout auth={auth}>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Payments You Manage
                </h1>

                <form
                    onSubmit={handleFilter}
                    className="mb-6 p-4 bg-gray-50 rounded-lg shadow-inner flex flex-wrap gap-4 items-end"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Client
                        </label>
                        <select
                            value={clientId}
                            onChange={(e) => setClientId(e.target.value)}
                            className="border rounded px-3 py-2 text-sm"
                        >
                            <option value="">All Clients</option>
                            {clientList.map((client) => (
                                <option key={client.id} value={client.id}>
                                    {client.first_name} {client.last_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="border rounded px-3 py-2 text-sm"
                        >
                            <option value="">All</option>
                            <option value="pending">Pending</option>
                            <option value="paid">Paid</option>
                            <option value="overdue">Overdue</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Due Date
                        </label>
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="border rounded px-3 py-2 text-sm"
                        />
                    </div>

                    <div className="flex gap-2">
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white px-4 py-2 rounded text-sm hover:bg-indigo-700"
                        >
                            Apply
                        </button>
                        <button
                            type="button"
                            onClick={handleClear}
                            className="bg-gray-300 px-4 py-2 rounded text-sm hover:bg-gray-400"
                        >
                            Clear
                        </button>
                    </div>
                </form>

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
                                        Client
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Loan ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Due Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Principal
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Interest
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Total
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {paymentList.length > 0 ? (
                                    paymentList.map((item) => (
                                        <tr
                                            key={item.id}
                                            className={
                                                item.is_paid
                                                    ? "bg-green-50"
                                                    : ""
                                            }
                                        >
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                {item.id}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {item.loan.client_profile.user
                                                    .first_name +
                                                    " " +
                                                    item.loan.client_profile
                                                        .user.last_name}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {item.loan_id}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {formatDate(item.due_date)}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {formatCurrency(
                                                    item.principal_amount
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {formatCurrency(
                                                    item.interest_amount
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {formatCurrency(
                                                    item.total_amount
                                                )}
                                            </td>
                                            <td
                                                className={`px-6 py-4 text-sm ${
                                                    item.status == "paid"
                                                        ? "text-green-500 font-semibold"
                                                        : "text-gray-500"
                                                }`}
                                            >
                                                {item.status.toUpperCase()}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="9"
                                            className="px-6 py-4 text-center text-sm text-gray-500"
                                        >
                                            No scheduled payments found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    <div className="mt-6">
                        <Pagination links={payments.links} />
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
                                        Client
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
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {actualPayments.length > 0 ? (
                                    actualPayments.map((payment) => (
                                        <tr key={payment.id}>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                {payment.id}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                {payment.loan.client_profile
                                                    .user.first_name +
                                                    " " +
                                                    payment.loan.client_profile
                                                        .user.last_name}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {formatCurrency(
                                                    payment.amount_paid
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {payment.payment_date
                                                    ? formatDate(
                                                          payment.payment_date
                                                      )
                                                    : "-"}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {payment.payment_method || "-"}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {payment.reference_no || "-"}
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
        </CollectorDashboardLayout>
    );
};

export default CollectorPaymentIndex;
