import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? 'https://api.glaw.site',
  headers: {
    'Content-Type': 'application/json',
  },
});
