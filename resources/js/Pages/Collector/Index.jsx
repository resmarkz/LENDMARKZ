import React from 'react';
import { Link } from '@inertiajs/react';
import CollectorDashboardLayout from '@/Layouts/CollectorDashboardLayout';

const CollectorLoanIndex = () => {
    const loans = [
        {
            id: 1,
            marketing_id: 'MKT001',
            client_profile_id: 1,
            principal_amount: 10000.00,
            monthly_payment: 860.62,
            due_date: '2025-01-01',
            status: 'active',
        },
        {
            id: 2,
            marketing_id: 'MKT003',
            client_profile_id: 3,
            principal_amount: 5000.00,
            monthly_payment: 450.00,
            due_date: '2024-12-01',
            status: 'overdue',
        },
    ];

    return (
        <CollectorDashboardLayout>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Assigned Loans</h1>
                <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-inner">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Filter Assigned Loans</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="filter_marketing_id" className="block text-sm font-medium text-gray-700">Marketing ID:</label>
                            <input
                                type="text"
                                id="filter_marketing_id"
                                name="filter_marketing_id"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Filter by Marketing ID"
                            />
                        </div>
                        <div>
                            <label htmlFor="filter_status" className="block text-sm font-medium text-gray-700">Status:</label>
                            <select
                                id="filter_status"
                                name="filter_status"
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
                            <label htmlFor="filter_due_date" className="block text-sm font-medium text-gray-700">Due Date:</label>
                            <input
                                type="date"
                                id="filter_due_date"
                                name="filter_due_date"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div className="mt-6 text-right">
                        <button
                            type="button"
                            className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marketing ID</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client ID</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Principal Amount</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Payment</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loans.map((loan) => (
                                <tr key={loan.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{loan.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.marketing_id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.client_profile_id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.principal_amount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.monthly_payment}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.due_date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.status}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                                        <Link href={`/collector/loans/${loan.id}`} className="text-blue-600 hover:text-blue-900 mr-4">View</Link>
                                        <Link href={`/collector/loans/${loan.id}/record-payment`} className="text-green-600 hover:text-green-900">Record Payment</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </CollectorDashboardLayout>
    );
};

export default CollectorLoanIndex;
