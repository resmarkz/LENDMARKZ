
import React from 'react';
import { Head } from '@inertiajs/react';
import AdminDashboardLayout from '@/Layouts/AdminDashboardLayout';

const Payments = ({ auth }) => {
    return (
        <AdminDashboardLayout auth={auth}>
            <Head title="Payments" />
            <div className="p-6">
                <h1 className="text-2xl font-bold">Payments</h1>
            </div>
        </AdminDashboardLayout>
    );
};

export default Payments;
