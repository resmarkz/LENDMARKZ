import React from "react";
import { Head } from "@inertiajs/react";
import { FaHandshake, FaChartLine, FaShieldAlt } from "react-icons/fa";
import Layout from "@/Layouts/Layout";

const Home = ({ auth }) => {
    const { user } = auth;
    let getStartedUrl = "";
    if (!user) {
        getStartedUrl = "/register";
    } else {
        switch (user.role) {
            case "admin":
                getStartedUrl = "/admin/dashboard";
                break;
            case "client":
                getStartedUrl = "/client/dashboard";
                break;
            case "collector":
                getStartedUrl = "/collector/dashboard";
                break;
            default:
                getStartedUrl = "/register";
                break;
        }
    }

    return (
        <Layout auth={auth}>
            <div className="min-h-screen bg-gray-50 text-gray-800">
                <Head title="Welcome to Lendmarkz" />

                {/* Hero Section */}
                <section className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-center py-24 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-pattern"></div>
                    <div className="container mx-auto px-6 relative z-10">
                        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
                            Your Trusted Lending Partner
                        </h1>
                        <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto opacity-90">
                            Fast, reliable, and secure loans tailored to help
                            you achieve your goals.
                        </p>
                        <a
                            href={getStartedUrl}
                            className="bg-white text-indigo-600 font-semibold py-3 px-10 rounded-full shadow-md hover:bg-gray-100 transition"
                        >
                            Get Started
                        </a>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20">
                    <div className="container mx-auto px-6">
                        <h2 className="text-4xl font-bold text-center mb-14 text-gray-800">
                            Why Choose Lendmarkz?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                            <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition text-center">
                                <FaHandshake className="text-5xl text-indigo-600 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold mb-2">
                                    Easy Application
                                </h3>
                                <p className="text-gray-600">
                                    A streamlined process that makes applying
                                    for a loan simple and stress-free.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition text-center">
                                <FaChartLine className="text-5xl text-indigo-600 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold mb-2">
                                    Competitive Rates
                                </h3>
                                <p className="text-gray-600">
                                    Enjoy fair and transparent interest rates
                                    that give you real value.
                                </p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow hover:shadow-lg transition text-center">
                                <FaShieldAlt className="text-5xl text-indigo-600 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold mb-2">
                                    Secure & Confidential
                                </h3>
                                <p className="text-gray-600">
                                    Bank-level security to protect your data and
                                    give you peace of mind.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section className="bg-indigo-600 text-white py-16 text-center">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to achieve your financial goals?
                        </h2>
                        <p className="text-lg mb-8 opacity-90">
                            Join thousands of clients who trust Lendmarkz with
                            their lending needs.
                        </p>
                        <a
                            href={getStartedUrl}
                            className="bg-white text-indigo-600 font-semibold py-3 px-8 rounded-full shadow hover:bg-gray-100 transition"
                        >
                            Apply Now
                        </a>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-gray-300 py-8">
                    <div className="container mx-auto px-6 text-center">
                        <p className="text-sm">
                            &copy; {new Date().getFullYear()} Lendmarkz. All
                            rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </Layout>
    );
};

export default Home;
