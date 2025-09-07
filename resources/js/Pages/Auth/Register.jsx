import React, { useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import Swal from "sweetalert2";

const Register = () => {
    const { data, setData, post, errors, processing } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: "",
        address: "",
        contact_number: "",
        date_of_birth: "",
        source_of_income: "",
    });

    useEffect(() => {
        const errorKeys = Object.keys(errors);
        if (errorKeys.length > 0) {
            const errorMessages = errorKeys.map((key) => errors[key]);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                html: errorMessages.join("<br>"),
            });
        }
    }, [errors]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/register");
    };
    return (
        <Layout auth={auth}>
            <Head title="Register" />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-center mb-6">
                        Create an Account
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="first_name"
                                >
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="first_name"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter your first name"
                                    value={data.first_name}
                                    onChange={(e) =>
                                        setData("first_name", e.target.value)
                                    }
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="last_name"
                                >
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="last_name"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter your last name"
                                    value={data.last_name}
                                    onChange={(e) =>
                                        setData("last_name", e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="address"
                            >
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your address"
                                value={data.address}
                                onChange={(e) =>
                                    setData("address", e.target.value)
                                }
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="contact_number"
                                >
                                    Contact Number
                                </label>
                                <input
                                    type="text"
                                    id="contact_number"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter your contact number"
                                    value={data.contact_number}
                                    onChange={(e) =>
                                        setData(
                                            "contact_number",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="date_of_birth"
                                >
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    id="date_of_birth"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={data.date_of_birth}
                                    onChange={(e) =>
                                        setData("date_of_birth", e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="source_of_income"
                            >
                                Source of Income
                            </label>
                            <select
                                id="source_of_income"
                                value={data.source_of_income}
                                onChange={(e) =>
                                    setData("source_of_income", e.target.value)
                                }
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
                            >
                                <option value="">Select Source</option>
                                <option value="Employment">Employment</option>
                                <option value="Business">Business</option>
                                <option value="Investments">Investments</option>
                                <option value="Pension">Pension</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Enter your password"
                                    value={data.password}
                                    onChange={(e) =>
                                        setData("password", e.target.value)
                                    }
                                />
                            </div>
                            <div className="mb-6">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="password_confirmation"
                                >
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="password_confirmation"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                    placeholder="Confirm your password"
                                    value={data.password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            "password_confirmation",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Register;
