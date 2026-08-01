import { createPodcasts } from '@/lib/action/podcasts';
import { uploadFileToCloudinary } from '@/lib/upload';
import React, { useState } from 'react';


const CreatePodcastModal = ({ isOpen, onClose, refreshData }) => {
    const [uploadType, setUploadType] = useState('file'); // 'file' or 'url'
    const [loading, setLoading] = useState(false);
    const [videoFile, setVideoFile] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        host: '',
        podcastUrl: '',
        rating: 5,
        shortDescription: '',
        description: '',
        totalEpisodes: 1,
        averageLength: '30 min',
        releaseFrequency: 'Weekly'
    });

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            let finalVideoUrl = formData.podcastUrl;

            if (uploadType === 'file' && videoFile) {
                finalVideoUrl = await uploadFileToCloudinary(videoFile, 'video');
            }

            const payload = {
                ...formData,
                podcastUrl: finalVideoUrl,
                videoSourceType: uploadType === 'file' ? 'cloudinary' : 'external'
            };

            // API mutation
            const response = await createPodcasts(payload);

            if (response?.success || response) {
                // alert('Podcast created successfully!');
                refreshData();
                onClose();
            }
        } catch (error) {
            console.error('Error creating podcast:', error);
            // alert(error.message || 'Failed to create podcast.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4 z-50">
            <div className="bg-[#18181B] border border-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto text-white shadow-2xl">
                <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-3">
                    <h2 className="text-xl font-bold text-yellow-500">Create New Podcast</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-xl cursor-pointer">&times;</button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Title *</label>
                        <input
                            type="text"
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full bg-[#0F0F11] border border-gray-700 rounded-lg p-2.5 text-sm focus:border-yellow-500 outline-none"
                            placeholder="e.g. AI Revolution"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-300 mb-1">Host Name</label>
                            <input
                                type="text"
                                name="host"
                                value={formData.host}
                                onChange={handleChange}
                                className="w-full bg-[#0F0F11] border border-gray-700 rounded-lg p-2.5 text-sm focus:border-yellow-500 outline-none"
                                placeholder="Dr. Sarah Mitchell"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-300 mb-1">Release Frequency</label>
                            <select
                                name="releaseFrequency"
                                value={formData.releaseFrequency}
                                onChange={handleChange}
                                className="w-full bg-[#0F0F11] border border-gray-700 rounded-lg p-2.5 text-sm focus:border-yellow-500 outline-none"
                            >
                                <option value="Weekly">Weekly</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Daily">Daily</option>
                            </select>
                        </div>
                    </div>

                    {/* Video Source Option */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Video Source</label>
                        <div className="flex gap-4 mb-2">
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                                <input
                                    type="radio"
                                    name="uploadType"
                                    value="file"
                                    checked={uploadType === 'file'}
                                    onChange={() => setUploadType('file')}
                                />
                                Upload Video (Cloudinary)
                            </label>
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                                <input
                                    type="radio"
                                    name="uploadType"
                                    value="url"
                                    checked={uploadType === 'url'}
                                    onChange={() => setUploadType('url')}
                                />
                                Direct Video URL / Embed
                            </label>
                        </div>

                        {uploadType === 'file' ? (
                            <input
                                type="file"
                                accept="video/*"
                                required
                                onChange={(e) => setVideoFile(e.target.files[0])}
                                className="w-full bg-[#0F0F11] border border-gray-700 rounded-lg p-2 text-sm text-gray-300 cursor-pointer"
                            />
                        ) : (
                            <input
                                type="url"
                                name="podcastUrl"
                                required
                                value={formData.podcastUrl}
                                onChange={handleChange}
                                className="w-full bg-[#0F0F11] border border-gray-700 rounded-lg p-2.5 text-sm focus:border-yellow-500 outline-none"
                                placeholder="https://example.com/video.mp4"
                            />
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-300 mb-1">Total Episodes</label>
                            <input
                                type="number"
                                name="totalEpisodes"
                                value={formData.totalEpisodes}
                                onChange={handleChange}
                                className="w-full bg-[#0F0F11] border border-gray-700 rounded-lg p-2.5 text-sm focus:border-yellow-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-300 mb-1">Avg Length</label>
                            <input
                                type="text"
                                name="averageLength"
                                value={formData.averageLength}
                                onChange={handleChange}
                                className="w-full bg-[#0F0F11] border border-gray-700 rounded-lg p-2.5 text-sm focus:border-yellow-500 outline-none"
                                placeholder="e.g. 30 min"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Short Subtitle/Highlight</label>
                        <input
                            type="text"
                            name="shortDescription"
                            value={formData.shortDescription}
                            onChange={handleChange}
                            className="w-full bg-[#0F0F11] border border-gray-700 rounded-lg p-2.5 text-sm focus:border-yellow-500 outline-none"
                            placeholder="Delves into the transformative impact of AI"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Full Description</label>
                        <textarea
                            name="description"
                            rows="3"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full bg-[#0F0F11] border border-gray-700 rounded-lg p-2.5 text-sm focus:border-yellow-500 outline-none"
                        ></textarea>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm bg-gray-800 hover:bg-gray-700 rounded-lg cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2 text-sm bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded-lg disabled:opacity-50 cursor-pointer"
                        >
                            {loading ? 'Uploading & Saving...' : 'Publish Podcast'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePodcastModal;