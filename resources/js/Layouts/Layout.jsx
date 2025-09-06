import { Link } from "@inertiajs/react";

function Layout({ children }) {
    return (
        <>
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-800">Lendmarkz</h1>
                    <nav>
                        <a href="/login" className="px-4 py-2 text-gray-600 hover:text-gray-800">Login</a>
                        <a href="/register" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Register</a>
                    </nav>
                </div>
            </header>

            <main>{children}</main>
        </>
    );
}

export default Layout;