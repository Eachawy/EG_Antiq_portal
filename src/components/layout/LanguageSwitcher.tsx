'use client';

import { useParams, usePathname } from 'next/navigation';
import { locales, localeNames, type Locale } from '@/i18n/config';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Languages } from 'lucide-react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = (params.locale as Locale) || 'en';
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;

    // Set cookie for locale persistence
    Cookies.set('NEXT_LOCALE', newLocale, {
      expires: 365, // 365 days (1 year)
      sameSite: 'lax',
      path: '/',
    });

    // Get the current path without the locale prefix
    // pathname already includes the locale, e.g., "/en/dashboard"
    const segments = pathname.split('/').filter(Boolean);

    // If first segment is a locale, remove it
    if (locales.includes(segments[0] as Locale)) {
      segments.shift();
    }

    const pathWithoutLocale = segments.join('/');

    // Navigate to the same page with new locale
    const newPath = `/${newLocale}${pathWithoutLocale ? `/${pathWithoutLocale}` : ''}`;

    startTransition(() => {
      router.push(newPath);
      router.refresh();
    });
  };

  return (
    <>
      <button
        onClick={() =>handleLocaleChange(currentLocale === 'en' ? 'ar' : 'en')}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-theme-text hover:text-theme-primary bg-theme-accent/50 hover:bg-theme-accent rounded-xl transition-all duration-300 hover:shadow-lg group"
        aria-label="Toggle Language"
        disabled={isPending}
      >
        <Languages size={18} className="text-theme-primary group-hover:scale-110 transition-transform duration-300" />
        <span className="text-sm font-medium">{currentLocale === 'en' ? localeNames['ar'] : localeNames['en']}</span>
      </button>
    </>
  );
}
