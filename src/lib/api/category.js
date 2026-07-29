import { serverFetch } from "../core/server"

export const getAllCategory = async() =>{
    return serverFetch('/api/categories');
}