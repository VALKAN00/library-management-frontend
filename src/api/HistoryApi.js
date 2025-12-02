import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const historyAPI = {
  // Get borrowing history
  getBorrowingHistory: async () => {
    return axios.get(`${API_URL}/api/history/borrowings`);
  },

  // Get reservation history
  getReservationHistory: async () => {
    return axios.get(`${API_URL}/api/history/reservations`);
  }
};
