"use client";

import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, Loader2, Image } from 'lucide-react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import { toast } from '@heroui/react';
import { useRouter } from "next/navigation";

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        imageLink: '',
        confirmPassword: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setError(''); // ইউজার টাইপ করা শুরু করলে এরর রিমুভ হবে
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        if (user.password !== user.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            setIsLoading(true);
            setError("");

            const { data, error } = await authClient.signUp.email({
                email: user.email,
                password: user.password,
                confirmPassword: user.confirmPassword,
                name: user.fullName,
                image: user.imageLink,
            });


            // console.log("Signup Response:", data, error);
            if (error) {
                setError(error.message || "Signup failed");
                return;
            }

            await authClient.signOut();
            toast.success("Account created successfully!");
            router.refresh();
            router.push("/login");

        } catch (err) {
            console.error(err);
            setError("Something went wrong");
        } finally {
            setIsLoading(false);
        }

    };

    return (
        <div className="min-h-screen bg-slate-50/50 flex flex-col justify-center items-center py-10 px-4 sm:px-6 lg:px-8 font-sans antialiased">
            {/* Header Section */}
            <div className="text-center mb-6 max-w-md w-full">
                <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 tracking-tight">
                    Create Account
                </h2>
                <p className="text-sm sm:text-base text-slate-500 mt-2">
                    Start your adventure with <span className="font-medium text-[#149fc6]">Wanderlust</span>
                </p>
            </div>

            {/* Form Card */}
            <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100/80 w-full max-w-[460px] transition-all duration-300">

                {/* Error Alert */}
                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium animate-in fade-in duration-200">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Full Name Field */}
                    <div>
                        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                            Full Name
                        </label>
                        <div className="relative group flex items-center bg-[#f8faff] border border-slate-200 rounded-xl focus-within:border-[#149fc6] focus-within:ring-4 focus-within:ring-cyan-500/10 transition-all duration-200">
                            <div className="absolute left-4 pointer-events-none">
                                <User className="h-5 w-5 text-slate-400 group-focus-within:text-[#149fc6] transition-colors" />
                            </div>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-3 bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none text-sm"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                    </div>

                    {/* Email Address Field */}
                    <div>
                        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                            Email Address
                        </label>
                        <div className="relative group flex items-center bg-[#f8faff] border border-slate-200 rounded-xl focus-within:border-[#149fc6] focus-within:ring-4 focus-within:ring-cyan-500/10 transition-all duration-200">
                            <div className="absolute left-4 pointer-events-none">
                                <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-[#149fc6] transition-colors" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-3 bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none text-sm"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                    </div>
                    {/* Image Link Field */}
                    <div>
                        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                            Image Link
                        </label>
                        <div className="relative group flex items-center bg-[#f8faff] border border-slate-200 rounded-xl focus-within:border-[#149fc6] focus-within:ring-4 focus-within:ring-cyan-500/10 transition-all duration-200">
                            <div className="absolute left-4 pointer-events-none">
                                <Image alt="" aria-hidden="true" className="h-5 w-5 text-slate-400 group-focus-within:text-[#149fc6] transition-colors" />
                            </div>
                            <input
                                type="url"
                                name="imageLink"
                                value={formData.imageLink}
                                onChange={handleChange}
                                className="w-full pl-12 pr-4 py-3 bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none text-sm"
                                placeholder="Enter image link"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                            Password
                        </label>
                        <div className="relative group flex items-center bg-[#f8faff] border border-slate-200 rounded-xl focus-within:border-[#149fc6] focus-within:ring-4 focus-within:ring-cyan-500/10 transition-all duration-200">
                            <div className="absolute left-4 pointer-events-none">
                                <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-[#149fc6] transition-colors" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full pl-12 pr-12 py-3 bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none text-sm"
                                placeholder="Create a password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 text-slate-400 hover:text-slate-600 focus:outline-none"
                            >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div>
                        <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                            Confirm Password
                        </label>
                        <div className="relative group flex items-center bg-[#f8faff] border border-slate-200 rounded-xl focus-within:border-[#149fc6] focus-within:ring-4 focus-within:ring-cyan-500/10 transition-all duration-200">
                            <div className="absolute left-4 pointer-events-none">
                                <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-[#149fc6] transition-colors" />
                            </div>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full pl-12 pr-12 py-3 bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none text-sm"
                                placeholder="Confirm your password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 text-slate-400 hover:text-slate-600 focus:outline-none"
                            >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 px-4 bg-[#149fc6] hover:bg-[#1083a4] disabled:bg-cyan-600/70 text-white font-medium rounded-xl transition-all duration-200 shadow-md shadow-cyan-500/10 text-sm mt-3 flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Creating Account...
                            </>
                        ) : (
                            'Create Account'
                        )}
                    </button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-slate-200/80"></div>
                    </div>
                    <div className="relative flex justify-center text-xs">
                        <span className="px-3 bg-white text-slate-400 font-medium tracking-wide uppercase">Or sign up with</span>
                    </div>
                </div>

                {/* Google Sign Up Button */}
                <button
                    type="button"
                    className="w-full py-3 px-4 border border-slate-200 rounded-xl bg-white text-slate-700 font-medium hover:bg-slate-50 active:bg-slate-100/80 transition-all duration-150 flex items-center justify-center gap-2.5 text-sm shadow-sm"
                >
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                        <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.355 0 3.364 2.673 1.345 6.573l3.92 3.192z" />
                        <path fill="#4285F4" d="M23.49 12.275c0-.796-.073-1.564-.205-2.305H12v4.364h6.445a5.518 5.518 0 0 1-2.395 3.623l3.73 2.89c2.181-2.01 3.44-4.968 3.44-8.572z" />
                        <path fill="#FBBC05" d="M5.266 14.235A7.053 7.053 0 0 1 4.909 12c0-.791.132-1.55.357-2.265L1.345 6.545A11.934 11.934 0 0 0 0 12c0 1.98.482 3.85 1.332 5.5l3.934-3.265z" />
                        <path fill="#34A853" d="M12 24c3.24 0 5.955-1.077 7.94-2.914l-3.73-2.89c-1.033.695-2.355 1.105-4.21 1.105-3.236 0-5.982-2.182-6.964-5.123l-3.932 3.264A11.956 11.956 0 0 0 12 24z" />
                    </svg>
                    Sign Up With Google
                </button>

                {/* Footer Link */}
                <div className="text-center mt-6 text-sm text-slate-500">
                    Already have an account?{' '}
                    <Link href="/login" className="text-[#149fc6] hover:text-[#1083a4] hover:underline font-semibold transition-colors ml-1">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
