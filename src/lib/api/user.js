'use server'

import { serverFetch } from "../core/server";

export const getUserProfile = async (userId) => {
  
    return serverFetch(`/api/users/profile?userId=${userId}`);
}