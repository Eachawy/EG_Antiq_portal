'use client';


import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { MapPin, Filter, Landmark, Church, Mountain, Pyramid, Sparkles, Map, Moon, GraduationCap, Crown, Castle, ShoppingBag, DoorOpen, House, Droplet, Bath, Heart, Navigation } from 'lucide-react';
import { useState, useMemo, useRef, useEffect } from 'react';
import { OpenLayersMap, OpenLayersMapRef } from './components/OpenLayersMap';
import { Button } from 'primereact/button';
// import { Toast } from 'primereact/toast';
import * as Slider from '@radix-ui/react-slider';
import { useAuth } from '@/components/auth/AuthContext';
import { LoginModal } from '@/components/auth/LoginModal';
import { monumentEndpoints, eraEndpoints, dynastyEndpoints, monumentTypeEndpoints } from '@/lib/api/endpoints';
import { Monument, Era, Dynasty, MonumentType } from '@/lib/api/types/monuments.dto';

// Transform Monument API data to Site interface for map component
interface Site {
    id: string;
    name: { english: string; arabic: string };
    location: {
        city: string;
        governorate: string;
        coordinates: { lat: number; lng: number };
    };
    historicalPeriod: string;
    dynasty: string;
    dateRange: {
        start: number;
        end: number;
    };
    description: string;
    thumbnailUrl: string;
    imageUrl: string;
}

