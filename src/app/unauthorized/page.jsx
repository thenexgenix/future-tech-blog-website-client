import Link from 'next/link';
import { ShieldAlert, ArrowLeft, Home, Lock } from 'lucide-react';

export default function UnauthorizedPage() {
    return (
        <div className="min-h-screen bg-[#0d0d0d] text-zinc-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center space-y-6 bg-zinc-900/60 border border-zinc-800 p-8 rounded-2xl shadow-2xl backdrop-blur-sm">

                {/* Icon Section with Animated Glow */}
                <div className="relative flex justify-center">
                    <div className="absolute inset-0 bg-red-500/10 rounded-full blur-xl transform scale-150"></div>
                    <div className="relative bg-zinc-800/80 p-5 rounded-2xl border border-red-500/20 text-red-500">
                        <ShieldAlert className="w-12 h-12 stroke-[1.5]" />
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-widest text-red-400 bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20">
                        403 - Access Denied
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-bold text-white pt-2">
                        Unauthorized Access
                    </h1>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                        You do not have the required permissions to access this page. Please make sure you are logged in with an authorized account.
                    </p>
                </div>

                {/* Security Note */}
                <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 bg-zinc-950/50 py-2.5 px-4 rounded-xl border border-zinc-800/50">
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Admin or restricted clearance required</span>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                        href="/"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-medium text-sm rounded-xl transition-all shadow-lg shadow-yellow-500/10 active:scale-[0.98]"
                    >
                        <Home className="w-4 h-4" />
                        Go to Home
                    </Link>

                    <Link
                        href="/dashboard"
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium text-sm rounded-xl border border-zinc-700 transition-all active:scale-[0.98]"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Admin Login
                    </Link>
                </div>

            </div>
        </div>
    );
}