'use client';
import { MapPin, Calendar, ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ArchaeologicalSite } from '../../about/data/sitesData';
import { Link } from '@/i18n/routing';

interface SiteCardNewProps {
  site: ArchaeologicalSite;
}

export function SiteCardNew({ site }: SiteCardNewProps) {
  const tCard = useTranslations('card');
  const tCommon = useTranslations('common');

  const formatDate = (year: number) => {
    if (year < 0) {
      return `${Math.abs(year)} ${tCommon('bc')}`;
    } else {
      return `${year} ${tCommon('ad')}`;
    }
  };

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

  return (
    <Link href={`/sites/${site.id}`}>
      <div className="group bg-theme-card border border-theme-border rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-theme-primary cursor-pointer h-full flex flex-col">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={site.thumbnailUrl}
            alt={site.name.english}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-3 right-3">
            <span className={`px-3 py-1 rounded-full text-xs border ${getPeriodColor(site.historicalPeriod)}`}>
              {site.historicalPeriod}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Title */}
          <div className="mb-3">
            <h3 className="text-theme-text group-hover:text-theme-primary transition-colors">
              {site.name.english}
            </h3>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-theme-muted text-sm mb-3">
            <MapPin size={16} />
            <span>{site.location.city}, {site.location.governorate}</span>
          </div>

          {/* Date Range */}
          <div className="flex items-center gap-2 text-theme-muted text-sm mb-4">
            <Calendar size={16} />
            <span>{formatDate(site.dateRange.start)} – {formatDate(site.dateRange.end)}</span>
          </div>

          {/* Description */}
          <p className="text-theme-text/70 text-sm leading-relaxed mb-4 flex-1">
            {site.description.substring(0, 120)}...
          </p>

          {/* View Details Link */}
          <div className="flex items-center gap-2 text-theme-primary group-hover:text-theme-secondary transition-colors text-sm">
            <span>{tCard('viewDetails')}</span>
            <ExternalLink size={16} />
          </div>
        </div>
      </div>
    </Link>
  );
}