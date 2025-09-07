import React from "react";
import { Link } from "@inertiajs/react";
import AdminDashboardLayout from "@/Layouts/AdminDashboardLayout";

const LoanCreate = ({ auth }) => {
    const { auth } = usePage().props;
    return (
        <AdminDashboardLayout auth={auth}>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Create New Loan
                </h1>
                <form className="space-y-6">
                    <div>
                        <label
                            htmlFor="marketing_id"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Marketing ID:
                        </label>
                        <input
                            type="text"
                            id="marketing_id"
                            name="marketing_id"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter marketing ID"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="collector_profile_id"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Collector:
                        </label>
                        <select
                            id="collector_profile_id"
                            name="collector_profile_id"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select Collector</option>
                            <option value="1">Collector 1 (John Doe)</option>
                            <option value="2">Collector 2 (Jane Smith)</option>
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="client_profile_id"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Client:
                        </label>
                        <select
                            id="client_profile_id"
                            name="client_profile_id"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="">Select Client</option>
                            <option value="1">Client 1 (Alice Brown)</option>
                            <option value="2">Client 2 (Bob White)</option>
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="principal_amount"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Principal Amount:
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            id="principal_amount"
                            name="principal_amount"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter principal amount"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="interest_rate"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Interest Rate (%):
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            id="interest_rate"
                            name="interest_rate"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter interest rate"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="term_months"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Term (Months):
                        </label>
                        <input
                            type="number"
                            id="term_months"
                            name="term_months"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter loan term in months"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="monthly_payment"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Monthly Payment:
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            id="monthly_payment"
                            name="monthly_payment"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter monthly payment"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="total_payable"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Total Payable:
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            id="total_payable"
                            name="total_payable"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter total payable amount"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="release_date"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Release Date:
                        </label>
                        <input
                            type="date"
                            id="release_date"
                            name="release_date"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="due_date"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Due Date:
                        </label>
                        <input
                            type="date"
                            id="due_date"
                            name="due_date"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="status"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Status:
                        </label>
                        <select
                            id="status"
                            name="status"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="pending">Pending</option>
                            <option value="active">Active</option>
                            <option value="paid">Paid</option>
                            <option value="overdue">Overdue</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-end gap-4 mt-6">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Save Loan
                        </button>
                        <Link
                            href="/admin/loans"
                            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AdminDashboardLayout>
    );
};

export default LoanCreate;
