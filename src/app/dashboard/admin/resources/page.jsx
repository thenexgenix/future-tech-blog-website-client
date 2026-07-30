'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Calendar, User, Tag, FileText, Loader2, X, PlusCircle, Upload, FileCheck, Image as ImageIcon } from 'lucide-react';
import { getAllResources } from '@/lib/api/resources';
import { createResources, deleteResources } from '@/lib/action/resources';
import { uploadFileToCloudinary } from '@/lib/upload'; // Cloudinary Upload Helper
import Link from 'next/link';

// Date Formatter Helper
const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'N/A';

    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
};

export default function AdminResourcesPage() {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // File States
    const [pdfFile, setPdfFile] = useState(null);
    const [thumbFile, setThumbFile] = useState(null);

    // Initial Form State
    const initialFormState = {
        title: '',
        description: '',
        category: '',
        author: '',
    };

    const [formData, setFormData] = useState(initialFormState);

    // Fetch Resources List
    const fetchResources = async () => {
        try {
            setLoading(true);
            const res = await getAllResources();

            const data = Array.isArray(res) ? res : res?.data || [];
            setResources(data);
        } catch (error) {
            console.error('Failed to fetch resources:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchResources();
    }, []);

    // Handle Form Inputs
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Reset All Form States
    const resetForm = () => {
        setFormData(initialFormState);
        setPdfFile(null);
        setThumbFile(null);
    };

    // Create Resource with Cloudinary Upload
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!pdfFile) {
            alert('Please select a PDF document to upload.');
            return;
        }

        try {
            setSubmitting(true);

            // 1. Upload PDF to Cloudinary ('raw' resource type for PDFs)
            const downloadUrl = await uploadFileToCloudinary(pdfFile, 'auto');

            // 2. Upload Thumbnail to Cloudinary if selected ('image' type)
            let thumbnailUrl = '';
            if (thumbFile) {
                thumbnailUrl = await uploadFileToCloudinary(thumbFile, 'image');
            }

            // 3. Prepare payload and call Action API
            const payload = {
                ...formData,
                downloadUrl,
                thumbnail: thumbnailUrl,
            };

            await createResources(payload);

            // Reset Form & Close Modal
            resetForm();
            setIsModalOpen(false);

            // Refresh List
            fetchResources();
        } catch (error) {
            console.error('Failed to create resource:', error);
            alert('Error uploading file: ' + error.message);
        } finally {
            setSubmitting(false);
        }
    };

    // Delete Resource
    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this resource?')) return;
        try {
            await deleteResources(id);
            setResources((prev) => prev.filter((item) => item._id !== id));
        } catch (error) {
            console.error('Failed to delete resource:', error);
        }
    };

    return (
        <div className="min-h-screen text-white pb-5 sm:p-8 space-y-8">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#262626]">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                        Resources Management
                    </h1>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                        Create and manage whitepapers, guides, and downloadables.
                    </p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition duration-200"
                >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    <span>Create Resources</span>
                </button>
            </div>

            {loading ? (
                <div className="min-h-[40vh] flex items-center justify-center text-zinc-400 gap-2">
                    <Loader2 className="w-6 h-6 animate-spin text-yellow-400" />
                    <span className="text-sm font-medium">Loading resources...</span>
                </div>
            ) : resources.length === 0 ? (
                <div className="py-20 text-center text-zinc-500 space-y-3 bg-[#141414] border border-[#262626] rounded-2xl">
                    <FileText className="w-12 h-12 mx-auto text-zinc-600" />
                    <p className="text-base font-medium">No resources created yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resources.map((item) => (
                        <Link
                            key={item._id}
                            href={`/dashboard/admin/resources/${item._id}`}
                            className="bg-[#141414] border border-[#262626] rounded-2xl p-5 flex flex-col justify-between hover:border-[#333333] transition group relative"
                        >
                            <div className="space-y-4">
                                {/* Title & Delete Button */}
                                <div className="flex items-start justify-between gap-3">
                                    <h3 className="text-base font-semibold text-white leading-snug line-clamp-2">
                                        {item.title}
                                    </h3>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="text-zinc-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-[#1a1a1a] transition"
                                        title="Delete Resource"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* Author & Category Tags */}
                                <div className="flex items-center gap-3 text-xs text-zinc-400 flex-wrap">
                                    <div className="flex items-center gap-1.5 bg-[#1a1a1a] border border-[#262626] px-2.5 py-1 rounded-md">
                                        <Tag className="w-3 h-3 text-yellow-400" />
                                        <span>{item.category || 'General'}</span>
                                    </div>

                                    <div className="flex items-center gap-1.5 bg-[#1a1a1a] border border-[#262626] px-2.5 py-1 rounded-md">
                                        <User className="w-3 h-3 text-zinc-400" />
                                        <span>{item.author || 'Admin'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Footer: Publication Date */}
                            <div className="flex items-center gap-2 pt-4 mt-4 border-t border-[#222222] text-xs text-zinc-500">
                                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                                <span>Published: {formatDate(item.createdAt)}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* ================= CREATE RESOURCE MODAL ================= */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#141414] border border-[#262626] w-full max-w-lg rounded-2xl p-6 sm:p-8 space-y-6 relative shadow-2xl max-h-[90vh] overflow-y-auto">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-[#222] pb-4">
                            <div className="flex items-center gap-2">
                                <PlusCircle className="w-5 h-5 text-yellow-400" />
                                <h2 className="text-lg font-bold text-white">Create Resource</h2>
                            </div>
                            <button
                                onClick={() => {
                                    resetForm();
                                    setIsModalOpen(false);
                                }}
                                className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-[#1a1a1a] transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Title */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-zinc-300">Title / Headline *</label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Quantum Computing Whitepaper"
                                    className="w-full bg-[#1a1a1a] border border-[#262626] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-yellow-400 transition"
                                />
                            </div>

                            {/* Author & Category */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-zinc-300">Author Name</label>
                                    <input
                                        type="text"
                                        name="author"
                                        value={formData.author}
                                        onChange={handleChange}
                                        placeholder="e.g. Dr. Quantum"
                                        className="w-full bg-[#1a1a1a] border border-[#262626] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-yellow-400 transition"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-zinc-300">Category</label>
                                    <input
                                        type="text"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        placeholder="e.g. Quantum Computing"
                                        className="w-full bg-[#1a1a1a] border border-[#262626] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-yellow-400 transition"
                                    />
                                </div>
                            </div>

                            {/* PDF File Upload */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-zinc-300">Upload PDF File *</label>
                                <div className="relative border border-dashed border-[#333] hover:border-yellow-400/50 bg-[#1a1a1a] rounded-xl p-4 transition cursor-pointer text-center">
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        required
                                        onChange={(e) => setPdfFile(e.target.files[0])}
                                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                                    />
                                    <div className="flex flex-col items-center justify-center gap-1.5">
                                        {pdfFile ? (
                                            <>
                                                <FileCheck className="w-6 h-6 text-emerald-400" />
                                                <span className="text-xs font-medium text-emerald-400 truncate max-w-[250px]">
                                                    {pdfFile.name}
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <Upload className="w-5 h-5 text-zinc-400" />
                                                <span className="text-xs text-zinc-400">Click to select PDF document</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Thumbnail File Upload */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-zinc-300">Upload Cover Image (Optional)</label>
                                <div className="relative border border-[#262626] bg-[#1a1a1a] rounded-xl p-3 transition cursor-pointer">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setThumbFile(e.target.files[0])}
                                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                                    />
                                    <div className="flex items-center gap-2.5 text-xs text-zinc-400">
                                        <ImageIcon className="w-4 h-4 text-zinc-400" />
                                        <span className="truncate">
                                            {thumbFile ? thumbFile.name : 'Choose Thumbnail / Cover Image'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-zinc-300">Description</label>
                                <textarea
                                    name="description"
                                    rows="3"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="An in-depth whitepaper exploring..."
                                    className="w-full bg-[#1a1a1a] border border-[#262626] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-yellow-400 transition resize-none"
                                />
                            </div>

                            {/* Form Actions */}
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#222]">
                                <button
                                    type="button"
                                    onClick={() => {
                                        resetForm();
                                        setIsModalOpen(false);
                                    }}
                                    className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white bg-[#1a1a1a] border border-[#262626] transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-2 rounded-xl text-xs transition disabled:opacity-50"
                                >
                                    {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                                    <span>{submitting ? 'Uploading & Creating...' : 'Create Resource'}</span>
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            )}

        </div>
    );
}