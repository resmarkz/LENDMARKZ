import { Link } from "@inertiajs/react";
import { FaSignOutAlt } from "react-icons/fa";

function Layout({ children, auth }) {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-md sticky top-0 z-30">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    {/* Logo */}
                    <a
                        href="/"
                        className="text-2xl font-extrabold text-indigo-600 tracking-tight"
                    >
                        Lendmarkz
                    </a>

                    {/* Navigation */}
                    <nav className="flex items-center gap-4">
                        {auth && !auth.user ? (
                            <>
                                <a
                                    href="/login"
                                    className="px-4 py-2 text-gray-600 font-medium hover:text-indigo-600 transition"
                                >
                                    Login
                                </a>
                                <a
                                    href="/register"
                                    className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition"
                                >
                                    Register
                                </a>
                            </>
                        ) : (
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center font-semibold text-indigo-600">
                                        {auth.user.first_name
                                            .charAt(0)
                                            .toUpperCase()}
                                        {auth.user.last_name
                                            .charAt(0)
                                            .toUpperCase()}
                                    </div>
                                    <span className="text-gray-700 font-medium">
                                        {auth.user.first_name}{" "}
                                        {auth.user.last_name}
                                    </span>
                                </div>

                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500"
                                >
                                    <FaSignOutAlt />
                                    <span>Logout</span>
                                </Link>
                            </div>
                        )}
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">{children}</main>
        </div>
    );
}

export default Layout;
