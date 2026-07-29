'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft, Save, Loader2, Image as ImageIcon, User,
    Clock, Tag, ShieldCheck, Heart, Eye, Share2, Sparkles,
    CheckCircle2, Upload
} from 'lucide-react';
import { updateNews } from '@/lib/action/news';

export default function EditNewsForm({ id, initialData, categories }) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [tagInput, setTagInput] = useState('');

    // Image Upload States
    const [imageFile, setImageFile] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [imagePreview, setImagePreview] = useState(initialData?.thumbnail ?? '');

    // Pre-populate Form State from Server Props
    const [formData, setFormData] = useState({
        title: initialData?.title ?? '',
        slug: initialData?.slug ?? '',
        category: initialData?.category ?? (categories[0]?.name || ''),
        thumbnail: initialData?.thumbnail ?? '',
        introduction: initialData?.introduction ?? '',
        content: initialData?.content ?? '',
        author: {
            name: initialData?.author?.name ?? '',
            role: initialData?.author?.role ?? '',
        },
        readTime: initialData?.readTime ?? '',
        tags: Array.isArray(initialData?.tags) ? initialData.tags : [],
        metrics: {
            likes: initialData?.metrics?.likes ?? 0,
            views: initialData?.metrics?.views ?? 0,
            shares: initialData?.metrics?.shares ?? 0,
        },
        isFeatured: Boolean(initialData?.isFeatured),
        status: initialData?.status ?? 'published',
        publishedAt: initialData?.publishedAt ?? '',
        createdAt: initialData?.createdAt ?? '',
    });

    // Handle Image Selection & Upload to ImgBB
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));

        // Upload directly to ImgBB
        setUploadingImage(true);
        const imgData = new FormData();
        imgData.append('image', file);

        try {
            const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
            const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: 'POST',
                body: imgData,
            });

            const data = await res.json();

            if (data.success) {
                setFormData((prev) => ({ ...prev, thumbnail: data.data.url }));
            } else {
                // alert('Image upload failed. Please try again.');
                setImageFile(null);
                setImagePreview(formData.thumbnail);
            }
        } catch (error) {
            console.error('ImgBB Upload Error:', error);
            // alert('Something went wrong while uploading image.');
        } finally {
            setUploadingImage(false);
        }
    };

    const handleAddTag = (e) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!formData.tags.includes(tagInput.trim())) {
                setFormData((prev) => ({
                    ...prev,
                    tags: [...prev.tags, tagInput.trim()],
                }));
            }
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.filter((tag) => tag !== tagToRemove),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (uploadingImage) {
            alert('Please wait until the image finishes uploading.');
            return;
        }

        setSaving(true);

        try {
            const res = await updateNews(id, formData);
            if (res?.success || res?.data || res?._id) {
                setSuccessMsg('News updated successfully!');
                setTimeout(() => setSuccessMsg(''), 3000);
            }
        } catch (error) {
            console.error('Error updating news:', error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl mx-auto pb-12">
            {successMsg && (
                <div className="flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium rounded-xl transition animate-in fade-in duration-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{successMsg}</span>
                </div>
            )}

            {/* Top Navigation & Action */}
            <div className="flex items-center justify-between gap-4 border-b border-[#262626] pb-5">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white bg-[#141414] border border-[#262626] px-3.5 py-2 rounded-xl transition cursor-pointer"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to News
                </button>

                <button
                    type="submit"
                    disabled={saving || uploadingImage}
                    className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition cursor-pointer disabled:opacity-60"
                >
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-5">
                    {/* Title */}
                    <div className="space-y-1.5 bg-[#141414] p-4 rounded-xl border border-[#262626]">
                        <label className="text-xs font-medium text-zinc-400">Article Title</label>
                        <textarea
                            rows="2"
                            required
                            className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg p-3 text-base font-medium text-white focus:outline-none focus:border-yellow-400/60 transition resize-none"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    {/* Slug */}
                    <div className="space-y-1.5 bg-[#141414] p-4 rounded-xl border border-[#262626]">
                        <label className="text-xs font-medium text-zinc-400">Slug URL</label>
                        <input
                            type="text"
                            required
                            className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg py-2 px-3 text-xs text-zinc-300 focus:outline-none focus:border-yellow-400/60 transition"
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        />
                    </div>

                    {/* Introduction */}
                    <div className="space-y-1.5 bg-[#141414] p-4 rounded-xl border border-[#262626]">
                        <label className="text-xs font-medium text-zinc-400">Short Introduction</label>
                        <textarea
                            rows="3"
                            className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg p-3 text-xs text-zinc-300 focus:outline-none focus:border-yellow-400/60 transition"
                            value={formData.introduction}
                            onChange={(e) => setFormData({ ...formData, introduction: e.target.value })}
                        />
                    </div>

                    {/* Content */}
                    <div className="space-y-1.5 bg-[#141414] p-4 rounded-xl border border-[#262626]">
                        <label className="text-xs font-medium text-zinc-400">Full Content Body</label>
                        <textarea
                            rows="12"
                            required
                            className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg p-3 text-xs text-zinc-200 focus:outline-none focus:border-yellow-400/60 transition leading-relaxed"
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        />
                    </div>
                </div>

                {/* Sidebar Options & Meta Data */}
                <div className="space-y-5">
                    {/* Status & Featured */}
                    <div className="bg-[#141414] p-4 rounded-xl border border-[#262626] space-y-4">
                        <h3 className="text-xs font-semibold text-zinc-400 tracking-wider uppercase border-b border-[#262626] pb-2">
                            Publish Settings
                        </h3>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
                                <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" /> Status
                            </label>
                            <select
                                className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-yellow-400/60 transition"
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option value="published">Published</option>
                                <option value="draft">Draft</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <span className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-yellow-400" /> Featured Article
                            </span>
                            <input
                                type="checkbox"
                                className="w-4 h-4 accent-yellow-400 rounded cursor-pointer"
                                checked={formData.isFeatured}
                                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                            />
                        </div>
                    </div>

                    {/* Category & Read Time */}
                    <div className="bg-[#141414] p-4 rounded-xl border border-[#262626] space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
                                <Tag className="w-3.5 h-3.5 text-zinc-500" /> Category
                            </label>
                            <select
                                className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-yellow-400/60 transition"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="" disabled>Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat._id || cat.name} value={cat.name}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-zinc-500" /> Read Time
                            </label>
                            <input
                                type="text"
                                className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-yellow-400/60 transition"
                                value={formData.readTime}
                                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Author Details */}
                    <div className="bg-[#141414] p-4 rounded-xl border border-[#262626] space-y-3">
                        <h3 className="text-xs font-semibold text-zinc-400 tracking-wider uppercase border-b border-[#262626] pb-2">
                            Author Info
                        </h3>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
                                <User className="w-3.5 h-3.5 text-zinc-500" /> Author Name
                            </label>
                            <input
                                type="text"
                                className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-yellow-400/60 transition"
                                value={formData.author.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        author: { ...formData.author, name: e.target.value },
                                    })
                                }
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-zinc-400">Author Role</label>
                            <input
                                type="text"
                                className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-yellow-400/60 transition"
                                value={formData.author.role}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        author: { ...formData.author, role: e.target.value },
                                    })
                                }
                            />
                        </div>
                    </div>

                    {/* Thumbnail Image Upload */}
                    <div className="bg-[#141414] p-4 rounded-xl border border-[#262626] space-y-3">
                        <label className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
                            <ImageIcon className="w-3.5 h-3.5 text-zinc-500" /> Upload New Thumbnail
                        </label>

                        <div className="relative border border-dashed border-[#333] hover:border-yellow-400/50 rounded-lg p-3 bg-[#1a1a1a] text-center transition cursor-pointer">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className="flex flex-col items-center justify-center gap-1 text-zinc-400">
                                {uploadingImage ? (
                                    <div className="flex items-center gap-2 text-xs text-yellow-400">
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Uploading to ImgBB...
                                    </div>
                                ) : (
                                    <>
                                        <Upload className="w-5 h-5 text-zinc-500" />
                                        <span className="text-xs">Click or drag new image to replace</span>
                                    </>
                                )}
                            </div>
                        </div>

                        {imagePreview && (
                            <div className="relative aspect-video rounded-lg overflow-hidden border border-[#262626] mt-2">
                                <img
                                    src={imagePreview}
                                    alt="Thumbnail Preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        )}
                    </div>

                    {/* Tags Input */}
                    <div className="bg-[#141414] p-4 rounded-xl border border-[#262626] space-y-3">
                        <label className="text-xs font-medium text-zinc-400">Tags (Press Enter)</label>
                        <input
                            type="text"
                            placeholder="Add tag and press enter..."
                            className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-yellow-400/60 transition"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleAddTag}
                        />

                        <div className="flex flex-wrap gap-1.5 pt-1">
                            {formData.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className="text-[10px] bg-[#222] border border-[#333] text-zinc-300 px-2 py-0.5 rounded-md flex items-center gap-1"
                                >
                                    #{tag}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTag(tag)}
                                        className="hover:text-red-400 cursor-pointer"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Metrics Status */}
                    <div className="bg-[#141414] p-4 rounded-xl border border-[#262626] space-y-3">
                        <h3 className="text-xs font-semibold text-zinc-400 tracking-wider uppercase border-b border-[#262626] pb-2">
                            Metrics Status
                        </h3>
                        <div className="grid grid-cols-3 gap-2 text-center">
                            <div className="p-2 bg-[#1a1a1a] rounded-lg">
                                <Heart className="w-3.5 h-3.5 mx-auto text-rose-500 mb-1" />
                                <p className="text-xs font-bold text-white">{formData.metrics.likes}</p>
                                <p className="text-[10px] text-zinc-500">Likes</p>
                            </div>
                            <div className="p-2 bg-[#1a1a1a] rounded-lg">
                                <Eye className="w-3.5 h-3.5 mx-auto text-blue-400 mb-1" />
                                <p className="text-xs font-bold text-white">{formData.metrics.views}</p>
                                <p className="text-[10px] text-zinc-500">Views</p>
                            </div>
                            <div className="p-2 bg-[#1a1a1a] rounded-lg">
                                <Share2 className="w-3.5 h-3.5 mx-auto text-emerald-400 mb-1" />
                                <p className="text-xs font-bold text-white">{formData.metrics.shares}</p>
                                <p className="text-[10px] text-zinc-500">Shares</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}