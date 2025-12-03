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

// Borrowings Management API calls
export const manageBorrowAPI = {
  // Get all borrowings with pagination
  getAllBorrowings: async (page = 1, limit = 20) => {
    const response = await apiClient.get(`${API_URL}/api/borrowings?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Get borrowing by ID
  getBorrowingById: async (id) => {
    const response = await apiClient.get(`${API_URL}/api/borrowings/${id}`);
    return response.data;
  },

  // Create a new borrowing (customer/admin)
  createBorrowing: async (borrowData) => {
    const response = await apiClient.post(`${API_URL}/api/borrowings`, {
      BookID: borrowData.BookID,
      DueDate: borrowData.DueDate,
      BorrowDate: borrowData.BorrowDate
    });
    return response.data;
  },

  // Return a borrowed book
  returnBorrowing: async (id) => {
    const response = await apiClient.post(`${API_URL}/api/borrowings/${id}/return`);
    return response.data;
  },

  // Renew a borrowing
  renewBorrowing: async (id) => {
    const response = await apiClient.post(`${API_URL}/api/borrowings/${id}/renew`);
    return response.data;
  },

  // Update borrowing (admin)
  updateBorrowing: async (id, borrowData) => {
    const response = await apiClient.put(`${API_URL}/api/borrowings/${id}`, borrowData);
    return response.data;
  },

  // Delete borrowing (admin)
  deleteBorrowing: async (id) => {
    const response = await apiClient.delete(`${API_URL}/api/borrowings/${id}`);
    return response.data;
  },
};
