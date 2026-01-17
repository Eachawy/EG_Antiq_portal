// Browsing history-related type definitions matching backend Prisma schema

import { Monument } from './monuments.dto';

export interface BrowsingHistoryEntry {
  id: string;
  userId: string;
  monumentId: number;
  monument?: Monument;
  visitedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface TrackVisitDto {
  monumentId: number;
}

export interface BrowsingHistoryResponse {
  data: BrowsingHistoryEntry[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}
