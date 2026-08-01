'use server'
import { serverMutation } from "../core/server"

export const createResources = async (newsData) => {
    return serverMutation('/api/resources', newsData, 'POST')
}

export const updateResources = async (id, formData) => {
    return serverMutation(`/api/resources/${id}`, formData, 'PUT');
}

export const deleteResources = async (id) => {
    return serverMutation(`/api/resources/${id}`, {}, 'DELETE')
}