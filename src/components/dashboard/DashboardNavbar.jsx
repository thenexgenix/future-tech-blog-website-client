'use client';

import React from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';

export default function DashboardNavbar({ onMenuClick }) {
    return (
        <header className="sticky top-0 z-30 w-full bg-[#141414] border-b border-[#262626] px-4 py-3 sm:px-6">
            <div className="flex items-center justify-between gap-4">

                {/* Left Section: Mobile Hamburger Button & Title */}
                <div className="flex items-center gap-3">
                    {/* Hamburger Icon - Only Visible on Small Devices (lg:hidden) */}
                    <button
                        onClick={onMenuClick}
                        className="lg:hidden p-2 rounded-xl text-zinc-400 hover:text-white bg-[#1a1a1a] border border-[#262626] hover:border-yellow-400/40 transition cursor-pointer"
                        aria-label="Open Sidebar"
                    >
                        <Menu className="w-5 h-5 text-yellow-400" />
                    </button>

                    {/* Optional Search / Welcome Text */}
                    <div className="hidden sm:flex items-center gap-2 bg-[#1a1a1a] border border-[#262626] rounded-xl px-3 py-1.5 text-xs text-zinc-400 w-64 focus-within:border-yellow-400/50 transition">
                        <Search className="w-3.5 h-3.5 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Search anything..."
                            className="bg-transparent border-none outline-none text-white text-xs w-full placeholder-zinc-500"
                        />
                    </div>
                </div>

                {/* Right Section: Notifications & User Profile */}
                <div className="flex items-center gap-3">
                    {/* Notification Button */}
                    <button className="p-2 rounded-xl text-zinc-400 hover:text-white bg-[#1a1a1a] border border-[#262626] hover:border-yellow-400/40 transition relative cursor-pointer">
                        <Bell className="w-4 h-4 text-zinc-300" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-yellow-400 rounded-full"></span>
                    </button>

                    {/* User Profile Tag */}
                    <div className="flex items-center gap-2.5 pl-3 border-l border-[#262626]">
                        <div className="w-8 h-8 rounded-xl bg-yellow-400/10 border border-yellow-400/20 flex items-center justify-center text-yellow-400 font-semibold text-xs">
                            <User className="w-4 h-4" />
                        </div>
                        <div className="hidden md:block text-left">
                            <p className="text-xs font-semibold text-white leading-none">Admin User</p>
                            <p className="text-[10px] text-zinc-500 mt-1 leading-none">admin@futuretech.com</p>
                        </div>
                    </div>
                </div>

            </div>
        </header>
    );
}