import React, { useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import Swal from "sweetalert2";

const Login = () => {
    const { data, setData, post, errors, processing, reset } = useForm({
        email: "",
        password: "",
        remember: false,
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
        post("/login");
    };

    return (
        <Layout>
            <Head title="Login" />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-center mb-6">
                        Login to Your Account
                    </h2>
                    <form onSubmit={handleSubmit}>
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
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Sign In
                            </button>
                            <a
                                href="#"
                                className="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800"
                            >
                                Forgot Password?
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Login;
