import api from "./api";

export const getMe = async () => {
  return await api.get(`/api/users/me`);
};

export const updateMe = async (data) => {
  return await api.patch(`/api/users/me`, data);
};

export const changePassword = async (data) => {
  return await api.patch(`/api/auth/change-password`, data);
};

export const getAllUsers = async (filters = {}) => {
  const params = Object.fromEntries(
    Object.entries(filters).filter(([, value]) =>
      value !== undefined && value !== null && value === "",
    ),
  );
  return api.get(`/api/users`, { params });
};

export const getAllUsersNoPage = async () => {
  return await api.get(`/api/users/all`);
};

export const getUserById = async (id) => {
  return await api.get(`/api/users/${id}`);
};

export const updateUserStatus = async (id, status) => {
  return await api.patch(`/api/users/${id}/status`, { status });
};
