import { serverMutation } from "../core/server"

export const createCategory = async(categoryData)=>{
    return serverMutation('/api/categories', categoryData ,'POST')
}