import { serverFetch } from "../core/server"

export const getAllContacts = async () => {
    return serverFetch('/api/contacts');
}
