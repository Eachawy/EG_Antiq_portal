import httpClient from '@/config/http-client';
import type { Monument, ApiResponse } from './types';

/**
 * Fetch all monuments from the API
 */
export async function fetchMonuments(): Promise<Monument[]> {
  try {
    const response = await httpClient.get<Monument[] | ApiResponse<Monument[]>>('/monuments');

    // Handle different response structures
    if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data && 'data' in response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }

    return [];
  } catch (error) {
    console.error('Error fetching monuments:', error);
    throw error;
  }
}

/**
 * Fetch a single monument by ID
 */
export async function fetchMonumentById(id: string): Promise<Monument | null> {
  try {
    const response = await httpClient.get<Monument | ApiResponse<Monument>>(`/monuments/${id}`);

    if ('data' in response.data) {
      return response.data.data;
    }

    return response.data as Monument;
  } catch (error) {
    console.error(`Error fetching monument ${id}:`, error);
    return null;
  }
}

/**
 * Create a new monument
 */
export async function createMonument(monument: Partial<Monument>): Promise<Monument | null> {
  try {
    const response = await httpClient.post<ApiResponse<Monument>>('/monuments', monument);
    return response.data.data;
  } catch (error) {
    console.error('Error creating monument:', error);
    return null;
  }
}

/**
 * Update an existing monument
 */
export async function updateMonument(id: string, monument: Partial<Monument>): Promise<Monument | null> {
  try {
    const response = await httpClient.put<ApiResponse<Monument>>(`/monuments/${id}`, monument);
    return response.data.data;
  } catch (error) {
    console.error(`Error updating monument ${id}:`, error);
    return null;
  }
}

/**
 * Delete a monument
 */
export async function deleteMonument(id: string): Promise<boolean> {
  try {
    await httpClient.delete(`/monuments/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting monument ${id}:`, error);
    return false;
  }
}
