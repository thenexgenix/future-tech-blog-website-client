'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export const updatePassword = async ({ currentPassword, newPassword }) => {
    try {
        const result = await auth.api.changePassword({
            body: {
                currentPassword,
                newPassword,
                revokeOtherSessions: true,
            },
            headers: await headers(),
        });

        return { success: true, message: 'Password changed successfully', data: result };

    } catch (error) {
        console.error('Change password error:', error);

        const errMessage =
            error?.body?.message ||
            error?.message ||
            'Failed to change password';

        return { success: false, message: errMessage };
    }
};