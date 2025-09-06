import { Link } from "@inertiajs/react";

function Layout({ children }) {
    return (
        <>
            <nav className="w-full text-white bg-slate-900">
                <div className="container mx-auto flex items-center justify-between py-4 ">
                    <h1>LOGO</h1>
                    <ul className="flex space-x-4">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/page2">Page 2</Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <main>{children}</main>
        </>
    );
}

export default Layout;
