import React from "react";
import { Head, usePage } from "@inertiajs/react";
import AdminDashboardLayout from "@/Layouts/AdminDashboardLayout";

const Dashboard = ({ auth }) => {
    return (
        <AdminDashboardLayout auth={auth}>
            <Head title="Admin Dashboard" />
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">
                    Admin Dashboard
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {/* Summary Card 1 */}
                    <div className="bg-indigo-500 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium opacity-80">
                                Total Loans
                            </p>
                            <p className="text-3xl font-bold">1,250</p>
                        </div>
                        <i className="fas fa-hand-holding-usd text-4xl opacity-50"></i>
                    </div>

                    {/* Summary Card 2 */}
                    <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium opacity-80">
                                Total Payments
                            </p>
                            <p className="text-3xl font-bold">8,500</p>
                        </div>
                        <i className="fas fa-money-bill-wave text-4xl opacity-50"></i>
                    </div>

                    {/* Summary Card 3 */}
                    <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium opacity-80">
                                Active Clients
                            </p>
                            <p className="text-3xl font-bold">780</p>
                        </div>
                        <i className="fas fa-user-friends text-4xl opacity-50"></i>
                    </div>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default Dashboard;
