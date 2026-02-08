'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { History as HistoryIcon, Clock, Eye, MapPin, Trash2, Search, Compass } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { ImageWithFallback } from '../books/components/ImageWithFallback';
import { formatDateTime } from '@/lib/utils/utils';
import { historyEndpoints } from '@/lib/api/endpoints';
import { BrowsingHistoryEntry, BrowsingHistoryStats } from '@/lib/api/types/history.dto';
import { getImageUrl } from '@/lib/utils/image-url';
import { type Locale } from '@/i18n/config';
import { buildMonumentUrl } from '@/lib/utils/monument-url';

export default function HistoryPage() {
    const { isAuthenticated, user } = useAuth();
    const router = useRouter();
    const params = useParams();
    const locale = (params.locale as Locale) || 'en';
    const [searchTerm, setSearchTerm] = useState('');
    const toastRef = useRef<Toast>(null);

    // API state
    const [history, setHistory] = useState<BrowsingHistoryEntry[]>([]);
    const [stats, setStats] = useState<BrowsingHistoryStats | null>(null);
    const [loading, setLoading] = useState(true);

    // Redirect if not authenticated
    useEffect(() => {
        if (!isAuthenticated || !user) {
            router.push('/');
        }
    }, [isAuthenticated, user, router]);

    // Fetch browsing history
    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchHistory = async () => {
            setLoading(true);
            try {
                const [historyData, statsData] = await Promise.all([
                    historyEndpoints.getAll(1, 0), // 0 = no pagination, get all
                    historyEndpoints.getStats().catch(() => null), // Stats might fail, that's ok
                ]);
                setHistory(historyData.data || []);
                if (statsData) {
                    setStats(statsData);
                }
            } catch (err: any) {
                console.error('Failed to fetch browsing history:', err);
                toastRef.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: err.message || 'Failed to load history',
                    life: 3000,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [isAuthenticated]);

    if (!isAuthenticated || !user) {
        return null;
    }

    const getMonumentName = (entry: BrowsingHistoryEntry): string => {
        if (!entry.monument) return 'Unknown Monument';
        return locale === 'ar'
            ? entry.monument.monumentNameAr || entry.monument.monumentNameEn || 'Unknown Monument'
            : entry.monument.monumentNameEn || entry.monument.monumentNameAr || 'Unknown Monument';
    };

    const getMonumentLocation = (entry: BrowsingHistoryEntry): string => {
        if (!entry.monument) return '';
        if (entry.monument.lat && entry.monument.lng) {
            return `Lat: ${entry.monument.lat}, Lng: ${entry.monument.lng}`;
        }
        return '';
    };

    const getMonumentPeriod = (entry: BrowsingHistoryEntry): string => {
        if (!entry.monument) return '';
        const era = entry.monument.era;
        const dynasty = entry.monument.dynasty;
        if (era) {
            return locale === 'ar' ? (era.nameAr || era.nameEn || '') : (era.nameEn || era.nameAr || '');
        }
        if (dynasty) {
            return locale === 'ar' ? (dynasty.nameAr || dynasty.nameEn || '') : (dynasty.nameEn || dynasty.nameAr || '');
        }
        return '';
    };

    const getMonumentSlug = (entry: BrowsingHistoryEntry): string => {
        if (!entry.monument) return '';
        return locale === 'ar'
            ? (entry.monument.slugAr || '')
            : (entry.monument.slugEn || '');
    };
    const getMonumentImage = (entry: BrowsingHistoryEntry): string => {
        if (!entry.monument) return '';
        const imagePath = entry.monument.image || entry.monument.galleries?.[0]?.galleryPath || '';
        return getImageUrl(imagePath);
    };

    const filteredHistory = history.filter((item) => {
        const name = getMonumentName(item).toLowerCase();
        const location = getMonumentLocation(item).toLowerCase();
        const period = getMonumentPeriod(item).toLowerCase();
        const search = searchTerm.toLowerCase();
        return name.includes(search) || location.includes(search) || period.includes(search);
    });

    const formatDuration = (seconds?: number) => {
        if (!seconds) return 'N/A';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) {
            return `${minutes} min`;
        } else {
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            return `${hours}h ${remainingMinutes}m`;
        }
    };

    const handleDeleteEntry = async (entryId: string, monumentName: string) => {
        try {
            await historyEndpoints.deleteEntry(entryId);
            setHistory(prev => prev.filter(h => h.id !== entryId));
            toastRef.current?.show({
                severity: 'success',
                summary: 'Deleted',
                detail: `Removed "${monumentName}" from history`,
                life: 3000,
            });
        } catch (err: any) {
            toastRef.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: err.message || 'Failed to delete entry',
                life: 3000,
            });
        }
    };

    const handleClearAll = async () => {
        if (!window.confirm('Are you sure you want to clear all your browsing history? This action cannot be undone.')) {
            return;
        }

        try {
            const result = await historyEndpoints.clearAll();
            setHistory([]);
            toastRef.current?.show({
                severity: 'success',
                summary: 'Cleared',
                detail: `Deleted ${result.deletedCount} history entries`,
                life: 3000,
            });
        } catch (err: any) {
            toastRef.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: err.message || 'Failed to clear history',
                life: 3000,
            });
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-theme-bg flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-theme-primary mx-auto mb-4"></div>
                    <p className="text-theme-text">Loading browsing history...</p>
                </div>
            </div>
        );
    }

    // Get unique periods count
    const uniquePeriods = new Set(history.map(h => getMonumentPeriod(h)).filter(Boolean));

    return (
        <div className="min-h-screen bg-theme-bg pt-20">
            <Toast ref={toastRef} />

            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-theme-primary/20 via-theme-accent to-theme-secondary/20 py-16 border-b border-theme-border">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-theme-card rounded-2xl shadow-lg">
                                <HistoryIcon size={48} className="text-theme-primary" />
                            </div>
                        </div>
                        <h1 className="text-theme-text mb-4">Browsing History</h1>
                        <p className="text-theme-muted text-lg max-w-2xl mx-auto">
                            Track your exploration journey through Ancient Egyptian archaeological sites
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-8">
                    <span className="p-input-icon-left w-full">
                        <Search size={20} className="text-theme-muted" />
                        <InputText
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search your history..."
                            className="w-full bg-theme-card border-theme-border text-theme-text placeholder:text-theme-muted"
                        />
                    </span>
                </div>

                {/* Stats */}
                <div className="max-w-4xl mx-auto mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-theme-primary/10 to-theme-primary/5 border border-theme-primary/20 rounded-xl p-6 text-center">
                            <div className="text-3xl font-bold text-theme-primary mb-2">
                                {stats?.totalVisits || history.length}
                            </div>
                            <div className="text-theme-muted text-sm">Total Visits</div>
                        </div>
                        <div className="bg-gradient-to-br from-theme-secondary/10 to-theme-secondary/5 border border-theme-secondary/20 rounded-xl p-6 text-center">
                            <div className="text-3xl font-bold text-theme-secondary mb-2">
                                {stats?.uniqueMonumentsVisited || new Set(history.map(h => h.monumentId)).size}
                            </div>
                            <div className="text-theme-muted text-sm">Unique Monuments</div>
                        </div>
                        <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 rounded-xl p-6 text-center">
                            <div className="text-3xl font-bold text-amber-700 dark:text-amber-500 mb-2">
                                {uniquePeriods.size}
                            </div>
                            <div className="text-theme-muted text-sm">Periods Explored</div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                {history.length > 0 && (
                    <div className="max-w-4xl mx-auto mb-8 flex justify-end">
                        <Button
                            severity="danger"
                            outlined
                            onClick={handleClearAll}
                            className="border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 dark:hover:bg-red-500/20 dark:hover:border-red-400 transition-all duration-300 rounded-xl"
                        >
                            <div className="flex items-center gap-2 px-2 py-1">
                                <Trash2 size={18} />
                                <span className="font-medium">Clear All History</span>
                            </div>
                        </Button>
                    </div>
                )}

                {/* History List */}
                {filteredHistory.length > 0 ? (
                    <div className="max-w-4xl mx-auto space-y-4">
                        {filteredHistory.map((item, index) => {
                            const monumentName = getMonumentName(item);
                            const monumentLocation = getMonumentLocation(item);
                            const monumentPeriod = getMonumentPeriod(item);
                            const monumentImage = getMonumentImage(item);
                            const monumentSlug = getMonumentSlug(item);

                            return (
                                <div
                                    key={item.id}
                                    className="group bg-gradient-to-br from-theme-card to-theme-card/50 border border-theme-border rounded-2xl overflow-hidden hover:shadow-2xl hover:border-theme-primary/40 transition-all duration-500"
                                    style={{
                                        animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                                    }}
                                >
                                    <div className="flex flex-col sm:flex-row gap-4 p-4">
                                        {/* Thumbnail */}
                                        <div className="relative w-full sm:w-48 h-32 rounded-xl overflow-hidden flex-shrink-0">
                                            <ImageWithFallback
                                                src={monumentImage}
                                                alt={monumentName}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                            {monumentPeriod && (
                                                <div className="absolute top-2 left-2 bg-gradient-to-r from-theme-primary to-theme-secondary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                                                    {monumentPeriod}
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-xl font-bold text-theme-text mb-2 group-hover:text-theme-primary transition-colors">
                                                    {monumentName}
                                                </h3>
                                                <div className="flex items-center gap-4 text-sm text-theme-muted mb-3 flex-wrap">
                                                    {monumentLocation && (
                                                        <div className="flex items-center gap-1.5">
                                                            <MapPin size={16} className="text-theme-primary" />
                                                            <span>{monumentLocation}</span>
                                                        </div>
                                                    )}
                                                    <div className="flex items-center gap-1.5">
                                                        <Clock size={16} className="text-theme-secondary" />
                                                        <span>{formatDateTime(item.visitedAt)}</span>
                                                    </div>
                                                    {item.durationSeconds && (
                                                        <div className="flex items-center gap-1.5">
                                                            <Eye size={16} className="text-amber-600" />
                                                            <span>{formatDuration(item.durationSeconds)}</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between gap-3">
                                                <Button
                                                    label="Visit Again"
                                                    size="small"
                                                    onClick={() => router.push(buildMonumentUrl(item.monumentId, item.monument?.slugEn, item.monument?.slugAr, locale))}
                                                    className="bg-gradient-to-r from-theme-primary to-theme-secondary border-0 hover:shadow-lg hover:scale-105 transition-all h-9"
                                                />
                                                <button
                                                    onClick={() => handleDeleteEntry(item.id, monumentName)}
                                                    className="opacity-0 group-hover:opacity-100 transition-all duration-300 h-10 w-10 rounded-full bg-red-500/10 hover:bg-red-500 border border-red-500/30 hover:border-red-500 flex items-center justify-center text-red-600 hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-red-500/30"
                                                    aria-label="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="max-w-md mx-auto text-center py-16">
                        <div className="bg-theme-card border border-theme-border rounded-2xl p-12">
                            <HistoryIcon size={64} className="text-theme-muted mx-auto mb-4 opacity-50" />
                            <h3 className="text-theme-text text-xl mb-2">
                                {searchTerm ? 'No Results Found' : 'No History Yet'}
                            </h3>
                            <p className="text-theme-muted mb-6">
                                {searchTerm
                                    ? 'Try adjusting your search terms'
                                    : 'Start exploring archaeological sites to build your history'}
                            </p>
                            {!searchTerm && (
                                <Button
                                    onClick={() => router.push('/sites')}
                                    className="bg-theme-primary hover:bg-theme-secondary border-0"
                                >
                                    <div className="flex items-center gap-2">
                                        <Compass size={16} />
                                        <span>Explore Sites</span>
                                    </div>
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </div>
    );
}
