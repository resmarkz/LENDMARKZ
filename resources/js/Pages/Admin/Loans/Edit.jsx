import React, { useEffect } from "react";
import { Link, useForm } from "@inertiajs/react";
import AdminDashboardLayout from "@/Layouts/AdminDashboardLayout";
import errorHandler from "@/utils/errorHandler";

const LoanEdit = ({ ...props }) => {
    const { auth, collectors, clients, loan } = props;

    const { data, setData, post, processing, errors } = useForm({
        collector_id: loan.collector_id,
        client_id: loan.client_id,
        principal_amount: loan.principal_amount,
        interest_rate: loan.interest_rate,
        term_months: loan.term_months,
        status: loan.status,
    });

    useEffect(() => {
        errorHandler(errors);
    }, [errors]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/admin/loans/${loan.id}/edit`);
    };

    return (
        <AdminDashboardLayout auth={auth}>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Edit Loan
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="collector_id"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Collector:
                        </label>
                        <select
                            id="collector_id"
                            name="collector_id"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={data.collector_id}
                            onChange={(e) =>
                                setData("collector_id", e.target.value)
                            }
                        >
                            <option value="">-- Select Collector --</option>
                            {collectors.map((collector) => (
                                <option key={collector.id} value={collector.id}>
                                    {collector.first_name} {collector.last_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="client_id"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Client:
                        </label>
                        <select
                            id="client_id"
                            name="client_id"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={data.client_id}
                            onChange={(e) =>
                                setData("client_id", e.target.value)
                            }
                        >
                            <option value="">-- Select Collector --</option>
                            {clients.map((client) => (
                                <option key={client.id} value={client.id}>
                                    {client.first_name} {client.last_name}
                                </option>
                            ))}
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
                            defaultValue={loan.principal_amount}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="interest_rate"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Interest Rate (%):
                        </label>
                        <select
                            id="interest_rate"
                            name="interest_rate"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={data.interest_rate}
                            onChange={(e) =>
                                setData("interest_rate", e.target.value)
                            }
                        >
                            <option value="">-- Select Interest Rate --</option>
                            <option value="12.00">12%</option>
                            <option value="15.00">15%</option>
                            <option value="20.00">20%</option>
                            <option value="25.00">25%</option>
                            <option value="30.00">30%</option>
                            <option value="35.00">35%</option>
                            <option value="40.00">40%</option>
                        </select>
                    </div>
                    <div>
                        <label
                            htmlFor="term_months"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Term (Months):
                        </label>
                        <select
                            id="term_months"
                            name="term_months"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={data.term_months}
                            onChange={(e) =>
                                setData("term_months", e.target.value)
                            }
                        >
                            <option value="">-- Select Term --</option>
                            <option value="6">6 months</option>
                            <option value="12">12 months</option>
                            <option value="18">18 months</option>
                            <option value="24">24 months</option>
                            <option value="36">36 months</option>
                            <option value="48">48 months</option>
                        </select>
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
                            defaultValue={loan.monthly_payment}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            readOnly
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
                            defaultValue={loan.total_payable}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            readOnly
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
                            defaultValue={loan.due_date}
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
                            defaultValue={loan.status}
                            onChange={(e) => setData("status", e.target.value)}
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
                            disabled={processing}
                        >
                            Save Changes
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

export default LoanEdit;
