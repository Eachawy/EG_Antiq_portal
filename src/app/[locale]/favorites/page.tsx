'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import { Heart, MapPin, Calendar, Trash2, Search } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';
import { useFavorites } from '@/components/auth/FavoriteContext';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ImageWithFallback } from '../books/components/ImageWithFallback';

export default function FavoritesPage() {
  const { isAuthenticated, user } = useAuth();
  const { favorites, removeFavorite } = useFavorites();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - populate favorites if empty (for demo)
  useEffect(() => {
    if (favorites.length === 0 && isAuthenticated) {
      // Add some mock favorites
      const mockFavorites = [
        {
          id: '1',
          name: 'Great Pyramid of Giza',
          location: 'Giza Plateau, Cairo',
          period: 'Old Kingdom',
          historicalDates: 'c. 2580-2560 BCE',
          image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=400',
        },
        {
          id: '2',
          name: 'Karnak Temple Complex',
          location: 'Luxor, Upper Egypt',
          period: 'New Kingdom',
          historicalDates: 'c. 2055-100 BCE',
          image: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=400',
        },
      ];
      // Note: In real use, favorites would be added through user interaction
    }
  }, [favorites.length, isAuthenticated]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated || !user) {
      router.push('/');
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  const filteredFavorites = favorites.filter((site) =>
    site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    site.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    site.period.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-theme-bg pt-20">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-theme-primary/20 via-theme-accent to-theme-secondary/20 py-16 border-b border-theme-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-theme-card rounded-2xl shadow-lg">
                <Heart size={48} className="text-theme-primary" />
              </div>
            </div>
            <h1 className="text-theme-text mb-4">My Favorite Sites</h1>
            <p className="text-theme-muted text-lg max-w-2xl mx-auto">
              Your collection of favorite archaeological sites in Ancient Egypt
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
              placeholder="Search your favorites..."
              className="w-full bg-theme-card border-theme-border text-theme-text placeholder:text-theme-muted"
            />
          </span>
        </div>

        {/* Stats */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-theme-primary/10 to-theme-primary/5 border border-theme-primary/20 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-theme-primary mb-2">{favorites.length}</div>
              <div className="text-theme-muted text-sm">Total Favorites</div>
            </div>
            <div className="bg-gradient-to-br from-theme-secondary/10 to-theme-secondary/5 border border-theme-secondary/20 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-theme-secondary mb-2">{filteredFavorites.length}</div>
              <div className="text-theme-muted text-sm">Filtered Results</div>
            </div>
            <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-amber-700 dark:text-amber-500 mb-2">
                {new Set(favorites.map(f => f.period)).size}
              </div>
              <div className="text-theme-muted text-sm">Periods</div>
            </div>
          </div>
        </div>

        {/* Favorites Grid */}
        {filteredFavorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFavorites.map((site, index) => (
              <div
                key={site.id}
                className="group bg-gradient-to-br from-theme-card to-theme-card/50 border border-theme-border rounded-2xl overflow-hidden hover:shadow-2xl hover:border-theme-primary/40 transition-all duration-500 hover:-translate-y-2"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback
                    src={site.image}
                    alt={site.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFavorite(site.id)}
                    className="absolute top-4 right-4 p-2.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all shadow-lg hover:scale-110 active:scale-95"
                  >
                    <Trash2 size={18} />
                  </button>

                  {/* Period Badge */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-theme-primary to-theme-secondary text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
                    {site.period}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-theme-text mb-3 group-hover:text-theme-primary transition-colors">
                    {site.name}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-theme-muted text-sm">
                      <MapPin size={16} className="text-theme-primary" />
                      <span>{site.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-theme-muted text-sm">
                      <Calendar size={16} className="text-theme-secondary" />
                      <span>{site.historicalDates}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push(`/sites/${site.id}`)}
                    className="w-full py-2.5 bg-gradient-to-r from-theme-primary to-theme-secondary text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center py-16">
            <div className="bg-theme-card border border-theme-border rounded-2xl p-12">
              <Heart size={64} className="text-theme-muted mx-auto mb-4 opacity-50" />
              <h3 className="text-theme-text text-xl mb-2">
                {searchTerm ? 'No Results Found' : 'No Favorites Yet'}
              </h3>
              <p className="text-theme-muted mb-6">
                {searchTerm
                  ? 'Try adjusting your search terms'
                  : 'Start exploring sites and add them to your favorites'}
              </p>
              {!searchTerm && (
                <Button
                  label="Explore Sites"
                  icon="pi pi-compass"
                  onClick={() => router.push('/sites')}
                  className="bg-theme-primary hover:bg-theme-secondary border-0"
                />
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