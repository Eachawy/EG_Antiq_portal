// Portal users/profile-related type definitions matching backend

export interface PortalUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  location?: string;
  bio?: string;
  avatar?: string;
  emailVerified: boolean;
  status: 'ACTIVE' | 'DEACTIVATED';
  createdAt: string;
  lastLoginAt?: string;
  updatedAt?: string;
}

export interface UpdateProfileDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  location?: string;
  bio?: string;
  avatar?: string;
}

export interface UserStats {
  favoritesCount: number;
  browsingHistoryCount: number;
  savedSearchesCount: number;
  memberSince: string;
  lastLogin?: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
}
