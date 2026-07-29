'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, ArrowRight, LogIn, Loader2 } from 'lucide-react';
import { authClient } from '@/lib/auth-client';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Calling Better Auth sign-in API
            const { data, error: authError } = await authClient.signIn.email({
                email: formData.email,
                password: formData.password,
                callbackURL: '/dashboard/admin',
            });

            if (authError) {
                setError(authError.message || 'Invalid email or password.');
            } else {
                router.push('/dashboard/admin');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-md bg-[#141414] border border-[#262626] rounded-2xl p-6 sm:p-8 space-y-6">

                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#1e1e1e] border border-[#262626] mb-2">
                        <LogIn className="w-6 h-6 text-yellow-400" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">Welcome Back</h1>
                    <p className="text-xs sm:text-sm text-zinc-400">
                        Sign in to access your admin dashboard
                    </p>
                </div>

                {/* Error Alert Message */}
                {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-xs text-red-400 text-center">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Email Input */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-zinc-300">Email Address</label>
                        <div className="relative">
                            <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="email"
                                required
                                disabled={loading}
                                placeholder="admin@futuretech.com"
                                className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-400/60 transition disabled:opacity-50"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-medium text-zinc-300">Password</label>
                        </div>
                        <div className="relative">
                            <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="password"
                                required
                                disabled={loading}
                                placeholder="••••••••"
                                className="w-full bg-[#1a1a1a] border border-[#262626] rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-yellow-400/60 transition disabled:opacity-50"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold text-sm py-2.5 rounded-lg transition flex items-center justify-center gap-2 mt-2 disabled:opacity-60 cursor-pointer"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            <>
                                Sign In
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>

            </div>
        </main>
    );
}