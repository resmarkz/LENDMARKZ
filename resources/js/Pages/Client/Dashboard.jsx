import React from "react";
import { Head, Link } from "@inertiajs/react";
import ClientDashboardLayout from "@/Layouts/ClientDashboardLayout";

const ClientDashboard = ({
    loanAmount = 60000,
    amountPaid = 15000,
    nextOverdue = "2025-10-17",
}) => {
    return (
        <ClientDashboardLayout>
            <Head title="Client Dashboard" />
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Welcome, Client!
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium opacity-80">
                                Loan Amount
                            </p>
                            <p className="text-3xl font-bold">
                                ₱{loanAmount.toLocaleString()}
                            </p>
                        </div>
                        <i className="fas fa-coins text-4xl opacity-50"></i>
                    </div>

                    <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium opacity-80">
                                Amount Paid
                            </p>
                            <p className="text-3xl font-bold">
                                ₱{amountPaid.toLocaleString()}
                            </p>
                        </div>
                        <i className="fas fa-hand-holding-usd text-4xl opacity-50"></i>
                    </div>

                    <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium opacity-80">
                                Next Overdue Date
                            </p>
                            <p className="text-xl font-bold">
                                {
                                    new Date(nextOverdue)
                                        .toISOString()
                                        .split("T")[0]
                                }
                            </p>
                        </div>
                        <i className="fas fa-calendar-alt text-4xl opacity-50"></i>
                    </div>
                </div>

                <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200 text-gray-700">
                    <h2 className="text-xl font-semibold mb-4">
                        Quick Actions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link
                            href="/client/loans/create-loan"
                            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <i className="fas fa-plus-circle mr-2"></i> Apply
                            for a New Loan
                        </Link>
                        <Link
                            href="/client/loans"
                            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <i className="fas fa-list-alt mr-2"></i> View My
                            Loans
                        </Link>
                    </div>
                </div>
            </div>
        </ClientDashboardLayout>
    );
};

export default ClientDashboard;
