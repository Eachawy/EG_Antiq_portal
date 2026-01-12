'use client';

import { useState, useMemo, useRef } from 'react';
import { archaeologicalSites } from '../about/data/sitesData';
import { AdvancedSearch, SearchParams } from './components/AdvancedSearch';
import { SiteCardNew } from './components/SiteCardNew';
import { Grid3x3, List, ChevronLeft, ChevronRight, Save, Check, X } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';
import { LoginModal } from '@/components/auth/LoginModal';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';


export default function SitesPage() {
    // const t = useTranslations('header');
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

    const filteredSites = useMemo(() => {
        return archaeologicalSites.filter((site) => {
            // Search query filter
            if (
                searchParams.query &&
                !site.name.english.toLowerCase().includes(searchParams.query.toLowerCase()) &&
                !site.name.arabic.includes(searchParams.query)
            ) {
                return false;
            }

            // Period filter
            if (searchParams.period !== 'all' && site.historicalPeriod !== searchParams.period) {
                return false;
            }

            // Dynasty filter
            if (searchParams.dynasty !== 'all' && site.dynasty !== searchParams.dynasty) {
                return false;
            }

            // Date range filter
            if (searchParams.startDate && searchParams.endDate) {
                const start = parseInt(searchParams.startDate);
                const end = parseInt(searchParams.endDate);
                const siteOverlaps =
                    (site.dateRange.start >= start && site.dateRange.start <= end) ||
                    (site.dateRange.end >= start && site.dateRange.end <= end) ||
                    (site.dateRange.start <= start && site.dateRange.end >= end);

                if (!siteOverlaps) {
                    return false;
                }
            }

            // Duration filter
            if (searchParams.minDuration || searchParams.maxDuration) {
                const duration = Math.abs(site.dateRange.end - site.dateRange.start);
                if (searchParams.minDuration && duration < parseInt(searchParams.minDuration)) {
                    return false;
                }
                if (searchParams.maxDuration && duration > parseInt(searchParams.maxDuration)) {
                    return false;
                }
            }

            return true;
        });
    }, [searchParams]);

    // Pagination calculations
    const totalPages = Math.ceil(filteredSites.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedSites = filteredSites.slice(startIndex, endIndex);

    // Reset to page 1 when search params change
    useMemo(() => {
        setCurrentPage(1);
    }, [searchParams]);

    // Save search functionality
    const [saveSearchDialogVisible, setSaveSearchDialogVisible] = useState(false);
    const [searchName, setSearchName] = useState('');
    const toastRef = useRef<Toast>(null);

    const handleSaveSearch = () => {
        if (!searchName.trim()) {
            toastRef.current?.show({
                severity: 'warn',
                summary: 'Name Required',
                detail: 'Please enter a name for your saved search.',
                life: 3000,
            });
            return;
        }

        // Create saved search object
        const savedSearch = {
            id: Date.now().toString(),
            name: searchName,
            query: searchParams.query,
            filters: {
                period: searchParams.period !== 'all' ? searchParams.period : undefined,
                dynasty: searchParams.dynasty !== 'all' ? searchParams.dynasty : undefined,
                startDate: searchParams.startDate || undefined,
                endDate: searchParams.endDate || undefined,
                siteType: searchParams.siteType !== 'all' ? searchParams.siteType : undefined,
            },
            createdAt: new Date().toISOString(),
            resultsCount: filteredSites.length,
        };

        // Get existing saved searches from localStorage
        const existingSavedSearches = JSON.parse(localStorage.getItem('savedSearches') || '[]');

        // Add new search
        existingSavedSearches.push(savedSearch);

        // Save to localStorage
        localStorage.setItem('savedSearches', JSON.stringify(existingSavedSearches));

        toastRef.current?.show({
            severity: 'success',
            summary: 'Search Saved',
            detail: `Search criteria "${searchName}" has been saved successfully.`,
            life: 3000,
        });

        setSaveSearchDialogVisible(false);
        setSearchName('');
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
                        <p className="text-white/90 tracking-[0.3em] text-xs sm:text-sm mb-4">ARCHAEOLOGICAL SITES</p>
                        <h1 className="text-white mb-4 md:mb-6 text-3xl md:text-4xl lg:text-5xl">Sites Directory</h1>
                        <p className="text-white/90 max-w-3xl mx-auto text-sm md:text-base">
                            Browse through Egypt's most significant archaeological sites. Use advanced filters to find exactly what
                            you're looking for.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="pt-24 pb-12 md:pt-12 md:pb-16">{/* Added pt-24 (96px) for mobile spacing, removed from here and keeping standard desktop spacing */}
                <div className="container mx-auto px-6 md:px-12 max-w-7xl">
                    {/* Advanced Search */}
                    <div className="mb-12">
                        <AdvancedSearch onSearch={setSearchParams} />
                    </div>

                    {/* View Mode Toggle & Results Count */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                        <div className="text-theme-text">
                            <span className="text-lg">
                                Found <strong>{filteredSites.length}</strong> site{filteredSites.length !== 1 ? 's' : ''}
                            </span>
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
                                    <span>Save Search</span>
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
                    {filteredSites.length > 0 ? (
                        <div
                            className={
                                viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'flex flex-col gap-6'
                            }
                        >
                            {paginatedSites.map((site) => (
                                <SiteCardNew key={site.id} site={site} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <div className="text-theme-muted text-6xl mb-4">🏛️</div>
                            <h3 className="text-theme-text mb-2">No sites found</h3>
                            <p className="text-theme-text/70">Try adjusting your search or filter criteria</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="mt-12 pt-8 border-t border-theme-border">
                            <div className="flex flex-col items-center gap-6">
                                {/* Page Info */}
                                <div className="text-center">
                                    <span className="text-theme-muted text-sm">
                                        Showing <span className="font-semibold text-theme-primary">{startIndex + 1}-{Math.min(endIndex, filteredSites.length)}</span> of <span className="font-semibold text-theme-primary">{filteredSites.length}</span> archaeological sites
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
                                        <span className="hidden sm:inline">Previous</span>
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
                                        <span className="hidden sm:inline">Next</span>
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
                                            Jump to page:
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
                                        <span className="text-theme-muted">of {totalPages}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Save Search Dialog */}
            <Dialog
                header="Save Search"
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
                                <span>Cancel</span>
                            </Button>
                            <Button
                                severity="success"
                                onClick={handleSaveSearch}
                                className="w-full sm:w-auto"
                            >
                                <Check size={18} className="mr-2" />
                                <span>Save</span>
                            </Button>
                        </div>
                    </div>
                }
            >
                <div className="p-4">
                    <p className="text-theme-text mb-4">Enter a name for your saved search:</p>
                    <InputText
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                        className="w-full"
                        placeholder="e.g., Ancient Egyptian Temples"
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