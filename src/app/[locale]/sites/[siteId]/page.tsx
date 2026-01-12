'use client';

import { useParams } from 'next/navigation';
import { useRouter } from '@/i18n/routing';
import { archaeologicalSites } from '../../about/data/sitesData';
import { MapPin, Clock, Info, Calendar, ExternalLink, Globe, ArrowLeft, BookOpen, Heart } from 'lucide-react';
import { ImageGallery } from './components/ImageGallery';
import { useFavorites } from '../../../../components/auth/FavoriteContext';
import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from 'react';
// import { Toast } from 'primereact/toast';
import { useAuth } from '@/components/auth/AuthContext';
import { LoginModal } from '@/components/auth/LoginModal';

export default function SiteDetailsPage() {
    const params = useParams();
    const id = params.siteId as string;
    const router = useRouter();
    const site = archaeologicalSites.find((s: any) => s.id === id);
    const { isAuthenticated } = useAuth();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    // Gallery images - using Unsplash images for demonstration
    const galleryImages = [
        site?.imageUrl || '',
        'https://images.unsplash.com/photo-1662552445554-3827a206e9e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwZWd5cHQlMjB0ZW1wbGV8ZW58MXx8fHwxNzY2NDI1NjQxfDA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1754400288636-e33747764621?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ3lwdGlhbiUyMHB5cmFtaWQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjY0MjU2NDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1764792522789-dcdc8befd767?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ3lwdGlhbiUyMGhpZXJvZ2x5cGhpY3MlMjB3YWxsfGVufDF8fHx8MTc2NjQyNTY0Mnww&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1568322445389-dc9223328f88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlZ3lwdGlhbiUyMHBoYXJhb2glMjBzdGF0dWV8ZW58MXx8fHwxNzY2MzM5NDI2fDA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1673550416827-d9377d594926?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwZWd5cHQlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzY2NDI1NjQyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    ];

    // Related books data
    const relatedBooks = [
        {
            id: 1,
            title: "The Complete Valley of the Kings",
            author: "Nicholas Reeves & Richard H. Wilkinson",
            imageUrl: "https://images.unsplash.com/photo-1758557126749-7e85870d035a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmNpZW50JTIwZWd5cHQlMjBib29rfGVufDF8fHx8MTc2NjQxODU4NXww&ixlib=rb-4.1.0&q=80&w=1080",
            publisher: "Thames & Hudson",
            year: 2008
        },
        {
            id: 2,
            title: "The Oxford History of Ancient Egypt",
            author: "Ian Shaw",
            imageUrl: "https://images.unsplash.com/photo-1668166542034-b8178566e318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcmNoYWVvbG9neSUyMGJvb2slMjBjb3ZlcnxlbnwxfHx8fDE3NjY0MTg1ODV8MA&ixlib=rb-4.1.0&q=80&w=1080",
            publisher: "Oxford University Press",
            year: 2000
        },
        {
            id: 3,
            title: "Ancient Egypt: Anatomy of a Civilization",
            author: "Barry J. Kemp",
            imageUrl: "https://images.unsplash.com/photo-1472173148041-00294f0814a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXN0b3J5JTIwYm9va3xlbnwxfHx8fDE3NjYzOTk0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
            publisher: "Routledge",
            year: 2018
        }
    ];

    if (!site) {
        return (
            <div className="min-h-screen bg-theme-bg flex items-center justify-center py-24">
                <div className="text-center">
                    <h2 className="text-theme-text mb-4">Site Not Found</h2>
                    <button
                        onClick={() => router.push('/sites')}
                        className="bg-theme-primary hover:bg-theme-secondary text-white px-6 py-3 rounded-lg transition-colors"
                    >
                        Back to Sites Directory
                    </button>
                </div>
            </div>
        );
    }

    const formatDate = (year: number) => {
        if (year < 0) {
            return `${Math.abs(year)} BC`;
        } else {
            return `${year} AD`;
        }
    };

    const getTimelineDuration = (start: number, end: number) => {
        const duration = Math.abs(end - start);
        return `${duration} years`;
    };

    const nearbySites = archaeologicalSites.filter((s: { id: any; }) => site.nearbySites.includes(s.id));

    const { isFavorite, toggleFavorite } = useFavorites();

    const formatDateRange = (start: number, end: number) => {
        return `${formatDate(start)} – ${formatDate(end)}`;
    };

    const handleFavoriteToggle = () => {
        if (!isAuthenticated) {
            setIsLoginModalOpen(true);
            return;
        }

        const favoriteSite = {
            id: site.id,
            name: site.name.english,
            location: `${site.location.city}, ${site.location.governorate}`,
            period: site.historicalPeriod,
            historicalDates: formatDateRange(site.dateRange.start, site.dateRange.end),
            image: site.thumbnailUrl,
        };

        toggleFavorite(favoriteSite);

        // if (isFavorite(site.id)) {
        //   Toast.success(`Removed from favorites`);
        // } else {
        //   Toast.success(`Added to favorites`);
        // }
    };

    return (
        <div className="min-h-screen bg-theme-bg">
            {/* Full-Width Hero Image */}
            <div className="relative h-[60vh] md:h-[70vh] w-full mb-12">
                <img src={site.imageUrl} alt={site.name.english} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* Back Button - Positioned over hero */}
                <button
                    onClick={() => router.push('/sites')}
                    className="absolute top-24 md:top-28 left-6 md:left-12 text-white hover:text-theme-primary transition-colors flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg"
                >
                    <ArrowLeft size={20} />
                    <span>Back to Sites Directory</span>
                </button>

                {/* Hero Content */}
                <div className="absolute bottom-0 left-0 right-0">
                    <div className="container mx-auto px-6 md:px-12 pb-8 md:pb-12">
                        <h1 className="text-white mb-4 md:mb-6">{site.name.english}</h1>
                        <div className="flex flex-wrap gap-3 md:gap-4">
                            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm">
                                {site.historicalPeriod}
                            </span>
                            <span className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm flex items-center gap-2">
                                <MapPin size={16} />
                                {site.location.city}, {site.location.governorate}
                            </span>
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
                                    Description
                                </h3>
                                <p className="text-theme-text leading-relaxed mb-6">{site.description}</p>

                                <h4 className="text-theme-primary mb-3">Historical Significance</h4>
                                <p className="text-theme-text/80 leading-relaxed">{site.significance}</p>
                            </div>

                            {/* Image Gallery with Slider */}
                            <ImageGallery images={galleryImages} siteName={site.name.english} />

                            {/* Sources */}
                            <div className="bg-theme-card border border-theme-border rounded-xl p-8">
                                <h3 className="text-theme-primary mb-4 flex items-center gap-2">
                                    <ExternalLink size={24} />
                                    Sources
                                </h3>
                                <p className="text-theme-muted text-sm mb-4">Reliable and verifiable references</p>

                                <div className="space-y-3">
                                    <div className="p-4 bg-theme-accent rounded-lg hover:bg-theme-accent/70 transition-colors">
                                        <div className="text-theme-text mb-1">UNESCO World Heritage Centre</div>
                                        <a
                                            href="https://whc.unesco.org/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-theme-primary hover:text-theme-secondary text-sm flex items-center gap-1"
                                        >
                                            whc.unesco.org <ExternalLink size={12} />
                                        </a>
                                    </div>

                                    <div className="p-4 bg-theme-accent rounded-lg hover:bg-theme-accent/70 transition-colors">
                                        <div className="text-theme-text mb-1">Egyptian Ministry of Tourism and Antiquities</div>
                                        <a
                                            href="https://egymonuments.gov.eg/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-theme-primary hover:text-theme-secondary text-sm flex items-center gap-1"
                                        >
                                            egymonuments.gov.eg <ExternalLink size={12} />
                                        </a>
                                    </div>

                                    <div className="p-4 bg-theme-accent rounded-lg hover:bg-theme-accent/70 transition-colors">
                                        <div className="text-theme-text mb-1">Digital Egypt for Universities (UCL)</div>
                                        <a
                                            href="https://www.ucl.ac.uk/museums-static/digitalegypt/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-theme-primary hover:text-theme-secondary text-sm flex items-center gap-1"
                                        >
                                            ucl.ac.uk/digitalegypt <ExternalLink size={12} />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Related Books */}
                            <div className="bg-theme-card border border-theme-border rounded-xl p-8">
                                <h3 className="text-theme-primary mb-4 flex items-center gap-2">
                                    <BookOpen size={24} />
                                    Related Books
                                </h3>
                                <p className="text-theme-muted text-sm mb-6">Further reading on ancient Egypt</p>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    {relatedBooks.map(book => (
                                        <div key={book.id} className="bg-theme-accent rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
                                            <div className="aspect-[3/4] overflow-hidden">
                                                <img
                                                    src={book.imageUrl}
                                                    alt={book.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            </div>
                                            <div className="p-4">
                                                <h4 className="text-theme-text mb-2 line-clamp-2">{book.title}</h4>
                                                <p className="text-theme-muted text-sm mb-1">{book.author}</p>
                                                <p className="text-theme-muted text-xs mb-3">{book.publisher}, {book.year}</p>
                                                <a
                                                    href={`https://www.google.com/search?q=${encodeURIComponent(book.title + ' ' + book.author + ' book')}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-theme-primary/10 hover:bg-theme-primary hover:text-white text-theme-primary rounded-lg text-sm font-medium transition-all duration-300 group"
                                                >
                                                    <span>Find Book</span>
                                                    <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Favorite Button */}
                            <div className="bg-theme-card border border-theme-border rounded-xl p-6">
                                <h4 className="text-theme-primary mb-4">Favorite</h4>
                                <button
                                    onClick={handleFavoriteToggle}
                                    className={`w-full p-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 border-2 ${isFavorite(site.id)
                                        ? 'bg-theme-primary/10 border-theme-primary text-theme-primary hover:bg-theme-primary/20'
                                        : 'bg-theme-accent hover:bg-theme-primary/10 border-theme-border hover:border-theme-primary text-theme-text'
                                        }`}
                                >
                                    <Heart
                                        size={20}
                                        className={isFavorite(site.id) ? 'fill-theme-primary text-theme-primary' : ''}
                                    />
                                    <span className="font-medium">
                                        {isFavorite(site.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                                    </span>
                                </button>
                            </div>

                            {/* Quick Info */}
                            <div className="bg-theme-card border border-theme-border rounded-xl p-6">
                                <h4 className="text-theme-primary mb-4">Quick Information</h4>

                                <div className="space-y-4">
                                    <div>
                                        <div className="text-theme-muted text-sm mb-1">Location</div>
                                        <div className="text-theme-text">{site.location.city}</div>
                                        <div className="text-theme-text/70 text-sm">{site.location.governorate}</div>
                                    </div>

                                    <div className="border-t border-theme-border pt-4">
                                        <div className="text-theme-muted text-sm mb-1">Period</div>
                                        <div className="text-theme-text">{site.historicalPeriod}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div className="bg-theme-card border border-theme-border rounded-xl p-6">
                                <h4 className="text-theme-primary mb-4 flex items-center gap-2">
                                    <Calendar size={20} />
                                    Timeline
                                </h4>

                                <div className="relative">
                                    {/* Timeline Bar */}
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-theme-primary/30"></div>

                                    <div className="space-y-6 ml-6">
                                        <div className="relative">
                                            <div className="absolute -left-[30px] top-0 w-4 h-4 rounded-full bg-theme-primary border-4 border-theme-bg"></div>
                                            <div>
                                                <div className="text-theme-primary text-sm mb-1">Start Period</div>
                                                <div className="text-theme-text">{formatDate(site.dateRange.start)}</div>
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <div className="absolute -left-[30px] top-0 w-4 h-4 rounded-full bg-theme-secondary border-4 border-theme-bg"></div>
                                            <div>
                                                <div className="text-theme-primary text-sm mb-1">End Period</div>
                                                <div className="text-theme-text">{formatDate(site.dateRange.end)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 p-3 bg-theme-accent rounded-lg">
                                    <div className="flex items-center gap-2 text-theme-text text-sm">
                                        <Clock size={16} />
                                        <span>Duration: {getTimelineDuration(site.dateRange.start, site.dateRange.end)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Google Map */}
                            <div className="bg-theme-card border border-theme-border rounded-xl p-6">
                                <h4 className="text-theme-primary mb-4 flex items-center gap-2">
                                    <Globe size={20} />
                                    Location Map
                                </h4>

                                <div className="bg-theme-accent rounded-lg overflow-hidden aspect-video flex items-center justify-center">
                                    <div className="text-center">
                                        <MapPin className="text-theme-primary mx-auto mb-2" size={36} />
                                        <p className="text-theme-text text-sm mb-1">Interactive Map</p>
                                        <p className="text-theme-text/60 text-xs mb-3">
                                            {site.location.coordinates.lat.toFixed(4)}, {site.location.coordinates.lng.toFixed(4)}
                                        </p>
                                        <a
                                            href={`https://www.google.com/maps?q=${site.location.coordinates.lat},${site.location.coordinates.lng}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-theme-primary hover:text-theme-secondary transition-colors text-sm"
                                        >
                                            <span>Open in Google Maps</span>
                                            <ExternalLink size={14} />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Nearby Sites */}
                            {nearbySites.length > 0 && (
                                <div className="bg-theme-card border border-theme-border rounded-xl p-6">
                                    <h4 className="text-theme-primary mb-4">Nearby Sites</h4>
                                    <div className="space-y-3">
                                        {nearbySites.map((nearbySite: { id: Key | null | undefined; name: { english: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }; location: { city: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; }; }) => (
                                            <button
                                                key={nearbySite.id}
                                                onClick={() => router.push(`/sites/${nearbySite.id}`)}
                                                className="w-full text-left block p-3 bg-theme-accent hover:bg-theme-accent/70 rounded-lg transition-colors group"
                                            >
                                                <div className="text-theme-text group-hover:text-theme-primary text-sm mb-1">
                                                    {nearbySite.name.english}
                                                </div>
                                                <div className="text-theme-muted text-xs flex items-center gap-1">
                                                    <MapPin size={12} />
                                                    {nearbySite.location.city}
                                                </div>
                                            </button>
                                        ))}
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