import React from "react";
import ClientDashboardLayout from "@/Layouts/ClientDashboardLayout";
import { useForm } from "@inertiajs/react";

export default function Show({ auth, client }) {
    const { user } = auth;

    const {
        data,
        setData,
        post: postProfile,
        processing,
    } = useForm({
        first_name: client.first_name,
        last_name: client.last_name,
        email: client.email,
    });

    const {
        data: passwordData,
        setData: setPasswordData,
        post: postPassword,
        processing: passwordProcessing,
        reset,
    } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const submitProfile = (e) => {
        e.preventDefault();
        postProfile("/client/profile", {
            preserveScroll: true,
        });
    };

    const submitPassword = (e) => {
        e.preventDefault();
        postPassword("/client/password", {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <ClientDashboardLayout
            user={user}
            header={
                <h2 className="font-bold text-2xl text-gray-800">Profile</h2>
            }
        >
            <div className="py-10">
                <div className="max-w-3xl mx-auto space-y-8">
                    {/* Profile Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <header className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Profile Information
                            </h2>
                            <p className="text-sm text-gray-500">
                                Update your name and email address.
                            </p>
                        </header>

                        <form onSubmit={submitProfile} className="space-y-5">
                            <div>
                                <label
                                    htmlFor="first_name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    First Name
                                </label>
                                <input
                                    id="first_name"
                                    type="text"
                                    value={data.first_name}
                                    onChange={(e) =>
                                        setData("first_name", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="last_name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Last Name
                                </label>
                                <input
                                    id="last_name"
                                    type="text"
                                    value={data.last_name}
                                    onChange={(e) =>
                                        setData("last_name", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={(e) =>
                                        setData("email", e.target.value)
                                    }
                                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className={`px-4 py-2 rounded-lg font-medium text-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 transition ${
                                    processing
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                }`}
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>

                    {/* Password Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <header className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Update Password
                            </h2>
                            <p className="text-sm text-gray-500">
                                Use a strong and unique password.
                            </p>
                        </header>

                        <form onSubmit={submitPassword} className="space-y-5">
                            <div>
                                <label
                                    htmlFor="current_password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Current Password
                                </label>
                                <input
                                    id="current_password"
                                    type="password"
                                    value={passwordData.current_password}
                                    onChange={(e) =>
                                        setPasswordData(
                                            "current_password",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    New Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={passwordData.password}
                                    onChange={(e) =>
                                        setPasswordData(
                                            "password",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="password_confirmation"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    value={passwordData.password_confirmation}
                                    onChange={(e) =>
                                        setPasswordData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={passwordProcessing}
                                className={`px-4 py-2 rounded-lg font-medium text-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 transition ${
                                    passwordProcessing
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                }`}
                            >
                                Update Password
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </ClientDashboardLayout>
    );
}
