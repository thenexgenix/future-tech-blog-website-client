import React from 'react';
import Link from 'next/link';
import { getPodcastById } from '@/lib/api/podcasts';
import PodcastEditForm from './PodcastEditForm';
import { ArrowLeft } from 'lucide-react';

export default async function PodcastDetailPage({ params }) {

    const resolvedParams = await params;
    const podcastId = resolvedParams?.id;

    let podcastData = null;
    let errorMessage = '';

    try {
        const response = await getPodcastById(podcastId);
        podcastData = response?.data || response;
    } catch (err) {
        console.error('Error fetching podcast on server:', err);
        errorMessage = 'Failed to load podcast details from server.';
    }

    return (
        <div className=" text-white min-h-screen p-6 md:p-12">
            {/* Header & Back Link */}
            <div className="flex items-center gap-3 border-b border-[#262626] mb-5 py-3">
                <Link
                    href={'/dashboard/admin/podcast'}
                    className="p-2 rounded-xl bg-[#141414] border border-[#262626] hover:bg-[#1a1a1a] text-zinc-400 hover:text-white transition"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                        Podcast Details
                    </h1>
                    <p className="text-xs text-zinc-400 mt-0.5">ID: {podcastId}</p>
                </div>
            </div>

            {errorMessage ? (
                <div className="max-w-4xl mx-auto bg-red-500/10 border border-red-500/30 text-red-400 p-6 rounded-xl text-center">
                    <p className="text-base font-semibold">{errorMessage}</p>
                    <Link
                        href="/dashboard/admin/podcasts"
                        className="inline-block mt-4 text-xs bg-red-500/20 text-red-300 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors"
                    >
                        Return to List
                    </Link>
                </div>
            ) : (
                <PodcastEditForm podcastId={podcastId} initialData={podcastData} />
            )}
        </div>
    );
}