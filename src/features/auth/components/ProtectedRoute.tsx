'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from '@/i18n/routing';
import { hasToken } from '../utils/token';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!hasToken()) {
      // Extract locale from pathname
      const locale = pathname.split('/')[1] || 'en';
      router.push(`/${locale}/login?returnUrl=${encodeURIComponent(pathname)}`);
    }
  }, [pathname, router]);

  // If no token, don't render children (redirect will happen)
  if (!hasToken()) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-600">Redirecting to login...</div>
      </div>
    );
  }

  return <>{children}</>;
}
