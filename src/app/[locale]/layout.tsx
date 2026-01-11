import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { localeDirections } from '@/i18n/config';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

import { ThemeProvider } from '@/components/common/ThemeContext';
import { AuthProvider } from '@/components/auth/AuthContext';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;


  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as 'en' | 'ar')) {
    notFound();
  }

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  // Get text direction for the locale
  const direction = localeDirections[locale as 'en' | 'ar'];

  return (
    <html lang={locale} dir={direction}>
      <body className="flex min-h-screen flex-col">
        <ThemeProvider>
          <AuthProvider>
            <NextIntlClientProvider messages={messages}>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </NextIntlClientProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
