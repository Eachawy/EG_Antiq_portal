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
  withCredentials: true, // Send cookies cross-origin
});

// Request interceptor - attach auth token
httpClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from cookie
    const token = Cookies.get('auth_token');

    // Only attach token if it exists and looks valid (basic check)
    if (token && token.length > 20 && config.headers) {
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

      // Clear invalid token
      Cookies.remove('auth_token');

      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;

        // Check if this is a public endpoint (portal/monuments, etc.)
        const isPublicEndpoint = originalRequest?.url?.includes('/portal/monuments') ||
                                 originalRequest?.url?.includes('/portal/eras') ||
                                 originalRequest?.url?.includes('/portal/books');

        // If it's a public endpoint, retry without the token
        if (isPublicEndpoint && originalRequest.headers) {
          delete originalRequest.headers.Authorization;
          try {
            return await httpClient.request(originalRequest);
          } catch (retryError) {
            return Promise.reject(normalizeError(retryError as AxiosError));
          }
        }

        // Only redirect if we're on a protected route
        const isProtectedRoute = currentPath.includes('/profile') ||
                                 currentPath.includes('/favorites') ||
                                 currentPath.includes('/saved-searches') ||
                                 currentPath.includes('/history') ||
                                 currentPath.includes('/settings');

        if (isProtectedRoute) {
          const locale = currentPath.split('/')[1] || 'en';
          window.location.href = `/${locale}/login?returnUrl=${encodeURIComponent(currentPath)}`;
        }
      }

      return Promise.reject(normalizeError(error));
    }

    // For other errors, normalize and reject
    return Promise.reject(normalizeError(error));
  }
);
