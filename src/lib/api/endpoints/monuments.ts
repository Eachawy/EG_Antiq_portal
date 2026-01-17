// Monument API endpoints

import { httpClient } from '../http';
import {
  Monument,
  MonumentListResponse,
  MonumentSearchFilters,
  ApiResponse,
} from '../types/monuments.dto';

export const monumentEndpoints = {
  /**
   * Get all monuments with pagination
   */
  async getAll(
    page: number = 1,
    limit: number = 6
  ): Promise<MonumentListResponse> {
    const response = await httpClient.get<MonumentListResponse>(
      '/portal/monuments',
      {
        params: { page, limit },
      }
    );
    return response.data;
  },

  /**
   * Search monuments with advanced filters
   */
  async search(filters: MonumentSearchFilters): Promise<MonumentListResponse> {
    // Helper to filter out invalid values (NaN, null, undefined)
    const filterValidIds = (ids?: number[]): string | undefined => {
      if (!ids || !Array.isArray(ids)) return undefined;
      const validIds = ids.filter(id => typeof id === 'number' && !isNaN(id));
      return validIds.length > 0 ? validIds.join(',') : undefined;
    };

    const response = await httpClient.get<MonumentListResponse>(
      '/portal/monuments/search',
      {
        params: {
          keyword: filters.keyword,
          eraIds: filterValidIds(filters.eraIds),
          dynastyIds: filterValidIds(filters.dynastyIds),
          monumentTypeIds: filterValidIds(filters.monumentTypeIds),
          dateFrom: filters.startDateFrom,
          dateTo: filters.startDateTo,
          page: filters.page || 1,
          limit: filters.limit || 6,
        },
      }
    );
    return response.data;
  },

  /**
   * Get monument by ID with all relations
   */
  async getById(id: number): Promise<Monument> {
    const response = await httpClient.get<{ data: Monument }>(
      `/portal/monuments/${id}`
    );
    return response.data.data;
  },
};
