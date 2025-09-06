
import React from 'react';
import { Head } from '@inertiajs/react';
import AdminDashboardLayout from '@/Layouts/AdminDashboardLayout';

const Reports = () => {
    return (
        <AdminDashboardLayout>
            <Head title="Reports" />
            <div className="p-6">
                <h1 className="text-2xl font-bold">Reports</h1>
            </div>
        </AdminDashboardLayout>
    );
};

export default Reports;
