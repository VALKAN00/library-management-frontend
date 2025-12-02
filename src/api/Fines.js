import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const finesAPI = {
  // Get all fines (admin)
  getAllFines: async (params = {}) => {
    return axios.get(`${API_URL}/api/fines`, { params });
  },

  // Get user's fines
  getMyFines: async () => {
    return axios.get(`${API_URL}/api/fines/my`);
  },

  // Get fine details
  getFineById: async (id) => {
    return axios.get(`${API_URL}/api/fines/${id}`);
  },

  // Pay fine
  payFine: async (id, paymentData) => {
    return axios.post(`${API_URL}/api/fines/${id}/pay`, paymentData);
  },

  // Waive fine (admin only)
  waiveFine: async (id, reason) => {
    return axios.post(`${API_URL}/api/fines/${id}/waive`, { reason });
  },

  // Get fine statistics (admin)
  getStatistics: async () => {
    return axios.get(`${API_URL}/api/fines/statistics`);
  }
};
