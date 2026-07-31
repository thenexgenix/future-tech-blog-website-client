'use client'
import React from 'react';
import { ArrowUpRight, } from 'lucide-react';
import { FaLinkedin } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa6';
import { usePathname } from 'next/navigation';

export default function Footer() {

    const pathName = usePathname();

    if (pathName.startsWith('/dashboard')) {
        return null;
    }

    const footerSections = [
        {
            title: 'Home',
            links: [
                { name: 'Features' },
                { name: 'Blogs' },
                { name: 'Resources', badge: 'New' },
                { name: 'Testimonials' },
                { name: 'Contact Us' },
                { name: 'Newsletter' },
            ],
        },
        {
            title: 'News',
            links: [
                { name: 'Trending Stories' },
                { name: 'Featured Videos' },
                { name: 'Technology' },
                { name: 'Health' },
                { name: 'Politics' },
                { name: 'Environment' },
            ],
        },
        {
            title: 'Blogs',
            links: [
                { name: 'Quantum Computing' },
                { name: 'AI Ethics' },
                { name: 'Space Exploration' },
                { name: 'Biotechnology', badge: 'New' },
                { name: 'Renewable Energy' },
                { name: 'Biohacking' },
            ],
        },
        {
            title: 'Podcasts',
            links: [
                { name: 'AI Revolution' },
                { name: 'AI Revolution', badge: 'New' },
                { name: 'TechTalk AI' },
                { name: 'AI Conversations' },
            ],
        },
    ];

    const resourceButtons = [
        { name: 'Whitepapers' },
        { name: 'Ebooks' },
        { name: 'Reports' },
        { name: 'Research Papers' },
    ];

    return (
        <footer className="bg-[#101010] text-white pt-16 pb-12 px-6 sm:px-10 lg:px-16 font-sans border-t border-[#262626]">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* --- TOP LINKS GRID --- */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 lg:gap-12">

                    {/* Navigation Columns (Home, News, Blogs, Podcasts) */}
                    {footerSections.map((section, idx) => (
                        <div key={idx} className="space-y-4">
                            <h3 className="text-sm font-semibold text-white tracking-wide">
                                {section.title}
                            </h3>
                            <ul className="space-y-3">
                                {section.links.map((link, lIdx) => (
                                    <li key={lIdx} className="flex items-center gap-2">
                                        <a
                                            href="#"
                                            className="text-xs text-zinc-400 hover:text-white transition-colors"
                                        >
                                            {link.name}
                                        </a>
                                        {link.badge && (
                                            <span className="text-[10px] px-1.5 py-0.5 bg-[#1f1f1f] text-zinc-300 border border-[#333333] rounded">
                                                {link.badge}
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Resources Column (With Button-style Links) */}
                    <div className="space-y-4 col-span-2 sm:col-span-1">
                        <h3 className="text-sm font-semibold text-white tracking-wide">
                            Resources
                        </h3>
                        <div className="flex flex-col space-y-2.5">
                            {resourceButtons.map((btn, bIdx) => (
                                <a
                                    key={bIdx}
                                    href="#"
                                    className="inline-flex items-center justify-between px-3.5 py-2 bg-[#1a1a1a] hover:bg-[#222222] border border-[#262626] hover:border-[#333333] rounded-lg text-xs text-zinc-300 hover:text-white transition-all w-full max-w-[170px] group"
                                >
                                    <span>{btn.name}</span>
                                    <ArrowUpRight className="w-3.5 h-3.5 text-[#FFD000] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                </div>

                {/* --- BOTTOM BAR --- */}
                <div className="pt-8 border-t border-[#262626] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-500">

                    {/* Terms & Privacy */}
                    <div className="flex items-center space-x-3">
                        <a href="#" className="hover:text-zinc-300 transition-colors">
                            Terms & Conditions
                        </a>
                        <span className="text-zinc-700">|</span>
                        <a href="#" className="hover:text-zinc-300 transition-colors">
                            Privacy Policy
                        </a>
                    </div>

                    {/* Social Icons */}
                    <div className="flex items-center space-x-4">
                        <a
                            href="#"
                            className="p-2 bg-[#1a1a1a] hover:bg-[#222222] border border-[#262626] rounded-full text-zinc-300 hover:text-white transition-colors"
                        >
                            <FaTwitter className="w-4 h-4" />
                        </a>
                        <a
                            href="#"
                            className="p-2 bg-[#1a1a1a] hover:bg-[#222222] border border-[#262626] rounded-full text-zinc-300 hover:text-white transition-colors"
                        >
                            {/* Medium SVG Icon */}
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42c1.87 0 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="p-2 bg-[#1a1a1a] hover:bg-[#222222] border border-[#262626] rounded-full text-zinc-300 hover:text-white transition-colors"
                        >
                            <FaLinkedin className="w-4 h-4" />
                        </a>
                    </div>

                    {/* Copyright */}
                    <div>
                        <p>© 2024 FutureTech. All rights reserved.</p>
                    </div>

                </div>

            </div>
        </footer>
    );
}