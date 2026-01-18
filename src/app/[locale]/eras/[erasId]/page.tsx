'use client';

import { useParams } from 'next/navigation';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { ArrowLeft, Calendar, MapPin, Building2, Sparkles, BookOpen, Heart, Clock, Landmark, ArrowUpRight, AlertCircle } from 'lucide-react';
import { type Locale } from '@/i18n/config';
import { getEraById } from '../../HomePage-Components/data/erasData';
import { archaeologicalSites } from '../../about/data/sitesData';

export default function EraDetailsPage() {
    const params = useParams();
    const currentLocale = (params.locale as Locale) || 'en';
    const erasId = params.erasId;
    const t = useTranslations('era');
    const tCommon = useTranslations('common');
    const router = useRouter();
    const era = erasId ? getEraById(erasId as string) : undefined;

    if (!era) {
        return (
            <div className="min-h-screen bg-theme-bg flex items-center justify-center">
                <div className="text-center p-8 bg-theme-card border border-theme-border rounded-xl shadow-2xl max-w-md mx-4">
                    <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-theme-text mb-2">{t('notFound.title')}</h2>
                    <p className="text-theme-text/70 mb-6">{t('notFound.description')}</p>
                    <button
                        onClick={() => router.push('/')}
                        className="mt-6 px-6 py-2 bg-theme-primary text-white rounded-lg hover:opacity-90 transition-colors"
                    >
                        {t('notFound.backButton')}
                    </button>
                </div>
            </div>
        );
    }

    // Find sites from this era
    const eraSites = archaeologicalSites.filter(
        site => site.historicalPeriod === era.name.en
    );

    // formatYear removed

    return (
        <div className="min-h-screen bg-theme-bg">
            {/* Full-Width Hero Section */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                    <img
                        src={era.imageUrl}
                        alt={era.name[currentLocale]}
                        className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${era.color.primary} opacity-90`}></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end">
                    <div className="container mx-auto px-6 md:px-12 pb-12 md:pb-16">
                        {/* Back Button */}
                        <button
                            onClick={() => router.push('/')}
                            className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-8 transition-colors group bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg"
                        >
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            <span>{tCommon('backToHome')}</span>
                        </button>

                        {/* Era Title */}
                        <div className="max-w-4xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs mb-4">
                                <Sparkles className="w-3 h-3" />
                                <span className="font-medium">{t('hero.historicalEra')}</span>
                            </div>

                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                                {t('hero.title', { eraName: era.name[currentLocale] })}
                            </h1>

                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
                                    <Calendar size={16} />
                                    <span className="font-semibold">{era.period[currentLocale]}</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
                                    <Clock size={16} />
                                    <span className="font-semibold">
                                        {t('hero.duration', { years: Math.abs(era.timeline.end - era.timeline.start) })}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
                                    <Landmark size={16} />
                                    <span className="font-semibold">{t('hero.sitesCount', { count: eraSites.length })}</span>
                                </div>
                            </div>

                            <p className="text-base md:text-lg text-white/95 leading-relaxed max-w-3xl">
                                {era.fullDescription[currentLocale]}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Historical Context */}
                        <div className="bg-theme-card border border-theme-border rounded-2xl p-6 sm:p-8 shadow-lg">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-theme-primary rounded-xl">
                                    <BookOpen className="text-white" size={20} />
                                </div>
                                <h2 className="text-base sm:text-lg font-semibold text-theme-text">{t('sections.historicalContext.title')}</h2>
                            </div>
                            <p className="text-theme-text/80 leading-relaxed">
                                {era.historicalContext[currentLocale]}
                            </p>
                        </div>

                        {/* Cultural Significance */}
                        <div className="bg-theme-card border border-theme-border rounded-2xl p-6 sm:p-8 shadow-lg">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-theme-primary rounded-xl">
                                    <Heart className="text-white" size={24} />
                                </div>
                                <h2 className="text-base sm:text-lg font-semibold text-theme-text">{t('sections.culturalSignificance.title')}</h2>
                            </div>
                            <p className="text-theme-text/80 leading-relaxed">
                                {era.culturalSignificance[currentLocale]}
                            </p>
                        </div>

                        {/* Architectural Style */}
                        <div className="bg-theme-card border border-theme-border rounded-2xl p-6 sm:p-8 shadow-lg">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-theme-primary rounded-xl">
                                    <Building2 className="text-white" size={24} />
                                </div>
                                <h2 className="text-base sm:text-lg font-semibold text-theme-text">{t('sections.architecturalStyle.title')}</h2>
                            </div>
                            <p className="text-theme-text/80 leading-relaxed">
                                {era.architecturalStyle[currentLocale]}
                            </p>
                        </div>

                        {/* Religious Beliefs */}
                        <div className="bg-theme-card border border-theme-border rounded-2xl p-6 sm:p-8 shadow-lg">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-theme-primary rounded-xl">
                                    <Sparkles className="text-white" size={24} />
                                </div>
                                <h2 className="text-base sm:text-lg font-semibold text-theme-text">{t('sections.religiousBeliefs.title')}</h2>
                            </div>
                            <p className="text-theme-text/80 leading-relaxed">
                                {era.religiousBeliefs[currentLocale]}
                            </p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Key Characteristics */}
                        <div className="bg-theme-card border border-theme-border rounded-2xl p-6 shadow-lg">
                            <h3 className="text-base sm:text-lg font-semibold text-theme-text mb-4">{t('sections.keyCharacteristics.title')}</h3>
                            <ul className="space-y-3">
                                {era.keyCharacteristics.map((characteristic, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="p-1 bg-theme-primary rounded-md mt-0.5">
                                            <div className="w-2 h-2 bg-white rounded-full"></div>
                                        </div>
                                        <span className="text-sm text-theme-text/80">{characteristic[currentLocale]}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Notable Sites */}
                        <div className="bg-theme-card border border-theme-border rounded-2xl p-6 shadow-lg">
                            <h3 className="text-base sm:text-lg font-semibold text-theme-text mb-4">{t('sections.notableSites.title')}</h3>
                            <ul className="space-y-3">
                                {era.notableSites.map((site, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <MapPin size={16} className={`text-theme-primary mt-0.5 flex-shrink-0`} />
                                        <span className="text-sm text-theme-text/80">{site[currentLocale]}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Related Archaeological Sites  WE need to make it dynamic based on the era*/}
                {eraSites.length > 0 && (
                    <div>
                        <div className="mb-8">
                            <h2 className="text-2xl sm:text-3xl font-semibold text-theme-text mb-3">
                                {t('sections.archaeologicalSites.title', { eraName: era.name[currentLocale] })}
                            </h2>
                            <p className="text-theme-text/70">
                                {t('sections.archaeologicalSites.description', { count: eraSites.length })}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {eraSites.map((site) => (
                                <div
                                    key={site.id}
                                    onClick={() => router.push(`/sites/${site.id}`)}
                                    className="group cursor-pointer bg-theme-card border border-theme-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={site.thumbnailUrl}
                                            alt={site.name[currentLocale]}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <div className="absolute bottom-3 left-3 right-3">
                                            <h3 className="text-white font-semibold mb-1">{site.name[currentLocale]}</h3>
                                            <p className="text-white/80 text-xs flex items-center gap-1">
                                                <MapPin size={12} />
                                                {site.location.city[currentLocale]}, {site.location.governorate[currentLocale]}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <p className="text-theme-text/70 text-sm line-clamp-2">
                                            {site.description[currentLocale].substring(0, 100)}...
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {eraSites.length > 6 && (
                            <div className="text-center mt-8">
                                <button
                                    onClick={() => router.push('/sites')}
                                    className="inline-flex items-center gap-2 bg-theme-primary hover:bg-theme-secondary text-white px-6 py-3 rounded-lg transition-colors"
                                >
                                    {t('sections.archaeologicalSites.viewAllButton', { eraName: era.name[currentLocale] })}
                                    <ArrowUpRight size={18} />
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Dynasties Section */}
                {era.dynasties && era.dynasties.length > 0 && (
                    <div className="mt-16">
                        <div className="mb-8">
                            <h2 className="text-2xl sm:text-3xl font-semibold text-theme-text mb-3">
                                {t('sections.dynasties.title')}
                            </h2>
                            <p className="text-theme-text/70">
                                {t('sections.dynasties.description', { eraName: era.name[currentLocale] })}
                            </p>
                        </div>

                        <div className="space-y-8">
                            {era.dynasties.map((dynasty) => (
                                <div
                                    key={dynasty.id}
                                    className="bg-theme-card border border-theme-border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                        {/* Image */}
                                        <div className="relative h-64 lg:h-auto overflow-hidden">
                                            <img
                                                src={dynasty.imageUrl}
                                                alt={dynasty.name[currentLocale]}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-theme-primary rounded-full text-white text-sm font-semibold mb-2">
                                                    <Calendar size={14} />
                                                    <span>{dynasty.period[currentLocale]}</span>
                                                </div>
                                                <h3 className="text-white text-lg sm:text-xl font-bold">{dynasty.name[currentLocale]}</h3>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 lg:p-8">
                                            <p className="text-theme-text/80 leading-relaxed mb-6">
                                                {dynasty.description[currentLocale]}
                                            </p>

                                            {/* Notable Rulers */}
                                            {dynasty.notableRulers && dynasty.notableRulers.length > 0 && (
                                                <div className="mb-6">
                                                    <h4 className="text-base sm:text-lg font-semibold text-theme-text mb-3 flex items-center gap-2">
                                                        <div className="p-2 bg-theme-primary rounded-lg">
                                                            <Sparkles className="text-white" size={18} />
                                                        </div>
                                                        {t("hero.notableRulers")}
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {dynasty.notableRulers.map((ruler, idx) => (
                                                            <span
                                                                key={idx}
                                                                className={`px-3 py-1.5 ${era.color.secondary} border ${era.color.badge.split(' ').slice(-1)[0]} rounded-full text-sm text-theme-text`}
                                                            >
                                                                {ruler[currentLocale]}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Key Achievements */}
                                            {dynasty.keyAchievements && dynasty.keyAchievements.length > 0 && (
                                                <div>
                                                    <h4 className="text-base sm:text-lg font-semibold text-theme-text mb-3 flex items-center gap-2">
                                                        <div className="p-2 bg-theme-primary rounded-lg">
                                                            <Building2 className="text-white" size={18} />
                                                        </div>
                                                        {t("hero.keyAchievements")}
                                                    </h4>
                                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                        {dynasty.keyAchievements.map((achievement, idx) => (
                                                            <li key={idx} className="flex items-start gap-2 text-sm text-theme-text/80">
                                                                <div className="p-0.5 bg-theme-primary rounded-full mt-1.5 flex-shrink-0">
                                                                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                                                                </div>
                                                                <span>{achievement[currentLocale]}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}