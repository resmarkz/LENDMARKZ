import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import AdminDashboardLayout from "@/Layouts/AdminDashboardLayout";
import formatCurrency from "@/utils/formatCurrency";

const PaymentIndex = ({ auth, payments = [], filters = {} }) => {
    const [values, setValues] = useState({
        search: filters.search || "",
        status: filters.status || "",
        start_date: filters.start_date || "",
        end_date: filters.end_date || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.get("/admin/payments", values, {
            preserveState: true,
            replace: true,
        });
    };

    const handleClear = () => {
        setValues({ search: "", status: "", start_date: "", end_date: "" });
        router.get(
            "/admin/payments",
            {},
            { preserveState: true, replace: true }
        );
    };

    return (
        <AdminDashboardLayout auth={auth}>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Manage Payments
                    </h1>
                    <Link
                        href="/admin/payments/create"
                        className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        Create New Payment
                    </Link>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="mb-6 p-4 bg-gray-50 rounded-lg"
                >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Search
                            </label>
                            <input
                                type="text"
                                name="search"
                                value={values.search}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                                placeholder="Search by client or collector..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
                            <select
                                name="status"
                                value={values.status}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            >
                                <option value="">All</option>
                                <option value="completed">Completed</option>
                                <option value="pending">Pending</option>
                                <option value="failed">Failed</option>
                            </select>
                        </div>
                        <div className="flex items-end space-x-2">
                            <button
                                type="submit"
                                className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700"
                            >
                                Filter
                            </button>
                            <button
                                type="button"
                                onClick={handleClear}
                                className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                            >
                                Clear
                            </button>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Payment Date From
                            </label>
                            <input
                                type="date"
                                name="start_date"
                                value={values.start_date}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Payment Date To
                            </label>
                            <input
                                type="date"
                                name="end_date"
                                value={values.end_date}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                    </div>
                </form>

                <div className="overflow-x-auto">
                    <table className="table-auto w-full divide-y divide-gray-200 whitespace-nowrap">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Loan ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Client
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Collector
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Principal
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Interest
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Total Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Amount Paid
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Due Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Payment Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {payments.length > 0 ? (
                                payments.map((payment) => (
                                    <tr key={payment.id}>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            {payment.id}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {payment.loan_id}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {payment.client_first_name}{" "}
                                            {payment.client_last_name}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {payment.collector_first_name}{" "}
                                            {payment.collector_last_name}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {formatCurrency(
                                                payment.principal_amount
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {formatCurrency(
                                                payment.interest_amount
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {formatCurrency(
                                                payment.total_amount
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {payment.amount_paid
                                                ? formatCurrency(
                                                      payment.amount_paid
                                                  )
                                                : "—"}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {payment.due_date}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {payment.payment_date || "—"}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {payment.status}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium">
                                            {payment.is_paid ? (
                                                <span className="text-green-600 font-semibold">
                                                    Paid
                                                </span>
                                            ) : (
                                                <button
                                                    onClick={() =>
                                                        router.post(
                                                            `/admin/payments/${payment.id}/pay`
                                                        )
                                                    }
                                                    className="px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700"
                                                >
                                                    Pay
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="12"
                                        className="px-6 py-4 text-center text-sm text-gray-500"
                                    >
                                        No payments found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default PaymentIndex;
