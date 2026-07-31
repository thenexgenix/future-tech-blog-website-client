'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllNews } from '@/lib/api/news';
import { getAllCategory } from '@/lib/api/category';

export default function BlogPostsSection() {
    const [blogs, setBlogs] = useState([]);
    const [categories, setCategories] = useState(['All']);
    const [activeCategory, setActiveCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true);
            setError('');

            try {
                const [newsRes, categoryRes] = await Promise.all([
                    getAllNews(),
                    getAllCategory()
                ]);

                // 1. Handle Blogs Data
                if (newsRes?.success || Array.isArray(newsRes?.data || newsRes)) {
                    const fetchedNews = newsRes?.data || newsRes || [];
                    setBlogs(fetchedNews);
                } else {
                    throw new Error(newsRes?.message || 'Failed to fetch blogs');
                }

                // 2. Handle Dynamic Categories Data
                if (categoryRes?.success || Array.isArray(categoryRes?.data || categoryRes)) {
                    const fetchedCategories = categoryRes?.data || categoryRes || [];

                    const categoryNames = fetchedCategories.map((cat) =>
                        typeof cat === 'string' ? cat : cat.name || cat.title
                    );

                    setCategories(['All', ...new Set(categoryNames)]);
                }

            } catch (err) {
                console.error("Fetch Error:", err);
                setError(err?.message || 'Failed to fetch data from server');
            } finally {
                setLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    // Active Category অনুযায়ী Filtering
    const filteredPosts = activeCategory === 'All'
        ? blogs
        : blogs.filter((post) => {
            const postCategory = post.category?.name || post.category || post.author?.category;
            return postCategory?.toLowerCase() === activeCategory.toLowerCase();
        });

    return (
        <section className="w-full bg-[#010000] text-white">
            {/* 1. Header Section */}
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

                    {/* Pure Link Component: View All Blogs */}
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

            {/* 2. Dynamic Categories Tab */}
            <div className="border-b border-[#262626]">
                <div className="max-w-[1400px] mx-auto px-6 py-8 overflow-x-auto no-scrollbar">
                    <div className="flex items-center gap-3 min-w-max">
                        {categories.map((category, index) => {
                            const isActive = activeCategory === category;
                            return (
                                <button
                                    key={index}
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

            {/* 3. Content Section */}
            <div className="max-w-[1400px] mx-auto">
                {/* Loading State */}
                {loading && (
                    <div className="py-20 text-center text-gray-400 space-y-3">
                        <div className="w-8 h-8 border-2 border-[#FFD100] border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-sm">Fetching blogs & categories...</p>
                    </div>
                )}

                {/* Error State */}
                {!loading && error && (
                    <div className="py-16 text-center text-rose-500 space-y-2">
                        <p className="text-base font-semibold">Failed to fetch data!</p>
                        <p className="text-xs text-gray-400">{error}</p>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && filteredPosts.length === 0 && (
                    <div className="py-20 text-center text-gray-500">
                        <p className="text-sm">No blogs found for {activeCategory}.</p>
                    </div>
                )}

                {/* Posts List */}
                {!loading && !error && filteredPosts.map((post) => {
                    const postId = post._id || post.id;
                    const blogSlug = post.slug || postId;
                    const authorName = post.author?.name || post.authorName || 'Anonymous';
                    const authorCategory = post.category?.name || post.category || 'General';
                    const authorAvatar = post.author?.avatar || `https://i.pravatar.cc/100?u=${postId}`;

                    const formattedDate = post.createdAt
                        ? new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                        : post.date || 'N/A';

                    return (
                        <div
                            key={postId}
                            className="grid grid-cols-1 lg:grid-cols-12 border-b border-[#262626] last:border-b-0 p-6 sm:p-10 lg:p-12 gap-8 items-center hover:bg-[#181818]/50 transition-colors duration-200"
                        >
                            {/* Author */}
                            <div className="lg:col-span-3 flex items-center gap-4">
                                <img
                                    src={authorAvatar}
                                    alt={authorName}
                                    className="w-14 h-14 rounded-full object-cover border border-[#262626]"
                                />
                                <div>
                                    <h4 className="text-base font-semibold text-white">{authorName}</h4>
                                    <p className="text-xs text-gray-400 mt-0.5">{authorCategory}</p>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="lg:col-span-6 space-y-4">
                                <span className="text-xs font-medium text-gray-400">{formattedDate}</span>
                                <div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-snug hover:text-[#FFD100] transition-colors duration-200">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
                                        {post.description || post.summary || post.content}
                                    </p>
                                </div>

                                {/* Reactions */}
                                <div className="flex items-center gap-3 pt-2">
                                    <div className="flex items-center gap-1.5 bg-[#1A1A1A] border border-[#262626] px-3.5 py-1.5 rounded-full text-xs text-gray-300">
                                        <span>❤️ {post.likes || post.likeCount || 0}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-[#1A1A1A] border border-[#262626] px-3.5 py-1.5 rounded-full text-xs text-gray-300">
                                        <span>💬 {post.comments || post.commentCount || 0}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action: Pure Link Component: View Blog */}
                            <div className="lg:col-span-3 flex lg:justify-end">
                                <Link
                                    href={`/news/${postId}`}
                                    className="bg-[#1A1A1A] hover:bg-[#222222] text-gray-300 hover:text-white border border-[#262626] rounded-xl px-6 py-2.5 text-sm font-medium transition-all duration-200 flex items-center gap-2"
                                >
                                    View Blog
                                    <svg className="w-4 h-4 text-[#FFD100]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H7M17 7v10" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}