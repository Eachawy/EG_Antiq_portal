export interface DashboardStats {
  visits: number;
  revenue: number;
  users: number;
  orders: number;
}

export interface DashboardActivity {
  id: string;
  type: 'order' | 'user' | 'payment';
  description: string;
  timestamp: string;
}

export interface DashboardResponse {
  stats: DashboardStats;
  recentActivity: DashboardActivity[];
}
