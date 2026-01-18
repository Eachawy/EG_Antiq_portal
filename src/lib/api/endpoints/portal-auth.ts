// Portal Auth API endpoints

import { httpClient } from '../http';
import type { ApiResponse } from '../types/common';
import type {
  PortalLoginRequest,
  PortalRegisterRequest,
  PortalAuthResponse,
  PortalRefreshTokenRequest,
  PortalRefreshTokenResponse,
  RequestResetPasswordRequest,
  ResetPasswordRequest,
  AppleAuthRequest,
  OAuthResponse,
} from '../types/portal-auth.dto';

export const portalAuthEndpoints = {
  /**
   * Register a new portal user
   */
  async register(data: PortalRegisterRequest): Promise<PortalAuthResponse> {
    const response = await httpClient.post<ApiResponse<PortalAuthResponse>>(
      '/portal/auth/register',
      data
    );
    return response.data.data;
  },

  /**
   * Login portal user with email and password
   */
  async login(credentials: PortalLoginRequest): Promise<PortalAuthResponse> {
    const response = await httpClient.post<ApiResponse<PortalAuthResponse>>(
      '/portal/auth/login',
      credentials
    );
    return response.data.data;
  },

  /**
   * Logout portal user
   */
  async logout(refreshToken: string): Promise<void> {
    await httpClient.post('/portal/auth/logout', { refreshToken });
  },

  /**
   * Refresh access token
   */
  async refreshToken(
    request: PortalRefreshTokenRequest
  ): Promise<PortalRefreshTokenResponse> {
    const response = await httpClient.post<
      ApiResponse<PortalRefreshTokenResponse>
    >('/portal/auth/refresh', request);
    return response.data.data;
  },

  /**
   * Request password reset
   */
  async requestPasswordReset(
    data: RequestResetPasswordRequest
  ): Promise<void> {
    await httpClient.post('/portal/auth/request-reset-password', data);
  },

  /**
   * Reset password with token
   */
  async resetPassword(data: ResetPasswordRequest): Promise<void> {
    await httpClient.post('/portal/auth/reset-password', data);
  },

  /**
   * Initiate Google OAuth login
   * Opens Google OAuth in a popup window
   */
  async loginWithGoogle(): Promise<void> {
    const width = 600;
    const height = 700;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const googleAuthUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/portal/auth/google`;

    window.open(
      googleAuthUrl,
      'Google OAuth',
      `width=${width},height=${height},left=${left},top=${top}`
    );
  },

  /**
   * Initiate Facebook OAuth login
   * Opens Facebook OAuth in a popup window
   */
  async loginWithFacebook(): Promise<void> {
    const width = 600;
    const height = 700;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    const facebookAuthUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/portal/auth/facebook`;

    window.open(
      facebookAuthUrl,
      'Facebook OAuth',
      `width=${width},height=${height},left=${left},top=${top}`
    );
  },

  /**
   * Login with Apple Sign In
   * Uses Apple JS SDK to get identity token, then sends to backend
   */
  async loginWithApple(data: AppleAuthRequest): Promise<OAuthResponse> {
    const response = await httpClient.post<ApiResponse<OAuthResponse>>(
      '/portal/auth/apple',
      data
    );
    return response.data.data;
  },
};
