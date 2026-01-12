// Uncomment when backend is ready:
// import { dashboardEndpoints } from '@/lib/api/endpoints/dashboard';
import type { DashboardStats, DashboardResponse } from '@/lib/api/types/dashboard.dto';

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    // Mock response for demonstration
    const mockStats: DashboardStats = {
      visits: 1234,
      revenue: 5678,
      users: 890,
      orders: 456,
    };

    // Uncomment when backend is ready:
    // return await dashboardEndpoints.getStats();

    return mockStats;
  },

  async getDashboard(): Promise<DashboardResponse> {
    // Mock response for demonstration
    const mockResponse: DashboardResponse = {
      stats: {
        visits: 1234,
        revenue: 5678,
        users: 890,
        orders: 456,
      },
      recentActivity: [
        {
          id: '1',
          type: 'order',
          description: 'New order placed',
          timestamp: new Date().toISOString(),
        },
        {
          id: '2',
          type: 'user',
          description: 'New user registered',
          timestamp: new Date().toISOString(),
        },
      ],
    };

    // Uncomment when backend is ready:
    // return await dashboardEndpoints.getDashboard();

    return mockResponse;
  },
};
