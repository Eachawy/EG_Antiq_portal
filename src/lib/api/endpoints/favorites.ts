// Favorites API endpoints

import { httpClient } from '../http';
import {
  Favorite,
  CreateFavoriteDto,
  FavoritesResponse,
  CheckFavoriteResponse,
  ApiResponse,
} from '../types/favorites.dto';

export const favoriteEndpoints = {
  /**
   * Get all favorites for authenticated user with pagination
   */
  async getAll(
    page: number = 1,
    limit: number = 20
  ): Promise<FavoritesResponse> {
    const response = await httpClient.get<ApiResponse<FavoritesResponse>>(
      '/portal/favorites',
      {
        params: { page, limit },
      }
    );
    return response.data.data;
  },

  /**
   * Add monument to favorites
   */
  async add(monumentId: number): Promise<Favorite> {
    const dto: CreateFavoriteDto = { monumentId };
    const response = await httpClient.post<ApiResponse<Favorite>>(
      '/portal/favorites',
      dto
    );
    return response.data.data;
  },

  /**
   * Remove favorite by ID
   */
  async remove(favoriteId: string): Promise<void> {
    await httpClient.delete(`/portal/favorites/${favoriteId}`);
  },

  /**
   * Check if monument is favorited
   */
  async check(monumentId: number): Promise<CheckFavoriteResponse> {
    const response = await httpClient.get<ApiResponse<CheckFavoriteResponse>>(
      `/portal/favorites/check/${monumentId}`
    );
    return response.data.data;
  },
};
