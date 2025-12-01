import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Borrowings API calls
export const borrowingsAPI = {
  create: async (borrowData) => {
    return axios.post(`${API_URL}/api/borrowings`, borrowData);
  },

  getAll: async (params = {}) => {
    return axios.get(`${API_URL}/api/borrowings`, { params });
  },

  getMyBorrowings: async () => {
    return axios.get(`${API_URL}/api/borrowings/my`);
  },

  getById: async (id) => {
    return axios.get(`${API_URL}/api/borrowings/${id}`);
  },

  update: async (id, updateData) => {
    return axios.put(`${API_URL}/api/borrowings/${id}`, updateData);
  },

  delete: async (id) => {
    return axios.delete(`${API_URL}/api/borrowings/${id}`);
  },

  returnBook: async (id) => {
    return axios.post(`${API_URL}/api/borrowings/${id}/return`);
  },

  renewBook: async (id) => {
    return axios.post(`${API_URL}/api/borrowings/${id}/renew`);
  },
};
