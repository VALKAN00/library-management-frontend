import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Create axios instance with interceptors
const apiClient = axios.create();

apiClient.interceptors.request.use(
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

// Reservations API calls
export const reservationsAPI = {
  create: async (reservationData) => {
    const response = await apiClient.post(`${API_URL}/api/reservations`, {
      BookID: reservationData.BookID
    });
    return response.data;
  },

  getAll: async () => {
    const response = await apiClient.get(`${API_URL}/api/reservations`);
    return response.data;
  },

  getMyReservations: async () => {
    const response = await apiClient.get(`${API_URL}/api/reservations/my`);
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`${API_URL}/api/reservations/${id}`);
    return response.data;
  },

  update: async (id, updateData) => {
    const response = await apiClient.put(`${API_URL}/api/reservations/${id}`, updateData);
    return response.data;
  },

  cancel: async (id) => {
    const response = await apiClient.delete(`${API_URL}/api/reservations/${id}`);
    return response.data;
  },

  pickup: async (id) => {
    const response = await apiClient.post(`${API_URL}/api/reservations/${id}/pickup`);
    return response.data;
  },
};

