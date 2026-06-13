import axios from 'axios';
import env from '@/lib/env';

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
