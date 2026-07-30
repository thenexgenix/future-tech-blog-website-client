'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { updatePodcast } from '@/lib/action/podcasts';
import { uploadFileToCloudinary } from '@/lib/upload';

export default function PodcastEditForm({ podcastId, initialData }) {
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        host: initialData?.host || '',
        podcastUrl: initialData?.podcastUrl || '',
        rating: initialData?.rating || 5,
        shortDescription: initialData?.shortDescription || '',
        description: initialData?.description || '',
        totalEpisodes: initialData?.totalEpisodes || 1,
        averageLength: initialData?.averageLength || '',
        releaseFrequency: initialData?.releaseFrequency || 'Weekly',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Cloudinary Upload Handler
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        setErrorMsg('');

        try {
            const uploadedUrl = await uploadFileToCloudinary(file, 'auto');
            if (uploadedUrl) {
                setFormData((prev) => ({
                    ...prev,
                    podcastUrl: uploadedUrl,
                }));
            }
        } catch (err) {
            console.error('Cloudinary upload error:', err);
            setErrorMsg(err.message || 'Failed to upload media to Cloudinary.');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setSuccessMsg('');
        setErrorMsg('');

        try {
            const res = await updatePodcast(podcastId, formData);
            if (res) {
                setSuccessMsg('Podcast details updated successfully!');
                setTimeout(() => setSuccessMsg(''), 5000);
            }
        } catch (err) {
            setErrorMsg(err.message || 'Failed to update podcast.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto bg-[#18181B] border border-gray-800 rounded-xl p-6 md:p-8 shadow-2xl">
            <h1 className="text-2xl font-bold mb-6 text-gray-100 border-b border-gray-800 pb-4">
                Edit Podcast Details
            </h1>

            {/* Success Notification Banner */}
            {successMsg && (
                <div className="mb-6 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-lg flex items-center justify-between animate-in fade-in">
                    <div className="flex items-center gap-2 text-sm font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{successMsg}</span>
                    </div>
                    <button onClick={() => setSuccessMsg('')} className="text-emerald-400 hover:text-white">&times;</button>
                </div>
            )}

            {/* Error Banner */}
            {errorMsg && (
                <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm font-medium">
                    {errorMsg}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-2">Title *</label>
                    <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full bg-[#0F0F11] border border-gray-700 rounded-lg p-3 text-sm text-gray-100 focus:border-yellow-500 outline-none transition-colors"
                    />
                </div>

                {/* Host & Release Frequency */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-2">Host Name</label>
                        <input
                            type="text"
                            name="host"
                            value={formData.host}
                            onChange={handleChange}
                            className="w-full bg-[#0F0F11] border border-gray-700 rounded-lg p-3 text-sm text-gray-100 focus:border-yellow-500 outline-none transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-2">Release Frequency</label>
                        <select
                            name="releaseFrequency"
                            value={formData.releaseFrequency}
                            onChange={handleChange}
                            className="w-full bg-[#0F0F11] border border-gray-700 rounded-lg p-3 text-sm text-gray-100 focus:border-yellow-500 outline-none transition-colors"
                        >
                            <option value="Weekly">Weekly</option>
                            <option value="Monthly">Monthly</option>
                            <option value="Daily">Daily</option>
                        </select>
                    </div>
                </div>

                {/* Podcast Media Upload & URL Section */}
                <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-2">Podcast Audio / Video File</label>

                    {/* File Upload Box */}
                    <div className="flex items-center gap-3 mb-3">
                        <label className="flex-1 bg-[#0F0F11] border border-dashed border-gray-700 hover:border-yellow-500/50 rounded-lg p-3 text-center cursor-pointer transition-colors flex items-center justify-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <span className="text-xs text-gray-300">
                                {uploading ? 'Uploading to Cloudinary...' : 'Upload File to Cloudinary'}
                            </span>
                            <input
                                type="file"
                                accept="audio/*,video/*"
                                onChange={handleFileUpload}
                                disabled={uploading}
                                className="hidden"
                            />
                        </label>
                        {uploading && (
                            <div className="w-5 h-5 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                        )}
                    </div>

                    {/* Direct URL Input with External Link Icon */}
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            name="podcastUrl"
                            value={formData.podcastUrl}
                            onChange={handleChange}
                            className="w-full bg-[#0F0F11] border border-gray-700 rounded-lg p-3 pr-10 text-sm text-gray-100 focus:border-yellow-500 outline-none transition-colors font-mono text-xs"
                            placeholder="Or paste media URL directly (https://...)"
                        />
                        {formData.podcastUrl && (
                            <a
                                href={formData.podcastUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Open video in new tab"
                                className="absolute right-3 text-gray-400 hover:text-yellow-500 transition-colors p-1"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                </svg>
                            </a>
                        )}
                    </div>
                </div>

                {/* Episodes, Length & Rating */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-2">Total Episodes</label>
                        <input
                            type="number"
                            name="totalEpisodes"
                            value={formData.totalEpisodes}
                            onChange={handleChange}
                            className="w-full bg-[#0F0F11] border border-gray-700 rounded-lg p-3 text-sm text-gray-100 focus:border-yellow-500 outline-none transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-2">Avg Duration</label>
                        <input
                            type="text"
                            name="averageLength"
                            value={formData.averageLength}
                            onChange={handleChange}
                            className="w-full bg-[#0F0F11] border border-gray-700 rounded-lg p-3 text-sm text-gray-100 focus:border-yellow-500 outline-none transition-colors"
                            placeholder="e.g. 45 min"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-2">Rating (1 to 5)</label>
                        <input
                            type="number"
                            step="0.1"
                            min="1"
                            max="5"
                            name="rating"
                            value={formData.rating}
                            onChange={handleChange}
                            className="w-full bg-[#0F0F11] border border-gray-700 rounded-lg p-3 text-sm text-gray-100 focus:border-yellow-500 outline-none transition-colors"
                        />
                    </div>
                </div>

                {/* Short Subtitle */}
                <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-2">Short Subtitle / Summary</label>
                    <input
                        type="text"
                        name="shortDescription"
                        value={formData.shortDescription}
                        onChange={handleChange}
                        className="w-full bg-[#0F0F11] border border-gray-700 rounded-lg p-3 text-sm text-gray-100 focus:border-yellow-500 outline-none transition-colors"
                    />
                </div>

                {/* Full Description */}
                <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-2">Full Description</label>
                    <textarea
                        name="description"
                        rows="5"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full bg-[#0F0F11] border border-gray-700 rounded-lg p-3 text-sm text-gray-100 focus:border-yellow-500 outline-none transition-colors leading-relaxed"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end gap-4 pt-4 border-t border-gray-800">
                    <Link
                        href="/dashboard/admin/podcasts"
                        className="px-5 py-2.5 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors cursor-pointer"
                    >
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        disabled={saving || uploading}
                        className="px-6 py-2.5 text-sm bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg transition-all shadow-md flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                    >
                        {saving ? (
                            <>
                                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                                Saving Changes...
                            </>
                        ) : (
                            'Save Changes'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}