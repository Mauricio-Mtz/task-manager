import { apiClient } from '../config/api';

export const authService = {
  login: async (email, password) => {
    return apiClient.post('/auth/login', { email, password });
  },

  register: async (email, password, username, type) => {
    return apiClient.post('/auth/register', { email, password, username, type });
  },

  getUsersByGroup: async (groupId) => {
    return apiClient.get(`/auth/listUsersByGroup/${groupId}`);
  },
};