import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Books API calls
export const booksAPI = {
  getAll: async (params = {}) => {
    return axios.get(`${API_URL}/api/books`, { params });
  },

  getById: async (id) => {
    return axios.get(`${API_URL}/api/books/${id}`);
  },
};
