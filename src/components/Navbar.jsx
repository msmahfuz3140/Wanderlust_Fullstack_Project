"use client"
import React, { useState } from 'react';
import { UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 w-full">
            <div className="w-[95%] xl:w-[90%] max-w-400 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20 relative">
                    <div className="flex items-center">
                        <div className="lg:hidden">
                            <span className="text-2xl font-extrabold text-[#15AABF] tracking-tight">
                                Wanderlast
                            </span>
                        </div>

                        <div className="hidden lg:flex items-center space-x-10">
                            <a href="home" className="text-[#15AABF] font-bold border-b-2 border-[#15AABF] pb-1">
                                Home
                            </a>
                            <a href="destinations" className="text-gray-700 hover:text-[#15AABF] transition-colors font-semibold">
                                Destinations
                            </a>
                            <a href="bookings" className="text-gray-700 hover:text-[#15AABF] transition-colors font-semibold">
                                My Bookings
                            </a>
                            <a href="admin" className="text-gray-700 hover:text-[#15AABF] transition-colors font-semibold">
                                Admin
                            </a>
                        </div>
                    </div>

                    <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
                        <span className="text-4xl font-extrabold text-[#15AABF] tracking-tight">
                            Wanderlast
                        </span>
                    </div>

                    <div className="flex items-center">

                        <div className="hidden lg:flex items-center space-x-8">
                            <a href="#" className="flex items-center gap-1.5 text-gray-700 hover:text-[#15AABF] font-semibold transition-colors">
                                <UserIcon className="w-6 h-6" />
                                <span>Profile</span>
                            </a>
                            <a href="login" className="text-gray-700 hover:text-[#15AABF] font-semibold transition-colors">
                                Login
                            </a>
                            <a href="signup" className="text-gray-700 hover:text-[#15AABF] font-semibold transition-colors">
                                Sign Up
                            </a>
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
                        <a href="/home" className="block text-xl font-bold text-[#15AABF]">Home</a>
                        <a href="/destinations" className="block text-lg font-semibold text-gray-700">Destinations</a>
                        <a href="/bookings" className="block text-lg font-semibold text-gray-700">My Bookings</a>
                        <a href="/admin" className="block text-lg font-semibold text-gray-700">Admin</a>

                        <div className="pt-4 border-t border-gray-100 flex flex-col gap-6">
                            <a href="/profile" className="flex items-center gap-3 font-semibold text-gray-700 text-lg">
                                <UserIcon className="w-6 h-6" /> Profile
                            </a>
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