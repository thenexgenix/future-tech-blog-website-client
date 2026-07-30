'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Newspaper,
    FolderKanban,
    BookOpen,
    LogOut,
    ShieldAlert,
    X,
    Contact,
    MessageCircleCheck
} from 'lucide-react';
import { authClient } from '@/lib/auth-client';

export default function DashboardSidebar({ isOpen, onClose }) {
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', href: '/dashboard/admin', icon: LayoutDashboard },
        { name: 'News', href: '/dashboard/admin/news', icon: Newspaper },
        { name: 'Resources', href: '/dashboard/admin/resources', icon: FolderKanban },
        { name: 'Podcasts', href: '/dashboard/admin/podcast', icon: BookOpen },
        { name: 'Messages', href: '/dashboard/admin/contact', icon: MessageCircleCheck },
    ];

    const handleSignOut = async () => {
        await authClient.signOut();
        window.location.href = '/login';
    };

    return (
        <>
            {/* Backdrop for Mobile - Simple black overlay without blur */}
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-black/70 z-40 md:hidden"
                />
            )}

            {/* Sidebar Container */}
            <aside
                className={`fixed md:sticky top-0 md:top-[65px] left-0 z-50 h-screen md:h-[calc(100vh-65px)] w-64 bg-[#141414] border-r border-[#262626] flex flex-col justify-between p-4 transition-transform duration-300 ease-in-out shrink-0 ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                    }`}
            >
                {/* Top Section */}
                <div className="space-y-6 overflow-y-auto">

                    {/* Header Logo */}
                    <div className="flex items-center justify-between px-2 pt-2">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center shrink-0">
                                <ShieldAlert className="w-5 h-5 text-yellow-400" />
                            </div>
                            <div>
                                <h2 className="font-bold text-sm text-white leading-none">FutureTech</h2>
                                <span className="text-[10px] text-zinc-500 font-medium">Admin Control</span>
                            </div>
                        </div>

                        {/* Mobile Close Button */}
                        <button
                            onClick={onClose}
                            className="md:hidden p-1.5 text-zinc-400 hover:text-white rounded-lg bg-[#1a1a1a] border border-[#262626]"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="border-t border-[#262626]" />

                    {/* Navigation Links */}
                    <nav className="space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={onClose}
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
                <div className="space-y-3 pt-4 border-t border-[#262626] shrink-0 bg-[#141414]">
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