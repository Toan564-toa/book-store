import api from "./api";

export const getBookReviews = async (bookId, filters = {}) => {
  const params = Object.fromEntries(
    Object.entries(filters).filter(([, value]) =>
      value !== undefined && value !== null && value !== "",
    ),
  );
  return api.get(`/api/books/${bookId}/reviews`, { params });
};

export const getAllBookReviews = async (bookId) => {
  return await api.get(`/api/books/${bookId}/reviews/all`);
};

export const createReview = async (bookId, data) => {
  return await api.post(`/api/books/${bookId}/reviews`, data);
};

export const updateReview = async (id, data) => {
  return await api.patch(`/api/reviews/${id}`, data);
};

export const deleteReview = async (id) => {
  return await api.delete(`/api/reviews/${id}`);
};
