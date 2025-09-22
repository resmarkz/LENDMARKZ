import React, { useEffect } from "react";
import { Link, useForm } from "@inertiajs/react";
import AdminDashboardLayout from "@/Layouts/AdminDashboardLayout";
import { errorHandler } from "@/utils/alertsHandler";

const ContactReferenceEdit = ({ auth, client, contactReference }) => {
    const { data, setData, processing, errors, post } = useForm({
        first_name: contactReference.first_name || "",
        last_name: contactReference.last_name || "",
        relationship: contactReference.relationship || "",
        contact_number: contactReference.contact_number || "",
    });

    useEffect(() => {
        errorHandler(errors);
    }, [errors]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(
            `/admin/manage-users/clients/${client.id}/contact-references/${contactReference.id}`
        );
    };

    return (
        <AdminDashboardLayout auth={auth}>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Edit Contact Reference for {client.first_name}{" "}
                    {client.last_name}
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
                            value={data.first_name}
                            onChange={(e) =>
                                setData("first_name", e.target.value)
                            }
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
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
                            value={data.last_name}
                            onChange={(e) =>
                                setData("last_name", e.target.value)
                            }
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="relationship"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Relationship:
                        </label>
                        <input
                            type="text"
                            id="relationship"
                            name="relationship"
                            value={data.relationship}
                            onChange={(e) =>
                                setData("relationship", e.target.value)
                            }
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
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
                            value={data.contact_number}
                            onChange={(e) =>
                                setData("contact_number", e.target.value)
                            }
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
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
                            href={`/admin/manage-users/clients/${client.id}/edit`}
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

export default ContactReferenceEdit;
