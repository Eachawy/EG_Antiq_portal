import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  // 1. Handle locale routing first
  const response = intlMiddleware(request);

  // 2. Get locale from pathname
  const pathname = request.nextUrl.pathname;
  const locale = pathname.split('/')[1];

  // 3. Set locale cookie if not present or different
  const localeCookie = request.cookies.get('NEXT_LOCALE')?.value;
  if (localeCookie !== locale && routing.locales.includes(locale as 'en' | 'ar')) {
    response.cookies.set('NEXT_LOCALE', locale, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
      path: '/',
    });
  }

  // 4. Auth protection for specific routes
  const authToken = request.cookies.get('auth_token');
  const isProtectedRoute = pathname.includes('/dashboard');
  const isLoginPage = pathname.includes('/login');

  // Debug logging
  console.log('Middleware:', {
    pathname,
    hasToken: !!authToken,
    isProtectedRoute,
    isLoginPage
  });

  if (isProtectedRoute && !authToken) {
    console.log('Redirecting to login: no token for protected route');
    // Redirect to login with returnUrl
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set('returnUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isLoginPage && authToken) {
    console.log('Redirecting to dashboard: already logged in');
    // Already logged in, redirect to dashboard
    return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
  }

  return response;
}

export const config = {
  // Match all pathnames except for
  // - api routes
  // - _next (Next.js internals)
  // - _static (inside /public)
  // - all items inside /public (images, fonts, etc.)
  matcher: ['/((?!api|_next|_static|.*\\..*).*)'],
};
