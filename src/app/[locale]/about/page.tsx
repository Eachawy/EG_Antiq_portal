'use client';

import { useTranslations } from 'next-intl';
import { Book, Clock, Shield, Lightbulb } from 'lucide-react';
import { historicalPeriods } from './data/sitesData';

import { useParams } from 'next/navigation';
import { type Locale } from '@/i18n/config';

export default function AboutPage() {
  const params = useParams();
  const currentLocale = (params.locale as Locale) || 'en';
  const t = useTranslations('about.hero');
  const tClass = useTranslations('about.classification');
  const tEras = useTranslations('about.historicalEras');
  const tPreserve = useTranslations('about.preservationImportance');
  const tResearch = useTranslations('about.research');

  return (
    <div className="bg-theme-bg">
      {/* Hero Section */}
      {/* <section className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
        <img
          src="/styles/images/img/about.jpeg"
          alt="Egyptian Archaeology Research"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-6 md:px-12 text-center">
            <p className="text-white/90 tracking-[0.3em] text-xs sm:text-sm mb-4">
              {t('subtitle')}
            </p>
            <h1 className="text-white mb-4 md:mb-6 text-3xl md:text-4xl lg:text-5xl">
              {t('title')}
            </h1>
            <p className="text-white/90 max-w-3xl mx-auto text-sm md:text-base lg:text-lg">
              {t('description')}
            </p>
          </div>
        </div>
      </section> */}

      {/* Classification Section */}
      <section className="py-6 md:py-8 bg-theme-bg md:pt-40">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="bg-theme-card border border-theme-border rounded-xl p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-theme-primary/20 p-3 rounded-lg">
                <Book className="text-theme-primary" size={28} />
              </div>
              <h3 className="text-theme-text">
                {tClass('title')}
              </h3>
            </div>

            <div className="space-y-4 text-theme-text/80 leading-relaxed">
              <p>
                {tClass('intro')}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-theme-accent p-6 rounded-lg">
                  <h4 className="text-theme-primary mb-3">{tClass('chronological.title')}</h4>
                  <p className="text-sm">{tClass('chronological.description')}</p>
                </div>

                <div className="bg-theme-accent p-6 rounded-lg">
                  <h4 className="text-theme-primary mb-3">{tClass('function.title')}</h4>
                  <p className="text-sm">{tClass('function.description')}</p>
                </div>

                <div className="bg-theme-accent p-6 rounded-lg">
                  <h4 className="text-theme-primary mb-3">{tClass('significance.title')}</h4>
                  <p className="text-sm">{tClass('significance.description')}</p>
                </div>

                <div className="bg-theme-accent p-6 rounded-lg">
                  <h4 className="text-theme-primary mb-3">{tClass('preservation.title')}</h4>
                  <p className="text-sm">{tClass('preservation.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Historical Periods */}
      <section className="py-6 md:py-8 bg-theme-bg">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="bg-theme-card border border-theme-border rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-theme-primary/20 p-3 rounded-lg">
                <Clock className="text-theme-primary" size={28} />
              </div>
              <h3 className="text-theme-text">
                {tEras('title')}
              </h3>
            </div>

            <div className="space-y-6">
              {historicalPeriods.map((period, index) => (
                <div
                  key={index}
                  className="relative pl-8 pb-6 border-l-2 border-theme-border last:pb-0"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-theme-primary border-4 border-theme-bg"></div>

                  <div className="bg-theme-accent p-6 rounded-lg">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h4 className="text-theme-primary text-xl">{period.name[currentLocale]}</h4>
                      <span className="px-3 py-1 bg-theme-primary/20 rounded-full text-theme-primary text-xs">
                        {period.dateRange[currentLocale]}
                      </span>
                    </div>
                    <p className="text-theme-text/80 leading-relaxed">{period.description[currentLocale]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Preservation Importance */}
      <section className="py-6 md:py-8 bg-theme-bg">
        <div className="container mx-auto px-6 md:px-12 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-theme-card border border-theme-border rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-theme-primary/20 p-3 rounded-lg">
                  <Shield className="text-theme-primary" size={28} />
                </div>
                <h3 className="text-theme-text">
                  {tPreserve('title')}
                </h3>
              </div>

              <div className="space-y-4 text-theme-text/80 leading-relaxed text-sm">
                <p>
                  {tPreserve('description')}
                </p>

                <div className="bg-theme-accent p-4 rounded-lg">
                  <h4 className="text-theme-primary mb-2">{tPreserve('keyEffortsTitle')}</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-theme-primary mt-1">•</span>
                      <span>{tPreserve('keyEfforts.unesco')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-theme-primary mt-1">•</span>
                      <span>{tPreserve('keyEfforts.digital')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-theme-primary mt-1">•</span>
                      <span>{tPreserve('keyEfforts.research')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-theme-primary mt-1">•</span>
                      <span>{tPreserve('keyEfforts.conservation')}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-theme-card border border-theme-border rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-theme-primary/20 p-3 rounded-lg">
                  <Lightbulb className="text-theme-primary" size={28} />
                </div>
                <h3 className="text-theme-text">
                  {tResearch('title')}
                </h3>
              </div>

              <div className="space-y-4 text-theme-text/80 leading-relaxed text-sm">
                <p>
                  {tResearch('description')}
                </p>

                <div className="bg-theme-accent p-4 rounded-lg">
                  <h4 className="text-theme-primary mb-2">{tResearch('featuresTitle')}</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-theme-primary mt-1">•</span>
                      <span>{tResearch('features.siteDescriptions')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-theme-primary mt-1">•</span>
                      <span>{tResearch('features.dating')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-theme-primary mt-1">•</span>
                      <span>{tResearch('features.mapping')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-theme-primary mt-1">•</span>
                      <span>{tResearch('features.crossReferencing')}</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 p-4 bg-theme-primary/10 border border-theme-primary/30 rounded-lg">
                  <p className="text-theme-text text-sm">
                    <strong>{tResearch('targetAudience')}</strong> {tResearch('targetAudienceList')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
