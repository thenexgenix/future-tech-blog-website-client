import { serverFetch } from "../core/server"

export const getAllResources = async () => {
    return serverFetch('/api/resources');
}

export const getResourcesById = async (id) => {
    return serverFetch(`/api/resources/${id}`);
};
