"use client"
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-black text-gray-400">
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">

                {/* TOP BRAND SECTION */}
                <div className="mb-14">
                    <h1 className="text-5xl md:text-6xl font-bold text-white">
                        Wanderlust
                    </h1>

                    <p className="mt-4 max-w-xl text-gray-400">
                        Your gateway to extraordinary travel experiences around the world.
                    </p>
                </div>

                {/* GRID SECTION */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 tracking-wide">
                            NEWSLETTER
                        </h3>

                        <p className="text-sm mb-5">
                            Subscribe for exclusive travel deals and inspiration.
                        </p>

                        <div className="flex items-center bg-white/10 border border-white/10 rounded-lg overflow-hidden">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-transparent px-4 py-3 outline-none flex-1 text-sm text-white placeholder-gray-400"
                            />

                            <button className="bg-cyan-500 text-black hover:bg-cyan-600 px-4 py-3 transition">
                                →
                            </button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 tracking-wide">
                            QUICK LINKS
                        </h3>

                        <ul className="space-y-3 text-sm">
                            {["Home", "Destinations", "My Bookings", "My Profile"].map(
                                (item) => (
                                    <li
                                        key={item}
                                        className="hover:text-white transition cursor-pointer"
                                    >
                                        {item}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 tracking-wide">
                            SUPPORT
                        </h3>

                        <ul className="space-y-3 text-sm">
                            {["Help Center", "Terms of Service", "Privacy Policy"].map(
                                (item) => (
                                    <li
                                        key={item}
                                        className="hover:text-white transition cursor-pointer"
                                    >
                                        {item}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 tracking-wide">
                            CONTACT
                        </h3>

                        <ul className="space-y-3 text-sm">
                            <li>📞 786 901 1622</li>
                            <li>✉ info@wanderlust.com</li>
                            <li>🌍 Worldwide Service</li>
                        </ul>
                    </div>
                </div>

                {/* BOTTOM BAR */}
                <div className="border-t border-white/10 mt-14 pt-6 flex flex-col md:flex-row items-center justify-between gap-5">

                    <p className="text-sm text-gray-500 text-center md:text-left">
                        © 2026 Wanderlust. All rights reserved.
                    </p>

                    {/* Social Icons */}
                    <div className="flex items-center gap-4 text-white">
                        <a className="hover:text-cyan-400 transition cursor-pointer">
                            <FaFacebookF />
                        </a>

                        <a className="hover:text-cyan-400 transition cursor-pointer">
                            <FaTwitter />
                        </a>

                        <a className="hover:text-cyan-400 transition cursor-pointer">
                            <FaLinkedinIn />
                        </a>

                        <a className="hover:text-cyan-400 transition cursor-pointer">
                            <FaInstagram />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;