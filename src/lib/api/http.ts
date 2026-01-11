import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { env } from '../env';
import { normalizeError } from './errors';
import Cookies from 'js-cookie';

// Create axios instance
export const httpClient = axios.create({
  baseURL: env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - attach auth token
httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from cookie
    const token = Cookies.get('auth_token');

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - normalize errors and handle 401
httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle 401 - Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Clear token
      Cookies.remove('auth_token');

      // Redirect to login (preserve current URL)
      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        const locale = currentPath.split('/')[1] || 'en';
        window.location.href = `/${locale}/login?returnUrl=${encodeURIComponent(currentPath)}`;
      }

      return Promise.reject(normalizeError(error));
    }

    // For other errors, normalize and reject
    return Promise.reject(normalizeError(error));
  }
);
