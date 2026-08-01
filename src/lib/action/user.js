'use server'

import { serverMutation } from "../core/server";
import { updatePassword as changePasswordAction } from "./password";

export const updateUserProfile = async (formData) => {
    return serverMutation(`/api/users/profile`, formData, 'PATCH');
}

export const updatePassword = async (data) => {
    return changePasswordAction({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
    });
}