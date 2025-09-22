import React, { useEffect } from "react";
import { Link, useForm } from "@inertiajs/react";
import AdminDashboardLayout from "@/Layouts/AdminDashboardLayout";
import { errorHandler } from "@/utils/alertsHandler";

const ClientEdit = ({ auth, client }) => {
    const { data, setData, processing, errors, post } = useForm({
        first_name: client.first_name,
        last_name: client.last_name,
        email: client.email,
        current_password: "",
        password: "",
        address: client.client_profile?.address ?? "",
        contact_number: client.client_profile?.contact_number ?? "",
        date_of_birth: client.client_profile?.date_of_birth ?? "",
        source_of_income: client.client_profile?.source_of_income ?? "",
        status: client.client_profile?.status ?? "active",
    });

    useEffect(() => {
        errorHandler(errors);
    }, [errors]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/admin/manage-users/clients/${client.id}/edit`);
    };

    return (
        <AdminDashboardLayout auth={auth}>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Edit Client: {client.name}
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="first_name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            First Name:
                        </label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            defaultValue={client.first_name}
                            onChange={(e) =>
                                setData("first_name", e.target.value)
                            }
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="last_name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Last Name:
                        </label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            defaultValue={client.last_name}
                            onChange={(e) =>
                                setData("last_name", e.target.value)
                            }
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            defaultValue={client.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="current_password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Current Password (optional):
                        </label>
                        <input
                            type="password"
                            id="current_password"
                            name="current_password"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter new password if you want to change it"
                            value={data.current_password}
                            onChange={(e) =>
                                setData("current_password", e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            New Password (optional):
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter new password if you want to change it"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="address"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Address:
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            defaultValue={client.client_profile?.address ?? ""}
                            onChange={(e) => setData("address", e.target.value)}
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="contact_number"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Contact Number:
                        </label>
                        <input
                            type="text"
                            id="contact_number"
                            name="contact_number"
                            defaultValue={
                                client.client_profile?.contact_number ?? ""
                            }
                            onChange={(e) =>
                                setData("contact_number", e.target.value)
                            }
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="date_of_birth"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Date of Birth:
                        </label>
                        <input
                            type="date"
                            id="date_of_birth"
                            name="date_of_birth"
                            defaultValue={
                                client.client_profile?.date_of_birth ?? ""
                            }
                            onChange={(e) =>
                                setData("date_of_birth", e.target.value)
                            }
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="source_of_income"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Source of Income:
                        </label>
                        <select
                            id="source_of_income"
                            name="source_of_income"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={data.source_of_income}
                            onChange={(e) =>
                                setData("source_of_income", e.target.value)
                            }
                        >
                            <option value="">Select source of income</option>
                            <option value="Employed">Employed</option>
                            <option value="Business">Business</option>
                            <option value="Freelancer">Freelancer</option>
                            <option value="Other">Other</option>
                        </select>
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

                                        <th scope="col" className="py-3 px-6">
                                            Action
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
                                                        {
                                                            reference.contact_number
                                                        }
                                                    </td>

                                                    <td className="py-4 px-6">
                                                        <Link
                                                            href={`/admin/manage-users/clients/${client.id}/contact-references/${reference.id}/edit`}
                                                            className="font-medium text-blue-600 hover:underline mr-3"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <Link
                                                            href={`/admin/manage-users/clients/${client.id}/contact-references/${reference.id}`}
                                                            className="text-red-600 hover:text-red-900"
                                                            as="button"
                                                            method="POST"
                                                        >
                                                            Delete
                                                        </Link>
                                                    </td>
                                                </tr>
                                            )
                                        )
                                    ) : (
                                        <tr className="bg-white border-b">
                                            <td
                                                colSpan="5"
                                                className="py-4 px-6 text-center text-gray-500"
                                            >
                                                No contact references found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex items-center justify-end gap-4 mt-6">
                            <Link
                                href={`/admin/manage-users/clients/${client.id}/contact-references/create`}
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                Add Contact Reference
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-4 mt-6">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            disabled={processing}
                        >
                            Save Changes
                        </button>
                        <Link
                            href="/admin/manage-users/clients"
                            className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </AdminDashboardLayout>
    );
};

export default ClientEdit;
