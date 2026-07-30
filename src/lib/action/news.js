import { serverMutation } from "../core/server"

export const createNews = async(newsData)=>{
    return serverMutation('/api/news', newsData ,'POST')
}

export const updateNews = async (id, formData) =>{
    return serverMutation(`/api/news/${id}`, formData, 'PUT');
}

export const deleteNews = async (id) => {
    return serverMutation(`/api/news/${id}`, {}, 'DELETE')
}