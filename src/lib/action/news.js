import { serverMutation } from "../core/server"

export const createNews = async(newsData)=>{
    return serverMutation('/api/news', newsData ,'POST')
}