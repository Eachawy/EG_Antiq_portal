import { getTranslations } from 'next-intl/server';
import { dashboardService } from '@/features/dashboard/services/dashboard.service';
import DashboardStats from '@/features/dashboard/components/DashboardStats';

export default async function DashboardPage() {
  const t = await getTranslations('dashboard');

  let stats = null;
  let hasError = false;

  try {
    stats = await dashboardService.getStats();
  } catch (e) {
    hasError = true;
    console.error('Failed to load dashboard stats:', e);
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
          <p className="mt-2 text-gray-600">{t('welcome')}</p>
        </div>

        {hasError && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-800">
            Failed to load dashboard data. Please try again later.
          </div>
        )}

        {stats && (
          <>
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                {t('stats.title')}
              </h2>
              <DashboardStats stats={stats} />
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-semibold text-gray-900">
                {t('recentActivity')}
              </h2>
              <p className="text-gray-600">{t('noActivity')}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
