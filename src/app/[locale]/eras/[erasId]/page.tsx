'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { ArrowLeft, Calendar, MapPin, Building2, Sparkles, BookOpen, Heart, Clock, Landmark, ArrowUpRight, AlertCircle } from 'lucide-react';
import { type Locale } from '@/i18n/config';
import { eraEndpoints } from '@/lib/api/endpoints';
import { Era, Monument } from '@/lib/api/types/monuments.dto';
import { getImageUrl } from '@/lib/utils/image-url';
import { getEraById } from '../../HomePage-Components/data/erasData';

export default function EraDetailsPage() {
    const params = useParams();
    const currentLocale = (params.locale as Locale) || 'en';
    const erasId = params.erasId;
    const t = useTranslations('era');
    const tCommon = useTranslations('common');
    const router = useRouter();

    const [era, setEra] = useState<Era | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Get mock era data for detailed content (historical context, etc.)
    const mockEra = erasId ? getEraById(erasId as string) : undefined;

    // Map string IDs to database numeric IDs
    const getNumericEraId = (id: string): number | null => {
        const idMap: Record<string, number> = {
            'pharaonic': 1,        // Ancient Egypt
            'greco-roman': 2,      // Ptolemaic
            'ptolemaic': 2,        // Ptolemaic
            'roman': 3,            // Roman
            'byzantine': 4,        // Byzantine
            'islamic': 5,          // Islamic
        };

        // First try to parse as number
        const numId = parseInt(id, 10);
        if (!isNaN(numId)) {
            return numId;
        }

        // Then check the mapping
        return idMap[id.toLowerCase()] || null;
    };

    useEffect(() => {
        const fetchEra = async () => {
            if (!erasId) return;

            try {
                setLoading(true);
                setError(null);

                // Get numeric era ID
                const eraIdNum = getNumericEraId(erasId as string);
                if (!eraIdNum) {
                    setError('Invalid era ID');
                    return;
                }

                const data = await eraEndpoints.getById(eraIdNum);
                setEra(data);
            } catch (err: any) {
                console.error('Failed to fetch era:', err);
                setError(err?.message || 'Failed to load era details');
            } finally {
                setLoading(false);
            }
        };

        fetchEra();
    }, [erasId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-theme-bg flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-theme-primary mx-auto mb-4"></div>
                    <p className="text-theme-text/70">Loading era details...</p>
                </div>
            </div>
        );
    }

    if (error || !era || !mockEra) {
        return (
            <div className="min-h-screen bg-theme-bg flex items-center justify-center">
                <div className="text-center p-8 bg-theme-card border border-theme-border rounded-xl shadow-2xl max-w-md mx-4">
                    <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-theme-text mb-2">{t('notFound.title')}</h2>
                    <p className="text-theme-text/70 mb-6">{error || t('notFound.description')}</p>
                    <button
                        onClick={() => router.push('/')}
                        className="mt-6 px-6 py-2 bg-theme-primary text-white rounded-lg hover:opacity-70 transition-colors"
                    >
                        {t('notFound.backButton')}
                    </button>
                </div>
            </div>
        );
    }

    // Get monuments from API data
    const eraSites = era.monuments || [];

    return (
        <div className="min-h-screen bg-theme-bg">
            {/* Full-Width Hero Section */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                    <img
                        src={mockEra.imageUrl}
                        alt={currentLocale === 'ar' ? era.nameAr : era.nameEn}
                        className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${mockEra.color.primary} opacity-70`}></div>
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
                                {t('hero.title', { eraName: mockEra.name[currentLocale] })}
                            </h1>

                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
                                    <Calendar size={16} />
                                    <span className="font-semibold">{mockEra.period[currentLocale]}</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
                                    <Clock size={16} />
                                    <span className="font-semibold">
                                        {t('hero.duration', { years: Math.abs(mockEra.timeline.end - mockEra.timeline.start) })}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
                                    <Landmark size={16} />
                                    <span className="font-semibold">{t('hero.sitesCount', { count: eraSites.length })}</span>
                                </div>
                            </div>

                            <p className="text-base md:text-lg text-white/95 leading-relaxed max-w-3xl description-era">
                                {mockEra.fullDescription[currentLocale]}
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
                                {mockEra.historicalContext[currentLocale]}
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
                                {mockEra.culturalSignificance[currentLocale]}
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
                                {mockEra.architecturalStyle[currentLocale]}
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
                                {mockEra.religiousBeliefs[currentLocale]}
                            </p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Key Characteristics */}
                        <div className="bg-theme-card border border-theme-border rounded-2xl p-6 shadow-lg">
                            <h3 className="text-base sm:text-lg font-semibold text-theme-text mb-4">{t('sections.keyCharacteristics.title')}</h3>
                            <ul className="space-y-3">
                                {mockEra.keyCharacteristics.map((characteristic, index) => (
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
                                {mockEra.notableSites.map((site, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <MapPin size={16} className={`text-theme-primary mt-0.5 flex-shrink-0`} />
                                        <span className="text-sm text-theme-text/80">{site[currentLocale]}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Related Archaeological Sites - Now Dynamic from API */}
                {eraSites.length > 0 && (
                    <div>
                        <div className="mb-8">
                            <h2 className="text-2xl sm:text-3xl font-semibold text-theme-text mb-3">
                                {t('sections.archaeologicalSites.title', { eraName: currentLocale === 'ar' ? era.nameAr : era.nameEn })}
                            </h2>
                            <p className="text-theme-text/70">
                                {t('sections.archaeologicalSites.description', { count: eraSites.length })}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {eraSites.map((monument: Monument) => {
                                // Get first gallery image
                                const imageUrl = monument.galleries && monument.galleries.length > 0
                                    ? getImageUrl(monument.galleries[0].galleryPath)
                                    : monument.image
                                        ? getImageUrl(monument.image)
                                        : '/placeholder-monument.jpg';

                                const monumentName = currentLocale === 'ar' ? monument.monumentNameAr : monument.monumentNameEn;
                                const monumentDescription = currentLocale === 'ar' ? monument.monumentBiographyAr : monument.monumentBiographyEn;

                                return (
                                    <div
                                        key={monument.id}
                                        onClick={() => router.push(`/sites/${monument.id}`)}
                                        className="group cursor-pointer bg-theme-card border border-theme-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300"
                                    >
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={imageUrl}
                                                alt={monumentName}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                            <div className="absolute bottom-3 left-3 right-3">
                                                <h3 className="text-white font-semibold mb-1 line-clamp-1">{monumentName}</h3>
                                                {monument.monumentType && (
                                                    <p className="text-white/80 text-xs flex items-center gap-1">
                                                        <Building2 size={12} />
                                                        {currentLocale === 'ar' ? monument.monumentType.nameAr : monument.monumentType.nameEn}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="p-4">
                                            <p className="text-theme-text/70 text-sm line-clamp-2">
                                                {monumentDescription ? (monumentDescription.length > 100 ? monumentDescription.substring(0, 100) + '...' : monumentDescription) : 'No description available'}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {eraSites.length >= 6 && (
                            <div className="text-center mt-8">
                                <button
                                    onClick={() => router.push(`/sites?period=${era.id}`)}
                                    className="inline-flex items-center gap-2 bg-theme-primary hover:bg-theme-secondary text-white px-6 py-3 rounded-lg transition-colors"
                                >
                                    {t('sections.archaeologicalSites.viewAllButton', { eraName: currentLocale === 'ar' ? era.nameAr : era.nameEn })}
                                    <ArrowUpRight size={18} />
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Dynasties Section */}
                {mockEra.dynasties && mockEra.dynasties.length > 0 && (
                    <div className="mt-16">
                        <div className="mb-8">
                            <h2 className="text-2xl sm:text-3xl font-semibold text-theme-text mb-3">
                                {t('sections.dynasties.title')}
                            </h2>
                            <p className="text-theme-text/70">
                                {t('sections.dynasties.description', { eraName: currentLocale === 'ar' ? era.nameAr : era.nameEn })}
                            </p>
                        </div>

                        <div className="space-y-8">
                            {mockEra.dynasties.map((dynasty) => (
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
                                        <div className="p-6 sm:p-8 flex flex-col justify-center">
                                            <p className="text-theme-text/80 mb-4 leading-relaxed">
                                                {dynasty.description[currentLocale]}
                                            </p>
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
