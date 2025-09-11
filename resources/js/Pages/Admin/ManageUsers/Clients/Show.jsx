import React from "react";
import { Link } from "@inertiajs/react";
import AdminDashboardLayout from "@/Layouts/AdminDashboardLayout";

const ClientShow = ({ auth, client }) => {
    console.log(client);
    return (
        <AdminDashboardLayout auth={auth}>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Client Details
                </h1>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                ID
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {client.id}
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                First Name
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {client.first_name}
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Last Name
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {client.last_name}
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Email address
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {client.email}
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Address
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {client.client_profile?.address}
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Contact Number
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {client.client_profile?.contact_number}
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Date of Birth
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {client.client_profile?.date_of_birth}
                            </dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Source of Income
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {client.client_profile?.source_of_income}
                            </dd>
                        </div>
                    </dl>
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">
                        Contact References
                    </h2>
                    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th scope="col" className="py-3 px-6">
                                        First Name
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Last Name
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Relationship
                                    </th>
                                    <th scope="col" className="py-3 px-6">
                                        Contact Number
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {client.client_profile?.contact_references
                                    .length > 0 ? (
                                    client.client_profile.contact_references.map(
                                        (reference) => (
                                            <tr
                                                key={reference.id}
                                                className="bg-white border-b hover:bg-gray-50"
                                            >
                                                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                                    {reference.first_name}
                                                </td>
                                                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                                    {reference.last_name}
                                                </td>
                                                <td className="py-4 px-6">
                                                    {reference.relationship}
                                                </td>
                                                <td className="py-4 px-6">
                                                    {reference.contact_number}
                                                </td>
                                            </tr>
                                        )
                                    )
                                ) : (
                                    <tr className="bg-white border-b">
                                        <td
                                            colSpan="4"
                                            className="py-4 px-6 text-center text-gray-500"
                                        >
                                            No contact references found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-4 mt-6">
                    <Link
                        href={`/admin/manage-users/clients/${client.id}/contact-references/create`}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        Add Contact Reference
                    </Link>
                    <Link
                        href="/admin/manage-users/clients"
                        className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Back to List
                    </Link>
                    <Link
                        href={`/admin/manage-users/clients/${client.id}/edit`}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Edit Client
                    </Link>
                </div>
            </div>
        </AdminDashboardLayout>
    );
};

export default ClientShow;
