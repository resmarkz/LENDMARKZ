import React from 'react';
import { Link } from '@inertiajs/react';
import AdminDashboardLayout from '@/Layouts/AdminDashboardLayout';

const LoanIndex = ({ auth }) => {
    const loans = [
        {
            id: 1,
            
            collector_profile_id: 1,
            client_profile_id: 1,
            principal_amount: 10000.00,
            interest_rate: 5.25,
            term_months: 12,
            monthly_payment: 860.62,
            total_payable: 10327.44,
            release_date: '2024-01-01',
            due_date: '2025-01-01',
            status: 'active',
        },
        {
            id: 2,
            
            collector_profile_id: 2,
            client_profile_id: 2,
            principal_amount: 20000.00,
            interest_rate: 6.00,
            term_months: 24,
            monthly_payment: 886.41,
            total_payable: 21273.84,
            release_date: '2024-02-15',
            due_date: '2026-02-15',
            status: 'pending',
        },
    ];

    return (
        <AdminDashboardLayout auth={auth}>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Loans</h1>
                <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-inner">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Filter Loans</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        
                        
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
                            <label htmlFor="filter_release_date" className="block text-sm font-medium text-gray-700">Release Date:</label>
                            <input
                                type="date"
                                id="filter_release_date"
                                name="filter_release_date"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
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
                <div className="mb-6">
                    <Link
                        href="/admin/loans/create"
                        className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Create New Loan
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Principal Amount</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest Rate</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Term (Months)</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Monthly Payment</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Payable</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Release Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loans.map((loan) => (
                                <tr key={loan.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{loan.id}</td>
                                    
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.principal_amount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.interest_rate}%</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.term_months}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.monthly_payment}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.total_payable}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.release_date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.due_date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{loan.status}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                                        <Link href={`/admin/loans/${loan.id}`} className="text-blue-600 hover:text-blue-900 mr-4">View</Link>
                                        <Link href={`/admin/loans/${loan.id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</Link>
                                        <button className="text-red-600 hover:text-red-900">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default LoanIndex;
