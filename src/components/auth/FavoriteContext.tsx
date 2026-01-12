'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface FavoriteSite {
  id: string;
  name: string;
  location: string;
  period: string;
  historicalDates: string;
  image: string;
}

interface FavoriteContextType {
  favorites: FavoriteSite[];
  addFavorite: (site: FavoriteSite) => void;
  removeFavorite: (siteId: string) => void;
  isFavorite: (siteId: string) => boolean;
  toggleFavorite: (site: FavoriteSite) => void;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export function FavoriteProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteSite[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse favorites', e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites, isInitialized]);

  const addFavorite = (site: FavoriteSite) => {
    setFavorites((prev) => {
      // Don't add if already exists
      if (prev.some((f) => f.id === site.id)) {
        return prev;
      }
      return [...prev, site];
    });
  };

  const removeFavorite = (siteId: string) => {
    setFavorites((prev) => prev.filter((f) => f.id !== siteId));
  };

  const isFavorite = (siteId: string) => {
    return favorites.some((f) => f.id === siteId);
  };

  const toggleFavorite = (site: FavoriteSite) => {
    if (isFavorite(site.id)) {
      removeFavorite(site.id);
    } else {
      addFavorite(site);
    }
  };

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoriteProvider');
  }
  return context;
}
