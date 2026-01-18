// Saved searches-related type definitions matching backend Prisma schema

export interface SavedSearch {
  id: string;
  portalUserId: string;
  name: string;
  keyword?: string;
  eraIds?: number[];
  dynastyIds?: number[];
  monumentTypeIds?: number[];
  dateFrom?: string;
  dateTo?: string;
  filters?: Record<string, any>;
  resultCount?: number;
  lastRunAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSavedSearchDto {
  name: string;
  keyword?: string;
  eraIds?: number[];
  dynastyIds?: number[];
  monumentTypeIds?: number[];
  dateFrom?: string;
  dateTo?: string;
  filters?: Record<string, any>;
}

export interface UpdateSavedSearchDto {
  name?: string;
  keyword?: string;
  eraIds?: number[];
  dynastyIds?: number[];
  monumentTypeIds?: number[];
  dateFrom?: string;
  dateTo?: string;
  filters?: Record<string, any>;
}

export interface SavedSearchResponse {
  data: SavedSearch[];
  message: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
}
