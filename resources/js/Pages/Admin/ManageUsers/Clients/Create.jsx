import React, { useEffect } from "react";
import { Link, useForm } from "@inertiajs/react";
import AdminDashboardLayout from "@/Layouts/AdminDashboardLayout";
import { errorHandler } from "@/utils/alertsHandler";

const ClientCreate = ({ auth }) => {
    const { data, setData, post, processing, errors } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        address: "",
        contact_number: "",
        date_of_birth: "",
        source_of_income: "",
        status: "active",
    });

    useEffect(() => {
        errorHandler(errors);
    }, [errors]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/admin/manage-users/clients/create");
    };

    return (
        <AdminDashboardLayout auth={auth}>
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                    Create New Client
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
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter client first name"
                            value={data.first_name}
                            onChange={(e) =>
                                setData("first_name", e.target.value)
                            }
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
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter client last name"
                            value={data.last_name}
                            onChange={(e) =>
                                setData("last_name", e.target.value)
                            }
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
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter client email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password_confirmation"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Confirm Password:
                        </label>
                        <input
                            type="password"
                            id="password_confirmation"
                            name="password_confirmation"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter password"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
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
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter client address"
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
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
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Enter client contact number"
                            value={data.contact_number}
                            onChange={(e) =>
                                setData("contact_number", e.target.value)
                            }
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
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={data.date_of_birth}
                            onChange={(e) =>
                                setData("date_of_birth", e.target.value)
                            }
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
                    <div className="flex items-center justify-end gap-4 mt-6">
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            disabled={processing}
                        >
                            Save Client
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

export default ClientCreate;
