import React from 'react';
import Image from 'next/image';
import { Download, Calendar, User, ArrowUpRight, FileText } from 'lucide-react';
import { getAllResources } from '@/lib/api/resources';

export const dynamic = 'force-dynamic' 

export default async function ResourcesPage() {
    let resources = [];

    try {
        const res = await getAllResources();

        resources = res?.data || res || [];
    } catch (error) {
        console.error('Failed to fetch resources:', error);
    }

    const featuredResources = resources.length > 0 ? resources.slice(0, 1) : [];
    const remainingResources = resources.length > 1 ? resources.slice(1) : [];

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-[#0d0d0d] text-zinc-100 py-10 px-4 sm:px-6 lg:px-12">
            <div className="max-w-7xl mx-auto space-y-16">

                <div className="space-y-4">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
                        <div className="lg:col-span-8">
                            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                                Unlock a World of Knowledge
                            </h1>
                        </div>
                        <div className="lg:col-span-4">
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Dive deep into the AI universe with our collection of insightful whitepapers, e-books, and reports written by industry experts.
                            </p>
                        </div>
                    </div>
                </div>

                {/* --- STATS COUNTER BAR --- */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-[#141414] border border-[#262626] rounded-3xl text-center">
                    <div className="space-y-1 border-r border-[#262626] last:border-r-0">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white">300+</h2>
                        <p className="text-xs text-zinc-500 font-medium">Resources Available</p>
                    </div>
                    <div className="space-y-1 md:border-r border-[#262626]">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white">12k+</h2>
                        <p className="text-xs text-zinc-500 font-medium">Total Downloads</p>
                    </div>
                    <div className="space-y-1 border-r border-[#262626] last:border-r-0">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white">10k+</h2>
                        <p className="text-xs text-zinc-500 font-medium">Active Readers</p>
                    </div>
                    <div className="space-y-1">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white">100+</h2>
                        <p className="text-xs text-zinc-500 font-medium">Countries Reached</p>
                    </div>
                </div>


                {/* --- FEATURED SECTION (Top 2 Latest Resources) --- */}
                <div className="space-y-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#262626] pb-4">
                        <div>
                            <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">Dive into the Details</span>
                            <h2 className="text-2xl font-bold text-white mt-1">In-Depth Reports & Whitepapers</h2>
                        </div>
                    </div>

                    {featuredResources.length > 0 ? (
                        <div className="space-y-8">
                            {featuredResources.map((item) => (
                                <div
                                    key={item?._id || item?.id}
                                    className="bg-[#141414] border border-[#262626] hover:border-yellow-400/30 rounded-3xl p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-300 group"
                                >
                                    {/* Left Title & Overview */}
                                    <div className="lg:col-span-5 space-y-4">
                                        <div className="w-10 h-10 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                                            <FileText className="w-5 h-5 text-yellow-400" />
                                        </div>
                                        <h3 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                                            {item?.title}
                                        </h3>
                                        <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
                                            {item?.description}
                                        </p>
                                    </div>

                                    {/* Right Content & Image Card */}
                                    <div className="lg:col-span-7 bg-[#1a1a1a] border border-[#262626] rounded-2xl p-5 space-y-6">
                                        {/* Image Thumbnail */}
                                        <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-[#262626]">
                                            {item?.thumbnail ? (
                                                <Image
                                                    src={item.thumbnail}
                                                    alt={item?.title || 'Resource Thumbnail'}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-zinc-600">
                                                    No Thumbnail Available
                                                </div>
                                            )}
                                        </div>

                                        {/* Info Strip */}
                                        <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                                            <div className="bg-[#141414] p-2.5 rounded-xl border border-[#262626]">
                                                <span className="block text-[10px] text-zinc-500 uppercase">Publication Date</span>
                                                <span className="font-semibold text-white truncate block">{formatDate(item?.createdAt)}</span>
                                            </div>
                                            <div className="bg-[#141414] p-2.5 rounded-xl border border-[#262626]">
                                                <span className="block text-[10px] text-zinc-500 uppercase">Category</span>
                                                <span className="font-semibold text-yellow-400 truncate block">{item?.category || 'General'}</span>
                                            </div>
                                            <div className="bg-[#141414] p-2.5 rounded-xl border border-[#262626]">
                                                <span className="block text-[10px] text-zinc-500 uppercase">Author</span>
                                                <span className="font-semibold text-white truncate block">{item?.author || 'FutureTech'}</span>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <div className="flex items-center justify-between pt-2">
                                            <span className="text-xs text-zinc-500 font-medium">
                                                Downloads: <strong className="text-white">{item?.downloadCount || 0}</strong>
                                            </span>
                                            <a
                                                href={item?.downloadUrl || '#'}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-yellow-400 text-black font-bold text-xs rounded-xl hover:bg-yellow-300 transition-all shadow-md shadow-yellow-400/10"
                                            >
                                                Download PDF Now <ArrowUpRight className="w-4 h-4" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-12 text-center text-zinc-500 bg-[#141414] rounded-3xl border border-[#262626]">
                            No featured resources found.
                        </div>
                    )}
                </div>


                {/* --- REMAINING RESOURCES GRID SECTION --- */}
                {remainingResources.length > 0 && (
                    <div className="space-y-8 pt-6">
                        <div className="border-b border-[#262626] pb-4">
                            <h3 className="text-xl font-bold text-white">More Resources</h3>
                        </div>

                        {/* 3-Column Responsive Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {remainingResources.map((item) => (
                                <div
                                    key={item?._id || item?.id}
                                    className="bg-[#141414] border border-[#262626] hover:border-yellow-400/40 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group"
                                >
                                    <div className="space-y-4">
                                        {/* Thumbnail */}
                                        <div className="relative aspect-[16/9] rounded-xl overflow-hidden bg-[#1a1a1a] border border-[#262626]">
                                            {item?.thumbnail ? (
                                                <Image
                                                    src={item.thumbnail}
                                                    alt={item?.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-zinc-600 text-xs">
                                                    No Image
                                                </div>
                                            )}
                                            <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-[10px] font-semibold text-yellow-400 px-2.5 py-1 rounded-md border border-white/10">
                                                {item?.category || 'Resource'}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="space-y-2">
                                            <h4 className="text-base font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-2">
                                                {item?.title}
                                            </h4>
                                            <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                                                {item?.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Footer Info & Action */}
                                    <div className="pt-4 mt-4 border-t border-[#262626] space-y-3">
                                        <div className="flex items-center justify-between text-xs text-zinc-400">
                                            <span className="flex items-center gap-1.5 truncate max-w-[130px]">
                                                <User className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                                                {item?.author || 'Unknown'}
                                            </span>
                                            <span className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {formatDate(item?.createdAt)}
                                            </span>
                                        </div>

                                        <a
                                            href={item?.downloadUrl || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1a1a1a] hover:bg-yellow-400 hover:text-black border border-[#262626] hover:border-yellow-400 text-zinc-200 text-xs font-semibold rounded-xl transition-all"
                                        >
                                            <Download className="w-3.5 h-3.5" />
                                            Download PDF
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