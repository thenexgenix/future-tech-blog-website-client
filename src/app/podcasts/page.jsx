import React from 'react';
import Link from 'next/link';
import { Play, Star, Clock, Radio, User, Calendar } from 'lucide-react';
import { getAllPodcasts } from '@/lib/api/podcasts';

export const dynamic = 'force-dynamic'

export default async function PodcastPage() {
    let podcasts = [];

    try {
        const res = await getAllPodcasts();
    
        podcasts = res?.data || res || [];
    } catch (error) {
        console.error('Failed to fetch podcasts:', error);
    }

    const featuredPodcast = podcasts.length > 0 ? podcasts[0] : null;
    const remainingPodcasts = podcasts.length > 1 ? podcasts.slice(1) : [];

    return (
        <div className="min-h-screen bg-[#0d0d0d] text-zinc-100 py-10 px-4 sm:px-6 lg:px-12">
            <div className="max-w-7xl mx-auto space-y-16">

                <div className="space-y-3">
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                        Unlock the World of Artificial Intelligence through Podcasts
                    </h1>
                </div>

                {/* --- TOP FEATURED PODCAST (Hero Section) --- */}
                {featuredPodcast ? (
                    <div className="bg-[#141414] border border-[#262626] rounded-3xl p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl relative overflow-hidden group">

                        {/* Left Details */}
                        <div className="lg:col-span-5 space-y-6 z-10">
                            {/* Rating Stars */}
                            <div className="flex items-center gap-1 text-yellow-400">
                                {[...Array(featuredPodcast?.rating || 5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-yellow-400" />
                                ))}
                                <span className="text-xs text-zinc-400 ml-2 font-medium">
                                    ({featuredPodcast?.rating || 5}.0)
                                </span>
                            </div>

                            <div className="space-y-3">
                                <h2 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                                    {featuredPodcast?.title}
                                </h2>
                                <p className="text-zinc-400 text-sm line-clamp-3 leading-relaxed">
                                    {featuredPodcast?.shortDescription || featuredPodcast?.description}
                                </p>
                            </div>

                            {/* Info Badges */}
                            <div className="grid grid-cols-3 gap-3 pt-2">
                                <div className="bg-[#1a1a1a] p-3 rounded-2xl border border-[#262626] text-center">
                                    <span className="block text-[10px] text-zinc-500 uppercase font-medium">Host</span>
                                    <span className="text-xs font-semibold text-white truncate block">{featuredPodcast?.host || 'N/A'}</span>
                                </div>
                                <div className="bg-[#1a1a1a] p-3 rounded-2xl border border-[#262626] text-center">
                                    <span className="block text-[10px] text-zinc-500 uppercase font-medium">Episodes</span>
                                    <span className="text-xs font-semibold text-white block">{featuredPodcast?.totalEpisodes || 'N/A'} Ep</span>
                                </div>
                                <div className="bg-[#1a1a1a] p-3 rounded-2xl border border-[#262626] text-center">
                                    <span className="block text-[10px] text-zinc-500 uppercase font-medium">Avg Length</span>
                                    <span className="text-xs font-semibold text-white block">{featuredPodcast?.averageLength || 'N/A'}</span>
                                </div>
                            </div>

                            {/* Listen Button */}
                            <div className="pt-2">
                                <a
                                    href={featuredPodcast?.podcastUrl || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-6 py-3.5 bg-yellow-400 text-black font-bold rounded-2xl hover:bg-yellow-300 transition-all shadow-lg shadow-yellow-400/10 cursor-pointer"
                                >
                                    <Play className="w-5 h-5 fill-black" />
                                    Listen Podcast
                                </a>
                            </div>
                        </div>

                        {/* Right Video / Thumbnail Section */}
                        <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-[#262626] bg-[#1a1a1a] aspect-video flex items-center justify-center group/player">
                            {/* Decorative Background Glow */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/10 to-transparent opacity-50" />

                            {/* Big Centered Play Icon */}
                            <a
                                href={featuredPodcast?.podcastUrl || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-16 h-16 rounded-full bg-yellow-400 flex items-center justify-center text-black shadow-2xl group-hover/player:scale-110 transition-transform duration-300 z-10 cursor-pointer"
                            >
                                <Play className="w-7 h-7 fill-black ml-1" />
                            </a>

                            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-zinc-400 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10">
                                <span className="flex items-center gap-1.5"><Radio className="w-4 h-4 text-yellow-400" /> {featuredPodcast?.releaseFrequency || 'Weekly'}</span>
                                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-zinc-400" /> {featuredPodcast?.averageLength}</span>
                            </div>
                        </div>

                    </div>
                ) : (
                    <div className="p-12 text-center text-zinc-500 bg-[#141414] rounded-3xl border border-[#262626]">
                        No podcasts available at the moment.
                    </div>
                )}


                {/* --- BOTTOM GRID SECTION (Latest Podcast Episodes) --- */}
                {remainingPodcasts.length > 0 && (
                    <div className="space-y-8">

                        <div className="flex items-center justify-between border-b border-[#262626] pb-4">
                            <div>
                                <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">Stay Informed From Podcasts</span>
                                <h3 className="text-2xl font-bold text-white mt-1">Latest Podcast Episodes</h3>
                            </div>
                        </div>

                        {/* Podcast Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {remainingPodcasts.map((podcast) => (
                                <div
                                    key={podcast?._id || podcast?.id}
                                    className="bg-[#141414] border border-[#262626] hover:border-yellow-400/40 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group"
                                >
                                    <div className="space-y-4">
                                        {/* Card Top / Player Mockup */}
                                        <div className="relative aspect-video rounded-xl bg-[#1a1a1a] border border-[#262626] overflow-hidden flex items-center justify-center">
                                            <div className="w-12 h-12 rounded-full bg-yellow-400/90 flex items-center justify-center text-black group-hover:scale-110 transition-transform">
                                                <Play className="w-5 h-5 fill-black ml-0.5" />
                                            </div>
                                            <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-[10px] font-semibold text-zinc-300 px-2.5 py-1 rounded-full border border-white/10">
                                                {podcast?.averageLength || 'N/A'}
                                            </div>
                                        </div>

                                        {/* Title & Description */}
                                        <div className="space-y-2">
                                            <h4 className="text-base font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-2">
                                                {podcast?.title}
                                            </h4>
                                            <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                                                {podcast?.shortDescription || podcast?.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Card Footer Details */}
                                    <div className="pt-4 mt-4 border-t border-[#262626] flex items-center justify-between text-xs text-zinc-400">
                                        <div className="flex items-center gap-1.5">
                                            <User className="w-3.5 h-3.5 text-yellow-400" />
                                            <span className="truncate max-w-[120px]">{podcast?.host}</span>
                                        </div>
                                        <a
                                            href={podcast?.podcastUrl || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs font-semibold text-yellow-400 hover:underline flex items-center gap-1"
                                        >
                                            Listen <Play className="w-3 h-3 fill-yellow-400" />
                                        </a>
                                    </div>

                                </div>
                            ))}
                        </div>

                    </div>
                )}

            </div>
        </div>
    );
}