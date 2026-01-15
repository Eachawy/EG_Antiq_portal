'use client';

import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { MapPin, Clock, Info, Calendar, ExternalLink, ArrowLeft, BookOpen, Heart, AlertCircle, Map } from 'lucide-react';
import { ImageGallery } from './components/ImageGallery';
import { useFavorites } from '../../../../components/auth/FavoriteContext';
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { LoginModal } from '@/components/auth/LoginModal';
import { monumentEndpoints, historyEndpoints, favoriteEndpoints } from '@/lib/api/endpoints';
import { Monument } from '@/lib/api/types/monuments.dto';
import { getMonumentImageUrl, getMonumentGalleryUrls } from '@/lib/utils/monument-mapper';

export default function SiteDetailsPage() {
    const { siteId, locale } = useParams();
    const t = useTranslations('siteDetails');
    const tCommon = useTranslations('sites.common');
    const tSites = useTranslations('sites.filters');
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    // API state
    const [monument, setMonument] = useState<Monument | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isFavorited, setIsFavorited] = useState(false);
    const [favoriteId, setFavoriteId] = useState<string | null>(null);

    // Fetch monument data
    useEffect(() => {
        const fetchMonument = async () => {
            if (!siteId) return;

            setLoading(true);
            setError(null);
            try {
                const data = await monumentEndpoints.getById(parseInt(siteId as string));
                setMonument(data);

                // Track visit if authenticated (non-blocking)
                if (isAuthenticated) {
                    try {
                        await historyEndpoints.trackVisit(data.id);
                    } catch (err) {
                        console.error('Failed to track visit:', err);
                    }
                }

                // Check if monument is favorited
                if (isAuthenticated) {
                    try {
                        const favStatus = await favoriteEndpoints.check(data.id);
                        setIsFavorited(favStatus.isFavorited);
                        setFavoriteId(favStatus.favoriteId || null);
                    } catch (err) {
                        console.error('Failed to check favorite status:', err);
                    }
                }
            } catch (err: any) {
                setError(err.message || 'Failed to load monument');
                console.error('Failed to fetch monument:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMonument();
    }, [siteId, isAuthenticated]);

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-theme-bg flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-theme-primary mx-auto mb-4"></div>
                    <p className="text-theme-text">Loading monument details...</p>
                </div>
            </div>
        );
    }

    // Error or not found
    if (error || !monument) {
        return (
            <div className="min-h-screen bg-theme-bg flex items-center justify-center">
                <div className="text-center p-8 bg-theme-card border border-theme-border rounded-xl shadow-2xl max-w-md mx-4">
                    <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-theme-text mb-2">{t('notFound.title')}</h2>
                    <p className="text-theme-text/70 mb-6">{error || 'The monument you requested could not be found.'}</p>
                    <button
                        onClick={() => router.push('/sites')}
                        className="px-6 py-2 bg-theme-primary text-white rounded-lg hover:opacity-90 transition-colors"
                    >
                        {t('notFound.backButton')}
                    </button>
                </div>
            </div>
        );
    }

    // Get monument data
    const name = locale === 'ar' ? monument.monumentNameAr : monument.monumentNameEn;
    const description = monument.monumentDescriptions && monument.monumentDescriptions.length > 0
        ? locale === 'ar' ? monument.monumentDescriptions[0].descriptionAr : monument.monumentDescriptions[0].descriptionEn
        : '';
    const mainImage = getMonumentImageUrl(monument);
    const galleryImages = getMonumentGalleryUrls(monument);

    // Get era and dynasty info
    const eraName = monument.monumentEras && monument.monumentEras.length > 0
        ? locale === 'ar' ? monument.monumentEras[0].era?.nameAr : monument.monumentEras[0].era?.nameEn
        : '';
    const dynastyName = monument.dynasty
        ? locale === 'ar' ? monument.dynasty.nameAr : monument.dynasty.nameEn
        : '';

    const formatYear = (year: number) => {
        if (!year || year === 0) return '';
        if (year < 0) {
            return `${Math.abs(year)} ${tCommon('bc')}`;
        } else {
            return `${year} ${tCommon('ad')}`;
        }
    };

    const handleFavoriteToggle = async () => {
        if (!isAuthenticated) {
            setIsLoginModalOpen(true);
            return;
        }

        try {
            if (isFavorited && favoriteId) {
                await favoriteEndpoints.remove(favoriteId);
                setIsFavorited(false);
                setFavoriteId(null);
            } else {
                const favorite = await favoriteEndpoints.add(monument.id);
                setIsFavorited(true);
                setFavoriteId(favorite.id);
            }
        } catch (err) {
            console.error('Failed to toggle favorite:', err);
        }
    };

    return (
        <div className="min-h-screen bg-theme-bg">
            {/* Full-Width Hero Image */}
            <div className="relative h-[60vh] md:h-[70vh] w-full mb-12">
                <img src={mainImage} alt={name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* Back Button - Positioned over hero */}
                <button
                    onClick={() => router.push('/sites')}
                    className="absolute top-24 md:top-28 left-6 md:left-12 text-white hover:text-theme-primary transition-colors flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    {t('buttons.back')}
                </button>

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 right-0">
                    <div className="container mx-auto px-6 md:px-12 pb-8 md:pb-12">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 drop-shadow-md">
                            {name}
                        </h1>
                        <div className="flex flex-wrap gap-3 md:gap-4">
                            {eraName && (
                                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm">
                                    {eraName}
                                </span>
                            )}
                            {monument.locationDescriptionEn && (
                                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm flex items-center gap-2">
                                    <MapPin size={16} />
                                    {locale === 'ar' ? monument.locationDescriptionAr : monument.locationDescriptionEn}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Description */}
                            <div className="bg-theme-card border border-theme-border rounded-xl p-8">
                                <h3 className="text-theme-primary mb-4 flex items-center gap-2">
                                    <Info size={24} />
                                    {t('sections.description')}
                                </h3>
                                {description ? (
                                    <p className="text-theme-text leading-relaxed mb-6">{description}</p>
                                ) : (
                                    <p className="text-theme-text/70 italic">{t('labels.noDescription')}</p>
                                )}

                                {monument.oldName && (
                                    <div className="mt-4">
                                        <h4 className="text-theme-primary mb-2">Old Name</h4>
                                        <p className="text-theme-text/80">{monument.oldName}</p>
                                    </div>
                                )}

                                {monument.otherName && (
                                    <div className="mt-4">
                                        <h4 className="text-theme-primary mb-2">Other Names</h4>
                                        <p className="text-theme-text/80">{monument.otherName}</p>
                                    </div>
                                )}
                            </div>

                            {/* Image Gallery with Slider */}
                            {galleryImages.length > 0 && (
                                <ImageGallery images={galleryImages} siteName={name} />
                            )}

                            {/* Sources */}
                            {monument.monumentSources && monument.monumentSources.length > 0 && (
                                <div className="bg-theme-card border border-theme-border rounded-xl p-8">
                                    <h3 className="text-theme-primary mb-4 flex items-center gap-2">
                                        <ExternalLink size={24} />
                                        {t('sections.sources')}
                                    </h3>
                                    <div className="bg-theme-bg p-4 rounded-lg border border-theme-border">
                                        <p className="text-theme-text text-sm italic mb-3">
                                            {t('labels.reliableSources')}
                                        </p>
                                        <div className="space-y-3">
                                            {monument.monumentSources.map((ms) => (
                                                <div key={ms.id} className="p-4 bg-theme-accent rounded-lg hover:bg-theme-accent/70 transition-colors">
                                                    <div className="text-theme-text mb-1">
                                                        {locale === 'ar' ? ms.source?.nameAr : ms.source?.nameEn}
                                                    </div>
                                                    {ms.source?.descriptionEn && (
                                                        <p className="text-theme-muted text-sm mb-2">
                                                            {locale === 'ar' ? ms.source.descriptionAr : ms.source.descriptionEn}
                                                        </p>
                                                    )}
                                                    {ms.source?.url && (
                                                        <a
                                                            href={ms.source.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-theme-primary hover:text-theme-secondary text-sm flex items-center gap-1"
                                                        >
                                                            {ms.source.url} <ExternalLink size={12} />
                                                        </a>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Related Books */}
                            {monument.monumentBooks && monument.monumentBooks.length > 0 && (
                                <div className="bg-theme-card border border-theme-border rounded-xl p-8">
                                    <h3 className="text-theme-primary mb-4 flex items-center gap-2">
                                        <BookOpen size={24} />
                                        {t('sections.relatedBooks')}
                                    </h3>
                                    <p className="text-theme-muted text-sm mb-6">
                                        {t('labels.furtherReading')}
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                        {monument.monumentBooks.map((mb) => (
                                            <div key={mb.id} className="bg-theme-accent rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
                                                {mb.book?.imageUrl && (
                                                    <div className="aspect-[3/4] overflow-hidden">
                                                        <img
                                                            src={mb.book.imageUrl}
                                                            alt={locale === 'ar' ? mb.book.titleAr : mb.book.titleEn}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    </div>
                                                )}
                                                <div className="p-4">
                                                    <h4 className="text-theme-text mb-2 line-clamp-2">
                                                        {locale === 'ar' ? mb.book?.titleAr : mb.book?.titleEn}
                                                    </h4>
                                                    {mb.book?.authorEn && (
                                                        <p className="text-theme-muted text-sm mb-1">
                                                            {locale === 'ar' ? mb.book.authorAr : mb.book.authorEn}
                                                        </p>
                                                    )}
                                                    {mb.book?.publishYear && (
                                                        <p className="text-theme-muted text-xs mb-3">
                                                            {mb.book.publishYear}
                                                        </p>
                                                    )}
                                                    <a
                                                        href={`https://www.google.com/search?q=${encodeURIComponent((locale === 'ar' ? mb.book?.titleAr : mb.book?.titleEn) + ' book')}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 px-4 py-2 bg-theme-primary/10 hover:bg-theme-primary hover:text-white text-theme-primary rounded-lg text-sm font-medium transition-all duration-300 group"
                                                    >
                                                        <span>{t('buttons.findBook')}</span>
                                                        <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                                    </a>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Favorite Button */}
                            <div className="bg-theme-card border border-theme-border rounded-xl p-6">
                                <h3 className="text-theme-text font-bold mb-4">{t('sections.favorite')}</h3>
                                <button
                                    onClick={handleFavoriteToggle}
                                    className={`w-full p-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 border-2 ${isFavorited
                                        ? 'bg-theme-primary/10 border-theme-primary text-theme-primary hover:bg-theme-primary/20'
                                        : 'bg-theme-accent hover:bg-theme-primary/10 border-theme-border hover:border-theme-primary text-theme-text'
                                        }`}
                                >
                                    {isFavorited ? (
                                        <>
                                            <Heart className="w-5 h-5 mr-2 fill-theme-primary" />
                                            <span className="font-medium">{t('buttons.removeFromFavorites')}</span>
                                        </>
                                    ) : (
                                        <>
                                            <Heart className="w-5 h-5 mr-2" />
                                            <span className="font-medium">{t('buttons.addToFavorites')}</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Quick Info */}
                            <div className="bg-theme-card border border-theme-border rounded-xl p-6">
                                <h3 className="text-theme-text font-bold mb-4">{t('sections.quickInfo')}</h3>

                                <div className="space-y-4">
                                    {monument.locationDescriptionEn && (
                                        <div>
                                            <label className="text-theme-muted text-xs uppercase tracking-wider">{t('labels.location')}</label>
                                            <p className="text-theme-text flex items-center gap-2 mt-1">
                                                <MapPin size={16} className="text-theme-primary" />
                                                {locale === 'ar' ? monument.locationDescriptionAr : monument.locationDescriptionEn}
                                            </p>
                                        </div>
                                    )}

                                    {eraName && (
                                        <div>
                                            <label className="text-theme-muted text-xs uppercase tracking-wider">{t('labels.period')}</label>
                                            <p className="text-theme-text mt-1">{eraName}</p>
                                        </div>
                                    )}

                                    {dynastyName && (
                                        <div>
                                            <label className="text-theme-muted text-xs uppercase tracking-wider">{tSites('dynasty')}</label>
                                            <p className="text-theme-text mt-1">{dynastyName}</p>
                                        </div>
                                    )}

                                    {monument.monumentType && (
                                        <div>
                                            <label className="text-theme-muted text-xs uppercase tracking-wider">{tSites('type')}</label>
                                            <p className="text-theme-text mt-1">
                                                {locale === 'ar' ? monument.monumentType.nameAr : monument.monumentType.nameEn}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Timeline */}
                            {(monument.startDate || monument.endDate) && (
                                <div className="bg-theme-card border border-theme-border rounded-xl p-6">
                                    <h3 className="text-theme-primary mb-4 flex items-center gap-2">
                                        <Calendar size={20} />
                                        {t('sections.timeline')}
                                    </h3>

                                    <div className="relative">
                                        {/* Timeline Bar */}
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-theme-primary/30"></div>

                                        <div className="space-y-6 ml-6">
                                            {monument.startDate && (
                                                <div className="relative">
                                                    <div className="absolute -left-[30px] top-0 w-4 h-4 rounded-full bg-theme-primary border-4 border-theme-bg"></div>
                                                    <div>
                                                        <div className="text-theme-primary text-sm mb-1">{t('labels.startPeriod')}</div>
                                                        <div className="text-theme-text">{formatYear(Number(monument.startDate))}</div>
                                                    </div>
                                                </div>
                                            )}

                                            {monument.endDate && (
                                                <div className="relative">
                                                    <div className="absolute -left-[30px] top-0 w-4 h-4 rounded-full bg-theme-secondary border-4 border-theme-bg"></div>
                                                    <div>
                                                        <div className="text-theme-primary text-sm mb-1">{t('labels.endPeriod')}</div>
                                                        <div className="text-theme-text">{formatYear(Number(monument.endDate))}</div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Google Map */}
                            {monument.locationLat && monument.locationLong && (
                                <div className="bg-theme-card border border-theme-border rounded-xl p-6">
                                    <h3 className="text-theme-text font-bold mb-4">{t('sections.locationMap')}</h3>

                                    <div className="rounded-lg overflow-hidden h-64 border border-theme-border relative">
                                        {/* Embedded Map or Placeholder */}
                                        <div className="w-full h-full bg-theme-bg flex items-center justify-center relative group">
                                            <div className={`absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/${monument.locationLong},${monument.locationLat},9,0/600x400')] bg-cover bg-center opacity-50 grayscale group-hover:grayscale-0 transition-all duration-500`}></div>
                                            <div className="z-10 text-center">
                                                <Map size={32} className="text-theme-primary mx-auto mb-2" />
                                                <p className="text-theme-text font-medium">{t('labels.interactiveMap')}</p>
                                                <a
                                                    href={`https://www.google.com/maps?q=${monument.locationLat},${monument.locationLong}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mt-2 px-4 py-1.5 bg-theme-primary/90 text-white text-sm rounded-lg hover:bg-theme-primary transition-colors inline-flex items-center gap-2"
                                                >
                                                    <span>{t('buttons.openMap')}</span>
                                                    <ExternalLink size={14} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Login Modal */}
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        </div>
    );
}