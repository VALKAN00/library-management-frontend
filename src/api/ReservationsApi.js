import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Reservations API calls
export const reservationsAPI = {
  create: async (reservationData) => {
    return axios.post(`${API_URL}/api/reservations`, reservationData);
  },

  getAll: async (params = {}) => {
    return axios.get(`${API_URL}/api/reservations`, { params });
  },

  getMyReservations: async () => {
    return axios.get(`${API_URL}/api/reservations/my`);
  },

  getById: async (id) => {
    return axios.get(`${API_URL}/api/reservations/${id}`);
  },

  update: async (id, updateData) => {
    return axios.put(`${API_URL}/api/reservations/${id}`, updateData);
  },

  cancel: async (id) => {
    return axios.delete(`${API_URL}/api/reservations/${id}`);
  },

  pickup: async (id) => {
    return axios.post(`${API_URL}/api/reservations/${id}/pickup`);
  },
};
