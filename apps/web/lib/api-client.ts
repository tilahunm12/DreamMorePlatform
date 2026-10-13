import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Token to every outgoing request
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    try {
      const authData = localStorage.getItem('dream_more_auth');
      if (authData) {
        const parsed = JSON.parse(authData);
        const token = parsed?.state?.token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch {
      // Ignore JSON parse error if storage is empty
    }
  }
  return config;
});
