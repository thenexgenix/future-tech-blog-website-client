'use server'
import { serverMutation } from "../core/server"

export const createPodcasts = async (newsData) => {
    return serverMutation('/api/podcasts', newsData, 'POST')
}

export const updatePodcast = async (id, formData) => {
    return serverMutation(`/api/podcasts/${id}`, formData, 'PUT');
}

export const deletePodcast = async (id) => {
    return serverMutation(`/api/podcasts/${id}`, {}, 'DELETE')
}