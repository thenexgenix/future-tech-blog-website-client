'use client';

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <main className="min-h-screen w-full bg-[#010000] text-white flex items-center justify-center relative overflow-hidden px-6 py-24">
            {/* Background Grid Pattern & Glow Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(#1f1f1f_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#FFD100]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
                {/* Badge */}
                <div className="inline-block">
                    <span className="bg-[#1A1A1A] text-gray-300 text-xs sm:text-sm font-medium px-4 py-1.5 rounded-full border border-[#262626] shadow-inner">
                        404 Error
                    </span>
                </div>

                {/* Main Heading & Code */}
                <div className="space-y-3">
                    <h1 className="text-7xl sm:text-9xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600 font-sans">
                        404
                    </h1>
                    <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
                        Page Not Found
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                        Sorry, the page you are looking for doesn&apos;t exist or has been moved to another URL.
                    </p>
                </div>

                {/* Quick Action Links */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Link
                        href="/"
                        className="w-full sm:w-auto bg-[#FFD100] hover:bg-[#e6bd00] text-black font-semibold rounded-xl px-6 py-3 text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-[#FFD100]/10"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Back to Home
                    </Link>

                    <Link
                        href="/news"
                        className="w-full sm:w-auto bg-[#1A1A1A] hover:bg-[#222222] text-gray-300 hover:text-white border border-[#262626] rounded-xl px-6 py-3 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
                    >
                        Browse Blogs
                        <svg className="w-4 h-4 text-[#FFD100]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                    </Link>
                </div>

                {/* Helpful Suggestions */}
                <div className="pt-8 border-t border-[#262626]/80 max-w-sm mx-auto">
                    <p className="text-xs text-gray-500 mb-3">Or check out these pages:</p>
                    <div className="flex justify-center items-center gap-4 text-xs font-medium text-gray-400">
                        <Link href="/resources" className="hover:text-[#FFD100] transition-colors">Resources</Link>
                        <span>•</span>
                        <Link href="/news" className="hover:text-[#FFD100] transition-colors">News</Link>
                        <span>•</span>
                        <Link href="/contact" className="hover:text-[#FFD100] transition-colors">Contact Support</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}