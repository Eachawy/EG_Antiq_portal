// Browsing history API endpoints

import { httpClient } from '../http';
import {
  BrowsingHistoryEntry,
  TrackVisitDto,
  BrowsingHistoryResponse,
  BrowsingHistoryStats,
  ApiResponse,
} from '../types/history.dto';

export const historyEndpoints = {
  /**
   * Get browsing history for authenticated user with optional pagination
   */
  async getAll(
    page: number = 1,
    limit: number = 0 // 0 means no pagination
  ): Promise<{ data: BrowsingHistoryEntry[]; pagination: any }> {
    const response = await httpClient.get<BrowsingHistoryResponse>(
      '/portal/history',
      {
        params: { page, limit },
      }
    );
    // Backend returns: { data: [...], pagination: {...}, message: "..." }
    return {
      data: response.data.data || [],
      pagination: response.data.pagination,
    };
  },

  /**
   * Track monument visit
   */
  async trackVisit(
    monumentId: number,
    durationSeconds?: number
  ): Promise<BrowsingHistoryEntry> {
    const dto: TrackVisitDto = { monumentId, durationSeconds };
    const response = await httpClient.post<ApiResponse<BrowsingHistoryEntry>>(
      '/portal/history',
      dto
    );
    // Backend returns: { data: {...}, message: "..." }
    return response.data.data;
  },

  /**
   * Get browsing statistics
   */
  async getStats(): Promise<BrowsingHistoryStats> {
    const response = await httpClient.get<ApiResponse<BrowsingHistoryStats>>(
      '/portal/history/stats'
    );
    // Backend returns: { data: {...}, message: "..." }
    return response.data.data;
  },

  /**
   * Clear all browsing history
   */
  async clearAll(): Promise<{ deletedCount: number }> {
    const response = await httpClient.delete<ApiResponse<{ deletedCount: number }>>(
      '/portal/history'
    );
    return response.data.data;
  },

  /**
   * Delete specific history entry
   */
  async deleteEntry(id: string): Promise<void> {
    await httpClient.delete(`/portal/history/${id}`);
  },
};
