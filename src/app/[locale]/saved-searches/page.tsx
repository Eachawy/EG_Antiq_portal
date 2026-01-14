'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import { BookMarked, Search, MapPin, Calendar, Clock, Trash2, Play } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

interface SavedSearch {
    id: string;
    name: string;
    query: string;
    filters: {
        period?: string;
        location?: string;
        dateRange?: string;
    };
    createdAt: string;
    resultsCount: number;
}

export default function SavedSearchPage() {
    const { isAuthenticated, user } = useAuth();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    // Mock saved searches data
    const [savedSearches] = useState<SavedSearch[]>([
        {
            id: '1',
            name: 'Old Kingdom Pyramids',
            query: 'pyramid',
            filters: {
                period: 'Old Kingdom',
                location: 'Giza',
            },
            createdAt: '2024-01-15',
            resultsCount: 8,
        },
        {
            id: '2',
            name: 'Luxor Temples',
            query: 'temple',
            filters: {
                period: 'New Kingdom',
                location: 'Luxor',
            },
            createdAt: '2024-01-20',
            resultsCount: 12,
        },
        {
            id: '3',
            name: 'Ptolemaic Sites',
            query: '',
            filters: {
                period: 'Ptolemaic',
                dateRange: '305-30 BCE',
            },
            createdAt: '2024-02-01',
            resultsCount: 15,
        },
    ]);

    // Redirect if not authenticated
    useEffect(() => {
        if (!isAuthenticated || !user) {
            router.push('/');
        }
    }, [isAuthenticated, user, router]);

    if (!isAuthenticated || !user) {
        return null;
    }

    const filteredSearches = savedSearches.filter((search) =>
        search.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        search.query.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRunSearch = (search: SavedSearch) => {
        // Navigate to sites page with filters
        const params = new URLSearchParams();
        if (search.query) params.set('q', search.query);
        if (search.filters.period) params.set('period', search.filters.period);
        if (search.filters.location) params.set('location', search.filters.location);
        router.push(`/sites?${params.toString()}`);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <div className="min-h-screen bg-theme-bg pt-20">
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
                                {savedSearches.reduce((sum, s) => sum + s.resultsCount, 0)}
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
                                            {search.query && (
                                                <div className="flex items-center gap-2 text-theme-muted text-sm mb-3">
                                                    <Search size={16} className="text-theme-primary" />
                                                    <span className="font-mono bg-theme-accent px-3 py-1 rounded-lg">
                                                        "{search.query}"
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all hover:scale-110 active:scale-95"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>

                                    {/* Filters */}
                                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                                        {search.filters.period && (
                                            <div className="flex items-center gap-1.5 bg-gradient-to-r from-theme-primary/10 to-theme-primary/5 text-theme-primary border border-theme-primary/20 px-3 py-1.5 rounded-full text-sm font-medium">
                                                <Calendar size={14} />
                                                <span>{search.filters.period}</span>
                                            </div>
                                        )}
                                        {search.filters.location && (
                                            <div className="flex items-center gap-1.5 bg-gradient-to-r from-theme-secondary/10 to-theme-secondary/5 text-theme-secondary border border-theme-secondary/20 px-3 py-1.5 rounded-full text-sm font-medium">
                                                <MapPin size={14} />
                                                <span>{search.filters.location}</span>
                                            </div>
                                        )}
                                        {search.filters.dateRange && (
                                            <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500/10 to-amber-500/5 text-amber-700 dark:text-amber-500 border border-amber-500/20 px-3 py-1.5 rounded-full text-sm font-medium">
                                                <Clock size={14} />
                                                <span>{search.filters.dateRange}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Meta Info */}
                                    <div className="flex items-center justify-between pt-4 border-t border-theme-border/60">
                                        <div className="flex items-center gap-4 text-sm text-theme-muted">
                                            <div className="flex items-center gap-1.5">
                                                <Clock size={16} />
                                                <span>{formatDate(search.createdAt)}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <span className="font-semibold text-theme-primary">{search.resultsCount}</span>
                                                <span>results</span>
                                            </div>
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