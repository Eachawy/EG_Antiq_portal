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

    console.log('HTTP Request:', {
      url: config.url,
      hasToken: !!token,
      tokenPreview: token ? token.substring(0, 20) + '...' : null
    });

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

    console.log('HTTP Response Error:', {
      status: error.response?.status,
      url: originalRequest?.url,
      retry: originalRequest?._retry
    });

    // Handle 401 - Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      console.log('401 Error detected');
      originalRequest._retry = true;

      // Clear token
      Cookies.remove('auth_token');

      // Only redirect if on a protected route (not for API errors during normal browsing)
      // Let the component handle the error instead of forcing a redirect
      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;

        // Only redirect if we're on a protected route (dashboard, profile, etc.)
        const isProtectedRoute = currentPath.includes('/dashboard') ||
                                 currentPath.includes('/profile') ||
                                 currentPath.includes('/favorites') ||
                                 currentPath.includes('/saved-searches') ||
                                 currentPath.includes('/history') ||
                                 currentPath.includes('/settings');

        if (isProtectedRoute) {
          const locale = currentPath.split('/')[1] || 'en';
          console.log('Redirecting to login from protected route:', currentPath);
          window.location.href = `/${locale}/login?returnUrl=${encodeURIComponent(currentPath)}`;
        } else {
          console.log('401 error on non-protected route, not redirecting');
        }
      }

      return Promise.reject(normalizeError(error));
    }

    // For other errors, normalize and reject
    return Promise.reject(normalizeError(error));
  }
);
