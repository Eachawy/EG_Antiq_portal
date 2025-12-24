/**
 * Example service showing how to use the API utility
 *
 * This file demonstrates the usage patterns.
 * Delete this file or use it as a reference for creating your own services.
 */

import API from './api'
import { ApiResponse, PaginatedResponse } from './api-types'

// Example: Define your data types
interface Site {
  id: string
  name: string
  description: string
  location: string
  images: string[]
}

interface TourGuide {
  id: string
  name: string
  email: string
  phone: string
  languages: string[]
}

/**
 * Example Service for Sites
 */
export class SitesService {
  /**
   * Get all sites
   */
  static async getAll(): Promise<Site[]> {
    return API.get<Site[]>('/sites')
  }

  /**
   * Get paginated sites
   */
  static async getPaginated(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<Site>> {
    return API.get<PaginatedResponse<Site>>('/sites', { page, pageSize })
  }

  /**
   * Get site by ID
   */
  static async getById(id: string): Promise<Site> {
    return API.get<Site>(`/sites/${id}`)
  }

  /**
   * Create new site
   */
  static async create(siteData: Omit<Site, 'id'>): Promise<ApiResponse<Site>> {
    return API.post<ApiResponse<Site>>('/sites', siteData)
  }

  /**
   * Update site
   */
  static async update(id: string, siteData: Partial<Site>): Promise<ApiResponse<Site>> {
    return API.put<ApiResponse<Site>>(`/sites/${id}`, siteData)
  }

  /**
   * Delete site
   */
  static async delete(id: string): Promise<ApiResponse> {
    return API.delete<ApiResponse>(`/sites/${id}`)
  }

  /**
   * Upload site images
   */
  static async uploadImages(siteId: string, files: File[]): Promise<ApiResponse<string[]>> {
    const formData = new FormData()
    files.forEach((file) => {
      formData.append('images', file)
    })
    return API.upload<ApiResponse<string[]>>(`/sites/${siteId}/images`, formData)
  }
}

/**
 * Example Service for Tour Guides
 */
export class TourGuidesService {
  static async getAll(): Promise<TourGuide[]> {
    return API.get<TourGuide[]>('/tour-guides')
  }

  static async getById(id: string): Promise<TourGuide> {
    return API.get<TourGuide>(`/tour-guides/${id}`)
  }

  static async create(guideData: Omit<TourGuide, 'id'>): Promise<ApiResponse<TourGuide>> {
    return API.post<ApiResponse<TourGuide>>('/tour-guides', guideData)
  }
}

/**
 * Example: Using the services in a component
 *
 * ```tsx
 * 'use client'
 *
 * import { useEffect, useState } from 'react'
 * import { SitesService } from '@/config/example-usage'
 *
 * export default function SitesPage() {
 *   const [sites, setSites] = useState([])
 *   const [loading, setLoading] = useState(true)
 *
 *   useEffect(() => {
 *     async function fetchSites() {
 *       try {
 *         const data = await SitesService.getAll()
 *         setSites(data)
 *       } catch (error) {
 *         console.error('Failed to fetch sites:', error)
 *       } finally {
 *         setLoading(false)
 *       }
 *     }
 *
 *     fetchSites()
 *   }, [])
 *
 *   if (loading) return <div>Loading...</div>
 *
 *   return (
 *     <div>
 *       {sites.map(site => (
 *         <div key={site.id}>{site.name}</div>
 *       ))}
 *     </div>
 *   )
 * }
 * ```
 */
