import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? sessionStorage.getItem('adminToken') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isLoginRequest = error.config?.url?.includes('/admin/login');
      if (!isLoginRequest) {
        sessionStorage.removeItem('adminToken');
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/admin/login')) {
          window.location.href = '/admin/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export function getToken() {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem('adminToken');
}

export function setToken(token) {
  sessionStorage.setItem('adminToken', token);
}

export function clearToken() {
  sessionStorage.removeItem('adminToken');
}

export { api };
