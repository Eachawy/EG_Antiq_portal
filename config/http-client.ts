import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

// API base URL from webpack environment variable
const API_BASE_URL = process.env.GATEWAY_SERVER_API_URL

// API token from webpack environment variable
const API_TOKEN = process.env.GATEWAY_SERVER_API_TOKEN

// Create axios instance
const httpClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request Interceptor
httpClient.interceptors.request.use(
  (config: AxiosRequestConfig | any) => {
    // Add authentication token if available
    const token = getAuthToken()
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }

    // Add locale to headers
    const locale = getLocale()
    if (locale) {
      config.headers = config.headers || {}
      config.headers['Accept-Language'] = locale
    }

    // Log request in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        data: config.data,
      })
    }

    return config
  },
  (error: AxiosError) => {
    console.error('❌ Request Error:', error)
    return Promise.reject(error)
  }
)

// Response Interceptor
httpClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log response in development
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      })
    }

    return response
  },
  (error: AxiosError) => {
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const status = error.response.status

      switch (status) {
        case 401:
          console.error('🔒 Unauthorized - Please log in')
          // Handle unauthorized (redirect to login, clear token, etc.)
          handleUnauthorized()
          break

        case 403:
          console.error('🚫 Forbidden - Access denied')
          break

        case 404:
          console.error('🔍 Not Found')
          break

        case 500:
          console.error('💥 Server Error')
          break

        default:
          console.error(`❌ Error ${status}:`, error.response.data)
      }
    } else if (error.request) {
      // Request made but no response received
      console.error('📡 Network Error - No response received:', error.message)
    } else {
      // Something else happened
      console.error('⚠️ Error:', error.message)
    }

    return Promise.reject(error)
  }
)

// Helper functions

/**
 * Get authentication token from storage
 */
function getAuthToken(): string | null {
  // Use token from webpack environment variable
  if (API_TOKEN) {
    return API_TOKEN;
  }

  // Check localStorage if in browser (for runtime token updates)
  if (typeof window !== 'undefined') {
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      return storedToken;
    }
  }

  return null;
}

/**
 * Get current locale from storage or cookie
 */
function getLocale(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('locale') || 'en'
  }
  return 'en'
}

/**
 * Handle unauthorized access
 */
function handleUnauthorized(): void {
  if (typeof window !== 'undefined') {
    // Clear auth token
    localStorage.removeItem('auth_token')

    // Optionally redirect to login
    // window.location.href = '/login'
  }
}

export default httpClient
