'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Newspaper, Calendar, X, Loader2, Image as ImageIcon, User, Clock, Tag, Check, Upload, CheckCircle2, Trash2, AlertTriangle } from 'lucide-react';
import { getAllNews } from '@/lib/api/news';
import { getAllCategory } from '@/lib/api/category';
import { createCategory } from '@/lib/action/categories';
import { createNews, deleteNews } from '@/lib/action/news';

export default function NewsPage() {
    const [newsList, setNewsList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Delete Modal & Action States
    const [selectedNewsToDelete, setSelectedNewsToDelete] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    // Image Upload States
    const [imageFile, setImageFile] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [imagePreview, setImagePreview] = useState('');

    // Dynamic Category States
    const [isAddingCategory, setIsAddingCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [addingCategoryLoading, setAddingCategoryLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        thumbnail: '',
        authorName: 'Dr. Emily Walker',
        readTime: '5 Min',
        introduction: '',
        content: '',
    });

    const fetchData = async () => {
        try {
            setLoading(true);

            const [newsRes, catRes] = await Promise.all([
                getAllNews(),
                getAllCategory()
            ]);

            const newsData = Array.isArray(newsRes) ? newsRes : newsRes?.data || [];
            const catData = Array.isArray(catRes) ? catRes : catRes?.data || [];

            setNewsList(newsData);
            setCategories(catData);

            if (catData.length > 0) {
                setFormData((prev) => ({ ...prev, category: catData[0].name }));
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchData();
    }, []);

    // Open Delete Modal Handler
    const openDeleteModal = (e, item) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedNewsToDelete(item);
    };

    // Confirm Delete Action
    const handleConfirmDelete = async () => {
        if (!selectedNewsToDelete) return;

        const id = selectedNewsToDelete._id;
        try {
            setDeletingId(id);
            const res = await deleteNews(id);

            if (res?.success || res?.ok || res?.deletedCount > 0) {
                setNewsList((prev) => prev.filter((item) => item._id !== id));
            } else {
                console.error('Failed to delete news:', res?.message);
            }
        } catch (error) {
            console.error('Error deleting news:', error);
        } finally {
            setDeletingId(null);
            setSelectedNewsToDelete(null);
        }
    };

    // Handle Image Selection & Upload to ImgBB
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));

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
                setImageFile(null);
                setImagePreview('');
            }
        } catch (error) {
            console.error('ImgBB Upload Error:', error);
        } finally {
            setUploadingImage(false);
        }
    };

    // Handle Dynamic Category Creation
    const handleAddCategory = async () => {
        if (!newCategoryName.trim()) return;

        try {
            setAddingCategoryLoading(true);

            const res = await createCategory({ name: newCategoryName });

            if (res?.success || res?.data || res?._id) {
                const addedCategory = res.data || res;
                setCategories((prev) => [...prev, addedCategory]);
                setFormData((prev) => ({ ...prev, category: addedCategory.name }));
                setNewCategoryName('');
                setIsAddingCategory(false);
            }
        } catch (error) {
            console.error('Error adding category:', error);
        } finally {
            setAddingCategoryLoading(false);
        }
    };

    // Handle News Form Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.thumbnail) return;

        setSubmitting(true);

        try {
            const res = await createNews(formData);

            if (res?.success || res?.data || res?._id) {
                setFormData({
                    title: '',
                    category: categories[0]?.name || '',
                    thumbnail: '',
                    authorName: 'Dr. Emily Walker',
                    readTime: '5 Min',
                    introduction: '',
                    content: '',
                });
                setImageFile(null);
                setImagePreview('');
                setIsModalOpen(false);
                fetchData();
            }
        } catch (error) {
            console.error('Error creating news:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-6 min-h-screen pb-5 md:p-12">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#262626] pb-5">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                        <Newspaper className="w-6 h-6 text-yellow-400" />
                        Manage News
                    </h1>
                    <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                        Publish and structure your news content.
                    </p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition cursor-pointer shrink-0"
                >
                    <Plus className="w-4 h-4" />
                    Create News
                </button>
            </div>

            {/* News Cards Grid */}
            {loading ? (
                <div className="flex items-center justify-center py-16 text-zinc-500 gap-2">
                    <Loader2 className="w-5 h-5 animate-spin text-yellow-400" />
                    <span className="text-xs font-medium">Loading news...</span>
                </div>
            ) : newsList.length === 0 ? (
                <div className="p-12 text-center bg-[#141414] border border-[#262626] rounded-2xl space-y-3">
                    <Newspaper className="w-10 h-10 text-zinc-600 mx-auto" />
                    <h3 className="text-sm font-semibold text-zinc-300">No news published yet</h3>
                    <p className="text-xs text-zinc-500">Click the button above to publish your first news article.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {newsList.map((item) => (
                        <Link
                            key={item._id}
                            href={`/dashboard/admin/news/${item._id}`}
                            className="relative p-5 bg-[#141414] border border-[#262626] rounded-xl hover:border-yellow-400/50 transition flex flex-col justify-between space-y-4 group cursor-pointer"
                        >
                            <div className="space-y-3">
                                <div className="flex items-center justify-between pr-8">
                                    <span className="px-2.5 py-0.5 rounded-full bg-yellow-400/10 text-yellow-400 text-[10px] font-semibold uppercase tracking-wider border border-yellow-400/20">
                                        {item.category}
                                    </span>
                                    <span className="text-[11px] text-zinc-500 flex items-center gap-1">
                                        <Clock className="w-3 h-3 text-zinc-500" />
                                        {item.readTime}
                                    </span>
                                </div>

                                {/* DELETE ICON - TOP RIGHT CORNER */}
                                <button
                                    onClick={(e) => openDeleteModal(e, item)}
                                    title="Delete News"
                                    className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#1a1a1a] border border-[#262626] text-zinc-400 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/10 transition z-10 cursor-pointer"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>

                                <h3 className="text-sm font-semibold text-white group-hover:text-yellow-400 transition leading-snug line-clamp-2 pr-2">
                                    {item.title}
                                </h3>

                                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                                    {item.introduction || item.content}
                                </p>
                            </div>

                            <div className="flex items-center justify-between text-[11px] text-zinc-500 pt-3 border-t border-[#1e1e1e]">
                                <span className="flex items-center gap-1 font-medium text-zinc-400">
                                    <User className="w-3.5 h-3.5 text-zinc-500" />
                                    {item.author?.name || item.authorName || 'Admin'}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                                    {new Date(item.createdAt).toLocaleDateString('en-US', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                    })}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* DELETE CONFIRMATION MODAL */}
            {selectedNewsToDelete && (
                <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[#141414] border border-[#262626] rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
                        <div className="flex items-center gap-3 text-red-400">
                            <div className="p-2.5 bg-red-500/10 rounded-xl border border-red-500/20">
                                <AlertTriangle className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-white">Delete News Article</h3>
                                <p className="text-xs text-zinc-400">This action cannot be undone.</p>
                            </div>
                        </div>

                        <p className="text-xs text-zinc-300 leading-relaxed bg-[#1a1a1a] p-3 rounded-xl border border-[#262626]">
                            Are you sure you want to delete <span className="text-white font-semibold">{selectedNewsToDelete.title}</span>?
                        </p>

                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setSelectedNewsToDelete(null)}
                                disabled={deletingId !== null}
                                className="px-4 py-2 text-xs font-medium text-zinc-400 hover:text-white bg-[#1a1a1a] border border-[#262626] rounded-xl transition cursor-pointer disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirmDelete}
                                disabled={deletingId !== null}
                                className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-500 rounded-xl transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                            >
                                {deletingId ? (
                                    <>
                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    'Delete Article'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* CREATE NEWS MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[#141414] border border-[#262626] rounded-2xl max-w-2xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between pb-4 border-b border-[#262626]">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                <Newspaper className="w-5 h-5 text-yellow-400" />
                                Publish New Article
                            </h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-zinc-500 hover:text-white p-1 rounded-lg bg-[#1a1a1a] transition"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-zinc-300">Article Title *</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Artificial Intelligence (AI) in Healthcare"
                                    className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg py-2.5 px-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-400/60 transition"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <div className="flex justify-between items-center">
                                        <label className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
                                            <Tag className="w-3.5 h-3.5 text-zinc-500" /> Category
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => setIsAddingCategory(!isAddingCategory)}
                                            className="text-[11px] text-yellow-400 hover:underline flex items-center gap-0.5 cursor-pointer font-medium"
                                        >
                                            {isAddingCategory ? 'Cancel' : '+ Add New'}
                                        </button>
                                    </div>

                                    {isAddingCategory ? (
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="text"
                                                placeholder="New category..."
                                                className="w-full bg-[#1a1a1a] border border-yellow-400/50 rounded-lg py-2 px-3 text-xs text-white focus:outline-none"
                                                value={newCategoryName}
                                                onChange={(e) => setNewCategoryName(e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                onClick={handleAddCategory}
                                                disabled={addingCategoryLoading}
                                                className="bg-yellow-400 text-black p-2 rounded-lg hover:bg-yellow-300 transition shrink-0 cursor-pointer"
                                            >
                                                {addingCategoryLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                                            </button>
                                        </div>
                                    ) : (
                                        <select
                                            className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg py-2.5 px-3.5 text-sm text-white focus:outline-none focus:border-yellow-400/60 transition"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            {categories.map((cat) => (
                                                <option key={cat._id || cat.name} value={cat.name}>
                                                    {cat.name}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5 text-zinc-500" /> Read Time
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 5 Min"
                                        className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg py-2.5 px-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-400/60 transition"
                                        value={formData.readTime}
                                        onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Direct Image File Upload System */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
                                        <ImageIcon className="w-3.5 h-3.5 text-zinc-500" /> Upload Thumbnail *
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
                                            ) : formData.thumbnail ? (
                                                <div className="flex items-center gap-1.5 text-xs text-green-400 font-medium">
                                                    <CheckCircle2 className="w-4 h-4" />
                                                    Uploaded Successfully!
                                                </div>
                                            ) : (
                                                <>
                                                    <Upload className="w-5 h-5 text-zinc-500" />
                                                    <span className="text-xs">Click or drag image to upload</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-zinc-300 flex items-center gap-1.5">
                                        <User className="w-3.5 h-3.5 text-zinc-500" /> Author Name
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Dr. Emily Walker"
                                        className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg py-2.5 px-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-400/60 transition"
                                        value={formData.authorName}
                                        onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Image Preview Area */}
                            {imagePreview && (
                                <div className="mt-2 relative w-full h-32 bg-[#1a1a1a] rounded-lg overflow-hidden border border-[#262626]">
                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}

                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-zinc-300">Short Introduction</label>
                                <textarea
                                    rows="2"
                                    placeholder="Brief summary for card preview..."
                                    className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg py-2.5 px-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-400/60 transition resize-none"
                                    value={formData.introduction}
                                    onChange={(e) => setFormData({ ...formData, introduction: e.target.value })}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-zinc-300">Full Content / Article Body *</label>
                                <textarea
                                    rows="5"
                                    required
                                    placeholder="Write full article here..."
                                    className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg py-2.5 px-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-400/60 transition"
                                    value={formData.content}
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-3 border-t border-[#262626]">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2.5 text-xs font-medium text-zinc-400 hover:text-white bg-[#1a1a1a] rounded-lg transition"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={submitting || uploadingImage}
                                    className="px-5 py-2.5 text-xs font-semibold text-black bg-yellow-400 hover:bg-yellow-300 rounded-lg transition flex items-center gap-2 cursor-pointer disabled:opacity-60"
                                >
                                    {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                                    Publish News
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}