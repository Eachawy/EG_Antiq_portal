// Saved searches-related type definitions matching backend Prisma schema

export interface SavedSearch {
  id: string;
  userId: string;
  name: string;
  searchCriteria: {
    keyword?: string;
    eraIds?: number[];
    dynastyIds?: number[];
    monumentTypeIds?: number[];
    startDateFrom?: string;
    startDateTo?: string;
    endDateFrom?: string;
    endDateTo?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CreateSavedSearchDto {
  name: string;
  searchCriteria: {
    keyword?: string;
    eraIds?: number[];
    dynastyIds?: number[];
    monumentTypeIds?: number[];
    startDateFrom?: string;
    startDateTo?: string;
    endDateFrom?: string;
    endDateTo?: string;
  };
}

export interface UpdateSavedSearchDto {
  name?: string;
  searchCriteria?: {
    keyword?: string;
    eraIds?: number[];
    dynastyIds?: number[];
    monumentTypeIds?: number[];
    startDateFrom?: string;
    startDateTo?: string;
    endDateFrom?: string;
    endDateTo?: string;
  };
}

export interface SavedSearchesResponse {
  data: SavedSearch[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
