'use client'
import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function FutureTechSection() {
    const pathName = usePathname();

    if(pathName.startsWith('/dashboard')){
        return null;
    }

    const features = [
        {
            title: 'Resource Access',
            description:
                'Visitors can access a wide range of resources, including ebooks, whitepapers, reports.',
        },
        {
            title: 'Community Forum',
            description:
                'Join our active community forum to discuss industry trends, share insights, and collaborate with peers.',
        },
        {
            title: 'Tech Events',
            description:
                'Stay updated on upcoming tech events, webinars, and conferences to enhance your knowledge.',
        },
    ];

    return (
        <section className="bg-[#141414] text-white py-16 px-6 sm:px-10 lg:px-16 font-sans">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* --- HEADER SECTION --- */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
                    {/* Yellow Abstract Logo */}
                    <div className="shrink-0">
                        <svg
                            className="w-20 h-20 sm:w-24 sm:h-24 text-[#FFD000]"
                            viewBox="0 0 100 100"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* Top Left Arc */}
                            <path d="M 30 10 C 15 10, 10 25, 10 40 C 25 40, 40 35, 40 20 C 40 10, 30 10, 30 10 Z" />
                            {/* Top Right Arc */}
                            <path d="M 90 30 C 90 15, 75 10, 60 10 C 60 25, 65 40, 80 40 C 90 40, 90 30, 90 30 Z" />
                            {/* Bottom Right Arc */}
                            <path d="M 70 90 C 85 90, 90 75, 90 60 C 75 60, 60 65, 60 80 C 60 90, 70 90, 70 90 Z" />
                            {/* Bottom Left Arc */}
                            <path d="M 10 70 C 10 85, 25 90, 40 90 C 40 75, 35 60, 20 60 C 10 60, 10 70, 10 70 Z" />
                        </svg>
                    </div>

                    {/* Text Area */}
                    <div className="space-y-3 max-w-3xl">
                        {/* Tag/Badge */}
                        <span className="inline-block px-3 py-1 bg-[#222222] border border-[#333333] text-xs font-medium text-zinc-300 rounded-md">
                            Learn, Connect, and Innovate
                        </span>

                        {/* Title */}
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                            Be Part of the Future Tech Revolution
                        </h2>

                        {/* Subtitle */}
                        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed pt-1">
                            Immerse yourself in the world of future technology. Explore our comprehensive resources, connect with fellow tech enthusiasts, and drive innovation in the industry. Join a dynamic community of forward-thinkers.
                        </p>
                    </div>
                </div>

                {/* --- FEATURE CARDS GRID CONTAINER --- */}
                <div className="bg-[#1a1a1a] border border-[#262626] rounded-2xl p-3 sm:p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-[#141414] border border-[#262626] hover:border-[#333333] rounded-xl p-6 flex flex-col justify-between transition-all duration-300 group cursor-pointer min-h-[160px]"
                            >
                                {/* Card Header (Title & Arrow Button) */}
                                <div className="flex items-center justify-between gap-4">
                                    <h3 className="text-base font-semibold text-white group-hover:text-[#FFD000] transition-colors">
                                        {feature.title}
                                    </h3>

                                    {/* Circle Arrow Button */}
                                    <div className="w-10 h-10 rounded-full bg-[#FFD000] flex items-center justify-center text-black shrink-0 group-hover:scale-105 transition-transform">
                                        <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                                    </div>
                                </div>

                                {/* Card Description */}
                                <p className="text-xs text-zinc-400 leading-relaxed mt-4">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}