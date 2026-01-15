// Favorites-related type definitions matching backend Prisma schema

import { Monument } from './monuments.dto';

export interface Favorite {
  id: string;
  userId: string;
  monumentId: number;
  monument?: Monument;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFavoriteDto {
  monumentId: number;
}

export interface FavoritesResponse {
  data: Favorite[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export interface CheckFavoriteResponse {
  isFavorited: boolean;
  favoriteId?: string;
}
