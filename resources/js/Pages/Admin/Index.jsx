import React from "react";
import { Head, Link } from "@inertiajs/react";
import AdminDashboardLayout from "@/Layouts/AdminDashboardLayout";

const AdminIndex = ({ admins }) => {
    return (
        <AdminDashboardLayout auth={auth}>
            <Head title="Admins" />
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Admin List</h1>
                    <Link
                        href="/admin/admins/create"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Create New Admin
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Name
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Email
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Phone
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {admins.map((admin) => (
                                <tr key={admin.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {admin.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {admin.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {admin.phone}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link
                                            href={
                                                "/admin/admins/" +
                                                admin.id +
                                                "/edit"
                                            }
                                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            href={"/admin/admins/" + admin.id}
                                            method="delete"
                                            as="button"
                                            className="text-red-600 hover:text-red-900"
                                            onClick={() => {
                                                if (
                                                    !confirm(
                                                        "Are you sure you want to delete this admin?"
                                                    )
                                                ) {
                                                    e.preventDefault();
                                                }
                                            }}
                                        >
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default AdminIndex;
