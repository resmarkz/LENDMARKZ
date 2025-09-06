import React from 'react';
import { Link } from '@inertiajs/react';
import ClientDashboardLayout from '@/Layouts/ClientDashboardLayout';

const PayLoan = () => {
    // Placeholder for loan data, in a real app this would come from props/backend
    const loan = { id: 1, marketing_id: 'MKT001', principal_amount: 10000.00 };

    return (
        <ClientDashboardLayout>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Record Payment for Loan: {loan.marketing_id}</h1>
                <form className="space-y-6">
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
                            placeholder="Enter payment method (e.g., Cash, Gcash, Bank Transfer)"
                        />
                    </div>
                    <div>
                        <label htmlFor="reference_no" className="block text-sm font-medium text-gray-700 mb-1">Reference No. (Optional):</label>
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
                            Record Payment
                        </button>
                        <Link href={`/client/loans/${loan.id}`} className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </ClientDashboardLayout>
    );
};

export default PayLoan;
