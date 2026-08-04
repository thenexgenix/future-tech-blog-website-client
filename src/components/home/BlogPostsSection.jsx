import React from 'react';
import Link from 'next/link';
import { getAllNews } from '@/lib/api/news';
import { getAllCategory } from '@/lib/api/category';
import BlogListClient from './BlogListClient';

export default async function BlogPostsSection() {
    let news = [];
    let categories = [];
    let error = null;

    try {
        // Parallel server-side fetching
        const [newsRes, categoryRes] = await Promise.all([
            getAllNews(),
            getAllCategory(),
        ]);

        news = newsRes || [];
        categories = categoryRes || [];
    } catch (err) {
        console.error("Server Fetch Error:", err);
        error = "Failed to load blogs and categories.";
    }

    return (
        <section className="w-full bg-[#010000] text-white">
            {/* Header Section */}
            <div className="border-b border-[#262626] bg-[#141414]">
                <div className="max-w-[1400px] mx-auto px-6 py-12 sm:py-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
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

                    <Link
                        href="/news"
                        className="bg-[#1A1A1A] hover:bg-[#202020] text-gray-300 hover:text-white border border-[#262626] rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200 flex items-center gap-2 self-start md:self-auto"
                    >
                        View All Blogs
                        <svg className="w-4 h-4 text-[#FFD100]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* Error UI or Client Component Pass */}
            {error ? (
                <div className="py-16 text-center text-rose-500 space-y-2">
                    <p className="text-base font-semibold">Failed to fetch data!</p>
                    <p className="text-xs text-gray-400">{error}</p>
                </div>
            ) : (
                <BlogListClient initialBlogs={news} categories={categories} />
            )}
        </section>
    );
}