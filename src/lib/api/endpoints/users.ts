// Portal users/profile API endpoints

import { httpClient } from '../http';
import {
  PortalUser,
  UpdateProfileDto,
  UserStats,
  ApiResponse,
} from '../types/users.dto';

export const userEndpoints = {
  /**
   * Get current user profile
   */
  async getProfile(): Promise<PortalUser> {
    const response = await httpClient.get<ApiResponse<PortalUser>>(
      '/portal/users/me'
    );
    // Backend returns: { data: {...}, message: "..." }
    return response.data.data;
  },

  /**
   * Update current user profile
   */
  async updateProfile(data: UpdateProfileDto): Promise<PortalUser> {
    const response = await httpClient.patch<ApiResponse<PortalUser>>(
      '/portal/users/me',
      data
    );
    // Backend returns: { data: {...}, message: "..." }
    return response.data.data;
  },

  /**
   * Get user statistics
   */
  async getStats(): Promise<UserStats> {
    const response = await httpClient.get<ApiResponse<UserStats>>(
      '/portal/users/me/stats'
    );
    // Backend returns: { data: {...}, message: "..." }
    return response.data.data;
  },

  /**
   * Delete user account
   */
  async deleteAccount(): Promise<void> {
    await httpClient.delete('/portal/users/me');
  },
};
