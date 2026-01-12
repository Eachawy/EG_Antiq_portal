import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import { hasToken } from './token';

/**
 * Server-side guard for protected routes
 * Use in Server Components or Server Actions
 */
export async function requireAuth(locale: string = 'en') {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token');

  if (!token) {
    redirect(`/${locale}/login`);
  }

  return token.value;
}

/**
 * Client-side guard hook for protected routes
 * Use in Client Components
 */
export function useRequireAuth(locale: string = 'en') {
  const router = useRouter();

  useEffect(() => {
    if (!hasToken()) {
      router.push(`/${locale}/login`);
    }
  }, [locale, router]);
}
