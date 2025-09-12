import React from "react";
import { Link } from "@inertiajs/react";
import AdminDashboardLayout from "@/Layouts/AdminDashboardLayout";
import formatCurrency from "@/utils/formatCurrency";

const LoanIndex = ({ auth, loans }) => {
    return (
        <AdminDashboardLayout auth={auth}>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Manage Loans
                </h1>

                {/* Create New Loan */}
                <div className="mb-6">
                    <Link
                        href="/admin/loans/create"
                        className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Create New Loan
                    </Link>
                </div>

                {/* Loan Table */}
                <div className="overflow-x-auto">
                    <table className="table-auto w-full divide-y divide-gray-200 whitespace-nowrap">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    ID
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
                                    Term
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Monthly
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Total Payable
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Remaining
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Release Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Due Date
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
                            {loans.length > 0 ? (
                                loans.map((loan) => (
                                    <tr key={loan.id}>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            {loan.id}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {loan.client_profile?.user
                                                ? `${loan.client_profile.user.first_name} ${loan.client_profile.user.last_name}`
                                                : "N/A"}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {loan.collector_profile?.user
                                                ? `${loan.collector_profile.user.first_name} ${loan.collector_profile.user.last_name}`
                                                : "N/A"}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {formatCurrency(
                                                loan.principal_amount
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {loan.interest_rate}%
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {loan.term_months}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {formatCurrency(
                                                loan.monthly_payment
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {formatCurrency(loan.total_payable)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {formatCurrency(
                                                loan.remaining_balance
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {loan.release_date ?? "-"}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {loan.due_date ?? "-"}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {loan.status}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium">
                                            <Link
                                                href={`/admin/loans/${loan.id}`}
                                                className="text-blue-600 hover:text-blue-900 mr-4"
                                            >
                                                View
                                            </Link>
                                            <Link
                                                href={`/admin/loans/${loan.id}/edit`}
                                                className="text-indigo-600 hover:text-indigo-900 mr-4"
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                href={`/admin/loans/${loan.id}/delete`}
                                                className="text-red-600 hover:text-red-900"
                                                as="button"
                                                method="DELETE"
                                            >
                                                Delete
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="13"
                                        className="px-6 py-4 text-center text-sm text-gray-500"
                                    >
                                        No loans found.
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

export default LoanIndex;
