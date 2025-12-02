import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// User Dashboard API calls
export const userDashboardAPI = {
  getDashboardData: async () => {
    return axios.get(`${API_URL}/api/dashboard/user`);
  },
};
