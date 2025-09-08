import React, { useEffect } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import errorHandler from "@/utils/errorHandler";

const Login = ({ auth }) => {
    const { data, setData, post, errors, processing } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        errorHandler(errors);
    }, [errors]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/login");
    };

    return (
        <Layout auth={auth}>
            <Head title="Login" />
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-4xl w-full mx-auto p-6 lg:p-8">
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden p-8 md:p-12">
                        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                            Welcome Back!
                        </h2>
                        <p className="text-gray-600 mb-8">
                            Sign in to continue to your account.
                        </p>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email Address
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                        className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        value={data.password}
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                        className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(e) =>
                                            setData(
                                                "remember",
                                                e.target.checked
                                            )
                                        }
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label
                                        htmlFor="remember-me"
                                        className="ml-2 block text-sm text-gray-900"
                                    >
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a
                                        href="#"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                        <p className="mt-6 text-center text-sm text-gray-600">
                            Not a member?{" "}
                            <Link
                                href="/register"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Sign up now
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Login;
