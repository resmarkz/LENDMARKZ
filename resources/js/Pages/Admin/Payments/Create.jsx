import React from 'react';
import { Link } from '@inertiajs/react';
import AdminDashboardLayout from '@/Layouts/AdminDashboardLayout';

const PaymentCreate = ({ auth }) => {
    return (
        <AdminDashboardLayout auth={auth}>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Create New Payment</h1>
                <form className="space-y-6">
                    <div>
                        <label htmlFor="loan_id" className="block text-sm font-medium text-gray-700 mb-1">Loan ID:</label>
                        <input
                            type="number"
                            id="loan_id"
                            name="loan_id"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter loan ID"
                        />
                    </div>
                    <div>
                        <label htmlFor="collector_profile_id" className="block text-sm font-medium text-gray-700 mb-1">Collector:</label>
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
                        <label htmlFor="client_profile_id" className="block text-sm font-medium text-gray-700 mb-1">Client:</label>
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
                        <label htmlFor="principal_amount" className="block text-sm font-medium text-gray-700 mb-1">Principal Amount:</label>
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
                        <label htmlFor="interest_amount" className="block text-sm font-medium text-gray-700 mb-1">Interest Amount:</label>
                        <input
                            type="number"
                            step="0.01"
                            id="interest_amount"
                            name="interest_amount"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter interest amount"
                        />
                    </div>
                    <div>
                        <label htmlFor="total_amount" className="block text-sm font-medium text-gray-700 mb-1">Total Amount:</label>
                        <input
                            type="number"
                            step="0.01"
                            id="total_amount"
                            name="total_amount"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter total amount"
                        />
                    </div>
                    <div>
                        <label htmlFor="due_date" className="block text-sm font-medium text-gray-700 mb-1">Due Date:</label>
                        <input
                            type="date"
                            id="due_date"
                            name="due_date"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="amount_paid" className="block text-sm font-medium text-gray-700 mb-1">Amount Paid:</label>
                        <input
                            type="number"
                            step="0.01"
                            id="amount_paid"
                            name="amount_paid"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter amount paid"
                        />
                    </div>
                    <div>
                        <label htmlFor="payment_date" className="block text-sm font-medium text-gray-700 mb-1">Payment Date:</label>
                        <input
                            type="date"
                            id="payment_date"
                            name="payment_date"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="payment_method" className="block text-sm font-medium text-gray-700 mb-1">Payment Method:</label>
                        <input
                            type="text"
                            id="payment_method"
                            name="payment_method"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter payment method"
                        />
                    </div>
                    <div>
                        <label htmlFor="reference_no" className="block text-sm font-medium text-gray-700 mb-1">Reference No.:</label>
                        <input
                            type="text"
                            id="reference_no"
                            name="reference_no"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter reference number"
                        />
                    </div>
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status:</label>
                        <select
                            id="status"
                            name="status"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="completed">Completed</option>
                            <option value="pending">Pending</option>
                            <option value="failed">Failed</option>
                            <option value="reversed">Reversed</option>
                        </select>
                    </div>
                    <div className="flex items-center justify-end gap-4 mt-6">
                        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Save Payment
                        </button>
                        <Link href="/admin/payments" className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AdminDashboardLayout>
    );
};

export default PaymentCreate;
