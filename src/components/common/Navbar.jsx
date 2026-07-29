'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@heroui/react';

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'News', href: '/news' },
        { name: 'Podcasts', href: '/podcasts' },
        { name: 'Resources', href: '/resources' },
    ];

    return (
        <header className="sticky top-0 z-50 w-full bg-[#141414] border-b border-[#262626]">
            <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        {/* Custom FutureTech Yellow Icon */}
                        <div className="w-8 h-8 flex items-center justify-center">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                className="w-8 h-8 text-[#FFD100]"
                                stroke="currentColor"
                                strokeWidth="2.5"
                            >
                                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white font-sans">
                            FutureTech
                        </span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden md:flex items-center gap-2 bg-[#1A1A1A] p-1.5 rounded-xl border border-[#262626]">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                            ? 'bg-[#141414] text-white border border-[#262626] shadow-sm'
                                            : 'text-gray-400 hover:text-white hover:bg-[#202020]'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Contact Us CTA Button */}
                    <div className="hidden md:flex items-center">
                        <Button
                            as={Link}
                            href="/contact"
                            className="bg-[#FFD100] text-black font-semibold text-sm px-6 py-2.5 rounded-xl hover:bg-[#e6bd00] transition-colors duration-200"
                        >
                            Contact Us
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-lg bg-[#1A1A1A] text-gray-400 hover:text-white border border-[#262626] focus:outline-none"
                            aria-label="Toggle Menu"
                        >
                            {isMobileMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-[#141414] border-b border-[#262626] px-4 pt-3 pb-6 space-y-3">
                    <div className="flex flex-col gap-2">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`px-4 py-3 rounded-lg text-base font-medium ${isActive
                                            ? 'bg-[#1A1A1A] text-white border border-[#262626]'
                                            : 'text-gray-400 hover:text-white hover:bg-[#1A1A1A]'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>
                    <div className="pt-2">
                        <Button
                            as={Link}
                            href="/contact"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="w-full bg-[#FFD100] text-black font-semibold text-center py-3 rounded-xl hover:bg-[#e6bd00]"
                        >
                            Contact Us
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
}