'use client';

import React, { useState } from 'react';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

export default function DashboardLayout({ children }) {
    // Mobile Sidebar Toggle State
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#0d0d0d] text-zinc-100 flex flex-col">

            <DashboardNavbar onMenuClick={() => setIsSidebarOpen(true)} />

            <div className="flex flex-1">
                <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

                {/* Main Content Area */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
                    {children}
                </main>
            </div>

        </div>
    );
}