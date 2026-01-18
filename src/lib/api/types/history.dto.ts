// Browsing history-related type definitions matching backend Prisma schema

import { Monument } from './monuments.dto';

export interface BrowsingHistoryEntry {
  id: string;
  portalUserId: string;
  monumentId: number;
  monument?: Monument;
  durationSeconds?: number;
  visitedAt: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TrackVisitDto {
  monumentId: number;
  durationSeconds?: number;
}

export interface BrowsingHistoryResponse {
  data: BrowsingHistoryEntry[];
  pagination: {
    page?: number;
    limit?: number;
    total: number;
    totalPages?: number;
  };
  message: string;
}

export interface BrowsingHistoryStats {
  totalVisits: number;
  uniqueMonumentsVisited: number;
  mostVisited: Array<{
    monumentId: number;
    visitCount: number;
  }>;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
}
