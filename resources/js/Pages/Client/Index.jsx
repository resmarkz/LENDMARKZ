import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import ClientDashboardLayout from "@/Layouts/ClientDashboardLayout";
import Pagination from "@/Components/Pagination";

const ClientLoanIndex = ({ loans, filters }) => {
    const [values, setValues] = useState({
        filter_status: filters?.status || "",
        filter_due_date: filters?.due_date || "",
        loan_id: filters?.loan_id || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        router.get("/client/loans", values, {
            preserveState: true,
            replace: true,
        });
    };

    const handleClear = () => {
        setValues({
            filter_status: "",
            filter_due_date: "",
            loan_id: "",
        });
        router.get("/client/loans", {}, { preserveState: true, replace: true });
    };

    return (
        <ClientDashboardLayout>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    My Loans
                </h1>

                {/* Filter Form */}
                <form
                    onSubmit={handleSubmit}
                    className="mb-6 p-4 bg-gray-50 rounded-lg shadow-inner"
                >
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">
                        Filter My Loans
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <label
                                htmlFor="loan_id"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Loan ID:
                            </label>
                            <input
                                type="text"
                                id="loan_id"
                                name="loan_id"
                                value={values.loan_id}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Filter by Loan ID"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="filter_status"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Status:
                            </label>
                            <select
                                id="filter_status"
                                name="filter_status"
                                value={values.filter_status}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="">All Statuses</option>
                                <option value="pending">Pending</option>
                                <option value="active">Active</option>
                                <option value="paid">Paid</option>
                                <option value="overdue">Overdue</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="filter_due_date"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Due Date:
                            </label>
                            <input
                                type="date"
                                id="filter_due_date"
                                name="filter_due_date"
                                value={values.filter_due_date}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-2">
                        <button
                            type="submit"
                            className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Apply Filters
                        </button>
                        <button
                            type="button"
                            onClick={handleClear}
                            className="inline-flex items-center px-5 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Clear
                        </button>
                    </div>
                </form>

                {/* Loan Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 table-auto whitespace-nowrap">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Principal Amount
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Interest Rate
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Term (Months)
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Monthly Payment
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    Total Payable
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
                            {loans.data && loans.data.length > 0 ? (
                                loans.data.map((loan) => (
                                    <tr key={loan.id}>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            {loan.id}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {loan.principal_amount}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {loan.interest_rate}%
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {loan.term_months}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {loan.monthly_payment}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {loan.total_payable}
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
                                        <td className="px-6 py-4 text-left text-sm font-medium">
                                            <Link
                                                href={`/client/loans/${loan.id}`}
                                                className="text-blue-600 hover:text-blue-900"
                                            >
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="10"
                                        className="px-6 py-4 text-center text-gray-500"
                                    >
                                        No loans found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {loans.links && loans.links.length > 0 && (
                    <div className="mt-6">
                        <Pagination links={loans.links} />
                    </div>
                )}
            </div>
        </ClientDashboardLayout>
    );
};

export default ClientLoanIndex;
