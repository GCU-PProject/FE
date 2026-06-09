import axios from 'axios';

export const apiClient = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ?? 'https://glaw-web.duckdns.org/ai',
  headers: {
    'Content-Type': 'application/json',
  },
});
