'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { BiComment } from 'react-icons/bi';

export default function BlogListClient({ initialBlogs = [], categories = [] }) {
    const [activeCategory, setActiveCategory] = useState('All');

    // Dynamic Category List Build (Checking string or object)
    const categoryNames = categories.map((c) => (typeof c === 'string' ? c : c.name || c.title));
    const categoryList = ['All', ...categoryNames.filter(Boolean)];

    // Filtering Logic
    const filteredPosts = activeCategory === 'All'
        ? initialBlogs
        : initialBlogs.filter((post) => {
            const postCategory = post.category?.name || post.category || post.author?.category;
            return postCategory?.toLowerCase() === activeCategory.toLowerCase();
        });

    return (
        <>
            {/* Dynamic Categories Tab */}
            <div className="border-b border-[#262626]">
                <div className="max-w-[1400px] mx-auto px-6 py-8 overflow-x-auto no-scrollbar">
                    <div className="flex items-center gap-3 min-w-max">
                        {categoryList.map((category, index) => {
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

            {/* Posts List Section */}
            <div className="max-w-[1400px] mx-auto">
                {filteredPosts.length === 0 && (
                    <div className="py-20 text-center text-gray-500">
                        <p className="text-sm">No blogs found for {activeCategory}.</p>
                    </div>
                )}

                {filteredPosts.map((post) => {
                    const postId = post._id || post.id;
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
                            {/* Author Details */}
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

                            {/* Post Info */}
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
                                        <Heart className='text-red-500 w-5'/>
                                        <span> {post.likes || post.likeCount || 0}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-[#1A1A1A] border border-[#262626] px-3.5 py-1.5 rounded-full text-xs text-gray-300">
                                        <BiComment className='w-5 h-5'/>
                                        <span> {post.comments || post.commentCount || 0}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Navigation Link */}
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
        </>
    );
}