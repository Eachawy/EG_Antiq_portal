import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Search, SlidersHorizontal, X, Landmark, Church, Mountain, Pyramid, Sparkles, Map, Moon, GraduationCap, Crown, Castle, ShoppingBag, DoorOpen, House, Droplet, Bath } from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';
import { Era, Dynasty } from '@/lib/api/types/monuments.dto';

interface AdvancedSearchProps {
  onSearch: (params: SearchParams) => void;
  eras: Era[];
  dynasties: Dynasty[];
}

export interface SearchParams {
  query: string;
  period: string;
  dynasty: string;
  startDate: string;
  endDate: string;
  siteType: string;
  minDuration: string;
  maxDuration: string;
}

export function AdvancedSearch({ onSearch, eras, dynasties }: AdvancedSearchProps) {
  const t = useTranslations('sites.filters');
  const tCommon = useTranslations('sites.common');
  const params = useParams();
  const locale = params.locale as 'en' | 'ar';
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    query: '',
    period: 'all',
    dynasty: 'all',
    startDate: '',
    endDate: '',
    siteType: 'all',
    minDuration: '',
    maxDuration: '',
  });

  // Site type options with icons
  const siteTypes = [
    { value: 'all', label: t('allTypes'), icon: Map },
    { value: 'capital-cities', label: t('types.capital-cities'), icon: Landmark },
    { value: 'temples', label: t('types.temples'), icon: Church },
    { value: 'cemeteries', label: t('types.cemeteries'), icon: Mountain },
    { value: 'pyramids', label: t('types.pyramids'), icon: Pyramid },
    { value: 'obelisks', label: t('types.obelisks'), icon: Sparkles },
    { value: 'areas', label: t('types.areas'), icon: Map },
    { value: 'churches', label: t('types.churches'), icon: Church },
    { value: 'masjids', label: t('types.masjids'), icon: Moon },
    { value: 'schools', label: t('types.schools'), icon: GraduationCap },
    { value: 'palaces', label: t('types.palaces'), icon: Crown },
    { value: 'castles', label: t('types.castles'), icon: Castle },
    { value: 'markets', label: t('types.markets'), icon: ShoppingBag },
    { value: 'doors', label: t('types.doors'), icon: DoorOpen },
    { value: 'houses', label: t('types.houses'), icon: House },
    { value: 'sabil', label: t('types.sabil'), icon: Droplet },
    { value: 'hammam', label: t('types.hammam'), icon: Bath },
  ];

  // Get available dynasties based on selected era
  const availableDynasties = useMemo(() => {
    if (searchParams.period === 'all') {
      return dynasties;
    }
    return dynasties.filter((dynasty) => dynasty.eraId === parseInt(searchParams.period));
  }, [searchParams.period, dynasties]);

  const handleSearch = () => {
    onSearch(searchParams);
  };

  const handleReset = () => {
    const resetParams: SearchParams = {
      query: '',
      period: 'all',
      dynasty: 'all',
      startDate: '',
      endDate: '',
      siteType: 'all',
      minDuration: '',
      maxDuration: '',
    };
    setSearchParams(resetParams);
    onSearch(resetParams);
  };

  // Reset dynasty when period changes
  const handlePeriodChange = (period: string) => {
    setSearchParams({ ...searchParams, period, dynasty: 'all' });
  };

  return (
    <div className="bg-theme-card border border-theme-border rounded-xl p-6 shadow-lg">
      {/* Basic Search */}
      <div className="mb-6">
        <label className="block text-theme-text mb-2">{t('searchLabel')}</label>
        <div className="relative">
          <input
            type="text"
            value={searchParams.query}
            onChange={(e) => setSearchParams({ ...searchParams, query: e.target.value })}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder={t('placeholder')}
            className="w-full bg-theme-bg border border-theme-border rounded-lg pl-12 pr-4 py-3 text-theme-text placeholder-theme-muted/50 focus:outline-none focus:border-theme-primary transition-colors"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted" size={20} />
        </div>
      </div>

      {/* Advanced Toggle */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="flex items-center gap-2 text-theme-primary hover:text-theme-secondary transition-colors mb-4"
      >
        <SlidersHorizontal size={18} />
        <span>{showAdvanced ? t('hideAdvanced') : t('showAdvanced')}</span>
      </button>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="border-t border-theme-border pt-6 space-y-6">
          {/* Row 1: Period & Dynasty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-theme-text mb-2 text-sm">{t('period')}</label>
              <select
                value={searchParams.period}
                onChange={(e) => handlePeriodChange(e.target.value)}
                className="w-full bg-theme-card border border-theme-border rounded-lg px-4 py-3 text-theme-text focus:outline-none focus:ring-2 focus:ring-theme-primary"
              >
                <option value="all">{t('allPeriods')}</option>
                {eras.map((era) => (
                  <option key={era.id} value={era.id.toString()}>
                    {locale === 'ar' ? era.nameAr : era.nameEn}
                    {era.fromYear && era.toYear && ` (${era.fromYear} – ${era.toYear})`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-theme-text mb-2 text-sm">{t('dynasty')}</label>
              <select
                value={searchParams.dynasty}
                onChange={(e) => setSearchParams({ ...searchParams, dynasty: e.target.value })}
                className="w-full bg-theme-bg border border-theme-border rounded-lg px-4 py-3 text-theme-text focus:outline-none focus:border-theme-primary transition-colors"
                disabled={!availableDynasties.length}
              >
                <option value="all">{t('allDynasties')}</option>
                {availableDynasties.map((dynasty) => (
                  <option key={dynasty.id} value={dynasty.id.toString()}>
                    {locale === 'ar' ? dynasty.nameAr : dynasty.nameEn}
                    {dynasty.fromYear && dynasty.toYear && ` (${dynasty.fromYear} – ${dynasty.toYear})`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 2: Date Range */}
          <div>
            <div className="mb-2 flex justify-between items-center">
              <label className="text-theme-text text-sm">{t('dateRange')}</label>
              <span className="text-theme-text text-sm">
                {searchParams.startDate && searchParams.endDate
                  ? `${Math.abs(Number(searchParams.startDate))} ${Number(searchParams.startDate) < 0 ? tCommon('bc') : tCommon('ad')} – ${Math.abs(Number(searchParams.endDate))} ${Number(searchParams.endDate) < 0 ? tCommon('bc') : tCommon('ad')}`
                  : t('selectRange')}
              </span>
            </div>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-2"
              defaultValue={[-3100, 2025]}
              min={-3100}
              max={2025}
              step={10}
              minStepsBetweenThumbs={1}
              onValueChange={(values) => {
                setSearchParams({
                  ...searchParams,
                  startDate: values[0].toString(),
                  endDate: values[1].toString()
                });
              }}
            >
              <Slider.Track className="relative grow h-2 bg-theme-accent rounded-full">
                <Slider.Range className="absolute h-full bg-theme-primary rounded-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white border-2 border-theme-primary rounded-full shadow-lg hover:scale-110 focus:outline-none focus:ring-2 focus:ring-theme-primary focus:ring-offset-2 transition-transform cursor-grab active:cursor-grabbing"
                aria-label="Start Year"
              />
              <Slider.Thumb
                className="block w-5 h-5 bg-white border-2 border-theme-primary rounded-full shadow-lg hover:scale-110 focus:outline-none focus:ring-2 focus:ring-theme-primary focus:ring-offset-2 transition-transform cursor-grab active:cursor-grabbing"
                aria-label="End Year"
              />
            </Slider.Root>
            <div className="flex justify-between text-xs text-theme-muted mt-2">
              <span>3100 {tCommon('bc')}</span>
              <span>2025 {tCommon('ad')}</span>
            </div>
          </div>

          {/* Row 3: Site Type Icons */}
          <div>
            <label className="block text-theme-text mb-3 text-sm">{t('siteType')}</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {siteTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = searchParams.siteType === type.value;
                return (
                  <button
                    key={type.value}
                    onClick={() => setSearchParams({ ...searchParams, siteType: type.value })}
                    className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 transition-all ${isSelected
                      ? 'bg-theme-primary border-theme-primary text-white shadow-md'
                      : 'bg-theme-bg border-theme-border text-theme-text hover:border-theme-primary hover:bg-theme-accent'
                      }`}
                    title={type.label}
                  >
                    <Icon size={20} />
                    <span className="text-sm">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Help Text */}
          <div className="bg-theme-accent border border-theme-border rounded-lg p-4">
            <h4 className="text-theme-text mb-2 text-sm">{t('tips')}</h4>
            <ul className="text-theme-muted text-xs space-y-1">
              <li>{t('tipsList.negative')}</li>
              <li>{t('tipsList.positive')}</li>
              <li>{t('tipsList.combine')}</li>
            </ul>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <button
          onClick={handleSearch}
          className="flex-1 bg-theme-primary hover:bg-theme-secondary text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Search size={18} />
          <span>{t('searchButton')}</span>
        </button>
        <button
          onClick={handleReset}
          className="sm:w-auto px-6 py-3 bg-theme-accent hover:bg-theme-accent/70 text-theme-text border border-theme-border rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <X size={18} />
          <span>{t('reset')}</span>
        </button>
      </div>
    </div>
  );
}