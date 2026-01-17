'use client';

import { useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { type Locale } from '@/i18n/config';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { eras, type Era } from './data/erasData';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function HistoricalEras() {
    const params = useParams();
    const currentLocale = (params.locale as Locale) || 'en';
    const router = useRouter();
    const t = useTranslations("homepage.historicalEras");

    return (
        <section className="py-16 sm:py-20 lg:py-24 bg-theme-accent">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                {/* Section Header */}
                <div className="text-center mb-12 sm:mb-16 lg:mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <p className="text-theme-primary tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm mb-3 sm:mb-4">
                        {t("subtitle")}
                    </p>
                    <h2 className="text-theme-text mb-4 sm:mb-6 text-3xl sm:text-4xl lg:text-5xl">
                        {t("title")}
                    </h2>
                    <p className="text-theme-text/70 max-w-3xl mx-auto text-sm sm:text-base lg:text-lg leading-relaxed px-4">
                        {t("description")}
                    </p>
                </div>

                {/* Eras Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
                    {eras.map((era: Era, index: number) => (
                        <div
                            key={era.id}
                            className="group cursor-pointer animate-in fade-in slide-in-from-bottom-8 duration-700"
                            style={{ animationDelay: `${index * 100}ms` }}
                            onClick={() => router.push(`/eras/${era.id}`)}
                        >
                            <div className="relative h-64 sm:h-72 lg:h-80 rounded-xl overflow-hidden mb-4 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                                {/* Image */}
                                <Image
                                    src={era.imageUrl}
                                    alt={era.name[currentLocale]}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 group-focus-within:scale-110"
                                />

                                {/* Gradient Overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-500 group-hover:from-black/95`}></div>

                                {/* Era Badge */}
                                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 transform transition-all duration-300 group-hover:scale-110">
                                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs border backdrop-blur-md shadow-lg ${era.color.badge}`}>
                                        {t("era")} {era.name[currentLocale]}
                                    </span>
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 transform transition-all duration-500 group-hover:translate-y-0">
                                    <h3 className="text-white mb-3 group-hover:text-theme-primary transition-colors duration-300 text-xl sm:text-2xl font-bold">
                                        {era.name[currentLocale]}
                                    </h3>

                                    <div className="flex flex-col gap-2 text-white text-xs sm:text-sm">
                                        <div className="flex items-center gap-1.5 transition-colors duration-200">
                                            <Calendar size={14} className="flex-shrink-0" aria-hidden="true" />
                                            <span className="font-semibold">{era.period[currentLocale]}</span>
                                        </div>
                                        <div className="flex items-start gap-1.5 transition-colors duration-200">
                                            <Clock size={14} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
                                            <span className="line-clamp-2 text-white/90">{era.shortDescription[currentLocale]}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Effect */}
                                <div className="absolute inset-0 bg-theme-primary/0 group-hover:bg-theme-primary/10 transition-all duration-500"></div>
                            </div>

                            {/* Key Features Preview */}
                            <div className="px-1 mb-3">
                                <p className="text-theme-text/70 text-xs sm:text-sm leading-relaxed line-clamp-2">
                                    {era.keyCharacteristics.slice(0, 2).map(c => c[currentLocale]).join(' • ')}
                                </p>
                            </div>

                            {/* View Details Link */}
                            <button
                                className="text-theme-primary group-hover:text-theme-secondary transition-all duration-300 text-xs sm:text-sm flex items-center gap-2 hover:gap-3 focus:outline-none focus:ring-2 focus:ring-theme-primary focus:ring-offset-2 focus:ring-offset-theme-bg rounded-md px-2 py-1"
                                aria-label={`Learn more about ${era.name[currentLocale]} era`}
                            >
                                <span>{t("exploreButton", { eraName: era.name[currentLocale] })}</span>
                                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '500ms' }}>
                    <button
                        onClick={() => router.push('/sites')}
                        className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-theme-primary hover:bg-theme-secondary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg tracking-wider transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-theme-primary focus:ring-offset-4 focus:ring-offset-theme-bg text-sm sm:text-base"
                        aria-label="Browse all archaeological sites"
                    >
                        <span>{t("browseSitesButton")}</span>
                        <ArrowRight size={20} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </section>
    );
}