import React, { useState, useEffect, useRef } from "react";
import { Link, usePage } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

function CollectorDashboardLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const userDropdownRef = useRef(null);
    const {
        url,
        props: { auth },
    } = usePage();
    const user = auth?.user;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                userDropdownRef.current &&
                !userDropdownRef.current.contains(event.target)
            ) {
                setUserDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const sidebarLinks = [
        {
            group: "Main",
            links: [
                {
                    name: "Overview",
                    icon: "fas fa-home",
                    href: "/collector/dashboard",
                },
            ],
        },
        {
            group: "Loans",
            links: [
                {
                    name: "My Loans",
                    icon: "fas fa-hand-holding-usd",
                    href: "/collector/loans",
                },
                {
                    name: "Record Payment",
                    icon: "fas fa-money-check-alt",
                    href: "/collector/payments/create",
                },
            ],
        },
    ];

    const isActiveLink = (href) => {
        return url.startsWith(href);
    };

    return (
        <div className="h-screen min-h-screen bg-gray-50 grid grid-cols-1 lg:grid-cols-[auto_1fr] grid-rows-[auto_1fr] overflow-hidden">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            <aside
                className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 shadow-sm transform transition-transform duration-200 ease-in-out ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 lg:col-start-1 lg:row-span-2`}
            >
                <div className="h-16 px-6 flex items-center justify-between border-b border-gray-200">
                    <span className="text-indigo-600 font-bold text-xl tracking-tight">
                        LENDMARK
                    </span>
                    <button
                        className="text-gray-400 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div className="h-[calc(100%-4rem)] overflow-y-auto py-6 px-2">
                    <nav className="space-y-6">
                        {sidebarLinks.map((group) => (
                            <div key={group.group} className="space-y-2">
                                <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                                    {group.group}
                                </h3>
                                <div className="space-y-1">
                                    {group.links.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition ${
                                                isActiveLink(link.href)
                                                    ? "bg-indigo-50 text-indigo-700"
                                                    : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                                            }`}
                                        >
                                            <i
                                                className={`${link.icon} mr-3 ${
                                                    isActiveLink(link.href)
                                                        ? "text-indigo-500"
                                                        : "text-gray-400"
                                                }`}
                                            ></i>
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </nav>
                </div>
            </aside>

            <header className="sticky top-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-20 col-start-1 lg:col-start-2 col-span-1">
                <button
                    type="button"
                    className="text-gray-500 lg:hidden"
                    onClick={() => setSidebarOpen(true)}
                >
                    <i className="fas fa-bars"></i>
                </button>

                <div className="flex-1"></div>

                <div className="flex items-center space-x-4">
                    <button className="text-gray-500 hover:text-gray-700">
                        <i className="fas fa-bell"></i>
                    </button>
                    <div
                        className="relative inline-block text-left"
                        ref={userDropdownRef}
                    >
                        <button
                            type="button"
                            onClick={() =>
                                setUserDropdownOpen(!userDropdownOpen)
                            }
                            className="inline-flex items-center rounded-lg bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-sm font-semibold text-indigo-600">
                                {user?.first_name.charAt(0).toUpperCase()}
                                {user?.last_name.charAt(0).toUpperCase()}
                            </div>
                            <span className="ml-2">{user?.name}</span>
                            <FontAwesomeIcon
                                icon={
                                    userDropdownOpen
                                        ? faChevronUp
                                        : faChevronDown
                                }
                                className="ml-2 h-4 w-4 text-gray-400"
                            />
                        </button>

                        {userDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-20">
                                <div className="py-1">
                                    <Link
                                        href="/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Sign out
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <main className="overflow-auto bg-gray-50 col-start-1 lg:col-start-2">
                <div className="py-6 px-4 sm:px-6 lg:px-8 min-h-[calc(100vh-4rem)]">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default CollectorDashboardLayout;
