'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';

export default function BlogPostsSection() {
    const [activeCategory, setActiveCategory] = useState('All');

    const categories = [
        'All',
        'Quantum Computing',
        'AI Ethics',
        'Space Exploration',
        'Biotechnology',
        'Renewable Energy',
    ];

    const blogPosts = [
        {
            id: 1,
            author: {
                name: 'John Techson',
                category: 'Quantum Computing',
                avatar: 'https://i.pravatar.cc/100?img=12',
            },
            date: 'October 15, 2023',
            title: 'The Quantum Leap in Computing',
            description:
                'Explore the revolution in quantum computing, its applications, and its potential impact on various industries.',
            likes: '24.5k',
            isLiked: true,
            comments: 50,
            shares: 20,
            href: '/blogs/quantum-leap-in-computing',
        },
        {
            id: 2,
            author: {
                name: 'Sarah Ethicist',
                category: 'AI Ethics',
                avatar: 'https://i.pravatar.cc/100?img=47',
            },
            date: 'November 5, 2023',
            title: 'The Ethical Dilemmas of AI',
            description:
                'A deep dive into ethical challenges posed by AI, including bias, privacy, and transparency.',
            likes: '32k',
            isLiked: false,
            comments: 72,
            shares: 18,
            href: '/blogs/ethical-dilemmas-of-ai',
        },
        {
            id: 3,
            author: {
                name: 'Astronomer X',
                category: 'Space Exploration',
                avatar: 'https://i.pravatar.cc/100?img=68',
            },
            date: 'December 10, 2023',
            title: 'The Mars Colonization Challenge',
            description:
                'Exploring the technical and logistical challenges of human colonization on Mars.',
            likes: '20k',
            isLiked: false,
            comments: 31,
            shares: 12,
            href: '/blogs/mars-colonization-challenge',
        },
    ];

    const filteredPosts =
        activeCategory === 'All'
            ? blogPosts
            : blogPosts.filter((post) => post.author.category === activeCategory);

    return (
        <section className="w-full bg-[#010000] text-white">
            {/* 1. Header Section */}
            <div className="border-b border-[#262626] bg-[#141414]">
                <div className="max-w-350 mx-auto px-6 py-12 sm:py-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="inline-block mb-3">
                            <span className="bg-[#1A1A1A] text-gray-300 text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-md border border-[#262626]">
                                A Knowledge Treasure Trove
                            </span>
                        </div>
                        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-sans">
                            Explore FutureTech&apos;s In-Depth Blog Posts
                        </h2>
                    </div>

                    <Button
                        as={Link}
                        href="/blogs"
                        className="bg-[#1A1A1A] hover:bg-[#202020] text-gray-300 hover:text-white border border-[#262626] rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200 flex items-center gap-2 self-start md:self-auto"
                    >
                        View All Blogs
                        <svg
                            className="w-4 h-4 text-[#FFD100]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 17L17 7M17 7H7M17 7v10"
                            />
                        </svg>
                    </Button>
                </div>
            </div>

            {/* 2. Category Filter Tabs */}
            <div className="border-b border-[#262626]">
                <div className="max-w-350 mx-auto px-6 py-8 overflow-x-auto no-scrollbar">
                    <div className="flex items-center gap-3 min-w-max">
                        {categories.map((category) => {
                            const isActive = activeCategory === category;
                            return (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 border ${isActive
                                            ? 'bg-[#1A1A1A] text-white border-[#333333] shadow-inner'
                                            : 'bg-[#141414] text-gray-400 border-[#262626] hover:text-white hover:bg-[#1A1A1A]'
                                        }`}
                                >
                                    {category}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* 3. Blog List Container */}
            <div className="max-w-350 mx-auto">
                {filteredPosts.map((post) => (
                    <div
                        key={post.id}
                        className="grid grid-cols-1 lg:grid-cols-12 border-b border-[#262626] last:border-b-0 p-6 sm:p-10 lg:p-12 gap-8 items-center hover:bg-[#181818]/50 transition-colors duration-200"
                    >
                        {/* Left: Author Profile */}
                        <div className="lg:col-span-3 flex items-center gap-4">
                            <img
                                src={post.author.avatar}
                                alt={post.author.name}
                                className="w-14 h-14 rounded-full object-cover border border-[#262626]"
                            />
                            <div>
                                <h4 className="text-base font-semibold text-white">
                                    {post.author.name}
                                </h4>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    {post.author.category}
                                </p>
                            </div>
                        </div>

                        {/* Middle: Blog Details & Reactions */}
                        <div className="lg:col-span-6 space-y-4">
                            <span className="text-xs font-medium text-gray-400">
                                {post.date}
                            </span>

                            <div>
                                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-snug hover:text-[#FFD100] transition-colors duration-200">
                                    <Link href={post.href}>{post.title}</Link>
                                </h3>
                                <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
                                    {post.description}
                                </p>
                            </div>

                            {/* Reactions Pill Badge Group */}
                            <div className="flex items-center gap-3 pt-2">
                                {/* Likes Pill */}
                                <div className="flex items-center gap-1.5 bg-[#1A1A1A] border border-[#262626] px-3.5 py-1.5 rounded-full text-xs text-gray-300">
                                    <svg
                                        className={`w-4 h-4 ${post.isLiked ? 'text-[#FF3B30] fill-current' : 'text-gray-400'
                                            }`}
                                        viewBox="0 0 24 24"
                                        fill={post.isLiked ? 'currentColor' : 'none'}
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                    <span>{post.likes}</span>
                                </div>

                                {/* Comments Pill */}
                                <div className="flex items-center gap-1.5 bg-[#1A1A1A] border border-[#262626] px-3.5 py-1.5 rounded-full text-xs text-gray-300">
                                    <svg
                                        className="w-4 h-4 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                        />
                                    </svg>
                                    <span>{post.comments}</span>
                                </div>

                                {/* Shares Pill */}
                                <div className="flex items-center gap-1.5 bg-[#1A1A1A] border border-[#262626] px-3.5 py-1.5 rounded-full text-xs text-gray-300">
                                    <svg
                                        className="w-4 h-4 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                        />
                                    </svg>
                                    <span>{post.shares}</span>
                                </div>
                            </div>
                        </div>

                        {/* Right: View Blog Action Button */}
                        <div className="lg:col-span-3 flex lg:justify-end">
                            <Button
                                as={Link}
                                href={post.href}
                                className="bg-[#1A1A1A] hover:bg-[#222222] text-gray-300 hover:text-white border border-[#262626] rounded-xl px-6 py-2.5 text-sm font-medium transition-all duration-200 flex items-center gap-2"
                            >
                                View Blog
                                <svg
                                    className="w-4 h-4 text-[#FFD100]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M7 17L17 7M17 7H7M17 7v10"
                                    />
                                </svg>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}