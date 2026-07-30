import { serverFetch } from "../core/server"

export const getAllPodcasts = async () => {
    return serverFetch('/api/podcasts');
}

export const getPodcastById = async (id) => {
    return serverFetch(`/api/podcasts/${id}`);
};
