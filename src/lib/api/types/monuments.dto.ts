// Monument-related type definitions matching backend Prisma schema

export interface Era {
  id: number;
  nameEn: string;
  nameAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
  fromYear?: string;
  toYear?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Dynasty {
  id: number;
  nameEn: string;
  nameAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
  fromYear?: string;
  toYear?: string;
  eraId: number;
  era?: Era;
  createdAt: string;
  updatedAt: string;
}

export interface MonumentType {
  id: number;
  nameEn: string;
  nameAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Gallery {
  id: number;
  galleryPath: string;
  galleryDescription?: string;
  monumentId: number;
  createdAt: string;
  updatedAt: string;
}

export interface MonumentDescription {
  id: number;
  descriptionEn?: string;
  descriptionAr?: string;
  monumentId: number;
  createdAt: string;
  updatedAt: string;
}

export interface MonumentEra {
  id: number;
  monumentId: number;
  eraId: number;
  era?: Era;
  createdAt: string;
  updatedAt: string;
}

export interface MonumentSource {
  id: number;
  monumentId: number;
  sourceId: number;
  source?: {
    id: number;
    nameEn: string;
    nameAr: string;
    descriptionEn?: string;
    descriptionAr?: string;
    url?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface MonumentBook {
  id: number;
  monumentId: number;
  bookId: number;
  book?: {
    id: number;
    titleEn: string;
    titleAr: string;
    authorEn?: string;
    authorAr?: string;
    descriptionEn?: string;
    descriptionAr?: string;
    imageUrl?: string;
    publishYear?: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Monument {
  id: number;
  monumentNameEn: string;
  monumentNameAr: string;
  monumentBiographyEn?: string; // Short description
  monumentBiographyAr?: string; // Short description
  image?: string;
  oldName?: string;
  otherName?: string;
  startDate?: string;
  endDate?: string;
  startDateHijri?: string;
  endDateHijri?: string;

  // Location fields - API uses both naming conventions
  lat?: string;
  lng?: string;
  locationLat?: string;
  locationLong?: string;
  locationDescriptionAr?: string;
  locationDescriptionEn?: string;

  // Relations
  dynastyId?: number;
  dynasty?: Dynasty;
  eraId?: number;
  era?: Era; // Direct era relation (used in search/list endpoints)
  monumentTypeId?: number;
  monumentType?: MonumentType;

  // Collections
  galleries?: Gallery[];
  monumentDescriptions?: MonumentDescription[];
  monumentEras?: MonumentEra[]; // Many-to-many era relation (used in detail endpoint)
  monumentSources?: MonumentSource[];
  monumentBooks?: MonumentBook[];

  createdAt: string;
  updatedAt: string;
}

export interface MonumentSearchFilters {
  keyword?: string;
  eraIds?: number[];
  dynastyIds?: number[];
  monumentTypeIds?: number[];
  startDateFrom?: string;
  startDateTo?: string;
  endDateFrom?: string;
  endDateTo?: string;
  page?: number;
  limit?: number;
}

export interface PaginationMeta {
  page: number;
  limit: number; // API returns 'limit', not 'pageSize'
  total: number;
  totalPages: number;
}

export interface MonumentListResponse {
  data: Monument[];
  pagination: PaginationMeta;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}
