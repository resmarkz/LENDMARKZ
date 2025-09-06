import React from "react";
import { Head, Link } from "@inertiajs/react";
import ClientDashboardLayout from "@/Layouts/ClientDashboardLayout";

const ClientDashboard = () => {
    return (
        <ClientDashboardLayout>
            <Head title="Client Dashboard" />
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome, Client!</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {/* Summary Card 1: Total Loans */}
                    <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium opacity-80">My Active Loans</p>
                            <p className="text-3xl font-bold">2</p>
                        </div>
                        <i className="fas fa-hand-holding-usd text-4xl opacity-50"></i>
                    </div>

                    {/* Summary Card 2: Total Payments Made */}
                    <div className="bg-purple-500 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium opacity-80">Total Payments Made</p>
                            <p className="text-3xl font-bold">$1,500.00</p>
                        </div>
                        <i className="fas fa-money-bill-wave text-4xl opacity-50"></i>
                    </div>

                    {/* Summary Card 3: Next Payment Due */}
                    <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium opacity-80">Next Payment Due</p>
                            <p className="text-xl font-bold">$250.00 (2025-10-01)</p>
                        </div>
                        <i className="fas fa-calendar-alt text-4xl opacity-50"></i>
                    </div>
                </div>

                <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200 text-gray-700">
                    <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Link href="/client/loans/create-loan" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <i className="fas fa-plus-circle mr-2"></i> Apply for a New Loan
                        </Link>
                        <Link href="/client/loans" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <i className="fas fa-list-alt mr-2"></i> View My Loans
                        </Link>
                    </div>
                </div>
            </div>
        </ClientDashboardLayout>
    );
};

export default ClientDashboard;
