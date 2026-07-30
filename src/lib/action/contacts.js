import { serverMutation } from "../core/server"

export const sentContact = async(contactData)=>{
    return serverMutation('/api/contacts', contactData ,'POST')
}


export const deleteContact = async (id) => {
    return serverMutation(`/api/contacts/${id}`, {}, 'DELETE')
}