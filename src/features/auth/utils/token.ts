import Cookies from 'js-cookie';

const TOKEN_KEY = 'auth_token';

export function getToken(): string | undefined {
  if (typeof window === 'undefined') {
    // Server-side: token is read from cookies via middleware
    return undefined;
  }

  // Client-side: read from cookie
  return Cookies.get(TOKEN_KEY);
}

export function setToken(token: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  // Set cookie with secure options
  Cookies.set(TOKEN_KEY, token, {
    expires: 7, // 7 days
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });
}

export function clearToken(): void {
  if (typeof window === 'undefined') {
    return;
  }

  Cookies.remove(TOKEN_KEY, { path: '/' });
}

export function hasToken(): boolean {
  return !!getToken();
}
