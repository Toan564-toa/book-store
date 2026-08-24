import api from "./api";

export const login = async (data) => {
  return api.post(`/api/auth/login`, data);
}

export const register = async (data) => {
  return api.post(`/api/auth/register`, data);
}

export const logout = async () => {
  return api.post(`/api/auth/logout`);
}

export const getMe = async () => {
  return api.get(`/api/auth/me`);
}
export const changePassword = async (data) => {
  return api.patch(`/api/auth/change-password`, data);
}