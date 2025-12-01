import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Axios interceptors
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

// Auth API calls
export const authAPI = {
  login: async (credentials) => {
    return axios.post(`${API_URL}/api/auth/login`, credentials);
  },

  signup: async (userData) => {
    return axios.post(`${API_URL}/api/auth/register`, userData);
  },

  logout: async () => {
    return axios.post(`${API_URL}/api/auth/logout`);
  },
};
