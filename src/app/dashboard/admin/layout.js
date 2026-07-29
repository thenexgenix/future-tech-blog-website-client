import DashboardSidebar from "@/components/dashboard/DashboardSidebar";


export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col md:flex-row font-sans">

            <DashboardSidebar />

            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
                {children}
            </main>
        </div>
    );
}