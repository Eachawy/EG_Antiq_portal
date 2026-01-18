// Favorites API endpoints

import { httpClient } from '../http';
import {
  Favorite,
  CreateFavoriteDto,
  FavoritesResponse,
  CheckFavoriteResponse,
} from '../types/favorites.dto';

export const favoriteEndpoints = {
  /**
   * Get all favorites for authenticated user with pagination
   */
  async getAll(
    page: number = 1,
    limit: number = 20
  ): Promise<FavoritesResponse> {
    const response = await httpClient.get<FavoritesResponse>(
      '/portal/favorites',
      {
        params: { page, limit },
      }
    );
    // Backend returns: { data: [...], pagination: {...}, message: "..." }
    return response.data;
  },

  /**
   * Add monument to favorites
   */
  async add(monumentId: number): Promise<Favorite> {
    const dto: CreateFavoriteDto = { monumentId };
    const response = await httpClient.post<{ data: Favorite }>(
      '/portal/favorites',
      dto
    );
    // Backend returns: { data: {...}, message: "..." }
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
    const response = await httpClient.get<{ data: CheckFavoriteResponse }>(
      `/portal/favorites/check/${monumentId}`
    );
    // Backend returns: { data: {...}, message: "..." }
    return response.data.data;
  },
};
