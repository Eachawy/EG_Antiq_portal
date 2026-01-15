// Browsing history API endpoints

import { httpClient } from '../http';
import {
  BrowsingHistoryEntry,
  TrackVisitDto,
  BrowsingHistoryResponse,
  ApiResponse,
} from '../types/history.dto';

export const historyEndpoints = {
  /**
   * Get browsing history for authenticated user with pagination
   */
  async getAll(
    page: number = 1,
    limit: number = 20
  ): Promise<BrowsingHistoryResponse> {
    const response = await httpClient.get<
      ApiResponse<BrowsingHistoryResponse>
    >('/portal/history', {
      params: { page, limit },
    });
    return response.data.data;
  },

  /**
   * Track monument visit
   */
  async trackVisit(monumentId: number): Promise<BrowsingHistoryEntry> {
    const dto: TrackVisitDto = { monumentId };
    const response = await httpClient.post<ApiResponse<BrowsingHistoryEntry>>(
      '/portal/history',
      dto
    );
    return response.data.data;
  },

  /**
   * Clear all browsing history
   */
  async clearAll(): Promise<void> {
    await httpClient.delete('/portal/history');
  },

  /**
   * Delete specific history entry
   */
  async deleteEntry(id: string): Promise<void> {
    await httpClient.delete(`/portal/history/${id}`);
  },
};
