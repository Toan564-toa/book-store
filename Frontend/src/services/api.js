import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - tự động gắn token nếu có
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    // debugger;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor - xử lý lỗi tập trung
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('[API Error]', error.response?.status, error.message)
    if (error.response?.status === 401) {
      // Có thể dispatch logout hoặc redirect về /login
      // location.href = "/login";
    }
    return Promise.reject(error)
  }
)

export default api
