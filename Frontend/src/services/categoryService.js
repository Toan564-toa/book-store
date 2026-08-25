import api from "./api"

export const getCategory = async () => {
    return await api.get(`/api/categories`);
}

export const createCategory = async (data) => {
    return await api.post(`/api/categories`, data);
}

export const getCategoryAll = async () => {
    return await api.get(`/api/categories/all`);
}

export const getCategoryById = async (id) => {
    return await api.get(`/api/categories/${id}`);
}

export const updateCategory = async (id) => {
    return await api.patch(`/api/categories/${id}`);
}

export const deleteCategory = async (id) => {
    return await api.delete(`/api/categories/${id}`);
}