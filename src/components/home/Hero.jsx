'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@heroui/react';

export default function Hero() {
    const stats = [
        { value: '300+', label: 'Resources available' },
        { value: '12k+', label: 'Total Downloads' },
        { value: '10k+', label: 'Active Users' },
    ];

    const features = [
        {
            title: 'Latest News Updates',
            subtitle: 'Stay Current',
            description: 'Over 1,000 articles published monthly',
            href: '/news',
            icon: (
                <svg className="w-6 h-6 text-[#FFD100]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
                </svg>
            ),
        },
        {
            title: 'Expert Contributors',
            subtitle: 'Trusted Insights',
            description: '50+ renowned AI experts on our team',
            href: '/resources',
            icon: (
                <div className="grid grid-cols-2 gap-0.5 w-6 h-6">
                    <div className="bg-[#FFD100] rounded-full"></div>
                    <div className="bg-[#FFD100]/60 rounded-full"></div>
                    <div className="bg-[#FFD100]/60 rounded-full"></div>
                    <div className="bg-[#FFD100] rounded-full"></div>
                </div>
            ),
        },
        {
            title: 'Global Readership',
            subtitle: 'Worldwide Impact',
            description: '2 million monthly readers',
            href: '/blogs',
            icon: (
                <svg className="w-6 h-6 text-[#FFD100]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
            ),
        },
    ];

    return (
        <section className="w-full bg-[#010000] text-white border-b border-[#262626] overflow-hidden">
            <div className="max-w-350 mx-auto">

                {/* Top Hero Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-[#262626]">

                    {/* Left Hero Content */}
                    <div className="lg:col-span-7 p-8 sm:p-12 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#262626]">
                        <div>
                            <p className="text-gray-400 text-sm sm:text-base font-medium mb-4 tracking-wide">
                                Your Journey to Tomorrow Begins Here
                            </p>
                            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15] mb-6">
                                Explore the Frontiers of Artificial Intelligence
                            </h1>
                            <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl">
                                Welcome to the epicenter of AI innovation. FutureTech AI News is your passport to a world where machines think, learn, and reshape the future. Join us on this visionary expedition into the heart of AI.
                            </p>
                        </div>

                        {/* Stats Row (Desktop Bottom / Mobile Stacked) */}
                        <div className="grid grid-cols-3 gap-4 pt-12 mt-8 border-t border-[#262626]">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="flex flex-col">
                                    <div className="text-2xl sm:text-4xl font-bold text-white flex items-center">
                                        {stat.value.replace('+', '')}
                                        <span className="text-[#FFD100]">+</span>
                                    </div>
                                    <span className="text-xs sm:text-sm text-gray-400 mt-1">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-5 p-8 sm:p-12 lg:p-12 flex flex-col justify-end relative bg-[#141414] overflow-hidden min-h-[400px]">

                        {/* Abstract Rays Background Image */}
                        <div
                            className="absolute top-0 right-0 w-full h-full opacity-60 pointer-events-none bg-no-repeat bg-top bg-cover"
                            style={{
                                backgroundImage: `url('/abstract-design.png')`,
                            }}
                        />

                        <div className="relative z-10 space-y-6">
                            {/* User Avatars Stack */}
                            <div className="inline-flex items-center gap-1 bg-[#1A1A1A]/80 border border-[#262626] p-1.5 rounded-full backdrop-blur-md">
                                <div className="flex -space-x-2">
                                    <img className="w-8 h-8 rounded-full border-2 border-[#141414] object-cover" src="https://i.pravatar.cc/100?img=11" alt="user" />
                                    <img className="w-8 h-8 rounded-full border-2 border-[#141414] object-cover" src="https://i.pravatar.cc/100?img=12" alt="user" />
                                    <img className="w-8 h-8 rounded-full border-2 border-[#141414] object-cover" src="https://i.pravatar.cc/100?img=13" alt="user" />
                                    <img className="w-8 h-8 rounded-full border-2 border-[#141414] object-cover" src="https://i.pravatar.cc/100?img=14" alt="user" />
                                </div>
                            </div>

                            {/* Title & Description */}
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">Explore 1000+ resources</h3>
                                <p className="text-gray-400 text-sm">Over 1,000 articles on emerging tech trends and breakthroughs.</p>
                            </div>

                            {/* Action Button */}
                            <div>
                                <Button
                                    as={Link}
                                    href="/resources"
                                    className="bg-[#1A1A1A] hover:bg-[#222222] text-gray-300 hover:text-white border border-[#262626] rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200 flex items-center gap-2"
                                >
                                    Explore Resources
                                    <svg className="w-4 h-4 text-[#FFD100]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H7M17 7v10" />
                                    </svg>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Feature Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#262626]">
                    {features.map((item, index) => (
                        <div key={index} className="p-8 sm:p-10 flex flex-col justify-between hover:bg-[#1A1A1A]/40 transition-colors duration-200 group">
                            <div>
                                {/* Header Icon & Circle Arrow Button */}
                                <div className="flex items-center justify-between mb-6">
                                    <div>{item.icon}</div>
                                    <Link
                                        href={item.href}
                                        className="w-10 h-10 rounded-full bg-[#FFD100] flex items-center justify-center text-black hover:scale-105 transition-transform duration-200"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M7 17L17 7M17 7H7M17 7v10" />
                                        </svg>
                                    </Link>
                                </div>

                                {/* Text Content */}
                                <div>
                                    <h4 className="text-lg font-semibold text-white group-hover:text-[#FFD100] transition-colors duration-200">
                                        {item.title}
                                    </h4>
                                    <p className="text-xs text-gray-400 mt-1 mb-4">{item.subtitle}</p>
                                </div>
                            </div>

                            <p className="text-sm text-gray-400 mt-4 border-t border-[#262626] pt-4">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}