import React from 'react';
import Link from 'next/link';
import { getAllNews } from '@/lib/api/news';
import { getAllPodcasts } from '@/lib/api/podcasts';
import { getAllResources } from '@/lib/api/resources';

export default async function DashboardAnalyticsPage() {
    
    const [newsRes, podcastsRes, resourcesRes] = await Promise.all([
        getAllNews().catch(() => ({ data: [] })),
        getAllPodcasts().catch(() => ({ data: [] })),
        getAllResources().catch(() => ({ data: [] })),
    ]);

    // Data Extraction (Handling response formats)
    const newsList = newsRes?.data || newsRes || [];
    const podcastsList = podcastsRes?.data || podcastsRes || [];
    const resourcesList = resourcesRes?.data || resourcesRes || [];

    // Total Stats Count
    const totalNews = newsList.length;
    const totalPodcasts = podcastsList.length;
    const totalResources = resourcesList.length;

    // Slice Recent 4 items for each section
    const recentNews = newsList.slice(0, 4);
    const recentPodcasts = podcastsList.slice(0, 4);
    const recentResources = resourcesList.slice(0, 4);

    return (
        <div className="space-y-10 p-6 md:p-8 max-w-350 mx-auto  text-gray-100 min-h-screen">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800 pb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                        Dashboard Overview
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">
                        Welcome back! Here is a summary of your platform analytics and latest content.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        System Online
                    </span>
                </div>
            </div>

            {/* 1. TOP ANALYTICS STAT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

                {/* Total News Card */}
                <div className="bg-[#18181B] border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-all shadow-md group">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Total News</span>
                        <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                        </div>
                    </div>
                    <div className="mt-4 flex items-baseline justify-between">
                        <h2 className="text-3xl font-extrabold text-white">{totalNews}</h2>
                        <span className="text-xs text-blue-400 font-medium">Published Articles</span>
                    </div>
                </div>

                {/* Total Podcasts Card */}
                <div className="bg-[#18181B] border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-all shadow-md group">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Podcasts</span>
                        <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                        </div>
                    </div>
                    <div className="mt-4 flex items-baseline justify-between">
                        <h2 className="text-3xl font-extrabold text-white">{totalPodcasts}</h2>
                        <span className="text-xs text-purple-400 font-medium">Audio / Video</span>
                    </div>
                </div>

                {/* Total Resources Card */}
                <div className="bg-[#18181B] border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-all shadow-md group">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Total Resources</span>
                        <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6205 7.5 5 12 2.5 16.5 5 12 7.5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                    </div>
                    <div className="mt-4 flex items-baseline justify-between">
                        <h2 className="text-3xl font-extrabold text-white">{totalResources}</h2>
                        <span className="text-xs text-emerald-400 font-medium">Downloadables</span>
                    </div>
                </div>

            </div>

            {/* CONTENT SECTIONS GRID */}
            <div className="space-y-10">

                {/* 1. RECENT NEWS SECTION */}
                <SectionWrapper title="Recent News" viewAllLink="/dashboard/admin/news" badgeColor="bg-blue-500">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {recentNews.length > 0 ? (
                            recentNews.map((item, idx) => (
                                <ContentCard
                                    key={item._id || idx}
                                    title={item.title || item.name}
                                    subtitle={item.category || item.author || 'News'}
                                    date={item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recent'}
                                    badge="News"
                                    badgeClass="bg-blue-500/10 text-blue-400 border-blue-500/20"
                                    link={`/dashboard/admin/news/${item._id}`}
                                />
                            ))
                        ) : (
                            <EmptyCard text="No recent news found." />
                        )}
                    </div>
                </SectionWrapper>

                {/* 2. RECENT PODCASTS SECTION */}
                <SectionWrapper title="Recent Podcasts" viewAllLink="/dashboard/admin/podcast" badgeColor="bg-purple-500">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {recentPodcasts.length > 0 ? (
                            recentPodcasts.map((item, idx) => (
                                <ContentCard
                                    key={item._id || idx}
                                    title={item.title}
                                    subtitle={item.host ? `Host: ${item.host}` : item.releaseFrequency || 'Podcast'}
                                    date={item.totalEpisodes ? `${item.totalEpisodes} Episodes` : 'Audio'}
                                    badge="Podcast"
                                    badgeClass="bg-purple-500/10 text-purple-400 border-purple-500/20"
                                    link={`/dashboard/admin/podcast/${item._id}`}
                                />
                            ))
                        ) : (
                            <EmptyCard text="No recent podcasts found." />
                        )}
                    </div>
                </SectionWrapper>

                {/* 3. RECENT RESOURCES SECTION */}
                <SectionWrapper title="Recent Resources" viewAllLink="/dashboard/admin/resources" badgeColor="bg-emerald-500">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {recentResources.length > 0 ? (
                            recentResources.map((item, idx) => (
                                <ContentCard
                                    key={item._id || idx}
                                    title={item.title || item.name}
                                    subtitle={item.type || item.category || 'Resource File'}
                                    date={item.fileSize || 'Available'}
                                    badge="Resource"
                                    badgeClass="bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                    link={`/dashboard/admin/resources/${item._id}`}
                                />
                            ))
                        ) : (
                            <EmptyCard text="No recent resources found." />
                        )}
                    </div>
                </SectionWrapper>
            </div>

        </div>
    );
}

// Section Wrapper Component
function SectionWrapper({ title, viewAllLink, badgeColor, children }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                <div className="flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${badgeColor}`}></span>
                    <h2 className="text-lg font-semibold text-gray-100">{title}</h2>
                </div>
                <Link
                    href={viewAllLink}
                    className="text-xs font-medium text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                    View All
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
            {children}
        </div>
    );
}

// Reusable Content Card Component
function ContentCard({ title, subtitle, date, badge, badgeClass, link }) {
    return (
        <Link href={link || '#'}>
            <div className="bg-[#18181B] border border-gray-800 rounded-xl p-4 hover:border-gray-700 hover:bg-[#202024] transition-all flex flex-col justify-between h-full group shadow-sm">
                <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${badgeClass}`}>
                            {badge}
                        </span>
                        <span className="text-[11px] text-gray-500">{date}</span>
                    </div>
                    <h3 className="text-sm font-medium text-gray-200 group-hover:text-amber-400 line-clamp-2 transition-colors">
                        {title}
                    </h3>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-800/60 flex items-center justify-between text-xs text-gray-400">
                    <span className="truncate">{subtitle}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </div>
            </div>
        </Link>
    );
}

// Empty State Fallback Card
function EmptyCard({ text }) {
    return (
        <div className="col-span-full bg-[#18181B] border border-dashed border-gray-800 rounded-xl p-6 text-center text-xs text-gray-500">
            {text}
        </div>
    );
}