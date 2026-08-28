import api from "./api"

export const getAllCart = async () => {
    return await api.get(`/api/cart`);
}

export const deleteAllCart = async () => {
    return await api.delete(`/api/cart`);
}

export const addCart = async (data) => {
    return await api.post(`/api/cart/items`, data);
}

export const updateCartById = async (id, quantity) => {
    return await api.patch(`/api/cart/items/${id}`, { quantity });
}

export const deleteCartById = async (id) => {
    return await api.delete(`/api/cart/items/${id}`);
}