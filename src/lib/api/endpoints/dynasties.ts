// Dynasty API endpoints

import { httpClient } from '../http';
import { Dynasty, ApiResponse } from '../types/monuments.dto';

export const dynastyEndpoints = {
  /**
   * Get all dynasties
   */
  async getAll(): Promise<Dynasty[]> {
    const response = await httpClient.get<ApiResponse<Dynasty[]>>('/dynasties');
    return response.data.data;
  },

  /**
   * Get dynasties filtered by era (client-side filtering)
   * Note: Backend returns all dynasties, we filter by eraId on client
   */
  async getByEra(eraId: number): Promise<Dynasty[]> {
    const allDynasties = await this.getAll();
    return allDynasties.filter((dynasty) => dynasty.eraId === eraId);
  },

  /**
   * Get dynasty by ID
   */
  async getById(id: number): Promise<Dynasty> {
    const response = await httpClient.get<ApiResponse<Dynasty>>(
      `/dynasties/${id}`
    );
    return response.data.data;
  },
};
