import React from "react";
import AdminDashboardLayout from "@/Layouts/AdminDashboardLayout";

const ReportsIndex = ({ auth }) => {
    return (
        <AdminDashboardLayout auth={auth}>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Generate Reports
                </h1>

                <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-inner">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">
                        Report Filters
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <label
                                htmlFor="report_type"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Report Type:
                            </label>
                            <select
                                id="report_type"
                                name="report_type"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                                <option value="">Select Report Type</option>
                                <option value="loan_summary">
                                    Loan Summary
                                </option>
                                <option value="payment_history">
                                    Payment History
                                </option>
                                <option value="client_list">Client List</option>
                                <option value="collector_performance">
                                    Collector Performance
                                </option>
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="start_date"
                                className="block text-sm font-medium text-gray-700"
                            >
                                Start Date:
                            </label>
                            <input
                                type="date"
                                id="start_date"
                                name="start_date"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="end_date"
                                className="block text-sm font-medium text-gray-700"
                            >
                                End Date:
                            </label>
                            <input
                                type="date"
                                id="end_date"
                                name="end_date"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>
                    <div className="mt-6 text-right">
                        <button
                            type="button"
                            className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Export Report
                        </button>
                    </div>
                </div>

                <div className="mt-8 p-6 bg-gray-100 rounded-lg border border-gray-200 text-gray-700">
                    <p className="text-center text-lg font-medium">
                        Select report type and apply filters to generate a
                        report.
                    </p>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default ReportsIndex;
