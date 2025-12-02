import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const adminDashboardAPI = {
  // Get admin dashboard data
  getDashboardData: async () => {
    return axios.get(`${API_URL}/api/dashboard/admin`);
  },

  // Get all borrowings (with pagination)
  getAllBorrowings: async (params = {}) => {
    return axios.get(`${API_URL}/api/borrowings`, { params });
  }
};
