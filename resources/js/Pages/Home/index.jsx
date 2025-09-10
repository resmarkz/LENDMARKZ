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
            <div className="min-h-screen bg-gray-100 text-gray-800">
                <Head title="Welcome to Lendmarkz" />

                {/* Hero Section */}
                <section className="bg-blue-600 text-white text-center py-20">
                    <div className="container mx-auto px-6">
                        <h2 className="text-5xl font-bold mb-4">
                            Your Trusted Lending Partner
                        </h2>
                        <p className="text-xl mb-8">
                            Providing fast, reliable, and secure loans to help
                            you achieve your goals.
                        </p>
                        <a
                            href={getStartedUrl}
                            className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full hover:bg-gray-200"
                        >
                            Get Started
                        </a>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20">
                    <div className="container mx-auto px-6">
                        <h3 className="text-4xl font-bold text-center mb-12">
                            Why Choose Lendmarkz?
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="text-center">
                                <FaHandshake className="text-5xl text-blue-600 mx-auto mb-4" />
                                <h4 className="text-2xl font-bold mb-2">
                                    Easy Application
                                </h4>
                                <p className="text-gray-600">
                                    Our streamlined application process makes
                                    getting a loan simple and hassle-free.
                                </p>
                            </div>
                            <div className="text-center">
                                <FaChartLine className="text-5xl text-blue-600 mx-auto mb-4" />
                                <h4 className="text-2xl font-bold mb-2">
                                    Competitive Rates
                                </h4>
                                <p className="text-gray-600">
                                    We offer competitive interest rates to
                                    ensure you get the best value for your loan.
                                </p>
                            </div>
                            <div className="text-center">
                                <FaShieldAlt className="text-5xl text-blue-600 mx-auto mb-4" />
                                <h4 className="text-2xl font-bold mb-2">
                                    Secure & Confidential
                                </h4>
                                <p className="text-gray-600">
                                    Your data is protected with bank-level
                                    security, ensuring your privacy and peace of
                                    mind.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-800 text-white py-8">
                    <div className="container mx-auto px-6 text-center">
                        <p>&copy; 2025 Lendmarkz. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </Layout>
    );
};

export default Home;
