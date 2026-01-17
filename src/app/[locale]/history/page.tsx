'use client';
import { useState, useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import { History as HistoryIcon, Clock, Eye, MapPin, Trash2, Search, Compass } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { ImageWithFallback } from '../books/components/ImageWithFallback';

interface HistoryItem {
    id: string;
    siteId: string;
    siteName: string;
    siteImage: string;
    location: string;
    period: string;
    visitedAt: string;
    duration: number; // in seconds
}

export default function HistoryPage() {
    const { isAuthenticated, user } = useAuth();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    // Mock history data
    const [history] = useState<HistoryItem[]>([
        {
            id: '1',
            siteId: '1',
            siteName: 'Great Pyramid of Giza',
            siteImage: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=400',
            location: 'Giza',
            period: 'Old Kingdom',
            visitedAt: '2024-03-20T14:30:00',
            duration: 425,
        },
        {
            id: '2',
            siteId: '2',
            siteName: 'Karnak Temple Complex',
            siteImage: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=400',
            location: 'Luxor',
            period: 'New Kingdom',
            visitedAt: '2024-03-19T10:15:00',
            duration: 680,
        },
        {
            id: '3',
            siteId: '3',
            siteName: 'Valley of the Kings',
            siteImage: 'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?w=400',
            location: 'Luxor',
            period: 'New Kingdom',
            visitedAt: '2024-03-18T16:45:00',
            duration: 540,
        },
        {
            id: '4',
            siteId: '4',
            siteName: 'Abu Simbel Temples',
            siteImage: 'https://images.unsplash.com/photo-1553913861-c0fddf2619ee?w=400',
            location: 'Aswan',
            period: 'New Kingdom',
            visitedAt: '2024-03-15T09:00:00',
            duration: 360,
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

    const filteredHistory = history.filter((item) =>
        item.siteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.period.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

        if (diffInHours < 24) {
            return `${diffInHours} hours ago`;
        } else if (diffInHours < 48) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            });
        }
    };

    const formatDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) {
            return `${minutes} min`;
        } else {
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            return `${hours}h ${remainingMinutes}m`;
        }
    };

    const totalTimeSpent = history.reduce((sum, item) => sum + item.duration, 0);

    return (
        <div className="min-h-screen bg-theme-bg pt-20">
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
                            <div className="text-3xl font-bold text-theme-primary mb-2">{history.length}</div>
                            <div className="text-theme-muted text-sm">Sites Visited</div>
                        </div>
                        <div className="bg-gradient-to-br from-theme-secondary/10 to-theme-secondary/5 border border-theme-secondary/20 rounded-xl p-6 text-center">
                            <div className="text-3xl font-bold text-theme-secondary mb-2">
                                {formatDuration(totalTimeSpent)}
                            </div>
                            <div className="text-theme-muted text-sm">Total Time Spent</div>
                        </div>
                        <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 rounded-xl p-6 text-center">
                            <div className="text-3xl font-bold text-amber-700 dark:text-amber-500 mb-2">
                                {new Set(history.map(h => h.period)).size}
                            </div>
                            <div className="text-theme-muted text-sm">Periods Explored</div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="max-w-4xl mx-auto mb-8 flex justify-end">
                    <Button
                        severity="danger"
                        outlined
                        className="border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 dark:hover:bg-red-500/20 dark:hover:border-red-400 transition-all duration-300 rounded-xl"
                    >
                        <div className="flex items-center gap-2 px-2 py-1">
                            <Trash2 size={18} />
                            <span className="font-medium">Clear All History</span>
                        </div>
                    </Button>
                </div>

                {/* History List */}
                {filteredHistory.length > 0 ? (
                    <div className="max-w-4xl mx-auto space-y-4">
                        {filteredHistory.map((item, index) => (
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
                                            src={item.siteImage}
                                            alt={item.siteName}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold text-theme-text mb-2 group-hover:text-theme-primary transition-colors">
                                                {item.siteName}
                                            </h3>
                                            <div className="flex items-center gap-4 text-sm text-theme-muted mb-3 flex-wrap">
                                                <div className="flex items-center gap-1.5">
                                                    <MapPin size={16} className="text-theme-primary" />
                                                    <span>{item.location}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Clock size={16} className="text-theme-secondary" />
                                                    <span>{formatDateTime(item.visitedAt)}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Eye size={16} className="text-amber-600" />
                                                    <span>{formatDuration(item.duration)}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between gap-3">
                                            <Button
                                                label="Visit Again"
                                                size="small"
                                                onClick={() => router.push(`/sites/${item.siteId}`)}
                                                className="bg-gradient-to-r from-theme-primary to-theme-secondary border-0 hover:shadow-lg hover:scale-105 transition-all h-9"
                                            />
                                            <button
                                                onClick={() => {/* Handle delete */ }}
                                                className="opacity-0 group-hover:opacity-100 transition-all duration-300 h-10 w-10 rounded-full bg-red-500/10 hover:bg-red-500 border border-red-500/30 hover:border-red-500 flex items-center justify-center text-red-600 hover:text-white hover:scale-110 hover:shadow-lg hover:shadow-red-500/30"
                                                aria-label="Delete"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
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