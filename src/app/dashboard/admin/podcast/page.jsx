'use client';
import React, { useState, useEffect } from 'react';
import CreatePodcastModal from './CreatePodcastModal';
import Link from 'next/link';
import { getAllPodcasts } from '@/lib/api/podcasts';
import { deletePodcast } from '@/lib/action/podcasts';
import { Plus } from 'lucide-react';

const PodcastList = () => {
    const [podcasts, setPodcasts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    // Delete Confirmation State
    const [selectedDeleteId, setSelectedDeleteId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const fetchPodcasts = async () => {
        try {
            setLoading(true);
            const response = await getAllPodcasts();

            if (response?.data) {
                setPodcasts(response.data);
            } else if (Array.isArray(response)) {
                setPodcasts(response);
            }
        } catch (error) {
            console.error('Error fetching podcasts:', error);
        } finally {
            setLoading(false);
        }
    };

    // Open Delete Modal
    const openDeleteModal = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedDeleteId(id);
    };

    // Confirm Delete Action
    const confirmDelete = async () => {
        if (!selectedDeleteId) return;

        try {
            setIsDeleting(true);
            await deletePodcast(selectedDeleteId);

            setPodcasts((prev) => prev.filter((podcast) => podcast._id !== selectedDeleteId));
            setSelectedDeleteId(null);
        } catch (error) {
            console.error('Error deleting podcast:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchPodcasts();
    }, []);

    return (
        <div className=" text-white min-h-screen pb-5 md:p-12">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#262626]">
                <div>
                    <h1 className="text-3xl font-bold tracking-wide">Podcasts</h1>
                    <p className="text-gray-400 text-sm mt-1">Explore our latest insights and tech audio sessions.</p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition duration-200"
                >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    <span>Create Podcasts</span>
                </button>
            </div>

            {/* Cards Grid Section */}
            {loading ? (
                <div className="text-center py-20 text-gray-400">Loading podcasts...</div>
            ) : podcasts.length === 0 ? (
                <div className="text-center py-20 text-gray-500">No podcasts found. Create one!</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {podcasts.map((podcast) => (
                        <Link
                            key={podcast._id}
                            href={`/dashboard/admin/podcast/${podcast._id}`}
                            className="bg-[#18181B] border border-gray-800 hover:border-yellow-500/50 rounded-xl p-5 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between group relative"
                        >
                            <div>
                                <div className="flex justify-between items-center text-xs text-yellow-400 mb-2 font-medium">
                                    <span>🎙️ {podcast.releaseFrequency || 'Weekly'}</span>

                                    {/* Delete Trigger Button */}
                                    <button
                                        onClick={(e) => openDeleteModal(e, podcast._id)}
                                        title="Delete Podcast"
                                        className="text-gray-500 hover:text-red-500 p-1 rounded transition-colors z-10 cursor-pointer"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                                <h3 className="text-lg font-bold line-clamp-2 text-gray-100 mb-2 group-hover:text-yellow-400 transition-colors">
                                    {podcast.title}
                                </h3>
                            </div>

                            <div className="mt-4 pt-3 border-t border-gray-800/80 flex justify-between items-center text-xs text-gray-400">
                                <span>Host: <strong className="text-gray-200">{podcast.host || 'Dr. Sarah Mitchell'}</strong></span>
                                <span className="text-gray-400">
                                    {podcast.createdAt ? new Date(podcast.createdAt).toLocaleDateString('en-US', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    }) : 'N/A'}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* Create Modal Component */}
            {isModalOpen && (
                <CreatePodcastModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    refreshData={fetchPodcasts}
                />
            )}

            {/* Delete Confirmation Modal */}
            {selectedDeleteId && (
                <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex justify-center items-center p-4 z-50">
                    <div className="bg-[#18181B] border border-gray-800 rounded-xl p-6 w-full max-w-md text-white shadow-2xl animate-in fade-in zoom-in duration-150">
                        <div className="flex items-center gap-3 text-red-500 mb-3">
                            <div className="p-2 bg-red-500/10 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold">Delete Podcast</h3>
                        </div>

                        <p className="text-gray-300 text-sm mb-6">
                            Are you sure you want to delete this podcast? This action cannot be undone.
                        </p>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setSelectedDeleteId(null)}
                                disabled={isDeleting}
                                className="px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                disabled={isDeleting}
                                className="px-4 py-2 text-sm bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
                            >
                                {isDeleting ? (
                                    <>
                                        <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                        Deleting...
                                    </>
                                ) : (
                                    'Delete'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PodcastList;