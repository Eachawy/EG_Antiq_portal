/**
 * Common API response structure
 */
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

/**
 * Paginated response structure
 */
export interface PaginatedResponse<T = any> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

/**
 * Error response structure
 */
export interface ApiError {
  message: string
  code?: string
  details?: any
}
