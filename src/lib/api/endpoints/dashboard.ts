import { httpClient } from '../http';
import type { DashboardResponse, DashboardStats } from '../types/dashboard.dto';
import type { ApiResponse } from '../types/common';

export const dashboardEndpoints = {
  async getStats(): Promise<DashboardStats> {
    const response = await httpClient.get<ApiResponse<DashboardStats>>(
      '/dashboard/stats'
    );
    return response.data.data;
  },

  async getDashboard(): Promise<DashboardResponse> {
    const response = await httpClient.get<ApiResponse<DashboardResponse>>(
      '/dashboard'
    );
    return response.data.data;
  },
};
