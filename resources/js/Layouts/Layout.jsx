import { Link } from "@inertiajs/react";

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
                            <div className="px-4 py-2 text-gray-800">
                                Welcome, {auth.user.first_name}{" "}
                                {auth.user.last_name}
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
