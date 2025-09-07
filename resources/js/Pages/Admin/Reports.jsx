
import React from 'react';
import { Head } from '@inertiajs/react';
import AdminDashboardLayout from '@/Layouts/AdminDashboardLayout';

const Reports = ({ auth }) => {
    return (
        <AdminDashboardLayout auth={auth}>
            <Head title="Reports" />
            <div className="p-6">
                <h1 className="text-2xl font-bold">Reports</h1>
            </div>
        </AdminDashboardLayout>
    );
};

export default Reports;
