import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const reportAPI = {
  // Get popular books report
  getPopularBooks: async () => {
    return axios.get(`${API_URL}/api/reports/popular-books`);
  },

  // Get all borrowings report
  getAllBorrowings: async () => {
    return axios.get(`${API_URL}/api/reports/borrowings`);
  },

  // Get all reservations report
  getAllReservations: async () => {
    return axios.get(`${API_URL}/api/reports/reservations`);
  },

  // Get overdue books report
  getOverdueBooks: async () => {
    return axios.get(`${API_URL}/api/reports/overdue`);
  },

  // Get member activity report
  getMemberActivity: async () => {
    return axios.get(`${API_URL}/api/reports/member-activity`);
  }
};
