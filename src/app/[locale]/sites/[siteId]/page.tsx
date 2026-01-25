'use client';

import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { MapPin, Clock, Info, Calendar, ExternalLink, ArrowLeft, BookOpen, Heart, AlertCircle, Map, Share2 } from 'lucide-react';
import { ImageGallery } from './components/ImageGallery';
import { LocationMap } from './components/LocationMap';
import { useFavorites } from '../../../../components/auth/FavoriteContext';
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState, useEffect, useRef } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { LoginModal } from '@/components/auth/LoginModal';
import { monumentEndpoints, historyEndpoints, favoriteEndpoints } from '@/lib/api/endpoints';
import { Monument } from '@/lib/api/types/monuments.dto';
import { getMonumentImageUrl, getMonumentGalleryUrls } from '@/lib/utils/monument-mapper';
import { getImageUrl } from '@/lib/utils/image-url';
import Head from 'next/head';

export default function SiteDetailsPage() {
    const { siteId, locale } = useParams();
    const t = useTranslations('siteDetails');
    const tCommon = useTranslations('sites.common');
    const tSites = useTranslations('sites.filters');
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);
    const shareMenuRef = useRef<HTMLDivElement>(null);

    // API state
    const [monument, setMonument] = useState<Monument | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isFavorited, setIsFavorited] = useState(false);
    const [favoriteId, setFavoriteId] = useState<string | null>(null);
    const [copySuccess, setCopySuccess] = useState(false);

    // Track which monument we've already logged to prevent duplicates
    const visitTrackedRef = useRef<number | null>(null);

    // Click outside handler to close share menu
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
                setShowShareMenu(false);
            }
        };

        if (showShareMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showShareMenu]);

    // Fetch monument data
    useEffect(() => {
        const fetchMonument = async () => {
            if (!siteId) return;

            setLoading(true);
            setError(null);
            try {
                const data = await monumentEndpoints.getById(parseInt(siteId as string));
                setMonument(data);

                // Track visit if authenticated (non-blocking) - only once per monument
                if (isAuthenticated && visitTrackedRef.current !== data.id) {
                    visitTrackedRef.current = data.id;
                    try {
                        await historyEndpoints.trackVisit(data.id);
                        console.log('Visit tracked for monument:', data.id);
                    } catch (err: any) {
                        // Silently fail for tracking - don't show error to user
                        console.error('Failed to track visit:', err);
                        // If 401, user is not authenticated - reset flag
                        if (err.status === 401) {
                            visitTrackedRef.current = null;
                        }
                    }
                }

                // Check if monument is favorited
                if (isAuthenticated) {
                    try {
                        const favStatus = await favoriteEndpoints.check(data.id);
                        setIsFavorited(favStatus.isFavorited);
                        setFavoriteId(favStatus.favoriteId || null);
                    } catch (err: any) {
                        // Silently fail for favorites check - don't show error to user
                        console.error('Failed to check favorite status:', err);
                        // If 401, user is not authenticated - just skip
                        if (err.status === 401) {
                            setIsFavorited(false);
                            setFavoriteId(null);
                        }
                    }
                }
            } catch (err: any) {
                // Only show error for the main monument fetch, not for auth-related failures
                const errorMessage = err.status === 401
                    ? 'Unable to load monument. Please try again.'
                    : err.message || 'Failed to load monument';
                setError(errorMessage);
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

    // Get location coordinates - API uses either lat/lng or locationLat/locationLong
    const latitude = monument.lat || monument.locationLat;
    const longitude = monument.lng || monument.locationLong;

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


    const handleShare = (platform: string) => {
        const url = window.location.href;
        const title = `${name} - KEMETRA`;

        // Get description excerpt (first 150 characters)
        const descriptionExcerpt = description
            ? description.substring(0, 150).trim() + '...'
            : '';

        // Full share text with description
        const shareText = descriptionExcerpt
            ? `${title}\n\n${descriptionExcerpt}\n\n${url}`
            : `${title}\n\n${url}`;

        let shareUrl = '';

        switch (platform) {
            case 'facebook':
                // Facebook uses Open Graph tags from the page, so just share the URL
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'twitter':
                // Twitter supports text and URL
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title + (descriptionExcerpt ? '\n\n' + descriptionExcerpt : ''))}`;
                break;
            case 'linkedin':
                // LinkedIn uses Open Graph tags, so just share the URL
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                break;
            case 'whatsapp':
                // WhatsApp supports full text with URL
                shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
                break;
            case 'telegram':
                // Telegram supports text and URL separately
                shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title + (descriptionExcerpt ? '\n\n' + descriptionExcerpt : ''))}`;
                break;
            case 'copy':
                navigator.clipboard.writeText(url).then(() => {
                    setCopySuccess(true);
                    setTimeout(() => setCopySuccess(false), 2000);
                });
                setTimeout(() => setShowShareMenu(false), 2000);
                return;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
            setShowShareMenu(false);
        }
    };


    // Prepare Open Graph data
    const ogTitle = `${name} - KEMETRA`;
    const ogDescription = description
        ? description.substring(0, 160).trim()
        : `Discover ${name}, an ancient Egyptian monument. Explore its history, location, and significance.`;
    const ogImage = mainImage.startsWith('http') ? mainImage : `${process.env.NEXT_PUBLIC_APP_URL || ''}${mainImage}`;
    const ogUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <>
            <Head>
                {/* Open Graph / Facebook */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={ogUrl} />
                <meta property="og:title" content={ogTitle} />
                <meta property="og:description" content={ogDescription} />
                <meta property="og:image" content={ogImage} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />

                {/* Twitter */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={ogUrl} />
                <meta property="twitter:title" content={ogTitle} />
                <meta property="twitter:description" content={ogDescription} />
                <meta property="twitter:image" content={ogImage} />

                <title>{ogTitle}</title>
                <meta name="description" content={ogDescription} />
            </Head>

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
                                            {monument.monumentBooks.map((mb) => {
                                                // Get book image URL with proper base URL
                                                const bookImageUrl = mb.book?.coverImage
                                                    ? getImageUrl(mb.book.coverImage)
                                                    : '/images/book-placeholder.svg';

                                                return (
                                                    <div key={mb.id} className="bg-theme-accent rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
                                                        <div className="aspect-[3/4] overflow-hidden bg-theme-bg/50">
                                                            <img
                                                                src={bookImageUrl}
                                                                alt={locale === 'ar' ? mb.book?.titleAr : mb.book?.titleEn}
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                                onError={(e) => {
                                                                    // Fallback to placeholder if image fails to load
                                                                    e.currentTarget.src = '/images/book-placeholder.svg';
                                                                }}
                                                            />
                                                        </div>
                                                        <div className="p-4">
                                                            <h4 className="text-theme-text mb-2 line-clamp-2">
                                                                {locale === 'ar' ? mb.book?.titleAr : mb.book?.titleEn}
                                                            </h4>
                                                            {mb.book?.authorEn && (
                                                                <p className="text-theme-muted text-sm mb-1">
                                                                    {locale === 'ar' ? mb.book.authorAr : mb.book.authorEn}
                                                                </p>
                                                            )}
                                                            {mb.book?.publicationYear && (
                                                                <p className="text-theme-muted text-xs mb-3">
                                                                    {mb.book.publicationYear}
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
                                                )
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                {/* Favorite Button */}
                                <div className="bg-theme-card border border-theme-border rounded-xl p-6">
                                    <h3 className="text-theme-primary font-bold mb-4">{t('sections.favorite')}</h3>
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

                                {/* Share Button */}
                                <div className="bg-theme-card border border-theme-border rounded-xl p-6">
                                    <h4 className="text-theme-primary mb-4">{t("sections.shareThisSite")}</h4>
                                    <div className="relative" ref={shareMenuRef}>
                                        <button
                                            onClick={() => setShowShareMenu(!showShareMenu)}
                                            className="w-full p-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 border-2 bg-theme-accent hover:bg-theme-primary/10 border-theme-border hover:border-theme-primary text-theme-text"
                                        >
                                            <Share2 size={20} />
                                            <span className="font-medium">{t("sections.shareOnSocialMedia")}</span>
                                        </button>

                                        {/* Share Menu Dropdown */}
                                        {showShareMenu && (
                                            <div className="absolute top-full mt-2 w-full bg-theme-card border border-theme-border rounded-lg shadow-xl z-10 overflow-hidden">
                                                <button
                                                    onClick={() => handleShare('facebook')}
                                                    className="w-full px-4 py-3 text-left hover:bg-theme-accent transition-colors flex items-center gap-3 text-theme-text"
                                                >
                                                    <div className="w-8 h-8 rounded-full bg-[#1877F2] flex items-center justify-center">
                                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                                        </svg>
                                                    </div>
                                                    <span>{t("sections.facebook")}</span>
                                                </button>

                                                <button
                                                    onClick={() => handleShare('twitter')}
                                                    className="w-full px-4 py-3 text-left hover:bg-theme-accent transition-colors flex items-center gap-3 text-theme-text"
                                                >
                                                    <div className="w-8 h-8 rounded-full bg-[#1DA1F2] flex items-center justify-center">
                                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                                        </svg>
                                                    </div>
                                                    <span>{t("sections.twitter")}</span>
                                                </button>

                                                <button
                                                    onClick={() => handleShare('linkedin')}
                                                    className="w-full px-4 py-3 text-left hover:bg-theme-accent transition-colors flex items-center gap-3 text-theme-text"
                                                >
                                                    <div className="w-8 h-8 rounded-full bg-[#0A66C2] flex items-center justify-center">
                                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                        </svg>
                                                    </div>
                                                    <span>{t("sections.linkedin")}</span>
                                                </button>

                                                <button
                                                    onClick={() => handleShare('whatsapp')}
                                                    className="w-full px-4 py-3 text-left hover:bg-theme-accent transition-colors flex items-center gap-3 text-theme-text"
                                                >
                                                    <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center">
                                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                                        </svg>
                                                    </div>
                                                    <span>{t("sections.whatsapp")}</span>
                                                </button>

                                                <button
                                                    onClick={() => handleShare('telegram')}
                                                    className="w-full px-4 py-3 text-left hover:bg-theme-accent transition-colors flex items-center gap-3 text-theme-text"
                                                >
                                                    <div className="w-8 h-8 rounded-full bg-[#0088cc] flex items-center justify-center">
                                                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                                                        </svg>
                                                    </div>
                                                    <span>{t("sections.telegram")}</span>
                                                </button>

                                                <button
                                                    onClick={() => handleShare('copy')}
                                                    className="w-full px-4 py-3 text-left hover:bg-theme-accent transition-colors flex items-center gap-3 text-theme-text border-t border-theme-border"
                                                >
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${copySuccess ? 'bg-green-500' : 'bg-theme-primary'
                                                        }`}>
                                                        {copySuccess ? (
                                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        ) : (
                                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                    <span>{copySuccess ? (locale === 'ar' ? 'تم النسخ!' : 'Copied!') : t("sections.copyLink")}</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>


                                {/* Quick Info */}
                                <div className="bg-theme-card border border-theme-border rounded-xl p-6">
                                    <h3 className="text-theme-primary font-bold mb-4">{t('sections.quickInfo')}</h3>

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

                                        {/* Registration Number - Display FIRST */}
                                        {monument.artifactRegistrationNumber && (
                                            <div>
                                                <label className="text-theme-muted text-xs uppercase tracking-wider">
                                                    {t('labels.registrationNumber')}
                                                </label>
                                                <p className="text-theme-text mt-1 font-mono">
                                                    {monument.artifactRegistrationNumber}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Timeline */}
                                {(monument.startDate || monument.endDate) && (
                                    <div className="bg-theme-card border border-theme-border rounded-xl p-6 timeline">
                                        <h3 className="text-theme-primary mb-4 flex items-center gap-2">
                                            {/* <Calendar size={20} /> */}
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
                                                            <div className="text-theme-primary text-sm mb-2">{t('labels.startPeriod')}</div>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div>
                                                                    <div className="text-theme-muted text-xs mb-1">
                                                                        {locale === 'ar' ? 'ميلادي' : 'Gregorian'}
                                                                    </div>
                                                                    <div className="text-theme-text font-medium">
                                                                        {formatYear(Number(monument.startDate))}
                                                                    </div>
                                                                </div>
                                                                {monument.startDateHijri && monument.startDateHijri !== '-' && (
                                                                    <div>
                                                                        <div className="text-theme-muted text-xs mb-1">
                                                                            {locale === 'ar' ? 'هجري' : 'Hijri'}
                                                                        </div>
                                                                        <div className="text-theme-text font-medium">
                                                                            {monument.startDateHijri}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {monument.endDate && (
                                                    <div className="relative">
                                                        <div className="absolute -left-[30px] top-0 w-4 h-4 rounded-full bg-theme-secondary border-4 border-theme-bg"></div>
                                                        <div>
                                                            <div className="text-theme-primary text-sm mb-2">{t('labels.endPeriod')}</div>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div>
                                                                    <div className="text-theme-muted text-xs mb-1">
                                                                        {locale === 'ar' ? 'ميلادي' : 'Gregorian'}
                                                                    </div>
                                                                    <div className="text-theme-text font-medium">
                                                                        {formatYear(Number(monument.endDate))}
                                                                    </div>
                                                                </div>
                                                                {monument.endDateHijri && monument.endDateHijri !== '-' && (
                                                                    <div>
                                                                        <div className="text-theme-muted text-xs mb-1">
                                                                            {locale === 'ar' ? 'هجري' : 'Hijri'}
                                                                        </div>
                                                                        <div className="text-theme-text font-medium">
                                                                            {monument.endDateHijri}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Interactive Map */}
                                {latitude && longitude && (
                                    <div className="bg-theme-card border border-theme-border rounded-xl p-6">
                                        <h3 className="text-theme-primary font-bold flex items-center gap-2 mb-4">
                                            {/* <Map size={20} className="text-theme-primary" /> */}
                                            {t('sections.locationMap')}
                                        </h3>

                                        <a
                                            href={`https://www.google.com/maps?q=${latitude},${longitude}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full mb-4 px-4 py-2.5 bg-theme-primary/10 hover:bg-theme-primary hover:text-white text-theme-primary rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2"
                                        >
                                            <ExternalLink size={16} />
                                            <span>{t('sections.openInGoogleMaps')}</span>
                                        </a>

                                        <div className="h-[300px]">
                                            <LocationMap
                                                latitude={latitude}
                                                longitude={longitude}
                                                monumentName={name}
                                            />
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
        </>
    );
}