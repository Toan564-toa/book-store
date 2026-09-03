import api from "./api";

export const getBooks = async (filters = {}) => {
  const params = Object.fromEntries(
    Object.entries(filters).filter(([, value]) =>
      value !== undefined && value !== null && value !== "",
    ),
  );

  return api.get("/api/books", { params });
};

export const getAllBooks = async () => {
  return await api.get(`/api/books/all`);
};

export const getBookById = async (id) => {
  return await api.get(`/api/books/${id}`);
};

export const createBooks = async (data) => {
  return await api.post(`/api/books/`, data);
};

export const updateBooks = async (id, data) => {
  return await api.patch(`/api/books/${id}`, data);
};

export const deleteBooks = async (id) => {
  return await api.delete(`/api/books/${id}`);
};

export const updateStockBooks = async (id) => {
  return await api.patch(`/api/books/${id}/stock`);
};
