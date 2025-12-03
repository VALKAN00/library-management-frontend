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

// Books Management API calls (Admin operations)
export const manageBooksAPI = {
  // Get all books with pagination
  getAllBooks: async (page = 1, limit = 20) => {
    const response = await apiClient.get(`${API_URL}/api/books?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Get book by ID
  getBookById: async (id) => {
    const response = await apiClient.get(`${API_URL}/api/books/${id}`);
    return response.data;
  },

  // Create a new book (admin)
  createBook: async (bookData) => {
    const response = await apiClient.post(`${API_URL}/api/books`, {
      BookID: bookData.BookID || 0,
      Category: bookData.Category,
      Title: bookData.Title,
      Author: bookData.Author,
      Price: bookData.Price,
      Quantity: bookData.Quantity,
      Available_Copies: bookData.Available_Copies,
      Pub_Year: bookData.Pub_Year,
      Pub_Name: bookData.Pub_Name,
      Cover: bookData.Cover,
      Rating: bookData.Rating,
      Availability: bookData.Availability
    });
    return response.data;
  },

  // Update a book (admin)
  updateBook: async (id, bookData) => {
    const response = await apiClient.put(`${API_URL}/api/books/${id}`, {
      BookID: id,
      Category: bookData.Category,
      Title: bookData.Title,
      Author: bookData.Author,
      Price: bookData.Price,
      Quantity: bookData.Quantity,
      Available_Copies: bookData.Available_Copies,
      Pub_Year: bookData.Pub_Year,
      Pub_Name: bookData.Pub_Name,
      Cover: bookData.Cover,
      Rating: bookData.Rating,
      Availability: bookData.Availability
    });
    return response.data;
  },

  // Delete a book (admin)
  deleteBook: async (id) => {
    const response = await apiClient.delete(`${API_URL}/api/books/${id}`);
    return response.data;
  },
};
