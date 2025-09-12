import { Link } from "@inertiajs/react";
import { FaSignOutAlt } from "react-icons/fa";

function Layout({ children, auth }) {
    return (
        <>
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <a href="/" className="text-2xl font-bold text-gray-800">
                        Lendmarkz
                    </a>
                    <nav>
                        {auth && !auth.user ? (
                            <>
                                <a
                                    href="/login"
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                                >
                                    Login
                                </a>
                                <a
                                    href="/register"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Register
                                </a>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <div className="text-gray-800 font-medium">
                                    Welcome, {auth.user.first_name}{" "}
                                    {auth.user.last_name}
                                </div>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                >
                                    <FaSignOutAlt />
                                    <span>Logout</span>
                                </Link>
                            </div>
                        )}
                    </nav>
                </div>
            </header>

            <main>{children}</main>
        </>
    );
}

export default Layout;