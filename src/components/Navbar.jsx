"use client"
import { UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import { useRouter } from "next/navigation";

const UserAvatar = ({ user, size = 36 }) => {
    const [imageError, setImageError] = useState(false);
    const imageSrc = user?.image?.trim();
    const hasValidImageSrc = imageSrc?.startsWith("/") || imageSrc?.startsWith("http://") || imageSrc?.startsWith("https://");
    const firstName = user?.name?.trim().split(/\s+/)[0] || "User";
    const fallbackText = firstName.charAt(0).toUpperCase();
    const avatarSize = size === 48 ? "w-12 h-12" : "w-9 h-9";

    if (!hasValidImageSrc || imageError) {
        return (
            <span
                className={`${avatarSize} rounded-full border-2 border-[#15AABF] bg-[#15AABF] text-white flex items-center justify-center font-bold`}
                title={firstName}
            >
                {fallbackText}
            </span>
        );
    }

    return (
        <Image
            src={imageSrc}
            alt={user?.name || "user"}
            onError={() => setImageError(true)}
            className={`${avatarSize} rounded-full object-cover border-2 border-[#15AABF] hover:border-[#1083a4] cursor-pointer transition-all`}
            width={size}
            height={size}
        />
    );
};

const Navbar = () => {
    const {
        data: session,

    } = authClient.useSession()

    const user = session?.user;
    const [isOpen, setIsOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Destination', href: '/destination' },
        { name: 'My Bookings', href: '/bookings' },
        { name: 'Admin', href: '/admin' },
        { name: 'Add-Destination', href: '/add-destination' }
    ];
    const router = useRouter();

    const handleLogout = async () => {
        await authClient.signOut();
        router.refresh();
        router.push("/login");
    };

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 w-full">
            <div className="w-[97%] xl:w-[95%] max-w-430 mx-auto px-4 sm:px-6 lg:px-8">
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

                            <Link
                                href="/profile"
                                className={`flex items-center gap-1.5 font-semibold transition-colors ${pathname === "/profile"
                                    ? "text-[#15AABF]"
                                    : "text-gray-700 hover:text-[#15AABF]"
                                    }`}
                            >
                                <UserIcon className="w-6 h-6" />
                                <span>Profile</span>
                            </Link>

                            {user ? (
                                <div className="flex items-center gap-4 relative">

                                    {/* User Image with Dropdown */}
                                    <button
                                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                                        className="relative focus:outline-none"
                                    >
                                        <UserAvatar user={user} />
                                    </button>

                                    {/* User Profile Dropdown Menu */}
                                    {isProfileOpen && (
                                        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                                            <div className="p-4 border-b border-gray-100">
                                                <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                                                <p className="text-xs text-gray-500">{user?.email}</p>
                                            </div>
                                            <Link
                                                href="/profile"
                                                onClick={() => setIsProfileOpen(false)}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all"
                                            >
                                                View Profile
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    handleLogout();
                                                    setIsProfileOpen(false);
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-all border-t border-gray-100"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}

                                </div>
                            ) : (
                                <div className="flex items-center gap-6">

                                    <Link
                                        href="/login"
                                        className="text-gray-700 hover:text-[#15AABF] font-semibold transition-colors"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        href="/signup"
                                        className="text-gray-700 hover:text-[#15AABF] font-semibold transition-colors"
                                    >
                                        Sign Up
                                    </Link>

                                </div>
                            )}

                        </div>

                        <div className="lg:hidden flex items-center">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="text-gray-700 p-2 hover:bg-gray-50 rounded-md transition-all"
                            >
                                {isOpen ? (
                                    <XMarkIcon className="h-8 w-8" />
                                ) : (
                                    <Bars3Icon className="h-8 w-8" />
                                )}
                            </button>

                            {/* Mobile User Image Button */}
                            {user && (
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="ml-2 relative focus:outline-none"
                                >
                                    <UserAvatar user={user} />
                                </button>
                            )}
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
                            {user ? (
                                <>
                                    {/* User Info Section */}
                                    <div className="flex items-center gap-3 pb-4">
                                        <UserAvatar user={user} size={48} />
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                                            <p className="text-xs text-gray-500">{user?.email}</p>
                                        </div>
                                    </div>

                                    {/* Profile Link */}
                                    <Link
                                        href="/profile"
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center gap-3 font-semibold text-lg ${pathname === '/profile' ? 'text-[#15AABF]' : 'text-gray-700'}`}
                                    >
                                        <UserIcon className="w-6 h-6" /> Profile
                                    </Link>

                                    {/* Logout Button */}
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsOpen(false);
                                        }}
                                        className="w-full py-2 text-center text-white bg-red-500 hover:bg-red-600 rounded-lg font-bold text-base transition-all"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/profile"
                                        onClick={() => setIsOpen(false)}
                                        className={`flex items-center gap-3 font-semibold text-lg ${pathname === '/profile' ? 'text-[#15AABF]' : 'text-gray-700'}`}
                                    >
                                        <UserIcon className="w-6 h-6" /> Profile
                                    </Link>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Link href="/login" onClick={() => setIsOpen(false)} className="py-3 text-center border-2 border-[#15AABF] text-[#15AABF] rounded-xl font-bold">Login</Link>
                                        <Link href="/signup" onClick={() => setIsOpen(false)} className="py-3 text-center bg-[#15AABF] text-white rounded-xl font-bold shadow-md shadow-cyan-100">Sign Up</Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Profile Dropdown (when user image clicked) */}
            {isProfileOpen && (
                <div className="lg:hidden fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
            )}
            {isProfileOpen && (
                <div className="lg:hidden absolute top-20 right-4 w-56 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                    <div className="p-4 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <Link
                        href="/profile"
                        onClick={() => setIsProfileOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-all"
                    >
                        View Profile
                    </Link>
                    <button
                        onClick={() => {
                            handleLogout();
                            setIsProfileOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-all border-t border-gray-100"
                    >
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
