import axios from 'axios';

let baseURL = '';

if (process.env.NODE_ENV === 'development') {
  // Local development: React dev server, Django on localhost:8000
  baseURL = 'http://localhost:8000/api/';
} else {
  // Production (Docker): Use relative path, Nginx will proxy /api/ to backend
  baseURL = '/api/';
}

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
  
      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          const refreshToken = localStorage.getItem('refresh_token');
          if (refreshToken) {
            const response = await api.post('/token/refresh/', { refresh: refreshToken });
  
            localStorage.setItem('access_token', response.data.access);
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
            
            return api(originalRequest);
          }
        } catch (refreshError) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';
        }
      }
  
      return Promise.reject(error);
    }
  );

export default api;