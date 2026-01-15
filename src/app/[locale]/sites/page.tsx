'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { AdvancedSearch, SearchParams } from './components/AdvancedSearch';
import { SiteCardNew } from './components/SiteCardNew';
import { Grid3x3, List, ChevronLeft, ChevronRight, Save, Check, X } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';
import { LoginModal } from '@/components/auth/LoginModal';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { type Locale } from '@/i18n/config';
import { monumentEndpoints, eraEndpoints, dynastyEndpoints, savedSearchEndpoints } from '@/lib/api/endpoints';
import { Monument, Era, Dynasty } from '@/lib/api/types/monuments.dto';
import { mapMonumentToSite } from '@/lib/utils/monument-mapper';


export default function SitesPage() {
    const tHero = useTranslations('sites.hero');
    const tSearch = useTranslations('sites.search');
    const params = useParams();
    const currentLocale = (params.locale as Locale) || 'en';
    const locale = params.locale as 'en' | 'ar';
    const { isAuthenticated } = useAuth();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [searchParams, setSearchParams] = useState<SearchParams>({
        query: '',
        period: 'all',
        dynasty: 'all',
        startDate: '',
        endDate: '',
        siteType: 'all',
        minDuration: '',
        maxDuration: ''
    });
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // API state
    const [monuments, setMonuments] = useState<Monument[]>([]);
    const [eras, setEras] = useState<Era[]>([]);
    const [dynasties, setDynasties] = useState<Dynasty[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [totalPages, setTotalPages] = useState(0);
    const [totalResults, setTotalResults] = useState(0);

    // Fetch reference data on mount
    useEffect(() => {
        const fetchEras = async () => {
            try {
                const data = await eraEndpoints.getAll();
                setEras(data);
            } catch (err) {
                console.error('Failed to fetch eras:', err);
            }
        };
        fetchEras();
    }, []);

    useEffect(() => {
        const fetchDynasties = async () => {
            try {
                const data = await dynastyEndpoints.getAll();
                setDynasties(data);
            } catch (err) {
                console.error('Failed to fetch dynasties:', err);
            }
        };
        fetchDynasties();
    }, []);

    // Fetch monuments with search/pagination
    useEffect(() => {
        const fetchMonuments = async () => {
            setLoading(true);
            setError(null);
            try {
                const hasFilters =
                    searchParams.query ||
                    searchParams.period !== 'all' ||
                    searchParams.dynasty !== 'all' ||
                    searchParams.startDate ||
                    searchParams.endDate ||
                    searchParams.siteType !== 'all';

                let result;
                if (hasFilters) {
                    result = await monumentEndpoints.search({
                        keyword: searchParams.query || undefined,
                        eraIds: searchParams.period !== 'all' ? [parseInt(searchParams.period)] : undefined,
                        dynastyIds: searchParams.dynasty !== 'all' ? [parseInt(searchParams.dynasty)] : undefined,
                        monumentTypeIds: searchParams.siteType !== 'all' ? [parseInt(searchParams.siteType)] : undefined,
                        startDateFrom: searchParams.startDate || undefined,
                        startDateTo: searchParams.endDate || undefined,
                        page: currentPage,
                        limit: itemsPerPage,
                    });
                } else {
                    result = await monumentEndpoints.getAll(currentPage, itemsPerPage);
                }

                setMonuments(result.data || []);
                setTotalResults(result.pagination?.total || 0);
                setTotalPages(result.pagination?.totalPages || 0);
            } catch (err: any) {
                setError(err.message || 'Failed to load monuments');
                console.error('Failed to fetch monuments:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMonuments();
    }, [searchParams, currentPage]);

    // Reset to page 1 when search params change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchParams]);

    // Map monuments to sites for backward compatibility
    const mappedSites = useMemo(() => {
        if (!monuments || !Array.isArray(monuments)) return [];
        return monuments.map((monument) => mapMonumentToSite(monument, locale));
    }, [monuments, locale]);

    // Pagination calculations
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Save search functionality
    const [saveSearchDialogVisible, setSaveSearchDialogVisible] = useState(false);
    const [searchName, setSearchName] = useState('');
    const toastRef = useRef<Toast>(null);

    const handleSaveSearch = async () => {
        if (!searchName.trim()) {
            toastRef.current?.show({
                severity: 'warn',
                summary: tSearch('saveDialog.title'),
                detail: tSearch('saveDialog.nameRequired'),
                life: 3000,
            });
            return;
        }

        if (!isAuthenticated) {
            setIsLoginModalOpen(true);
            return;
        }

        try {
            await savedSearchEndpoints.create({
                name: searchName,
                searchCriteria: {
                    keyword: searchParams.query || undefined,
                    eraIds: searchParams.period !== 'all' ? [parseInt(searchParams.period)] : undefined,
                    dynastyIds: searchParams.dynasty !== 'all' ? [parseInt(searchParams.dynasty)] : undefined,
                    monumentTypeIds: searchParams.siteType !== 'all' ? [parseInt(searchParams.siteType)] : undefined,
                    startDateFrom: searchParams.startDate || undefined,
                    startDateTo: searchParams.endDate || undefined,
                },
            });

            toastRef.current?.show({
                severity: 'success',
                summary: tSearch('saveDialog.title'),
                detail: tSearch('saveDialog.success', { name: searchName }),
                life: 3000,
            });

            setSaveSearchDialogVisible(false);
            setSearchName('');
        } catch (err: any) {
            toastRef.current?.show({
                severity: 'error',
                summary: 'Error',
                detail: err.message || 'Failed to save search',
                life: 3000,
            });
        }
    };

    const hasActiveFilters = () => {
        return (
            searchParams.query ||
            searchParams.period !== 'all' ||
            searchParams.dynasty !== 'all' ||
            searchParams.startDate ||
            searchParams.endDate ||
            searchParams.siteType !== 'all'
        );
    };

    // Loading state
    if (loading && monuments.length === 0) {
        return (
            <div className="min-h-screen bg-theme-bg flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-theme-primary mx-auto mb-4"></div>
                    <p className="text-theme-text">Loading monuments...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error && monuments.length === 0) {
        return (
            <div className="min-h-screen bg-theme-bg flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-6">
                    <div className="text-red-500 text-6xl mb-4">⚠️</div>
                    <h3 className="text-theme-text text-xl mb-2">Error Loading Monuments</h3>
                    <p className="text-theme-text/70 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-theme-primary text-white px-6 py-2 rounded-lg hover:bg-theme-primary/90 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-theme-bg">
            {/* Hero Section */}
            <section className="hidden md:block relative h-[40vh] md:h-[50vh] w-full overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1539768942893-daf53e448371?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ3lwdGlhbiUyMHRlbXBsZXMlMjBhZXJpYWx8ZW58MXx8fHwxNzY2MzM5NDI2fDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Egyptian Archaeological Sites"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40"></div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="container mx-auto px-6 md:px-12 text-center">
                        <p className="text-white/90 tracking-[0.3em] text-xs sm:text-sm mb-4">{tHero('subtitle')}</p>
                        <h1 className="text-white mb-4 md:mb-6 text-3xl md:text-4xl lg:text-5xl">{tHero('title')}</h1>
                        <p className="text-white/90 max-w-3xl mx-auto text-sm md:text-base">
                            {tHero('description')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="pt-24 pb-12 md:pt-12 md:pb-16">{/* Added pt-24 (96px) for mobile spacing, removed from here and keeping standard desktop spacing */}
                <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                    {/* Advanced Search */}
                    <div className="mb-12">
                        <AdvancedSearch onSearch={setSearchParams} eras={eras} dynasties={dynasties} />
                    </div>

                    {/* View Mode Toggle & Results Count */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                        <div className="text-theme-text">
                            <span className="text-lg">
                                {tSearch.rich('found', {
                                    count: totalResults,
                                    total: totalResults === 1 ? '' : 's'
                                })}
                            </span>
                            {loading && <span className="ml-2 text-sm text-theme-muted">(Loading...)</span>}
                        </div>
                        <div className="flex gap-2 items-center">
                            {/* Save Search Button */}
                            {hasActiveFilters() && (
                                <Button
                                    onClick={() => {
                                        if (!isAuthenticated) {
                                            setIsLoginModalOpen(true);
                                        } else {
                                            setSaveSearchDialogVisible(true);
                                        }
                                    }}
                                    className="p-button-outlined p-button-secondary"
                                    tooltip="Save current search criteria"
                                    tooltipOptions={{ position: 'bottom' }}
                                >
                                    <Save size={18} className="mr-2" />
                                    <span>{tSearch('saveSearch')}</span>
                                </Button>
                            )}

                            {/* View Mode Toggle */}
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-3 rounded transition-colors ${viewMode === 'grid'
                                    ? 'bg-theme-primary text-white'
                                    : 'bg-theme-card text-theme-muted hover:bg-theme-accent border border-theme-border'
                                    }`}
                                aria-label="Grid view"
                            >
                                <Grid3x3 size={20} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-3 rounded transition-colors ${viewMode === 'list'
                                    ? 'bg-theme-primary text-white'
                                    : 'bg-theme-card text-theme-muted hover:bg-theme-accent border border-theme-border'
                                    }`}
                                aria-label="List view"
                            >
                                <List size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Sites Grid/List */}
                    {mappedSites.length > 0 ? (
                        <div
                            className={
                                viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'flex flex-col gap-6'
                            }
                        >
                            {mappedSites.map((site) => (
                                <SiteCardNew key={site.id} locale={currentLocale} site={site} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="text-theme-muted text-6xl mb-4">🏛️</div>
                            <h3 className="text-theme-text mb-2">{tSearch('noSites.title')}</h3>
                            <p className="text-theme-text/70">{tSearch('noSites.description')}</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-12 pt-8 border-t border-theme-border">
                            <div className="flex flex-col items-center gap-6">
                                {/* Page Info */}
                                <div className="text-center">
                                    <span className="text-theme-muted text-sm">
                                        {tSearch.rich('pagination.showing', {
                                            start: startIndex + 1,
                                            end: Math.min(endIndex, totalResults),
                                            total: totalResults,
                                            span: (chunks) => <span className="font-semibold text-theme-primary">{chunks}</span>
                                        })}
                                    </span>
                                </div>

                                {/* Pagination Controls */}
                                <div className="flex items-center gap-2 flex-wrap justify-center">
                                    {/* First Page Button */}
                                    <button
                                        onClick={() => setCurrentPage(1)}
                                        disabled={currentPage === 1}
                                        className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-300 ${currentPage === 1
                                            ? 'bg-theme-accent/50 border-theme-border text-theme-muted/50 cursor-not-allowed'
                                            : 'bg-theme-card border-theme-border text-theme-text hover:border-theme-primary hover:text-theme-primary hover:bg-theme-accent hover:scale-110 active:scale-95'
                                            }`}
                                        title="First page"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                                        </svg>
                                    </button>

                                    {/* Previous Button */}
                                    <button
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className={`flex items-center gap-2 px-4 h-10 rounded-lg border transition-all duration-300 ${currentPage === 1
                                            ? 'bg-theme-accent/50 border-theme-border text-theme-muted/50 cursor-not-allowed'
                                            : 'bg-theme-card border-theme-border text-theme-text hover:border-theme-primary hover:text-theme-primary hover:bg-theme-accent hover:scale-105 active:scale-95'
                                            }`}
                                    >
                                        <ChevronLeft size={18} />
                                        <span className="hidden sm:inline">{tSearch('pagination.previous')}</span>
                                    </button>

                                    {/* Page Numbers */}
                                    <div className="flex items-center gap-1">
                                        {(() => {
                                            const pages = [];
                                            const showEllipsisStart = currentPage > 3;
                                            const showEllipsisEnd = currentPage < totalPages - 2;

                                            // Always show first page
                                            pages.push(
                                                <button
                                                    key={1}
                                                    onClick={() => setCurrentPage(1)}
                                                    className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-300 ${currentPage === 1
                                                        ? 'bg-gradient-to-br from-theme-primary to-theme-secondary text-white border-theme-primary shadow-lg shadow-theme-primary/30 scale-110'
                                                        : 'bg-theme-card border-theme-border text-theme-text hover:border-theme-primary hover:text-theme-primary hover:bg-theme-accent hover:scale-110 active:scale-95'
                                                        }`}
                                                >
                                                    1
                                                </button>
                                            );

                                            // Ellipsis after first page
                                            if (showEllipsisStart) {
                                                pages.push(
                                                    <span key="ellipsis-start" className="flex items-center justify-center w-10 h-10 text-theme-muted">
                                                        •••
                                                    </span>
                                                );
                                            }

                                            // Pages around current page
                                            const start = Math.max(2, currentPage - 1);
                                            const end = Math.min(totalPages - 1, currentPage + 1);

                                            for (let i = start; i <= end; i++) {
                                                pages.push(
                                                    <button
                                                        key={i}
                                                        onClick={() => setCurrentPage(i)}
                                                        className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-300 ${currentPage === i
                                                            ? 'bg-gradient-to-br from-theme-primary to-theme-secondary text-white border-theme-primary shadow-lg shadow-theme-primary/30 scale-110'
                                                            : 'bg-theme-card border-theme-border text-theme-text hover:border-theme-primary hover:text-theme-primary hover:bg-theme-accent hover:scale-110 active:scale-95'
                                                            }`}
                                                    >
                                                        {i}
                                                    </button>
                                                );
                                            }

                                            // Ellipsis before last page
                                            if (showEllipsisEnd) {
                                                pages.push(
                                                    <span key="ellipsis-end" className="flex items-center justify-center w-10 h-10 text-theme-muted">
                                                        ••
                                                    </span>
                                                );
                                            }

                                            // Always show last page (if more than 1 page)
                                            if (totalPages > 1) {
                                                pages.push(
                                                    <button
                                                        key={totalPages}
                                                        onClick={() => setCurrentPage(totalPages)}
                                                        className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-300 ${currentPage === totalPages
                                                            ? 'bg-gradient-to-br from-theme-primary to-theme-secondary text-white border-theme-primary shadow-lg shadow-theme-primary/30 scale-110'
                                                            : 'bg-theme-card border-theme-border text-theme-text hover:border-theme-primary hover:text-theme-primary hover:bg-theme-accent hover:scale-110 active:scale-95'
                                                            }`}
                                                    >
                                                        {totalPages}
                                                    </button>
                                                );
                                            }

                                            return pages;
                                        })()}
                                    </div>

                                    {/* Next Button */}
                                    <button
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className={`flex items-center gap-2 px-4 h-10 rounded-lg border transition-all duration-300 ${currentPage === totalPages
                                            ? 'bg-theme-accent/50 border-theme-border text-theme-muted/50 cursor-not-allowed'
                                            : 'bg-theme-card border-theme-border text-theme-text hover:border-theme-primary hover:text-theme-primary hover:bg-theme-accent hover:scale-105 active:scale-95'
                                            }`}
                                    >
                                        <span className="hidden sm:inline">{tSearch('pagination.next')}</span>
                                        <ChevronRight size={18} />
                                    </button>

                                    {/* Last Page Button */}
                                    <button
                                        onClick={() => setCurrentPage(totalPages)}
                                        disabled={currentPage === totalPages}
                                        className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-300 ${currentPage === totalPages
                                            ? 'bg-theme-accent/50 border-theme-border text-theme-muted/50 cursor-not-allowed'
                                            : 'bg-theme-card border-theme-border text-theme-text hover:border-theme-primary hover:text-theme-primary hover:bg-theme-accent hover:scale-110 active:scale-95'
                                            }`}
                                        title="Last page"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Quick Jump (optional - for many pages) */}
                                {totalPages > 5 && (
                                    <div className="flex items-center gap-3 text-sm">
                                        <label htmlFor="page-jump" className="text-theme-muted">
                                            {tSearch('pagination.jumpTo')}
                                        </label>
                                        <input
                                            id="page-jump"
                                            type="number"
                                            min={1}
                                            max={totalPages}
                                            value={currentPage}
                                            onChange={(e) => {
                                                const page = parseInt(e.target.value);
                                                if (page >= 1 && page <= totalPages) {
                                                    setCurrentPage(page);
                                                }
                                            }}
                                            className="w-20 px-3 py-1.5 rounded-lg border border-theme-border bg-theme-card text-theme-text text-center focus:outline-none focus:ring-2 focus:ring-theme-primary/50 focus:border-theme-primary transition-all"
                                        />
                                        <span className="text-theme-muted">{tSearch('pagination.of', { total: totalPages })}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Save Search Dialog */}
            <Dialog
                header={tSearch('saveDialog.title')}
                visible={saveSearchDialogVisible}
                onHide={() => setSaveSearchDialogVisible(false)}
                style={{ width: '90vw', maxWidth: '500px' }}
                modal
                contentStyle={{ paddingRight: '1rem' }}
                headerStyle={{
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '1rem'
                }}
                footer={
                    <div style={{ padding: '1rem' }}>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
                            <Button
                                severity="secondary"
                                outlined
                                onClick={() => setSaveSearchDialogVisible(false)}
                                className="w-full sm:w-auto"
                            >
                                <X size={18} className="mr-2" />
                                <span>{tSearch('saveDialog.cancel')}</span>
                            </Button>
                            <Button
                                severity="success"
                                onClick={handleSaveSearch}
                                className="w-full sm:w-auto"
                            >
                                <Check size={18} className="mr-2" />
                                <span>{tSearch('saveDialog.save')}</span>
                            </Button>
                        </div>
                    </div>
                }
            >
                <div className="p-4">
                    <p className="text-theme-text mb-4">{tSearch('saveDialog.description')}</p>
                    <InputText
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        className="w-full"
                        placeholder={tSearch('saveDialog.placeholder')}
                    />
                </div>
            </Dialog>

            {/* Toast */}
            <Toast ref={toastRef} />

            {/* Login Modal */}
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />
        </div>
    );
}