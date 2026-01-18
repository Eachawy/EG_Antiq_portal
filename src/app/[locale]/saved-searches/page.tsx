'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { BookMarked, Search, MapPin, Calendar, Clock, Trash2, Play } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { formatDatecreatedAt } from '@/lib/utils/utils';
import { savedSearchEndpoints, eraEndpoints, dynastyEndpoints, monumentTypeEndpoints } from '@/lib/api/endpoints';
import { SavedSearch } from '@/lib/api/types/saved-searches.dto';
import { Era, Dynasty, MonumentType } from '@/lib/api/types/monuments.dto';
import { type Locale } from '@/i18n/config';

export default function SavedSearchPage() {
    const { isAuthenticated, user } = useAuth();
    const router = useRouter();
    const params = useParams();
    const locale = (params.locale as Locale) || 'en';
    const [searchTerm, setSearchTerm] = useState('');
    const toastRef = useRef<Toast>(null);

    // API state
    const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
    const [eras, setEras] = useState<Era[]>([]);
    const [dynasties, setDynasties] = useState<Dynasty[]>([]);
    const [monumentTypes, setMonumentTypes] = useState<MonumentType[]>([]);
    const [loading, setLoading] = useState(true);

    // Redirect if not authenticated
    useEffect(() => {
        if (!isAuthenticated || !user) {
            router.push('/');
        }
    }, [isAuthenticated, user, router]);

    // Fetch reference data
    useEffect(() => {
        const fetchReferenceData = async () => {
            try {
                const [erasData, dynastiesData, typesData] = await Promise.all([
                    eraEndpoints.getAll(),
                    dynastyEndpoints.getAll(),
                    monumentTypeEndpoints.getAll(),
                ]);
                setEras(erasData);
                setDynasties(dynastiesData);
                setMonumentTypes(typesData);
            } catch (err) {
                console.error('Failed to fetch reference data:', err);
            }
        };
        fetchReferenceData();
    }, []);

    // Fetch saved searches
    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchSavedSearches = async () => {
            setLoading(true);
            try {
                const data = await savedSearchEndpoints.getAll();
                setSavedSearches(data || []);
            } catch (err: any) {
                console.error('Failed to fetch saved searches:', err);
                toastRef.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: err.message || 'Failed to load saved searches',
                    life: 3000,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchSavedSearches();
    }, [isAuthenticated]);

    if (!isAuthenticated || !user) {
        return null;
    }

    // Helper functions to get names from IDs
    const getEraName = (eraId: number): string => {
        const era = eras.find(e => e.id === eraId);
        return locale === 'ar' ? (era?.nameAr || '') : (era?.nameEn || '');
    };

    const getDynastyName = (dynastyId: number): string => {
        const dynasty = dynasties.find(d => d.id === dynastyId);
        return locale === 'ar' ? (dynasty?.nameAr || '') : (dynasty?.nameEn || '');
    };

    const getMonumentTypeName = (typeId: number): string => {
        const type = monumentTypes.find(t => t.id === typeId);
        return locale === 'ar' ? (type?.nameAr || '') : (type?.nameEn || '');
    };

    const filteredSearches = savedSearches.filter((search) =>
        search.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (search.keyword && search.keyword.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleRunSearch = (search: SavedSearch) => {
        // Navigate to sites page with filters
        const params = new URLSearchParams();
        if (search.keyword) params.set('q', search.keyword);
        if (search.eraIds && search.eraIds.length > 0) params.set('period', search.eraIds[0].toString());
        if (search.dynastyIds && search.dynastyIds.length > 0) params.set('dynasty', search.dynastyIds[0].toString());
        if (search.monumentTypeIds && search.monumentTypeIds.length > 0) params.set('siteType', search.monumentTypeIds[0].toString());
        if (search.dateFrom) params.set('startDate', search.dateFrom);
        if (search.dateTo) params.set('endDate', search.dateTo);

        // Navigate to sites page - the sites page will automatically fetch monuments based on URL params
        router.push(`/sites?${params.toString()}`);

        // Execute search in background to update result count
        savedSearchEndpoints.execute(search.id).catch((err) => {
            console.error('Failed to update search result count:', err);
        });
    };

    const handleDeleteSearch = async (searchId: string, searchName: string) => {
        try {
            await savedSearchEndpoints.delete(searchId);

            // Remove from local state
            setSavedSearches(prev => prev.filter(s => s.id !== searchId));

            toastRef.current?.show({
                severity: 'success',
                summary: 'Deleted',
                detail: `Deleted search "${searchName}"`,
                life: 3000,
            });
        } catch (err: any) {
            toastRef.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: err.message || 'Failed to delete search',
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
                    <p className="text-theme-text">Loading saved searches...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-theme-bg pt-20">
            <Toast ref={toastRef} />

            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-theme-primary/20 via-theme-accent to-theme-secondary/20 py-16 border-b border-theme-border">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-theme-card rounded-2xl shadow-lg">
                                <BookMarked size={48} className="text-theme-primary" />
                            </div>
                        </div>
                        <h1 className="text-theme-text mb-4">Saved Searches</h1>
                        <p className="text-theme-muted text-lg max-w-2xl mx-auto">
                            Quick access to your frequently used search queries and filters
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
                            placeholder="Search your saved searches..."
                            className="w-full bg-theme-card border-theme-border text-theme-text placeholder:text-theme-muted"
                        />
                    </span>
                </div>

                {/* Stats */}
                <div className="max-w-4xl mx-auto mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-theme-primary/10 to-theme-primary/5 border border-theme-primary/20 rounded-xl p-6 text-center">
                            <div className="text-3xl font-bold text-theme-primary mb-2">{savedSearches.length}</div>
                            <div className="text-theme-muted text-sm">Saved Searches</div>
                        </div>
                        <div className="bg-gradient-to-br from-theme-secondary/10 to-theme-secondary/5 border border-theme-secondary/20 rounded-xl p-6 text-center">
                            <div className="text-3xl font-bold text-theme-secondary mb-2">
                                {savedSearches.reduce((sum, s) => sum + (s.resultCount || 0), 0)}
                            </div>
                            <div className="text-theme-muted text-sm">Total Results</div>
                        </div>
                    </div>
                </div>

                {/* Saved Searches Grid */}
                {filteredSearches.length > 0 ? (
                    <div className="max-w-4xl mx-auto space-y-4">
                        {filteredSearches.map((search, index) => (
                            <div
                                key={search.id}
                                className="group bg-gradient-to-br from-theme-card to-theme-card/50 border border-theme-border rounded-2xl overflow-hidden hover:shadow-2xl hover:border-theme-primary/40 transition-all duration-500"
                                style={{
                                    animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                                }}
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-theme-text mb-2 group-hover:text-theme-primary transition-colors">
                                                {search.name}
                                            </h3>
                                            {search.keyword && (
                                                <div className="flex items-center gap-2 text-theme-muted text-sm mb-3">
                                                    <Search size={16} className="text-theme-primary" />
                                                    <span className="font-mono bg-theme-accent px-3 py-1 rounded-lg">
                                                        "{search.keyword}"
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => handleDeleteSearch(search.id, search.name)}
                                            className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all hover:scale-110 active:scale-95"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                                        {search.eraIds && search.eraIds.length > 0 && (
                                            <div className="flex items-center gap-1.5 bg-gradient-to-r from-theme-primary/10 to-theme-primary/5 text-theme-primary border border-theme-primary/20 px-3 py-1.5 rounded-full text-sm font-medium">
                                                <Calendar size={14} />
                                                <span>Era: {getEraName(search.eraIds[0])}</span>
                                            </div>
                                        )}
                                        {search.dynastyIds && search.dynastyIds.length > 0 && (
                                            <div className="flex items-center gap-1.5 bg-gradient-to-r from-theme-secondary/10 to-theme-secondary/5 text-theme-secondary border border-theme-secondary/20 px-3 py-1.5 rounded-full text-sm font-medium">
                                                <Calendar size={14} />
                                                <span>Dynasty: {getDynastyName(search.dynastyIds[0])}</span>
                                            </div>
                                        )}
                                        {search.monumentTypeIds && search.monumentTypeIds.length > 0 && (
                                            <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500/10 to-amber-500/5 text-amber-700 dark:text-amber-500 border border-amber-500/20 px-3 py-1.5 rounded-full text-sm font-medium">
                                                <MapPin size={14} />
                                                <span>{getMonumentTypeName(search.monumentTypeIds[0])}</span>
                                            </div>
                                        )}
                                        {search.dateFrom && search.dateTo && (
                                            <div className="flex items-center gap-1.5 bg-gradient-to-r from-blue-500/10 to-blue-500/5 text-blue-700 dark:text-blue-500 border border-blue-500/20 px-3 py-1.5 rounded-full text-sm font-medium">
                                                <Clock size={14} />
                                                <span>{search.dateFrom} - {search.dateTo}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Meta Info */}
                                    <div className="flex items-center justify-between pt-4 border-t border-theme-border/60">
                                        <div className="flex items-center gap-4 text-sm text-theme-muted">
                                            <div className="flex items-center gap-1.5">
                                                <Clock size={16} />
                                                <span>{formatDatecreatedAt(search.createdAt)}</span>
                                            </div>
                                            {search.resultCount !== undefined && (
                                                <div className="flex items-center gap-1.5">
                                                    <span className="font-semibold text-theme-primary">{search.resultCount}</span>
                                                    <span>results</span>
                                                </div>
                                            )}
                                        </div>

                                        <Button
                                            onClick={() => handleRunSearch(search)}
                                            className="bg-gradient-to-r from-theme-primary to-theme-secondary border-0 hover:shadow-lg hover:scale-105 transition-all"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Play size={16} />
                                                <span>Run Search</span>
                                            </div>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="max-w-md mx-auto text-center py-16">
                        <div className="bg-theme-card border border-theme-border rounded-2xl p-12">
                            <BookMarked size={64} className="text-theme-muted mx-auto mb-4 opacity-50" />
                            <h3 className="text-theme-text text-xl mb-2">
                                {searchTerm ? 'No Results Found' : 'No Saved Searches Yet'}
                            </h3>
                            <p className="text-theme-muted mb-6">
                                {searchTerm
                                    ? 'Try adjusting your search terms'
                                    : 'Save your search queries for quick access later'}
                            </p>
                            {!searchTerm && (
                                <Button
                                    onClick={() => router.push('/sites')}
                                    className="bg-theme-primary hover:bg-theme-secondary border-0"
                                >
                                    <div className="flex items-center gap-2">
                                        <Search size={16} />
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