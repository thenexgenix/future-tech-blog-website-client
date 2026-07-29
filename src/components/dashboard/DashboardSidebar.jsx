'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Newspaper,
    FolderKanban,
    BookOpen,
    LogOut,
    Menu,
    X,
    ShieldAlert
} from 'lucide-react';
import { authClient } from '@/lib/auth-client';

export default function DashboardSidebar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', href: '/dashboard/admin', icon: LayoutDashboard },
        { name: 'News', href: '/dashboard/admin/news', icon: Newspaper },
        { name: 'Resources', href: '/dashboard/admin/resources', icon: FolderKanban },
        { name: 'Blogs', href: '/dashboard/admin/blogs', icon: BookOpen },
    ];

    const handleSignOut = async () => {
        await authClient.signOut();
        window.location.href = '/login';
    };

    return (
        <>

            <div className="md:hidden flex items-center justify-between p-4 bg-[#141414] border-b border-[#262626] sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center">
                        <ShieldAlert className="w-4 h-4 text-yellow-400" />
                    </div>
                    <span className="font-bold text-sm tracking-wide text-white">Admin Panel</span>
                </div>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 text-zinc-400 hover:text-white rounded-lg bg-[#1a1a1a] border border-[#262626]"
                >
                    {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                />
            )}

            <aside
                className={`fixed md:sticky top-0 left-0 z-50 h-screen w-64 bg-[#141414] border-r border-[#262626] flex flex-col justify-between p-4 transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                    }`}
            >
                {/* Top Section */}
                <div className="space-y-6">

                    {/* Logo / Title */}
                    <div className="hidden md:flex items-center gap-3 px-2 pt-2">
                        <div className="w-9 h-9 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center shrink-0">
                            <ShieldAlert className="w-5 h-5 text-yellow-400" />
                        </div>
                        <div>
                            <h2 className="font-bold text-sm text-white leading-none">FutureTech</h2>
                            <span className="text-[10px] text-zinc-500 font-medium">Admin Control</span>
                        </div>
                    </div>

                    <div className="border-t border-[#262626] hidden md:block" />

                    {/* Navigation Links */}
                    <nav className="space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${isActive
                                            ? 'bg-yellow-400 text-black font-semibold shadow-md shadow-yellow-400/10'
                                            : 'text-zinc-400 hover:text-white hover:bg-[#1a1a1a]'
                                        }`}
                                >
                                    <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-zinc-400'}`} />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Bottom Section */}
                <div className="space-y-3 pt-4 border-t border-[#262626]">
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all cursor-pointer"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>

            </aside>
        </>
    );
}