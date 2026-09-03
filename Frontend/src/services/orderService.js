import api from "./api";

export const createOrder = async (data) => {
  return await api.post(`/api/orders`, data);
};

export const getMyOrders = async (filters = {}) => {
  const params = Object.fromEntries(
    Object.entries(filters).filter(([, value]) =>
      value !== undefined && value !== null && value !== "",
    ),
  );
  return api.get(`/api/orders/my-orders`, { params });
};

export const getAllMyOrders = async () => {
  return await api.get(`/api/orders/my-orders/all`);
};

export const getOrderById = async (id) => {
  return await api.get(`/api/orders/${id}`);
};

export const cancelOrder = async (id) => {
  return await api.patch(`/api/orders/${id}/cancel`);
};

export const getAllOrders = async (filters = {}) => {
  const params = Object.fromEntries(
    Object.entries(filters).filter(([, value]) =>
      value !== undefined && value !== null && value !== "",
    ),
  );
  return api.get(`/api/orders`, { params });
};

export const getAllOrdersNoPage = async () => {
  return await api.get(`/api/orders/all`);
};

export const updateOrderStatus = async (id, status) => {
  return await api.patch(`/api/orders/${id}/status`, { status });
};
