import React from 'react';
import { Link } from '@inertiajs/react';
import ClientDashboardLayout from '@/Layouts/ClientDashboardLayout';

const ClientCreateLoan = () => {
    return (
        <ClientDashboardLayout>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Apply for New Loan</h1>
                <form className="space-y-6">
                    <div>
                        <label htmlFor="marketing_id" className="block text-sm font-medium text-gray-700 mb-1">Marketing ID:</label>
                        <input
                            type="text"
                            id="marketing_id"
                            name="marketing_id"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter marketing ID (optional)"
                        />
                    </div>
                    <div>
                        <label htmlFor="principal_amount" className="block text-sm font-medium text-gray-700 mb-1">Principal Amount:</label>
                        <input
                            type="number"
                            step="0.01"
                            id="principal_amount"
                            name="principal_amount"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter desired principal amount"
                        />
                    </div>
                    <div>
                        <label htmlFor="interest_rate" className="block text-sm font-medium text-gray-700 mb-1">Interest Rate (%):</label>
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
                        <label htmlFor="term_months" className="block text-sm font-medium text-gray-700 mb-1">Term (Months):</label>
                        <input
                            type="number"
                            id="term_months"
                            name="term_months"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter desired loan term in months"
                        />
                    </div>
                    <div>
                        <label htmlFor="monthly_payment" className="block text-sm font-medium text-gray-700 mb-1">Monthly Payment:</label>
                        <input
                            type="number"
                            step="0.01"
                            id="monthly_payment"
                            name="monthly_payment"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter calculated monthly payment"
                        />
                    </div>
                    <div>
                        <label htmlFor="total_payable" className="block text-sm font-medium text-gray-700 mb-1">Total Payable:</label>
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
                        <label htmlFor="release_date" className="block text-sm font-medium text-gray-700 mb-1">Preferred Release Date:</label>
                        <input
                            type="date"
                            id="release_date"
                            name="release_date"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="due_date" className="block text-sm font-medium text-gray-700 mb-1">Preferred Due Date:</label>
                        <input
                            type="date"
                            id="due_date"
                            name="due_date"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    {/* Status will be defaulted to 'pending' by backend */}
                    <div className="flex items-center justify-end gap-4 mt-6">
                        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Submit Application
                        </button>
                        <Link href="/client/loans" className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </ClientDashboardLayout>
    );
};

export default ClientCreateLoan;
