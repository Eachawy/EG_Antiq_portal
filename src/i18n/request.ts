import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Ensure that the locale is valid
  if (!locale || !routing.locales.includes(locale as 'en' | 'ar')) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: {
      ...(await import(`../../public/locales/${locale}/common.json`)).default,
      auth: (await import(`../../public/locales/${locale}/auth.json`)).default,
      homepage: (await import(`../../public/locales/${locale}/homepage.json`)).default,
      layout: (await import(`../../public/locales/${locale}/layout.json`)).default,
      about: (await import(`../../public/locales/${locale}/about.json`)).default,
      contact: (await import(`../../public/locales/${locale}/contact.json`)).default,
      sites: (await import(`../../public/locales/${locale}/sites.json`)).default,
      map: (await import(`../../public/locales/${locale}/map.json`)).default,
      era: (await import(`../../public/locales/${locale}/era.json`)).default,
      siteDetails: (await import(`../../public/locales/${locale}/siteDetails.json`)).default,
      books: (await import(`../../public/locales/${locale}/books.json`)).default,
      tourGuides: (await import(`../../public/locales/${locale}/tourGuides.json`)).default,
      profile: (await import(`../../public/locales/${locale}/profile.json`)).default,
      favorites: (await import(`../../public/locales/${locale}/favorites.json`)).default,
      history: (await import(`../../public/locales/${locale}/history.json`)).default,
      savedSearches: (await import(`../../public/locales/${locale}/savedSearches.json`)).default,
      settings: (await import(`../../public/locales/${locale}/settings.json`)).default,
    },
    onError(error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Translation error:', error);
      }
    },
    getMessageFallback({ namespace, key }) {
      return `${namespace}.${key}`;
    },
  };
});
