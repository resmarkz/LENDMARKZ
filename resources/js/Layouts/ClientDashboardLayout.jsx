import React, { useState, useEffect, useRef } from "react";
import { Link, usePage } from "@inertiajs/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronDown,
    faChevronUp,
    faUser,
    faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { successHandler, errorHandler } from "@/Utils/alertsHandler";

function ClientDashboardLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const userDropdownRef = useRef(null);
    const {
        url,
        props: { auth, flash, errors },
    } = usePage();
    const user = auth?.user;

    useEffect(() => {
        if (flash?.success) {
            successHandler(flash.success);
        }
        if (flash?.error) {
            errorHandler(flash.error);
        }
    }, [flash]);

    useEffect(() => {
        errorHandler(errors);
    }, [errors]);

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
            group: "Dashboard",
            links: [
                {
                    name: "Overview",
                    icon: "fas fa-home",
                    href: "/client/dashboard",
                },
            ],
        },
        {
            group: "My Account",
            links: [
                {
                    name: "My Loans",
                    icon: "fas fa-hand-holding-usd",
                    href: "/client/loans",
                },
                {
                    name: "Apply for Loan",
                    icon: "fas fa-file-signature",
                    href: "/client/loans/create-loan",
                },
                {
                    name: "My Payments",
                    icon: "fas fa-wallet",
                    href: "/client/payments",
                },
            ],
        },
    ];

    const isActiveLink = (href) => url === href;

    return (
        <div className="h-screen bg-gradient-to-br from-indigo-50 via-white to-sky-50 grid grid-cols-1 lg:grid-cols-[auto_1fr] grid-rows-[auto_1fr] overflow-hidden">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            <aside
                className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white/90 backdrop-blur-md border-r border-gray-100 shadow-lg transform transition-transform duration-200 ease-in-out ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 lg:col-start-1 lg:row-span-2`}
            >
                <div className="h-16 px-6 flex items-center justify-between border-b border-gray-100">
                    <span className="text-indigo-600 font-extrabold text-xl tracking-wide">
                        LENDMARK
                    </span>
                    <button
                        className="text-gray-500 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <i className="fas fa-times text-lg"></i>
                    </button>
                </div>

                <div className="h-[calc(100%-4rem)] overflow-y-auto py-6">
                    <nav className="space-y-6">
                        {sidebarLinks.map((group) => (
                            <div key={group.group} className="px-4">
                                <h3 className="px-2 mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                                    {group.group}
                                </h3>
                                <div className="space-y-2">
                                    {group.links.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className={`flex items-center px-4 py-2 rounded-xl transition-all ${
                                                isActiveLink(link.href)
                                                    ? "bg-indigo-600 text-white shadow-md"
                                                    : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                                            }`}
                                        >
                                            <i
                                                className={`${link.icon} mr-3 ${
                                                    isActiveLink(link.href)
                                                        ? "text-white"
                                                        : "text-indigo-400"
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

            <header className="sticky top-0 h-16 bg-white/70 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 z-20 col-start-1 lg:col-start-2 col-span-1">
                <button
                    type="button"
                    className="text-gray-500 hover:text-indigo-600 lg:hidden"
                    onClick={() => setSidebarOpen(true)}
                >
                    <i className="fas fa-bars text-xl"></i>
                </button>

                <h1 className="text-lg font-semibold text-gray-700">
                    Client Dashboard
                </h1>

                <div className="flex items-center space-x-4">
                    <button className="text-gray-500 hover:text-indigo-600 transition">
                        <i className="fas fa-bell text-lg"></i>
                    </button>
                    <div className="relative" ref={userDropdownRef}>
                        <button
                            type="button"
                            onClick={() =>
                                setUserDropdownOpen(!userDropdownOpen)
                            }
                            className="flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-indigo-100 transition"
                        >
                            <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white">
                                {user?.first_name.charAt(0).toUpperCase()}
                                {user?.last_name.charAt(0).toUpperCase()}
                            </div>
                            <span className="hidden sm:inline text-gray-800 font-medium">
                                {user?.first_name}
                            </span>
                            <FontAwesomeIcon
                                icon={
                                    userDropdownOpen
                                        ? faChevronUp
                                        : faChevronDown
                                }
                                className="ml-1 h-4 w-4 text-gray-400"
                            />
                        </button>

                        {userDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-44 rounded-lg bg-white shadow-lg ring-1 ring-black/5">
                                <div className="py-1">
                                    <Link
                                        href="/client/profile"
                                        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition"
                                    >
                                        <FontAwesomeIcon
                                            icon={faUser}
                                            className="h-4 w-4 text-indigo-500"
                                        />
                                        Profile
                                    </Link>
                                    <Link
                                        href="/logout"
                                        method="post"
                                        as="button"
                                        className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition"
                                    >
                                        <FontAwesomeIcon
                                            icon={faRightFromBracket}
                                            className="h-4 w-4 text-red-500"
                                        />
                                        Sign out
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <main className="overflow-auto bg-gradient-to-br from-white via-indigo-50 to-sky-50 col-start-1 lg:col-start-2">
                <div className="py-8 px-6 lg:px-10 min-h-[calc(100vh-4rem)]">
                    {children}
                </div>
            </main>
        </div>
    );
}

export default ClientDashboardLayout;
