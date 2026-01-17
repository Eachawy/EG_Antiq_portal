'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { favoriteEndpoints } from '@/lib/api/endpoints';

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
  const { isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState<FavoriteSite[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Map<string, string>>(new Map()); // monumentId -> favoriteId
  const [isInitialized, setIsInitialized] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Load favorites (from backend if authenticated, localStorage otherwise)
  useEffect(() => {
    const loadFavorites = async () => {
      setIsSyncing(true);
      try {
        if (isAuthenticated) {
          // Fetch from backend
          const response = await favoriteEndpoints.getAll(1, 1000);
          const backendFavorites: FavoriteSite[] = response.data.map((fav) => ({
            id: fav.monumentId.toString(),
            name: fav.monument?.monumentNameEn || '',
            location: fav.monument?.locationDescriptionEn || '',
            period: fav.monument?.monumentEras?.[0]?.era?.nameEn || '',
            historicalDates: `${fav.monument?.startDate || ''} - ${fav.monument?.endDate || ''}`,
            image: fav.monument?.image || fav.monument?.galleries?.[0]?.galleryPath || '',
          }));

          // Build favoriteIds map
          const idsMap = new Map<string, string>();
          response.data.forEach((fav) => {
            idsMap.set(fav.monumentId.toString(), fav.id);
          });

          setFavorites(backendFavorites);
          setFavoriteIds(idsMap);
        } else {
          // Load from localStorage
          const saved = localStorage.getItem('favorites');
          if (saved) {
            try {
              setFavorites(JSON.parse(saved));
            } catch (e) {
              console.error('Failed to parse favorites', e);
            }
          }
        }
      } catch (error) {
        console.error('Failed to load favorites:', error);
        // Fall back to localStorage on error
        const saved = localStorage.getItem('favorites');
        if (saved) {
          try {
            setFavorites(JSON.parse(saved));
          } catch (e) {
            console.error('Failed to parse favorites', e);
          }
        }
      } finally {
        setIsSyncing(false);
        setIsInitialized(true);
      }
    };

    loadFavorites();
  }, [isAuthenticated]);

  // Save to localStorage only for unauthenticated users
  useEffect(() => {
    if (isInitialized && !isAuthenticated && !isSyncing) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites, isInitialized, isAuthenticated, isSyncing]);

  const addFavorite = async (site: FavoriteSite) => {
    // Don't add if already exists
    if (favorites.some((f) => f.id === site.id)) {
      return;
    }

    if (isAuthenticated) {
      // Add to backend
      try {
        const favorite = await favoriteEndpoints.add(parseInt(site.id));
        setFavoriteIds((prev) => new Map(prev).set(site.id, favorite.id));
        setFavorites((prev) => [...prev, site]);
      } catch (error) {
        console.error('Failed to add favorite:', error);
      }
    } else {
      // Add to localStorage
      setFavorites((prev) => [...prev, site]);
    }
  };

  const removeFavorite = async (siteId: string) => {
    if (isAuthenticated) {
      // Remove from backend
      const favoriteId = favoriteIds.get(siteId);
      if (favoriteId) {
        try {
          await favoriteEndpoints.remove(favoriteId);
          setFavoriteIds((prev) => {
            const newMap = new Map(prev);
            newMap.delete(siteId);
            return newMap;
          });
          setFavorites((prev) => prev.filter((f) => f.id !== siteId));
        } catch (error) {
          console.error('Failed to remove favorite:', error);
        }
      }
    } else {
      // Remove from localStorage
      setFavorites((prev) => prev.filter((f) => f.id !== siteId));
    }
  };

  const isFavorite = (siteId: string) => {
    return favorites.some((f) => f.id === siteId);
  };

  const toggleFavorite = async (site: FavoriteSite) => {
    if (isFavorite(site.id)) {
      await removeFavorite(site.id);
    } else {
      await addFavorite(site);
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
