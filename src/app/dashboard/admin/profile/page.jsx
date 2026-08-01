import { redirect } from 'next/navigation';
import AdminProfileForm from './AdminProfileForm';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { getUserProfile } from '@/lib/api/user';

export default async function AdminProfilePage() {

    const session = await auth.api.getSession({
        headers: await headers()
    });

    const currentUserId = session?.user?.id || session?.user?._id;

    // console.log(session?.user);

    if (!currentUserId) {
        redirect('/login');
    }

    // 2. Fetch User Profile Data on the Server before rendering
    const user = await getUserProfile(currentUserId);
    
    console.log( 'response',user);

    if (!user) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-400">
                Failed to load profile data.
            </div>
        );
    }

    return (
        <div className="min-h-screen text-slate-100 p-4 md:p-10">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header Section */}
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Admin Profile</h1>
                    <p className="text-slate-400 text-sm mt-1">
                        Manage your personal account details and security settings.
                    </p>
                </div>

                {/* Render Client Form with initial Server Data */}
                <AdminProfileForm initialUser={user} />
            </div>
        </div>
    );
}