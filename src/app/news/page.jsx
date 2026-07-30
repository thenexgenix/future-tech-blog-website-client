'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, Send, ArrowUpRight, Loader2, Newspaper } from 'lucide-react';
import { getAllNews } from '@/lib/api/news';
import { Separator } from '@heroui/react';

// Pure Date Formatter Helper
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'N/A';

    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
};

export default function UserNewsPage() {
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const res = await getAllNews();
                const data = Array.isArray(res) ? res : res?.data || [];
                setNewsList(data);
            } catch (error) {
                console.error('Failed to fetch news:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center text-zinc-400 gap-2">
                <Loader2 className="w-6 h-6 animate-spin text-yellow-400" />
                <span className="text-sm font-medium">Loading news...</span>
            </div>
        );
    }

    if (newsList.length === 0) {
        return (
            <div className="min-h-screen bg-[#0f0f0f] py-20 text-center text-zinc-500 space-y-3">
                <Newspaper className="w-12 h-12 mx-auto text-zinc-600" />
                <p className="text-base font-medium">No news articles found.</p>
            </div>
        );
    }

    const featuredNews = newsList[0];
    const otherNews = newsList.slice(1);

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white">

            <div className=" border-b border-[#262626] py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                            Today&apos;s Headlines: Stay<br />Informed
                        </h1>
                    </div>
                    <div className="max-w-md">
                        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                            Explore the latest news from around the world. We bring you up-to-the-minute updates on the most significant events, trends, and stories. Discover the world through our news coverage.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-350 mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-10">

                {featuredNews && (
                    <div className="bg-[#141414] border border-[#262626] rounded-2xl p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        {/* Image Area */}
                        <div className="lg:col-span-5 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-[320px] rounded-xl overflow-hidden bg-[#1a1a1a]">
                            <img
                                src={featuredNews.thumbnail || '/placeholder-news.jpg'}
                                alt={featuredNews.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* Content Area */}
                        <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-6">
                            <div className="space-y-4">
                                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug">
                                    {featuredNews.title}
                                </h2>

                                <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
                                    {featuredNews.introduction || featuredNews.content}
                                </p>
                            </div>

                            {/* Meta Infos */}
                            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[#222222] text-xs text-zinc-400">
                                <div>
                                    <span className="block text-zinc-500 text-[11px] mb-1">Category</span>
                                    <span className="text-zinc-200 font-medium">{featuredNews.category || 'General'}</span>
                                </div>
                                <div>
                                    <span className="block text-zinc-500 text-[11px] mb-1">Publication Date</span>
                                    <span className="text-zinc-200 font-medium">
                                        {formatDate(featuredNews.publishedAt || featuredNews.createdAt)}
                                    </span>
                                </div>
                                <div>
                                    <span className="block text-zinc-500 text-[11px] mb-1">Author</span>
                                    <span className="text-zinc-200 font-medium">
                                        {featuredNews.author?.name || featuredNews.authorName || 'Admin'}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center gap-3">
                                    <button className="inline-flex items-center gap-1.5 bg-[#1a1a1a] border border-[#2a2a2a] px-3 py-1.5 rounded-full text-xs text-zinc-400 hover:text-white transition">
                                        <Heart className="w-3.5 h-3.5 text-zinc-400" />
                                        <span>{featuredNews.metrics?.likes ?? 0}</span>
                                    </button>
                                    <button className="inline-flex items-center gap-1.5 bg-[#1a1a1a] border border-[#2a2a2a] px-3 py-1.5 rounded-full text-xs text-zinc-400 hover:text-white transition">
                                        <Send className="w-3.5 h-3.5 text-zinc-400" />
                                        <span>{featuredNews.metrics?.shares ?? 0}</span>
                                    </button>
                                </div>

                                <Link
                                    href={`/news/${featuredNews._id}`}
                                    className="bg-[#1a1a1a] border border-[#2a2a2a] hover:bg-zinc-800 text-zinc-200 text-xs font-medium px-5 py-2.5 rounded-lg transition"
                                >
                                    Read More
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                <Separator className='text-[#000000]'/>

                {otherNews.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {otherNews.map((news) => (
                            <div
                                key={news._id}
                                className="bg-[#141414] border border-[#262626] rounded-2xl p-4 flex flex-col justify-between hover:border-[#333333] transition group"
                            >
                                <div className="space-y-4">
                                    <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-[#1a1a1a]">
                                        <img
                                            src={news.thumbnail || '/placeholder-news.jpg'}
                                            alt={news.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <h3 className="text-sm font-semibold text-white leading-snug line-clamp-2 group-hover:text-yellow-400 transition">
                                            {news.title}
                                        </h3>
                                        <p className="text-xs text-zinc-500 font-medium">
                                            {news.category || 'General'}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#222222]">
                                    <div className="flex items-center gap-2">
                                        <div className="inline-flex items-center gap-1 bg-[#1a1a1a] border border-[#262626] px-2.5 py-1 rounded-full text-[11px] text-zinc-400">
                                            <Heart className="w-3 h-3 text-zinc-500" />
                                            <span>{news.metrics?.likes ?? 0}</span>
                                        </div>
                                        <div className="inline-flex items-center gap-1 bg-[#1a1a1a] border border-[#262626] px-2.5 py-1 rounded-full text-[11px] text-zinc-400">
                                            <Send className="w-3 h-3 text-zinc-500" />
                                            <span>{news.metrics?.shares ?? 0}</span>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/news/${news._id}`}
                                        className="inline-flex items-center gap-1 bg-[#1a1a1a] border border-[#262626] hover:bg-[#222] text-zinc-300 text-xs font-medium px-3.5 py-1.5 rounded-lg transition"
                                    >
                                        <span>Read More</span>
                                        <ArrowUpRight className="w-3.5 h-3.5 text-yellow-400" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}