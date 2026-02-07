'use client';
import { MapPin, Calendar, ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthContext';
import { historyEndpoints } from '@/lib/api/endpoints';
import { formatDate } from '@/lib/utils/utils';
import { buildMonumentUrl } from '@/lib/utils/monument-url';

export function SiteCardNew({ site }: any) {
  const tCard = useTranslations('sites.card');
  const tCommon = useTranslations('sites.common');
  const router = useRouter();
  const params = useParams();
  const locale = params.locale;
  const { isAuthenticated } = useAuth();

  const getPeriodColor = (period: string) => {
    switch (period) {
      case 'Ancient Egyptian':
        return 'bg-amber-500/20 text-white border-amber-500/30';
      case 'Ptolemaic':
        return 'bg-purple-500/20 text-purple-700 dark:text-purple-400 border-purple-500/30';
      case 'Roman':
        return 'bg-red-500/20 text-red-700 dark:text-red-400 border-red-500/30';
      case 'Byzantine':
        return 'bg-blue-500/20 text-blue-700 dark:text-blue-400 border-blue-500/30';
      case 'Islamic':
        return 'bg-green-500/20 text-green-700 dark:text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-700 dark:text-gray-400 border-gray-500/30';
    }
  };

  const handleClick = async (e: React.MouseEvent) => {
    // Track browsing history for authenticated users (non-blocking)
    if (isAuthenticated) {
      try {
        // Fire and forget - don't block navigation
        historyEndpoints.trackVisit(parseInt(site.id));
      } catch (err) {
        console.error('Failed to track visit:', err);
        // Silently fail - don't block navigation
      }
    }
    // Navigate to detail page
    router.push(buildMonumentUrl(site.id, site.slugEn, site.slugAr, locale as string));
  };

  return (
    <div onClick={handleClick}>
      <div className="group bg-theme-card border border-theme-border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-theme-primary cursor-pointer h-full flex flex-col">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={site.thumbnailUrl}
            alt={site.name.english}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {site.historicalPeriod && (
            <div className="absolute top-3 right-3">
              <span className={`px-3 py-1 rounded-full text-xs border ${getPeriodColor(site.historicalPeriod)}`}>
                {site.historicalPeriod}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Title */}
          <div className="mb-3">
            <h3 className="text-theme-text group-hover:text-theme-primary transition-colors">
              {site.name[locale === 'en' ? 'english' : 'arabic']}
            </h3>
          </div>

          {/* Location */}
          {/* <div className="flex items-center gap-2 text-theme-muted text-sm mb-3">
            <MapPin size={16} />
            <span>
              {site.location.city}
              {site.location.governorate && `, ${site.location.governorate}`}
            </span>
          </div> */}

          {/* Date Range */}
          {site.dateRange && (site.dateRange.start || site.dateRange.end) && (
            <div className="flex items-center gap-2 text-theme-muted text-sm mb-4">
              <Calendar size={16} />
              <span>
                {formatDate(site.dateRange.start, tCommon)}
                {site.dateRange.start && site.dateRange.end && ' – '}
                {formatDate(site.dateRange.end, tCommon)}
              </span>
            </div>
          )}

          {/* Description */}
          {site.description && (
            <p className="text-theme-text/70 text-sm leading-relaxed mb-4 flex-1">
              {site.description.length > 120
                ? `${site.description.substring(0, 120)}...`
                : site.description}
            </p>
          )}

          {/* View Details Link */}
          <div className="flex items-center gap-2 text-theme-primary group-hover:text-theme-secondary transition-colors text-sm">
            <span>{tCard('viewDetails')}</span>
            <ExternalLink size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}