import { serverFetch } from "../core/server"

export const getAllNews = async() =>{
    return serverFetch('/api/news');
}