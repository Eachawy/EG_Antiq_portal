// Saved searches API endpoints

import { httpClient } from '../http';
import {
  SavedSearch,
  CreateSavedSearchDto,
  UpdateSavedSearchDto,
  SavedSearchesResponse,
  ApiResponse,
} from '../types/saved-searches.dto';

export const savedSearchEndpoints = {
  /**
   * Get all saved searches for authenticated user with pagination
   */
  async getAll(
    page: number = 1,
    limit: number = 20
  ): Promise<SavedSearchesResponse> {
    const response = await httpClient.get<ApiResponse<SavedSearchesResponse>>(
      '/portal/saved-searches',
      {
        params: { page, limit },
      }
    );
    return response.data.data;
  },

  /**
   * Create a new saved search
   */
  async create(dto: CreateSavedSearchDto): Promise<SavedSearch> {
    const response = await httpClient.post<ApiResponse<SavedSearch>>(
      '/portal/saved-searches',
      dto
    );
    return response.data.data;
  },

  /**
   * Update saved search
   */
  async update(id: string, dto: UpdateSavedSearchDto): Promise<SavedSearch> {
    const response = await httpClient.put<ApiResponse<SavedSearch>>(
      `/portal/saved-searches/${id}`,
      dto
    );
    return response.data.data;
  },

  /**
   * Delete saved search
   */
  async delete(id: string): Promise<void> {
    await httpClient.delete(`/portal/saved-searches/${id}`);
  },

  /**
   * Get saved search by ID
   */
  async getById(id: string): Promise<SavedSearch> {
    const response = await httpClient.get<ApiResponse<SavedSearch>>(
      `/portal/saved-searches/${id}`
    );
    return response.data.data;
  },
};
