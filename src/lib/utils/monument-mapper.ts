// Monument data transformation utilities

import { Monument, Era } from '../api/types/monuments.dto';
import { getImageUrl } from './image-url';

// Frontend ArchaeologicalSite interface (for backward compatibility)
export interface ArchaeologicalSite {
  id: string;
  name: {
    english: string;
    arabic: string;
  };
  description: string;
  location: {
    lat: number;
    lng: number;
    city: string;
    governorate: string;
  };
  historicalPeriod: string;
  dynasty?: string;
  dateRange: {
    start: number;
    end: number;
  };
  images: string[];
  thumbnailUrl: string;
  mainImage: string;
  type: string;
  oldName?: string;
  otherName?: string;
}

/**
 * Convert backend Monument to frontend ArchaeologicalSite format
 * @param monument - Backend Monument object
 * @param locale - Current locale ('en' | 'ar')
 * @returns ArchaeologicalSite object
 */
export function mapMonumentToSite(
  monument: Monument,
  locale: 'en' | 'ar'
): ArchaeologicalSite {
  // Get description - prefer monumentDescriptions, fallback to monumentBiography
  const description =
    monument.monumentDescriptions && monument.monumentDescriptions.length > 0
      ? locale === 'ar'
        ? monument.monumentDescriptions[0].descriptionAr || ''
        : monument.monumentDescriptions[0].descriptionEn || ''
      : locale === 'ar'
      ? monument.monumentBiographyAr || ''
      : monument.monumentBiographyEn || '';

  const images = getMonumentGalleryUrls(monument);
  const mainImage = getMonumentImageUrl(monument);

  // Get era name - check both direct era field and monumentEras array
  const eraName = monument.era
    ? locale === 'ar'
      ? monument.era.nameAr
      : monument.era.nameEn
    : monument.monumentEras && monument.monumentEras.length > 0
    ? locale === 'ar'
      ? monument.monumentEras[0].era?.nameAr || ''
      : monument.monumentEras[0].era?.nameEn || ''
    : '';

  const dynastyName = monument.dynasty
    ? locale === 'ar'
      ? monument.dynasty.nameAr
      : monument.dynasty.nameEn
    : '';

  const monumentTypeName = monument.monumentType
    ? locale === 'ar'
      ? monument.monumentType.nameAr
      : monument.monumentType.nameEn
    : '';

  // Format date range
  let dateStr = '';
  if (monument.startDate || monument.endDate) {
    const start = monument.startDate || '';
    const end = monument.endDate || '';
    dateStr = start && end ? `${start} - ${end}` : start || end;
  }

  // Handle both lat/lng and locationLat/locationLong field names
  const lat = (monument as any).lat || monument.locationLat;
  const lng = (monument as any).lng || monument.locationLong;

  // Parse location description to extract city/governorate if available
  const locationDesc =
    locale === 'ar'
      ? monument.locationDescriptionAr
      : monument.locationDescriptionEn;
  const city = locationDesc || monument.monumentNameEn;
  const governorate = ''; // Backend doesn't provide this separately

  // Parse dates to numbers for dateRange
  const startYear = monument.startDate ? parseInt(monument.startDate) : 0;
  const endYear = monument.endDate ? parseInt(monument.endDate) : 0;

  return {
    id: monument.id.toString(),
    name: {
      english: monument.monumentNameEn,
      arabic: monument.monumentNameAr,
    },
    description,
    location: {
      lat: lat ? parseFloat(lat) : 0,
      lng: lng ? parseFloat(lng) : 0,
      city,
      governorate,
    },
    historicalPeriod: eraName,
    dynasty: dynastyName,
    dateRange: {
      start: startYear,
      end: endYear,
    },
    images,
    thumbnailUrl: mainImage,
    mainImage,
    type: monumentTypeName,
    oldName: monument.oldName,
    otherName: monument.otherName,
  };
}

/**
 * Get main monument image URL
 * @param monument - Monument object
 * @returns Image URL or placeholder
 */
export function getMonumentImageUrl(monument: Monument): string {
  // Prefer gallery images
  if (monument.galleries && monument.galleries.length > 0) {
    return getImageUrl(monument.galleries[0].galleryPath);
  }

  // Fallback to monument.image field
  if (monument.image) {
    return getImageUrl(monument.image);
  }

  // Return placeholder if no images
  return '/images/placeholder.jpg';
}

/**
 * Get all monument gallery image URLs
 * @param monument - Monument object
 * @returns Array of image URLs
 */
export function getMonumentGalleryUrls(monument: Monument): string[] {
  if (!monument.galleries || monument.galleries.length === 0) {
    return monument.image ? [getImageUrl(monument.image)] : [];
  }

  return monument.galleries.map((gallery) => getImageUrl(gallery.galleryPath));
}

/**
 * Map era to historical period (for backward compatibility)
 * @param era - Era object
 * @returns Period string
 */
export function mapEraToPeriod(era: Era, locale: 'en' | 'ar'): string {
  return locale === 'ar' ? era.nameAr : era.nameEn;
}

/**
 * Parse date string to number (BCE as negative)
 * @param dateStr - Date string (e.g., "3000 BCE", "1500 CE")
 * @returns Number representation of date
 */
export function parseDate(dateStr?: string): number {
  if (!dateStr) return 0;

  const match = dateStr.match(/(\d+)\s*(BCE|CE|BC|AD)?/i);
  if (!match) return 0;

  const year = parseInt(match[1], 10);
  const era = match[2]?.toUpperCase();

  // BCE/BC dates are negative
  if (era === 'BCE' || era === 'BC') {
    return -year;
  }

  return year;
}
