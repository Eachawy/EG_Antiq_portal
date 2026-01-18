// Saved searches API endpoints

import { httpClient } from '../http';
import {
  SavedSearch,
  CreateSavedSearchDto,
  UpdateSavedSearchDto,
  SavedSearchResponse,
  ApiResponse,
} from '../types/saved-searches.dto';
import { Monument } from '../types/monuments.dto';

export const savedSearchEndpoints = {
  /**
   * Get all saved searches for authenticated user
   */
  async getAll(): Promise<SavedSearch[]> {
    const response = await httpClient.get<SavedSearchResponse>(
      '/portal/saved-searches'
    );
    // Backend returns: { data: [...], message: "..." }
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
    // Backend returns: { data: {...}, message: "..." }
    return response.data.data;
  },

  /**
   * Update saved search
   */
  async update(id: string, dto: UpdateSavedSearchDto): Promise<SavedSearch> {
    const response = await httpClient.patch<ApiResponse<SavedSearch>>(
      `/portal/saved-searches/${id}`,
      dto
    );
    // Backend returns: { data: {...}, message: "..." }
    return response.data.data;
  },

  /**
   * Delete saved search
   */
  async delete(id: string): Promise<void> {
    await httpClient.delete(`/portal/saved-searches/${id}`);
  },

  /**
   * Execute a saved search and get monument results
   */
  async execute(id: string): Promise<{ savedSearch: SavedSearch; monuments: Monument[] }> {
    const response = await httpClient.post<ApiResponse<{ savedSearch: SavedSearch; monuments: Monument[] }>>(
      `/portal/saved-searches/${id}/run`
    );
    // Backend returns: { data: { savedSearch: {...}, monuments: [...] }, message: "..." }
    return response.data.data;
  },
};
