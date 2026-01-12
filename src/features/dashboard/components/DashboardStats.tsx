'use client';

import { useTranslations } from 'next-intl';
import type { DashboardStats as StatsType } from '@/lib/api/types/dashboard.dto';

interface DashboardStatsProps {
  stats: StatsType;
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const t = useTranslations('dashboard.stats');

  const statItems = [
    { label: t('visits'), value: stats.visits, color: 'blue' },
    { label: t('revenue'), value: `$${stats.revenue}`, color: 'green' },
    { label: t('users'), value: stats.users, color: 'purple' },
    { label: t('orders'), value: stats.orders, color: 'orange' },
  ];

  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700',
    green: 'bg-green-50 text-green-700',
    purple: 'bg-purple-50 text-purple-700',
    orange: 'bg-orange-50 text-orange-700',
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {statItems.map((item) => (
        <div
          key={item.label}
          className="rounded-lg bg-white p-6 shadow-md"
        >
          <div
            className={`inline-flex rounded-lg px-3 py-1 text-sm font-medium ${colorClasses[item.color as keyof typeof colorClasses]}`}
          >
            {item.label}
          </div>
          <p className="mt-4 text-3xl font-bold text-gray-900">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
