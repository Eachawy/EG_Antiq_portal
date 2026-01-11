import { httpClient } from '../http';
import type {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '../types/auth.dto';
import type { ApiResponse } from '../types/common';

export const authEndpoints = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await httpClient.post<ApiResponse<LoginResponse>>(
      '/auth/login',
      credentials
    );
    return response.data.data;
  },

  async logout(): Promise<void> {
    await httpClient.post('/auth/logout');
  },

  async refreshToken(
    request: RefreshTokenRequest
  ): Promise<RefreshTokenResponse> {
    const response = await httpClient.post<ApiResponse<RefreshTokenResponse>>(
      '/auth/refresh',
      request
    );
    return response.data.data;
  },
};
