import api from './api'

export const getBooks = async ()=> {
  return await api.get(`/api/books`);
}

export const getAllBooks = async ()=> {
  return await api.get(`/api/books/all`);
}

export const getBookById = async (id) => {
  return await api.get(`/api/books/${id}`);
}

export const createBooks = async (data) => {
  return await api.post(`/api/books/`, data);
}

export const updateBooks = async (id) => {
  return await api.patch(`/api/books/${id}`);
}

export const deleteBooks = async (id) => {
  return await api.delete(`/api/books/${id}`);
}

export const updateStockBooks = async (id) => {
  return await api.patch(`/api/books/${id}/stock`);
}
