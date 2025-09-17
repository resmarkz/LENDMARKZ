import React from "react";
import { Link } from "@inertiajs/react";
import AdminDashboardLayout from "@/Layouts/AdminDashboardLayout";
import Pagination from "@/Components/Pagination";

const ClientIndex = ({ auth, clients }) => {
    return (
        <AdminDashboardLayout auth={auth}>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Manage Clients
                </h1>
                <div className="mb-6">
                    <Link
                        href="/admin/manage-users/clients/create"
                        className="inline-flex items-center px-5 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Create New Client
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    ID
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    First Name
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Last Name
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
                                    Address
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Contact Number
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Date of Birth
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Source of Income
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {clients.data.map((client) => (
                                <tr key={client.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {client.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {client.first_name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {client.last_name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {client.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {client.client_profile?.address}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {client.client_profile?.contact_number}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {client.client_profile?.date_of_birth}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {
                                            client.client_profile
                                                ?.source_of_income
                                        }
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-left text-sm font-medium">
                                        <Link
                                            href={`/admin/manage-users/clients/${client.id}`}
                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={`/admin/manage-users/clients/${client.id}/edit`}
                                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                                        >
                                            Edit
                                        </Link>
                                        <Link
                                            href={`/admin/manage-users/clients/${client.id}/delete`}
                                            className="text-red-600 hover:text-red-900"
                                            as="button"
                                            method="POST"
                                        >
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-6">
                    <Pagination links={clients.links} />
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default ClientIndex;
