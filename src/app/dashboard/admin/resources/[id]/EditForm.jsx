'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Loader2, Upload, FileCheck, Image as ImageIcon, ExternalLink, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { uploadFileToCloudinary } from '@/lib/upload';
import { deleteResources, updateResources } from '@/lib/action/resources';

export default function EditForm({ resource, id }) {
    const router = useRouter();

    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [updating, setUpdating] = useState(false);
    const [newPdfFile, setNewPdfFile] = useState(null);
    const [newThumbFile, setNewThumbFile] = useState(null);

    const [formData, setFormData] = useState({
        title: resource?.title || '',
        author: resource?.author || '',
        category: resource?.category || '',
        description: resource?.description || '',
        downloadUrl: resource?.downloadUrl || '',
        thumbnail: resource?.thumbnail || '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePdfChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                setErrorMsg(`PDF File size is too big (${(file.size / (1024 * 1024)).toFixed(1)} MB)| Max 10MB can be upload.`);
                setNewPdfFile(null);
                e.target.value = null; 
                return;
            }
            setErrorMsg('');
            setNewPdfFile(file);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            setUpdating(true);

            let updatedDownloadUrl = formData.downloadUrl;
            let updatedThumbnail = formData.thumbnail;

            if (newPdfFile) {
                updatedDownloadUrl = await uploadFileToCloudinary(newPdfFile, 'raw');
            }

            if (newThumbFile) {
                updatedThumbnail = await uploadFileToCloudinary(newThumbFile, 'image');
            }

            const payload = {
                ...formData,
                downloadUrl: updatedDownloadUrl,
                thumbnail: updatedThumbnail,
            };

            const res = await updateResources(id, payload);
            // alert('Resource updated successfully!');

            setFormData(payload);
            setNewPdfFile(null);
            setNewThumbFile(null);

            if (res?.success || res?.data || res?._id) {
                setSuccessMsg('updated successfully!');
                setTimeout(() => setSuccessMsg(''), 3000);
            }

            router.refresh(); // Revalidate server data
        } catch (error) {
            console.error('Failed to update resource:', error);
            setErrorMsg('Failed to update');
            // alert('Error updating resource: ' + error.message);
        } finally {
            setUpdating(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this resource permanently?')) return;
        try {
            await deleteResources(id);
            router.push('/admin/resources');
        } catch (error) {
            console.error('Failed to delete resource:', error);
        }
    };

    return (
        <div className="space-y-8">
            {/* Top Navigation & Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#262626]">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="p-2 rounded-xl bg-[#141414] border border-[#262626] hover:bg-[#1a1a1a] text-zinc-400 hover:text-white transition"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                            Resource Details
                        </h1>
                        <p className="text-xs text-zinc-400 mt-0.5">ID: {id}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="inline-flex items-center gap-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 font-medium px-4 py-2 rounded-xl text-xs transition"
                    >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete</span>
                    </button>

                    <button
                        type="submit"
                        form="edit-resource-form"
                        disabled={updating}
                        className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-5 py-2 rounded-xl text-xs transition disabled:opacity-50"
                    >
                        {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        <span>{updating ? 'Saving Changes...' : 'Save Changes'}</span>
                    </button>
                </div>
            </div>

            {/* Editable Form */}
            <form id="edit-resource-form" onSubmit={handleUpdate} className="space-y-6">
                {successMsg && (
                    <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium rounded-xl transition animate-in fade-in duration-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{successMsg}</span>
                    </div>
                )}

                {errorMsg && (
                    <div className="flex items-center gap-2 p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium rounded-xl transition animate-in fade-in duration-200">
                        <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>{errorMsg}</span>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Side: Text Inputs */}
                    <div className="lg:col-span-2 space-y-5 bg-[#141414] border border-[#262626] rounded-2xl p-6">
                        <h2 className="text-sm font-semibold text-zinc-300 border-b border-[#222] pb-3">
                            General Information
                        </h2>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-zinc-400">Title / Name *</label>
                            <input
                                type="text"
                                name="title"
                                required
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full bg-[#1a1a1a] border border-[#262626] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-yellow-400 transition"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-zinc-400">Author</label>
                                <input
                                    type="text"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleChange}
                                    className="w-full bg-[#1a1a1a] border border-[#262626] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-yellow-400 transition"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-zinc-400">Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full bg-[#1a1a1a] border border-[#262626] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-yellow-400 transition"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-zinc-400">Description</label>
                            <textarea
                                name="description"
                                rows="6"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full bg-[#1a1a1a] border border-[#262626] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-yellow-400 transition resize-none leading-relaxed"
                            />
                        </div>
                    </div>

                    {/* Right Side: Media Files */}
                    <div className="space-y-5 bg-[#141414] border border-[#262626] rounded-2xl p-6">
                        <h2 className="text-sm font-semibold text-zinc-300 border-b border-[#222] pb-3">
                            Attached Files
                        </h2>

                        {/* PDF File */}
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-zinc-400">PDF Document</label>
                            {formData.downloadUrl && (
                                <a
                                    href={formData.downloadUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-between bg-[#1a1a1a] border border-[#262626] p-3 rounded-xl text-xs text-yellow-400 hover:underline"
                                >
                                    <span className="truncate max-w-[200px]">View Current PDF</span>
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            )}

                            <div className="relative border border-dashed border-[#333] hover:border-yellow-400/50 bg-[#1a1a1a] rounded-xl p-3 transition cursor-pointer text-center mt-2">
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) => setNewPdfFile(e.target.files[0])}
                                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                                />
                                <div className="flex items-center justify-center gap-2 text-xs text-zinc-400">
                                    {newPdfFile ? (
                                        <>
                                            <FileCheck className="w-4 h-4 text-emerald-400" />
                                            <span className="text-emerald-400 truncate max-w-[180px]">{newPdfFile.name}</span>
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="w-4 h-4 text-zinc-400" />
                                            <span>Replace PDF Document</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Thumbnail Image */}
                        <div className="space-y-2 pt-3 border-t border-[#222]">
                            <label className="text-xs font-medium text-zinc-400">Thumbnail Image</label>
                            {formData.thumbnail ? (
                                <div className="relative w-full h-36 bg-[#1a1a1a] rounded-xl overflow-hidden border border-[#262626]">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={formData.thumbnail}
                                        alt="Thumbnail"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="w-full h-24 bg-[#1a1a1a] rounded-xl flex items-center justify-center text-xs text-zinc-500 border border-[#262626]">
                                    No Image Uploaded
                                </div>
                            )}

                            <div className="relative border border-[#262626] bg-[#1a1a1a] rounded-xl p-3 transition cursor-pointer mt-2">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setNewThumbFile(e.target.files[0])}
                                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                                />
                                <div className="flex items-center gap-2 text-xs text-zinc-400">
                                    <ImageIcon className="w-4 h-4 text-zinc-400" />
                                    <span className="truncate">
                                        {newThumbFile ? newThumbFile.name : 'Replace Thumbnail Image'}
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    );
}