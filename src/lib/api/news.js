import { serverFetch } from "../core/server"

export const getAllNews = async () => {
    return serverFetch('/api/news');
}

export const getNewsById = async (id) => {
    return serverFetch(`/api/news/${id}`);
};
