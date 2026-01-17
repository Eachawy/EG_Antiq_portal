// Era API endpoints

import { httpClient } from '../http';
import { Era, ApiResponse } from '../types/monuments.dto';

export const eraEndpoints = {
  /**
   * Get all eras
   */
  async getAll(): Promise<Era[]> {
    const response = await httpClient.get<ApiResponse<Era[]>>('/eras');
    return response.data.data;
  },

  /**
   * Get era by ID
   */
  async getById(id: number): Promise<Era> {
    const response = await httpClient.get<ApiResponse<Era>>(`/eras/${id}`);
    return response.data.data;
  },
};