export default function InteractiveMapPage() {
    const tMap = useTranslations('map');
    const tSites = useTranslations('sites');
    const tCommon = useTranslations('common');
    const router = useRouter();
    const mapRef = useRef<OpenLayersMapRef>(null);
    const { isAuthenticated } = useAuth();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    // API data state
    const [monuments, setMonuments] = useState<Monument[]>([]);
    const [eras, setEras] = useState<Era[]>([]);
    const [dynasties, setDynasties] = useState<Dynasty[]>([]);
    const [monumentTypes, setMonumentTypes] = useState<MonumentType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filter state
    const [selectedPeriod, setSelectedPeriod] = useState('all');
    const [selectedDynasty, setSelectedDynasty] = useState('all');
    const [startDate, setStartDate] = useState<number>(-3100);
    const [endDate, setEndDate] = useState<number>(2025);
    const [selectedSiteType, setSelectedSiteType] = useState('all');
    const [hoveredSite, setHoveredSite] = useState<string | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [favoriteSites, setFavoriteSites] = useState<string[]>([]);

    // Load favorites from localStorage on mount (client-side only)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('favoriteSites');
            if (saved) {
                setFavoriteSites(JSON.parse(saved));
            }
        }
    }, []);

    // Toggle favorite
    const toggleFavorite = (siteId: string, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent navigation when clicking favorite

        if (!isAuthenticated) {
            setIsLoginModalOpen(true);
            return;
        }

        setFavoriteSites((prev) => {
            const newFavorites = prev.includes(siteId)
                ? prev.filter((id) => id !== siteId)
                : [...prev, siteId];
            // Save to localStorage
            localStorage.setItem('favoriteSites', JSON.stringify(newFavorites));

            // Show toast notification
            // if (prev.includes(siteId)) {
            //     Toast.success('Removed from favorites');
            // } else {
            //     Toast.success('Added to favorites');
            // }

            return newFavorites;
        });
    };

    // Handle location button click
    const handleFindMyLocation = () => {
        if (mapRef.current) {
            mapRef.current.getCurrentLocation();
        }
    };

    // Fetch reference data on mount
    useEffect(() => {
        const fetchReferenceData = async () => {
            try {
                setLoading(true);
                const [erasData, dynastiesData, typesData] = await Promise.all([
                    eraEndpoints.getAll(),
                    dynastyEndpoints.getAll(),
                    monumentTypeEndpoints.getAll(),
                ]);
                setEras(erasData);
                setDynasties(dynastiesData);
                setMonumentTypes(typesData);
            } catch (err) {
                console.error('Error fetching reference data:', err);
                setError('Failed to load filter options');
            } finally {
                setLoading(false);
            }
        };

        fetchReferenceData();
    }, []);

    // Fetch monuments when filters change
    useEffect(() => {
        const fetchMonuments = async () => {
            try {
                setLoading(true);
                setError(null);

                // Build filter parameters
                const filters: any = {
                    page: 1,
                    limit: 1000, // Get all monuments for map view
                };

                // Map selected period to era IDs
                if (selectedPeriod !== 'all') {
                    const era = eras.find(e => e.nameEn === selectedPeriod);
                    if (era) {
                        filters.eraIds = [era.id];
                    }
                }

                // Map selected dynasty to dynasty IDs
                if (selectedDynasty !== 'all') {
                    const dynasty = dynasties.find(d => d.nameEn === selectedDynasty);
                    if (dynasty) {
                        filters.dynastyIds = [dynasty.id];
                    }
                }

                // Map selected site type to monument type IDs
                if (selectedSiteType !== 'all') {
                    const typeId = parseInt(selectedSiteType);
                    if (!isNaN(typeId)) {
                        filters.monumentTypeIds = [typeId];
                    }
                }

                // Add date range filters (convert years to string format)
                if (startDate !== -3100) {
                    filters.startDateFrom = startDate.toString();
                }
                if (endDate !== 2025) {
                    filters.startDateTo = endDate.toString();
                }

                const response = await monumentEndpoints.search(filters);
                setMonuments(response.data);
            } catch (err) {
                console.error('Error fetching monuments:', err);
                setError('Failed to load monuments');
            } finally {
                setLoading(false);
            }
        };

        // Only fetch if reference data is loaded
        if (eras.length > 0 && dynasties.length > 0 && monumentTypes.length > 0) {
            fetchMonuments();
        }
    }, [selectedPeriod, selectedDynasty, selectedSiteType, startDate, endDate, eras, dynasties, monumentTypes]);

    // Transform Monument to Site interface
    const transformMonumentToSite = (monument: Monument): Site => {
        const lat = parseFloat(monument.lat || monument.locationLat || '0');
        const lng = parseFloat(monument.lng || monument.locationLong || '0');

        // Parse dates
        const parseYear = (dateStr?: string): number => {
            if (!dateStr) return 0;
            const year = parseInt(dateStr);
            return isNaN(year) ? 0 : year;
        };

        return {
            id: monument.id.toString(),
            name: {
                english: monument.monumentNameEn,
                arabic: monument.monumentNameAr,
            },
            location: {
                city: monument.locationDescriptionEn || 'Egypt',
                governorate: monument.locationDescriptionAr || '',
                coordinates: { lat, lng },
            },
            historicalPeriod: monument.era?.nameEn || 'Unknown',
            dynasty: monument.dynasty?.nameEn || 'Unknown',
            dateRange: {
                start: parseYear(monument.startDate),
                end: parseYear(monument.endDate),
            },
            description: monument.monumentBiographyEn || '',
            thumbnailUrl: monument.image || 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=400',
            imageUrl: monument.image || 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=400',
        };
    };

    // Transform monuments to sites for the map
    const filteredSites = useMemo(() => {
        return monuments
            .filter(m => {
                // Only include monuments with valid coordinates
                const lat = parseFloat(m.lat || m.locationLat || '0');
                const lng = parseFloat(m.lng || m.locationLong || '0');
                return lat !== 0 && lng !== 0;
            })
            .map(transformMonumentToSite);
    }, [monuments]);

    // Helper function to get icon based on monument type name
    const getIconForType = (typeName: string) => {
        const lowerName = typeName.toLowerCase();
        if (lowerName.includes('temple')) return Church;
        if (lowerName.includes('pyramid')) return Pyramid;
        if (lowerName.includes('cemetery') || lowerName.includes('tomb')) return Mountain;
        if (lowerName.includes('obelisk')) return Sparkles;
        if (lowerName.includes('mosque') || lowerName.includes('masjid')) return Moon;
        if (lowerName.includes('church')) return Church;
        if (lowerName.includes('school')) return GraduationCap;
        if (lowerName.includes('palace')) return Crown;
        if (lowerName.includes('castle') || lowerName.includes('fort')) return Castle;
        if (lowerName.includes('market') || lowerName.includes('bazaar')) return ShoppingBag;
        if (lowerName.includes('door') || lowerName.includes('gate')) return DoorOpen;
        if (lowerName.includes('house') || lowerName.includes('villa')) return House;
        if (lowerName.includes('sabil') || lowerName.includes('fountain')) return Droplet;
        if (lowerName.includes('hammam') || lowerName.includes('bath')) return Bath;
        if (lowerName.includes('capital') || lowerName.includes('city')) return Landmark;
        return MapPin; // Default icon
    };

    // Generate site type options dynamically from API monument types
    const siteTypes = useMemo(() => {
        const types = [
            { value: 'all', label: tSites('filters.allTypes'), icon: Map, id: null }
        ];

        monumentTypes.forEach((type) => {
            types.push({
                value: type.id.toString(),
                label: type.nameEn,
                icon: getIconForType(type.nameEn),
                id: type.id
            });
        });

        return types;
    }, [monumentTypes, tSites]);

    // Get available dynasties based on selected period
    const availableDynasties = useMemo(() => {
        if (selectedPeriod === 'all') {
            return dynasties;
        }
        // Filter dynasties by selected era
        const era = eras.find(e => e.nameEn === selectedPeriod);
        if (era) {
            return dynasties.filter(d => d.eraId === era.id);
        }
        return [];
    }, [selectedPeriod, dynasties, eras]);

    // Reset dynasty filter when period changes
    const handlePeriodChange = (period: string) => {
        setSelectedPeriod(period);
        setSelectedDynasty('all');
    };

    const formatDate = (year: number) => {
        if (year < 0) {
            return `${Math.abs(year)} ${tCommon('bc')}`;
        } else {
            return `${year} ${tCommon('ad')}`;
        }
    };

    const getPeriodColor = (period: string) => {
        switch (period) {
            case 'Ancient Egyptian':
                return 'bg-amber-500 hover:bg-amber-600';
            case 'Ptolemaic':
                return 'bg-purple-500 hover:bg-purple-600';
            case 'Roman':
                return 'bg-red-500 hover:bg-red-600';
            case 'Byzantine':
                return 'bg-blue-500 hover:bg-blue-600';
            case 'Islamic':
                return 'bg-green-500 hover:bg-green-600';
            default:
                return 'bg-gray-500 hover:bg-gray-600';
        }
    };

    return (
        <div className="min-h-screen bg-theme-accent">
            {/* Header Section - Hidden on Mobile */}
            <div className="hidden md:block pt-24 md:pt-32 pb-8 md:pb-12 px-4 md:px-6 bg-gradient-to-br from-theme-primary/20 via-theme-secondary/10 to-theme-primary/20 border-b border-theme-border">
                <div className="container mx-auto">
                    <div className="text-center mb-6 md:mb-8">
                        <p className="text-theme-primary tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm mb-3 md:mb-4 pt-4 md:pt-6">{tMap('hero.subtitle')}</p>
                        <h1 className="text-theme-text mb-4 md:mb-6 text-2xl md:text-3xl lg:text-4xl">{tMap('hero.title')}</h1>
                        <p className="text-theme-text/70 max-w-3xl mx-auto text-sm md:text-base px-4">
                            {tMap('hero.description')}
                        </p>
                    </div>

                    {/* Find My Location Button - Desktop Only */}
                    <div className="flex justify-center mt-6 md:mt-8">
                        <Button
                            onClick={handleFindMyLocation}
                            className="bg-theme-primary text-white border-2 border-theme-primary hover:bg-theme-primary/90 hover:border-theme-primary/90 shadow-xl hover:shadow-2xl transition-all px-4 md:px-6 py-2.5 md:py-3 rounded-full text-sm md:text-base"
                            severity="info"
                            raised
                        >
                            <Navigation className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                            <span>{tMap('buttons.findLocation')}</span>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Full Width Map Container */}
            <div className="relative w-full h-screen md:h-[calc(100vh-16rem)] pt-20 md:pt-0">
                <div className="flex h-full">
                    {/* Map Section - Full Width */}
                    <div className="flex-1 bg-theme-card relative">
                        {/* Control Buttons - Top Right */}
                        <div className="absolute top-4 right-4 md:right-6 z-20 flex flex-col gap-2">
                            {/* Filter Toggle Button */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center gap-2 px-3 md:px-4 py-2 md:py-3 bg-theme-card border border-theme-border rounded-lg shadow-lg hover:shadow-xl transition-all hover:bg-theme-accent"
                            >
                                <Filter size={18} className="text-theme-primary" />
                                <span className="text-theme-text font-medium text-sm md:text-base">{tMap('buttons.filters')}</span>
                                {!showFilters && (selectedPeriod !== 'all' || selectedDynasty !== 'all' || selectedSiteType !== 'all' || startDate !== -3100 || endDate !== 2025) && (
                                    <span className="ml-1 px-2 py-0.5 bg-theme-primary text-white rounded-full text-xs">
                                        {tMap('buttons.active')}
                                    </span>
                                )}
                            </button>

                            {/* Sites List Toggle Button (Mobile) */}
                            <button
                                onClick={() => setShowSidebar(!showSidebar)}
                                className="lg:hidden flex items-center gap-2 px-3 py-2 bg-theme-card border border-theme-border rounded-lg shadow-lg hover:shadow-xl transition-all hover:bg-theme-accent"
                            >
                                <MapPin size={18} className="text-theme-primary" />
                                <span className="text-theme-text font-medium text-sm">
                                    {tMap('sidebar.title', { count: filteredSites.length })}
                                </span>
                            </button>
                        </div>

                        {/* My Location Button - Mobile Only (Bottom Right) */}
                        <button
                            onClick={handleFindMyLocation}
                            className="md:hidden absolute bottom-6 right-4 z-20 p-4 bg-theme-primary text-white rounded-full shadow-2xl hover:shadow-xl hover:scale-105 transition-all active:scale-95"
                            aria-label="Get my location"
                        >
                            <Navigation className="w-5 h-5" />
                        </button>

                        {/* Filters Panel - Absolute Popup */}
                        {showFilters && (
                            <div className="absolute top-20 md:top-24 left-4 right-4 md:left-auto md:right-6 md:w-[90vw] lg:w-[800px] max-w-[800px] z-20 bg-theme-card border border-theme-border rounded-2xl shadow-2xl p-4 md:p-6 max-h-none md:max-h-[calc(100vh-180px)] overflow-y-visible md:overflow-y-auto">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-2 text-theme-text">
                                        <Filter size={20} />
                                        <h3>{tMap('filters.title')}</h3>
                                    </div>
                                    <button
                                        onClick={() => setShowFilters(false)}
                                        className="text-theme-muted hover:text-theme-text transition-colors"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {/* Row 1: Period & Dynasty */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-theme-text text-sm mb-2">
                                                <span className="flex items-center gap-2">
                                                    {tMap('filters.period')}
                                                </span>
                                            </label>
                                            <select
                                                value={selectedPeriod}
                                                onChange={(e) => handlePeriodChange(e.target.value)}
                                                className="w-full bg-theme-bg border border-theme-border rounded-lg px-4 py-3 text-theme-text focus:outline-none focus:border-theme-primary transition-colors"
                                                disabled={loading}
                                            >
                                                <option value="all">{tMap('filters.allPeriods')}</option>
                                                {eras.map((era) => (
                                                    <option key={era.id} value={era.nameEn}>
                                                        {era.nameEn} {era.fromYear && era.toYear ? `(${era.fromYear} – ${era.toYear})` : ''}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-theme-text text-sm mb-2">{tMap('filters.dynasty')}</label>
                                            <select
                                                value={selectedDynasty}
                                                onChange={(e) => setSelectedDynasty(e.target.value)}
                                                className="w-full bg-theme-bg border border-theme-border rounded-lg px-4 py-3 text-theme-text focus:outline-none focus:border-theme-primary transition-colors"
                                                disabled={loading}
                                            >
                                                <option value="all">{tMap('filters.allDynasties')}</option>
                                                {availableDynasties.map((dynasty) => (
                                                    <option key={dynasty.id} value={dynasty.nameEn}>
                                                        {dynasty.nameEn} {dynasty.fromYear && dynasty.toYear ? `(${dynasty.fromYear} – ${dynasty.toYear})` : ''}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Row 2: Date Range Slider */}
                                    <div>
                                        <div className="mb-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                                            <label className="text-theme-text text-sm">{tMap('filters.dateRange')}</label>
                                            <span className="text-theme-primary text-sm font-medium">
                                                {Math.abs(startDate)} {startDate < 0 ? tCommon('bc') : tCommon('ad')} – {Math.abs(endDate)} {endDate < 0 ? tCommon('bc') : tCommon('ad')}
                                            </span>
                                        </div>
                                        <Slider.Root
                                            className="relative flex items-center select-none touch-none w-full h-2"
                                            value={[startDate, endDate]}
                                            min={-3100}
                                            max={2025}
                                            step={10}
                                            minStepsBetweenThumbs={1}
                                            onValueChange={(values) => {
                                                setStartDate(values[0]);
                                                setEndDate(values[1]);
                                            }}
                                        >
                                            <Slider.Track className="relative grow h-2 bg-theme-accent rounded-full">
                                                <Slider.Range className="absolute h-full bg-theme-primary rounded-full" />
                                            </Slider.Track>
                                            <Slider.Thumb
                                                className="block w-5 h-5 bg-white border-2 border-theme-primary rounded-full shadow-lg hover:scale-110 focus:outline-none focus:ring-2 focus:ring-theme-primary focus:ring-offset-2 transition-transform cursor-grab active:cursor-grabbing"
                                                aria-label="Start Year"
                                            />
                                            <Slider.Thumb
                                                className="block w-5 h-5 bg-white border-2 border-theme-primary rounded-full shadow-lg hover:scale-110 focus:outline-none focus:ring-2 focus:ring-theme-primary focus:ring-offset-2 transition-transform cursor-grab active:cursor-grabbing"
                                                aria-label="End Year"
                                            />
                                        </Slider.Root>
                                        <div className="flex justify-between text-xs text-theme-muted mt-2">
                                            <span>3100 BC</span>
                                            <span>2025 AD</span>
                                        </div>
                                    </div>

                                    {/* Row 3: Site Type Icons */}
                                    <div>
                                        <label className="block text-theme-text mb-3 text-sm">{tMap('filters.siteType')}</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 max-h-[200px] overflow-y-auto pr-2">
                                            {siteTypes.map((type) => {
                                                const Icon = type.icon;
                                                const isSelected = selectedSiteType === type.value;
                                                return (
                                                    <button
                                                        key={type.value}
                                                        onClick={() => setSelectedSiteType(type.value)}
                                                        className={`flex items-center justify-center gap-1.5 px-2 md:px-3 py-2 rounded-lg border-2 transition-all ${isSelected
                                                            ? 'bg-theme-primary border-theme-primary text-white shadow-md'
                                                            : 'bg-theme-bg border-theme-border text-theme-text hover:border-theme-primary hover:bg-theme-accent'
                                                            }`}
                                                        title={type.label}
                                                    >
                                                        <Icon size={16} className="flex-shrink-0" />
                                                        <span className="text-xs md:text-sm truncate">{type.label}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-6 border-t border-gray-200 text-sm text-theme-muted">
                                    {loading ? 'Loading monuments...' : `Showing ${filteredSites.length} monument${filteredSites.length !== 1 ? 's' : ''}`}
                                </div>
                            </div>
                        )}

                        {/* Legend - Hidden on Mobile */}
                        <div className="hidden md:block absolute top-20 right-6 bg-theme-card border border-theme-border rounded-lg p-4 shadow-lg z-10">
                            <div className="text-theme-text mb-3 text-sm font-medium">{tMap('legend.title')}</div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                                    <span className="text-theme-text/70 text-xs">Ancient Egyptian</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                                    <span className="text-theme-text/70 text-xs">Ptolemaic</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                    <span className="text-theme-text/70 text-xs">Roman</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                    <span className="text-theme-text/70 text-xs">Byzantine</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                    <span className="text-theme-text/70 text-xs">Islamic</span>
                                </div>
                            </div>
                        </div>

                        {/* OpenLayers Map */}
                        <div className="w-full h-full relative">
                            {error ? (
                                <div className="flex items-center justify-center h-full bg-theme-accent">
                                    <div className="text-center p-6">
                                        <div className="text-red-500 text-5xl mb-4">⚠️</div>
                                        <h3 className="text-theme-text text-xl font-semibold mb-2">Error Loading Map</h3>
                                        <p className="text-theme-muted">{error}</p>
                                        <button
                                            onClick={() => window.location.reload()}
                                            className="mt-4 px-6 py-2 bg-theme-primary text-white rounded-lg hover:bg-theme-primary/90 transition-colors"
                                        >
                                            Reload Page
                                        </button>
                                    </div>
                                </div>
                            ) : loading ? (
                                <div className="flex items-center justify-center h-full bg-theme-accent">
                                    <div className="text-center">
                                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-theme-primary mx-auto mb-4"></div>
                                        <p className="text-theme-muted">Loading monuments...</p>
                                    </div>
                                </div>
                            ) : (
                                <OpenLayersMap
                                    ref={mapRef}
                                    sites={filteredSites}
                                    onSiteClick={(siteId: any) => router.push(`/sites/${siteId}`)}
                                />
                            )}
                        </div>
                    </div>

                    {/* Sites in View Sidebar - Desktop or Mobile Overlay */}
                    {/* Mobile Backdrop */}
                    {showSidebar && (
                        <div
                            className="lg:hidden fixed inset-0 bg-black/50 z-40"
                            onClick={() => setShowSidebar(false)}
                        />
                    )}

                    <div className={`${showSidebar ? 'fixed' : 'hidden'
                        } lg:relative lg:block inset-0 lg:inset-auto z-50 lg:z-0 w-full lg:w-80 xl:w-96 bg-theme-card lg:border-l border-theme-border flex flex-col overflow-hidden shadow-2xl lg:shadow-none`}>
                        {/* Mobile Header with Close Button */}
                        <div className="lg:hidden sticky top-0 z-10 bg-theme-card border-b border-theme-border p-4 flex items-center justify-between shadow-sm">
                            <h3 className="text-theme-text font-medium">{tMap('sidebar.title', { count: filteredSites.length })}</h3>
                            <button
                                onClick={() => setShowSidebar(false)}
                                className="p-2.5 rounded-lg bg-theme-primary text-white hover:bg-theme-primary/90 transition-colors shadow-md"
                                aria-label="Close sites list"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Desktop Header */}
                        <h3 className="hidden lg:block text-theme-text mb-0 p-4 md:p-6 pb-0">{tMap('sidebar.title', { count: filteredSites.length })}</h3>

                        {/* Sites List */}
                        <div className="space-y-3 flex-1 overflow-y-auto p-4 md:p-6 pt-4">
                            {filteredSites.map((site: any) => (
                                <div
                                    key={site.id}
                                    className={`group relative w-full transition-all duration-300 ${hoveredSite === site.id ? 'z-10' : ''
                                        }`}
                                >
                                    <button
                                        onClick={() => router.push(`/sites/${site.id}`)}
                                        onMouseEnter={() => setHoveredSite(site.id)}
                                        onMouseLeave={() => setHoveredSite(null)}
                                        className={`w-full flex gap-3 p-3 bg-theme-accent border rounded-lg transition-all duration-300 text-left ${hoveredSite === site.id
                                            ? 'border-theme-primary shadow-lg'
                                            : 'border-theme-border hover:border-theme-primary'
                                            }`}
                                    >
                                        {/* Small Image */}
                                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                            <img
                                                src={site.imageUrl}
                                                alt={site.name.english}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start gap-2 mb-1">
                                                <div
                                                    className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${getPeriodColor(site.historicalPeriod)}`}
                                                ></div>
                                                <h4 className="text-theme-text group-hover:text-theme-primary transition-colors text-sm line-clamp-2">
                                                    {site.name.english}
                                                </h4>
                                            </div>
                                            <p className="text-theme-muted text-xs flex items-center gap-1 mb-1">
                                                <MapPin size={10} />
                                                {site.location.city}
                                            </p>
                                            <p className="text-theme-muted/70 text-xs">
                                                {formatDate(site.dateRange.start)} – {formatDate(site.dateRange.end)}
                                            </p>
                                        </div>
                                    </button>

                                    {/* Favorite Button */}
                                    <button
                                        onClick={(e) => toggleFavorite(site.id, e)}
                                        className={`absolute top-3 right-3 p-1.5 rounded-full transition-all hover:scale-110 ${favoriteSites.includes(site.id)
                                            ? 'bg-theme-primary text-white hover:bg-theme-primary/90'
                                            : 'bg-theme-bg text-theme-muted hover:bg-theme-accent hover:text-theme-primary'
                                            }`}
                                        title={favoriteSites.includes(site.id) ? 'Remove from favorites' : 'Add to favorites'}
                                    >
                                        <Heart
                                            size={14}
                                            fill={favoriteSites.includes(site.id) ? 'currentColor' : 'none'}
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Login Modal */}
            <LoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />
        </div>
    );
}