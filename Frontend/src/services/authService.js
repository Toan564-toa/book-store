import api from "./api";

export const login = async (data) => {
  return await api.post(`/api/auth/login`, data);
}

export const register = async (data) => {
  return await api.post(`/api/auth/register`, data);
}

export const logout = async () => {
  const res = await api.post(`/api/auth/logout`);
  localStorage.removeItem("token");
  return res;
}

export const getMe = async () => {
  return await api.get(`/api/auth/me`);
}
export const changePassword = async (data) => {
  return await api.patch(`/api/auth/change-password`, data);
}