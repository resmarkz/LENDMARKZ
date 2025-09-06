
import React from 'react';
import { Head } from '@inertiajs/react';
import AdminDashboardLayout from '@/Layouts/AdminDashboardLayout';

const Loans = () => {
    return (
        <AdminDashboardLayout>
            <Head title="Loans" />
            <div className="p-6">
                <h1 className="text-2xl font-bold">Loans</h1>
            </div>
        </AdminDashboardLayout>
    );
};

export default Loans;
