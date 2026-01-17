// Monument Type API endpoints

import { httpClient } from '../http';
import { MonumentType } from '../types/monuments.dto';

export const monumentTypeEndpoints = {
  /**
   * Get all monument types
   */
  async getAll(): Promise<MonumentType[]> {
    const response = await httpClient.get<{ data: MonumentType[] }>(
      '/monument-types'
    );
    return response.data.data;
  },

  /**
   * Get monument type by ID
   */
  async getById(id: number): Promise<MonumentType> {
    const response = await httpClient.get<{ data: MonumentType }>(
      `/monument-types/${id}`
    );
    return response.data.data;
  },
};
