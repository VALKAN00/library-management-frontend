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

export const membersAPI = {
  // Get all members (admin)
  getAllMembers: async (page = 1, limit = 20) => {
    const response = await apiClient.get(`${API_URL}/api/members?page=${page}&limit=${limit}`);
    return response.data;
  },

  // Get member by id (admin)
  getMemberById: async (id) => {
    const response = await apiClient.get(`${API_URL}/api/members/${id}`);
    return response.data;
  },

  // Update a member (admin)
  updateMember: async (id, memberData) => {
    const response = await apiClient.put(`${API_URL}/api/members/${id}`, memberData);
    return response.data;
  },

  // Delete a member (admin)
  deleteMember: async (id) => {
    const response = await apiClient.delete(`${API_URL}/api/members/${id}`);
    return response.data;
  },
};