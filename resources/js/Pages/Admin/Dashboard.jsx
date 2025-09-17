import React from "react";
import AdminDashboardLayout from "@/Layouts/AdminDashboardLayout";
import formatCurrency from "@/utils/formatCurrency";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = ({
    auth,
    totalClients,
    totalCollectors,
    totalAdmins,
    totalLoans,
    pendingLoans,
    activeLoans,
    paidLoans,
    overdueLoans,
    totalLoanAmount,
    totalAmountPaid,
    totalAmountOverdue,
    recentLoans,
    recentPayments,
}) => {
    const loanStatusData = {
        labels: ["Pending", "Active", "Paid", "Overdue"],
        datasets: [
            {
                label: "Loans",
                data: [pendingLoans, activeLoans, paidLoans, overdueLoans],
                backgroundColor: ["#fbbf24", "#3b82f6", "#22c55e", "#ef4444"],
                borderRadius: 6,
            },
        ],
    };

    const cardClasses =
        "bg-white shadow-md rounded-2xl p-6 flex items-center space-x-6 hover:shadow-lg transition-shadow duration-300";

    return (
        <AdminDashboardLayout auth={auth}>
            <div className="p-8 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 font-sans">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-10">
                    📊 Admin Dashboard
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                    <div className={cardClasses}>
                        <div className="bg-blue-100 text-blue-600 rounded-xl p-4">
                            <i className="fas fa-users text-2xl"></i>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">
                                Total Clients
                            </p>
                            <p className="text-3xl font-bold text-gray-900">
                                {totalClients}
                            </p>
                        </div>
                    </div>
                    <div className={cardClasses}>
                        <div className="bg-green-100 text-green-600 rounded-xl p-4">
                            <i className="fas fa-user-tie text-2xl"></i>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">
                                Total Collectors
                            </p>
                            <p className="text-3xl font-bold text-gray-900">
                                {totalCollectors}
                            </p>
                        </div>
                    </div>
                    <div className={cardClasses}>
                        <div className="bg-purple-100 text-purple-600 rounded-xl p-4">
                            <i className="fas fa-user-shield text-2xl"></i>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">
                                Total Admins
                            </p>
                            <p className="text-3xl font-bold text-gray-900">
                                {totalAdmins}
                            </p>
                        </div>
                    </div>
                    <div className={cardClasses}>
                        <div className="bg-yellow-100 text-yellow-600 rounded-xl p-4">
                            <i className="fas fa-file-invoice-dollar text-2xl"></i>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">
                                Total Loans
                            </p>
                            <p className="text-3xl font-bold text-gray-900">
                                {totalLoans}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    <div className={cardClasses}>
                        <div className="bg-indigo-100 text-indigo-600 rounded-xl p-4">
                            <i className="fas fa-wallet text-2xl"></i>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">
                                Total Loan Amount
                            </p>
                            <p className="text-3xl font-bold text-gray-900">
                                {formatCurrency(totalLoanAmount)}
                            </p>
                        </div>
                    </div>
                    <div className={cardClasses}>
                        <div className="bg-emerald-100 text-emerald-600 rounded-xl p-4">
                            <i className="fas fa-coins text-2xl"></i>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">
                                Total Amount Paid
                            </p>
                            <p className="text-3xl font-bold text-gray-900">
                                {formatCurrency(totalAmountPaid)}
                            </p>
                        </div>
                    </div>
                    <div className={cardClasses}>
                        <div className="bg-rose-100 text-rose-600 rounded-xl p-4">
                            <i className="fas fa-exclamation-triangle text-2xl"></i>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">
                                Total Amount Overdue
                            </p>
                            <p className="text-3xl font-bold text-gray-900">
                                {formatCurrency(totalAmountOverdue)}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow-md rounded-2xl p-6 mb-10">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Loan Status
                    </h2>
                    <div style={{ height: "300px" }}>
                        <Bar
                            data={loanStatusData}
                            options={{
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false } },
                            }}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white shadow-md rounded-2xl p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            Recent Loans
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="text-gray-500 uppercase text-xs">
                                        <th className="px-6 py-3 text-left">
                                            Client
                                        </th>
                                        <th className="px-6 py-3 text-left">
                                            Amount
                                        </th>
                                        <th className="px-6 py-3 text-left">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {recentLoans.map((loan) => (
                                        <tr
                                            key={loan.id}
                                            className="hover:bg-gray-50 transition"
                                        >
                                            <td className="px-6 py-4">
                                                {
                                                    loan.client_profile.user
                                                        .first_name
                                                }{" "}
                                                {
                                                    loan.client_profile.user
                                                        .last_name
                                                }
                                            </td>
                                            <td className="px-6 py-4">
                                                {formatCurrency(
                                                    loan.principal_amount
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                        loan.status === "paid"
                                                            ? "bg-green-100 text-green-700"
                                                            : loan.status ===
                                                              "pending"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : loan.status ===
                                                              "active"
                                                            ? "bg-blue-100 text-blue-700"
                                                            : "bg-red-100 text-red-700"
                                                    }`}
                                                >
                                                    {loan.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-white shadow-md rounded-2xl p-6">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            Recent Payments
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="text-gray-500 uppercase text-xs">
                                        <th className="px-6 py-3 text-left">
                                            Client
                                        </th>
                                        <th className="px-6 py-3 text-left">
                                            Amount
                                        </th>
                                        <th className="px-6 py-3 text-left">
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {recentPayments.map((payment) => (
                                        <tr
                                            key={payment.id}
                                            className="hover:bg-gray-50 transition"
                                        >
                                            <td className="px-6 py-4">
                                                {
                                                    payment.loan.client_profile
                                                        .user.first_name
                                                }{" "}
                                                {
                                                    payment.loan.client_profile
                                                        .user.last_name
                                                }
                                            </td>
                                            <td className="px-6 py-4">
                                                {formatCurrency(
                                                    payment.amount_paid
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {payment.payment_date}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default Dashboard;
