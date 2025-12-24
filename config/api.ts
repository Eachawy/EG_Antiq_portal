import httpClient from './http-client'
import { AxiosResponse } from 'axios'

/**
 * API utility class for making HTTP requests
 * Provides clean methods for GET, POST, PUT, PATCH, DELETE
 */
class API {
  /**
   * GET request
   */
  static async get<T = any>(url: string, params?: any): Promise<T> {
    const response: AxiosResponse<T> = await httpClient.get(url, { params })
    return response.data
  }

  /**
   * POST request
   */
  static async post<T = any>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<T> = await httpClient.post(url, data)
    return response.data
  }

  /**
   * PUT request
   */
  static async put<T = any>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<T> = await httpClient.put(url, data)
    return response.data
  }

  /**
   * PATCH request
   */
  static async patch<T = any>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<T> = await httpClient.patch(url, data)
    return response.data
  }

  /**
   * DELETE request
   */
  static async delete<T = any>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await httpClient.delete(url)
    return response.data
  }

  /**
   * Upload file(s)
   */
  static async upload<T = any>(url: string, formData: FormData): Promise<T> {
    const response: AxiosResponse<T> = await httpClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  }
}

export default API
