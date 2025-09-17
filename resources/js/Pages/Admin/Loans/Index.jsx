import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import AdminDashboardLayout from "@/Layouts/AdminDashboardLayout";
import formatCurrency from "@/utils/formatCurrency";
import Pagination from "@/Components/Pagination";

const LoanIndex = ({ auth, loans, filters, collectors }) => {
    const [values, setValues] = useState({
        search: filters.search || "",
        status: filters.status || "",
        collector_id: filters.collector_id || "",
        start_date: filters.start_date || "",
        end_date: filters.end_date || "",
        min_principal: filters.min_principal || "",
        max_principal: filters.max_principal || "",
        min_interest: filters.min_interest || "",
        max_interest: filters.max_interest || "",
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
        router.get("/admin/loans", values, {
            preserveState: true,
            replace: true,
        });
    };

    const handleClear = () => {
        setValues({
            search: "",
            status: "",
            collector_id: "",
            start_date: "",
            end_date: "",
            min_principal: "",
            max_principal: "",
            min_interest: "",
            max_interest: "",
        });
        router.get("/admin/loans", {}, {
            preserveState: true,
            replace: true,
        });
    };

    return (
        <AdminDashboardLayout auth={auth}>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Manage Loans
                    </h1>
                    <Link
                        href="/admin/loans/create"
                        className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Create New Loan
                    </Link>
                </div>

                {/* Filter Form */}
                <form
                    onSubmit={handleSubmit}
                    className="mb-6 p-4 bg-gray-50 rounded-lg"
                >
                    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {/* Search */}
                        <div className="md:col-span-2 lg:col-span-3">
                            <label
                                htmlFor="search"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Client Name
                            </label>
                            <input
                                type="text"
                                name="search"
                                id="search"
                                value={values.search}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Search by client name..."
                            />
                        </div>

                        {/* Status */}
                        <div>
                            <label
                                htmlFor="status"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Status
                            </label>
                            <select
                                name="status"
                                id="status"
                                value={values.status}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">All</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="active">Active</option>
                                <option value="paid">Paid</option>
                                <option value="defaulted">Defaulted</option>
                            </select>
                        </div>

                        {/* Collector */}
                        <div>
                            <label
                                htmlFor="collector_id"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Collector
                            </label>
                            <select
                                name="collector_id"
                                id="collector_id"
                                value={values.collector_id}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            >
                                <option value="">All</option>
                                {collectors.map((collector) => (
                                    <option key={collector.id} value={collector.id}>
                                        {collector.first_name} {collector.last_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Release Date Range */}
                        <div className="col-span-1">
                            <label
                                htmlFor="start_date"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Release Date From
                            </label>
                            <input
                                type="date"
                                name="start_date"
                                id="start_date"
                                value={values.start_date}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="col-span-1">
                            <label
                                htmlFor="end_date"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Release Date To
                            </label>
                            <input
                                type="date"
                                name="end_date"
                                id="end_date"
                                value={values.end_date}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        {/* Principal Amount Range */}
                        <div className="col-span-1">
                            <label
                                htmlFor="min_principal"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Min Principal
                            </label>
                            <input
                                type="number"
                                name="min_principal"
                                id="min_principal"
                                value={values.min_principal}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="e.g., 1000"
                            />
                        </div>
                        <div className="col-span-1">
                            <label
                                htmlFor="max_principal"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Max Principal
                            </label>
                            <input
                                type="number"
                                name="max_principal"
                                id="max_principal"
                                value={values.max_principal}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="e.g., 5000"
                            />
                        </div>

                        {/* Interest Rate Range */}
                        <div className="col-span-1">
                            <label
                                htmlFor="min_interest"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Min Interest (%)
                            </label>
                            <input
                                type="number"
                                name="min_interest"
                                id="min_interest"
                                value={values.min_interest}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="e.g., 1"
                            />
                        </div>
                        <div className="col-span-1">
                            <label
                                htmlFor="max_interest"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Max Interest (%)
                            </label>
                            <input
                                type="number"
                                name="max_interest"
                                id="max_interest"
                                value={values.max_interest}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="e.g., 5"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="col-span-full flex items-end justify-end space-x-2">
                            <button
                                type="submit"
                                className="inline-flex justify-center items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                Filter
                            </button>
                            <button
                                type="button"
                                onClick={handleClear}
                                className="inline-flex justify-center items-center px-6 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </form>

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
                            {loans.data.length > 0 ? (
                                loans.data.map((loan) => (
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
                                                method="POST"
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

                <div className="mt-6">
                    <Pagination links={loans.links} />
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default LoanIndex;
