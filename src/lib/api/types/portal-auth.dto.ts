// Portal Auth API DTOs

export interface PortalUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PortalLoginRequest {
  email: string;
  password: string;
}

export interface PortalRegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface PortalAuthResponse {
  user: PortalUser;
  accessToken: string;
  refreshToken: string;
}

export interface PortalRefreshTokenRequest {
  refreshToken: string;
}

export interface PortalRefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RequestResetPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface AppleAuthRequest {
  identityToken: string;
  user?: {
    name?: {
      firstName?: string;
      lastName?: string;
    };
    email?: string;
  };
}

export interface OAuthResponse {
  user: PortalUser;
  accessToken: string;
  refreshToken: string;
}
