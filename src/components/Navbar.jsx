"use client"
import { UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Add-Destination', href: '/add-destination' },
        { name: 'My Bookings', href: '/bookings' },
        { name: 'Admin', href: '/admin' },
    ];

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 w-full">
            <div className="w-[95%] xl:w-[90%] max-w-400 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20 relative">

                    <div className="flex items-center">
                        <div className="lg:hidden">
                            <Link href="/home">
                                <span className="text-2xl font-extrabold text-[#15AABF] tracking-tight">
                                    Wanderlast
                                </span>
                            </Link>
                        </div>

                        <div className="hidden lg:flex items-center space-x-10">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`${isActive
                                                ? "text-[#15AABF] font-bold border-b-2 border-[#15AABF] pb-1"
                                                : "text-gray-700 hover:text-[#15AABF] transition-colors font-semibold"
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
                        <Link href="/home">
                            <span className="text-4xl font-extrabold text-[#15AABF] tracking-tight cursor-pointer">
                                Wanderlast
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center">
                        <div className="hidden lg:flex items-center space-x-8">
                            <Link href="/profile" className={`flex items-center gap-1.5 font-semibold transition-colors ${pathname === '/profile' ? 'text-[#15AABF]' : 'text-gray-700 hover:text-[#15AABF]'}`}>
                                <UserIcon className="w-6 h-6" />
                                <span>Profile</span>
                            </Link>
                            <Link href="/login" className="text-gray-700 hover:text-[#15AABF] font-semibold transition-colors">
                                Login
                            </Link>
                            <Link href="/signup" className="text-gray-700 hover:text-[#15AABF] font-semibold transition-colors">
                                Sign Up
                            </Link>
                        </div>

                        <div className="lg:hidden flex items-center">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-gray-700 p-2 hover:bg-gray-50 rounded-md transition-all"
                            >
                                {isOpen ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-8 w-8" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="lg:hidden bg-white border-t border-gray-100 shadow-2xl absolute w-full left-0">
                    <div className="px-6 py-8 space-y-5">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)} // Menu item e click korle dropdown bondho hoye jabe
                                    className={`block text-lg ${isActive ? "text-[#15AABF] font-bold" : "text-gray-700 font-semibold"}`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}

                        <div className="pt-4 border-t border-gray-100 flex flex-col gap-6">
                            <Link
                                href="/profile"
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 font-semibold text-lg ${pathname === '/profile' ? 'text-[#15AABF]' : 'text-gray-700'}`}
                            >
                                <UserIcon className="w-6 h-6" /> Profile
                            </Link>
                            <div className="grid grid-cols-2 gap-4">
                                <button className="py-3 text-center border-2 border-[#15AABF] text-[#15AABF] rounded-xl font-bold">Login</button>
                                <button className="py-3 text-center bg-[#15AABF] text-white rounded-xl font-bold shadow-md shadow-cyan-100">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;