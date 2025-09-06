import React from "react";
import { Head } from "@inertiajs/react";
import AdminDashboardLayout from "@/Layouts/AdminDashboardLayout";

const Dashboard = () => {
    return (
        <AdminDashboardLayout>
            <Head title="Admin Dashboard" />
            <div className="p-6">
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>
        </AdminDashboardLayout>
    );
};

export default Dashboard;
