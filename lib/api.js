import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

const CSRF_TOKEN_KEY = 'csrfToken';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

let csrfTokenPromise = null;

export async function fetchCSRFToken() {
  if (typeof window === 'undefined') return null;

  const storedToken = sessionStorage.getItem(CSRF_TOKEN_KEY);
  if (storedToken) {
    return storedToken;
  }

  if (!csrfTokenPromise) {
    csrfTokenPromise = axios.get(`${API_URL}/csrf-token`)
      .then(res => {
        if (res.data?.token) {
          sessionStorage.setItem(CSRF_TOKEN_KEY, res.data.token);
          return res.data.token;
        }
        return null;
      })
      .catch(() => null)
      .finally(() => {
        csrfTokenPromise = null;
      });
  }

  return csrfTokenPromise;
}

api.interceptors.request.use(async (config) => {
  const token = typeof window !== 'undefined' ? sessionStorage.getItem('adminToken') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase())) {
    const csrfToken = await fetchCSRFToken();
    if (csrfToken) {
      config.headers['x-csrf-token'] = csrfToken;
    }
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

    if (error.response?.status === 403 && error.response?.data?.message?.includes('CSRF')) {
      sessionStorage.removeItem(CSRF_TOKEN_KEY);
      if (typeof window !== 'undefined' && window.location.pathname !== '/admin/login') {
        window.location.reload();
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
  sessionStorage.removeItem(CSRF_TOKEN_KEY);
}

export function clearCSRFToken() {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(CSRF_TOKEN_KEY);
  }
}

export { api };
