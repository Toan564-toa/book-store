import api from "./api";

export const getWishlist = async () => {
  return await api.get(`/api/wishlist`);
};

export const addWishlistBook = async (bookId) => {
  return await api.post(`/api/wishlist/${bookId}`);
};

export const removeWishlistBook = async (bookId) => {
  return await api.delete(`/api/wishlist/${bookId}`);
};
