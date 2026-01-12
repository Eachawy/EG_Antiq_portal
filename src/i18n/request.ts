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
      ...(await import(`../../public/locales/${locale}/auth.json`)).default,
      ...(await import(`../../public/locales/${locale}/homepage.json`)).default,
      ...(await import(`../../public/locales/${locale}/layout.json`)).default,
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
