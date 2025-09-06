import React from 'react';
import { Link } from '@inertiajs/react';
import AdminDashboardLayout from '@/Layouts/AdminDashboardLayout';

const PaymentIndex = () => {
    const payments = [
        {
            id: 1,
            loan_id: 1,
            collector_profile_id: 1,
            client_profile_id: 1,
            amount_paid: 860.62,
            payment_date: '2024-02-01',
            payment_method: 'Gcash',
            reference_no: 'REF001',
            status: 'completed',
        },
        {
            id: 2,
            loan_id: 2,
            collector_profile_id: 2,
            client_profile_id: 2,
            amount_paid: 886.41,
            payment_date: '2024-03-01',
            payment_method: 'Bank Transfer',
            reference_no: 'REF002',
            status: 'completed',
        },
    ];

    return (
        <AdminDashboardLayout>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Payments</h1>
                <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-inner">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Filter Payments</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label htmlFor="filter_loan_id" className="block text-sm font-medium text-gray-700">Loan ID:</label>
                            <input
                                type="number"
                                id="filter_loan_id"
                                name="filter_loan_id"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Filter by Loan ID"
                            />
                        </div>
                        <div>
                            <label htmlFor="filter_payment_method" className="block text-sm font-medium text-gray-700">Payment Method:</label>
                            <input
                                type="text"
                                id="filter_payment_method"
                                name="filter_payment_method"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                placeholder="Filter by Payment Method"
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
                                <option value="completed">Completed</option>
                                <option value="pending">Pending</option>
                                <option value="failed">Failed</option>
                                <option value="reversed">Reversed</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="filter_payment_date" className="block text-sm font-medium text-gray-700">Payment Date:</label>
                            <input
                                type="date"
                                id="filter_payment_date"
                                name="filter_payment_date"
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
                        href="/admin/payments/create"
                        className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Create New Payment
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loan ID</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Collector ID</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client ID</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount Paid</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference No.</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {payments.map((payment) => (
                                <tr key={payment.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.loan_id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.collector_profile_id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.client_profile_id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.amount_paid}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.payment_date}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.payment_method}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.reference_no}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.status}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                                        <Link href={`/admin/payments/${payment.id}`} className="text-blue-600 hover:text-blue-900 mr-4">View</Link>
                                        <Link href={`/admin/payments/${payment.id}/edit`} className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</Link>
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

export default PaymentIndex;
