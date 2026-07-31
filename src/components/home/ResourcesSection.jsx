'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Eye, Layers, FileText, Download } from 'lucide-react';
import { getAllResources } from '@/lib/api/resources';

export default function ResourcesSection() {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const defaultAvatars = [
        { name: 'User 1', src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
        { name: 'User 2', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
        { name: 'User 3', src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
        { name: 'User 4', src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
    ];

    useEffect(() => {
        const fetchResources = async () => {
            setLoading(true);
            setError('');
            try {
                const res = await getAllResources();
                const fetchedData = res?.data || res || [];
                setResources(Array.isArray(fetchedData) ? fetchedData : []);
            } catch (err) {
                console.error("Resource fetch error:", err);
                setError(err?.message || 'Failed to load resources');
            } finally {
                setLoading(false);
            }
        };

        fetchResources();
    }, []);

    // ক্যাটাগরি অনুসারে রিসোর্স গ্রুপিং করার লজিক
    const getResourcesByCategory = (catName) => {
        return resources.filter(
            (item) => item.category?.toLowerCase() === catName.toLowerCase()
        );
    };

    // যদি specific ক্যাটাগরি না থাকে তবে এরে স্লাইস করে প্রথম ও দ্বিতীয় ভাগে ভাগ করা
    const ebooks = getResourcesByCategory('ebooks').length > 0
        ? getResourcesByCategory('ebooks')
        : resources.slice(0, Math.ceil(resources.length / 2));

    const whitepapers = getResourcesByCategory('whitepapers').length > 0
        ? getResourcesByCategory('whitepapers')
        : resources.slice(Math.ceil(resources.length / 2));

    // রিসোর্স কার্ড রেন্ডার করার Reusable সাব-কম্পোনেন্ট
    const renderResourceBlock = ({
        title,
        description,
        icon: Icon,
        items,
        defaultImage,
    }) => {
        const totalDownloads = items.reduce((acc, curr) => acc + (curr.downloadCount || 0), 0);
        const featuredItem = items[0] || {};

        return (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-12">
                {/* Left Column: Info & Main Download Action */}
                <div className="lg:col-span-4 flex flex-col justify-between space-y-8">
                    <div className="space-y-5">
                        <div className="w-12 h-12 flex items-center justify-center">
                            <Icon className="w-10 h-10 text-yellow-400" />
                        </div>

                        <h2 className="text-2xl font-semibold text-white">{title}</h2>
                        <p className="text-zinc-400 text-sm leading-relaxed">
                            {description}
                        </p>

                        {featuredItem.downloadUrl ? (
                            <a
                                href={featuredItem.downloadUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-full gap-2 px-4 py-3 text-sm font-medium bg-[#141414] border border-[#262626] rounded-lg hover:bg-[#1f1f1f] transition-all text-zinc-300 group"
                            >
                                Download Latest {title} Now
                                <ArrowUpRight className="w-4 h-4 text-yellow-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                        ) : (
                            <button
                                disabled
                                className="w-full px-4 py-3 text-sm font-medium bg-[#141414] border border-[#262626] rounded-lg text-zinc-600 cursor-not-allowed text-center"
                            >
                                No Download Link Available
                            </button>
                        )}
                    </div>

                    {/* Download Stats Pill */}
                    <div className="p-4 bg-[#141414] border border-[#262626] rounded-xl flex items-center justify-between">
                        <div>
                            <p className="text-xs text-zinc-500">Downloaded By</p>
                            <p className="text-sm font-semibold text-white mt-0.5">
                                {totalDownloads > 0 ? `${totalDownloads}+ Downloads` : '10k + Users'}
                            </p>
                        </div>
                        <div className="flex -space-x-2">
                            {defaultAvatars.map((user, idx) => (
                                <div key={idx} className="relative w-8 h-8 rounded-full border-2 border-[#141414] overflow-hidden">
                                    <Image
                                        src={user.src}
                                        alt={user.name}
                                        fill
                                        sizes="32px"
                                        className="object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Dynamic Content & Featured Item Details */}
                <div className="lg:col-span-8 space-y-5">
                    {/* Featured Item Title & Description Banner */}
                    <div className="p-4 sm:p-5 bg-[#141414] border border-[#262626] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <span className="font-semibold text-sm text-white shrink-0">
                            {featuredItem.category || 'Featured Topic'}
                        </span>
                        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed sm:text-right max-w-xl line-clamp-2">
                            {featuredItem.title || 'In-depth analysis and technical insights from industry experts.'}
                        </p>
                    </div>

                    {/* Thumbnail Image */}
                    <div className="relative h-60 sm:h-72 w-full rounded-xl overflow-hidden border border-[#262626]">
                        <Image
                            src={featuredItem.thumbnail || defaultImage}
                            alt={featuredItem.title || title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 800px"
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* Key Stats Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-[#141414] border border-[#262626] rounded-xl">
                            <p className="text-xs text-zinc-500">Total Available</p>
                            <p className="text-sm font-semibold text-white mt-1">
                                {items.length > 0 ? `${items.length} Available ${title}` : `Over 10 ${title.toLowerCase()}`}
                            </p>
                        </div>

                        <div className="p-4 bg-[#141414] border border-[#262626] rounded-xl flex items-center justify-between">
                            <div>
                                <p className="text-xs text-zinc-500">Download Formats</p>
                                <p className="text-sm font-medium text-white mt-1">PDF format for access.</p>
                            </div>
                            {featuredItem.downloadUrl && (
                                <a
                                    href={featuredItem.downloadUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-3 py-1.5 text-xs font-medium bg-[#1a1a1a] border border-[#262626] rounded-md hover:bg-[#262626] text-zinc-300 flex items-center gap-1.5 transition"
                                >
                                    Preview
                                    <Eye className="w-3.5 h-3.5 text-yellow-400" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Author Expertise */}
                    <div className="p-4 bg-[#141414] border border-[#262626] rounded-xl">
                        <p className="text-xs text-zinc-500">Primary Author / Contributor</p>
                        <p className="text-xs sm:text-sm text-zinc-300 mt-1">
                            Authored by <span className="text-white font-semibold">{featuredItem.author || 'Industry Experts'}</span>
                            {featuredItem.description ? ` — ${featuredItem.description.substring(0, 90)}...` : ''}
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section className="bg-[#0f0f0f] text-white min-h-screen py-12 px-4 sm:px-8 lg:px-16">
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between pb-10 border-b border-[#262626] gap-6">
                    <div className="space-y-3 max-w-3xl">
                        <span className="inline-block px-3.5 py-1.5 text-xs font-medium bg-[#1a1a1a] border border-[#262626] rounded-md text-zinc-400">
                            Your Gateway to In-Depth Information
                        </span>
                        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight">
                            Unlock Valuable Knowledge with FutureTech&apos;s Resources
                        </h1>
                    </div>
                    <div>
                        <Link
                            href="/resources"
                            className="inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-medium bg-[#141414] border border-[#262626] rounded-lg hover:bg-[#1f1f1f] transition-all text-zinc-300 group whitespace-nowrap"
                        >
                            View All Resources
                            <ArrowUpRight className="w-4 h-4 text-yellow-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="py-24 text-center text-zinc-400 space-y-3">
                        <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-sm">Loading resources...</p>
                    </div>
                )}

                {/* Error State */}
                {!loading && error && (
                    <div className="py-16 text-center text-rose-500">
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && resources.length === 0 && (
                    <div className="py-20 text-center text-zinc-500">
                        <p className="text-sm">No resources found.</p>
                    </div>
                )}

                {/* Content Rows */}
                {!loading && !error && resources.length > 0 && (
                    <div className="divide-y divide-[#262626]">
                        {/* 1. Ebooks Section */}
                        {renderResourceBlock({
                            title: 'Ebooks',
                            description: 'Explore our collection of ebooks covering a wide spectrum of future technology topics.',
                            icon: Layers,
                            items: ebooks,
                            defaultImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
                        })}

                        {/* 2. Whitepapers Section */}
                        {renderResourceBlock({
                            title: 'Whitepapers',
                            description: 'Dive into comprehensive reports and analyses with our collection of whitepapers.',
                            icon: FileText,
                            items: whitepapers,
                            defaultImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}