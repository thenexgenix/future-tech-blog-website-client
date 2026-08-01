'use client';

import { updateUserProfile, updatePassword } from '@/lib/action/user';
import { uploadFileToCloudinary } from '@/lib/upload';
import { useState } from 'react';

export default function AdminProfileForm({ initialUser }) {
    const [user, setUser] = useState({
        userId: initialUser._id || initialUser.userId || '',
        name: initialUser.name || '',
        email: initialUser.email || '',
        image: initialUser.image || '',
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [loading, setLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [uploadingImg, setUploadingImg] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    // Cloudinary File Upload Handler
    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setUploadingImg(true);
            setMessage({ type: '', text: '' });

            const uploadedUrl = await uploadFileToCloudinary(file, 'image');

            if (uploadedUrl) {
                setUser((prev) => ({ ...prev, image: uploadedUrl }));
                setMessage({ type: 'success', text: 'Image uploaded successfully!' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: error.message || 'Image upload failed.' });
        } finally {
            setUploadingImg(false);
        }
    };

    // Profile Info Submit (name, email, image)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const payload = {
                userId: user.userId,
                name: user.name,
                email: user.email,
                image: user.image,
            };

            const res = await updateUserProfile(payload);

            if (res?.success) {
                setMessage({ type: 'success', text: res.message || 'Profile updated successfully!' });
            } else {
                setMessage({ type: 'error', text: res?.message || 'Failed to update profile.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    // Password Change Submit (separate form/section)
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setPasswordMessage({ type: '', text: '' });

        if (!passwordData.currentPassword || !passwordData.newPassword) {
            setPasswordMessage({ type: 'error', text: 'Current and new password are required.' });
            return;
        }

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordMessage({ type: 'error', text: 'New password and confirm password do not match.' });
            return;
        }

        if (passwordData.newPassword.length < 6) {
            setPasswordMessage({ type: 'error', text: 'New password must be at least 6 characters.' });
            return;
        }

        setPasswordLoading(true);

        try {
            const res = await updatePassword({
                userId: user.userId,
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword,
            });

            if (res?.success) {
                setPasswordMessage({ type: 'success', text: res.message || 'Password changed successfully!' });
                setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            } else {
                setPasswordMessage({ type: 'error', text: res?.message || 'Failed to change password.' });
            }
        } catch (error) {
            setPasswordMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
        } finally {
            setPasswordLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Profile Update Section */}
            {message.text && (
                <div
                    className={`p-4 rounded-xl text-sm font-medium transition-all ${message.type === 'success'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}
                >
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Avatar Column */}
                <div className="lg:col-span-1 bg-[#10172A]/70 border border-slate-800/80 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4 shadow-xl">
                    <div className="relative group w-32 h-32 rounded-full border-4 border-amber-500/40 shadow-xl bg-slate-900 flex items-center justify-center">
                        {user.image ? (
                            <img
                                src={user.image}
                                alt="Profile Avatar"
                                className="w-full h-full object-cover rounded-full"
                            />
                        ) : (
                            <svg className="w-16 h-16 text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                        )}

                        {uploadingImg && (
                            <div className="absolute inset-0 bg-slate-950/70 rounded-full flex items-center justify-center">
                                <div className="w-8 h-8 border-3 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}

                        <label
                            htmlFor="avatar-file-input"
                            className="absolute bottom-0 right-0 p-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-full cursor-pointer shadow-lg transition-transform hover:scale-105"
                            title="Upload new image"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z">
                                </path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            </svg>
                        </label>

                        <input
                            id="avatar-file-input"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={uploadingImg}
                            className="hidden"
                        />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-white">{user.name || 'Admin'}</h2>
                        <p className="text-xs text-amber-500 font-medium uppercase mt-0.5 tracking-wider">
                            System Administrator
                        </p>
                    </div>

                    <div className="w-full pt-2">
                        <label className="block text-xs text-slate-400 text-left mb-1.5 font-medium">
                            Avatar Image URL
                        </label>
                        <input
                            type="url"
                            name="image"
                            value={user.image}
                            onChange={handleChange}
                            placeholder="https://example.com/avatar.jpg"
                            className="w-full px-3.5 py-2.5 bg-[#0B0F19] border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition"
                        />
                    </div>
                </div>

                {/* Right Input Fields Column */}
                <div className="lg:col-span-2 bg-[#10172A]/70 border border-slate-800/80 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
                    <h3 className="text-lg font-semibold text-white border-b border-slate-800/80 pb-3">
                        Account Details
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-300">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 bg-[#0B0F19] border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-amber-500 transition"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-slate-300">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2.5 bg-[#0B0F19] border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-amber-500 transition"
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={loading || uploadingImg}
                            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 disabled:bg-amber-500/50 text-slate-950 font-semibold text-sm rounded-xl transition shadow-lg shadow-amber-500/10 flex items-center gap-2"
                        >
                            {loading ? 'Saving...' : 'Update Profile'}
                        </button>
                    </div>
                </div>
            </form>

            {/* Password Change Section (separate form) */}
            {passwordMessage.text && (
                <div
                    className={`p-4 rounded-xl text-sm font-medium transition-all ${passwordMessage.type === 'success'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        }`}
                >
                    {passwordMessage.text}
                </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="bg-[#10172A]/70 border border-slate-800/80 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
                <h3 className="text-lg font-semibold text-white border-b border-slate-800/80 pb-3">
                    Change Password
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-300">Current Password</label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 bg-[#0B0F19] border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-amber-500 transition"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-300">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 bg-[#0B0F19] border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-amber-500 transition"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-300">Confirm New Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordChange}
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 bg-[#0B0F19] border border-slate-800 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-amber-500 transition"
                        />
                    </div>
                </div>

                <div className="pt-2 flex justify-end">
                    <button
                        type="submit"
                        disabled={passwordLoading}
                        className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 disabled:bg-amber-500/50 text-slate-950 font-semibold text-sm rounded-xl transition shadow-lg shadow-amber-500/10 flex items-center gap-2"
                    >
                        {passwordLoading ? 'Changing...' : 'Change Password'}
                    </button>
                </div>
            </form>
        </div>
    );
}