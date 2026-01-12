// Uncomment when backend is ready:
// import { authEndpoints } from '@/lib/api/endpoints/auth';
import type { LoginRequest, LoginResponse, User } from '@/lib/api/types/auth.dto';
import { setToken, clearToken } from '../utils/token';

export const authService = {
  async login(credentials: LoginRequest): Promise<User> {
    // For demonstration, use mock response
    // Replace with actual API call when backend is ready
    const mockResponse: LoginResponse = {
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: '1',
        email: credentials.email,
        name: 'Demo User',
        avatar: undefined,
        role: 'user',
      },
    };

    // Uncomment when backend is ready:
    // const response = await authEndpoints.login(credentials);

    // Set token in cookie
    setToken(mockResponse.token);

    return mockResponse.user;
  },

  async logout(): Promise<void> {
    // Clear token
    clearToken();

    // Uncomment when backend is ready:
    // await authEndpoints.logout();
  },

  async getCurrentUser(): Promise<User | null> {
    // In a real app, fetch current user from API using token
    // For now, return mock user if token exists
    return null;
  },
};
