import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('header');

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900">{t('nav.about')}</h1>

        <div className="mt-8 space-y-6 text-gray-700">
          <p>
            This is a production-ready Next.js application built with modern
            best practices and a focus on internationalization, security, and
            scalability.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900">
            Key Features
          </h2>
          <ul className="list-inside list-disc space-y-2">
            <li>Next.js 14+ with App Router</li>
            <li>TypeScript with strict mode</li>
            <li>Internationalization (English & Arabic) with RTL support</li>
            <li>Tailwind CSS for styling</li>
            <li>Axios-based API layer with interceptors</li>
            <li>Authentication skeleton with route protection</li>
            <li>Environment variable validation with Zod</li>
            <li>Docker deployment support</li>
            <li>ESLint & Prettier configuration</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900">
            Architecture
          </h2>
          <p>
            The application follows a feature-based architecture with clear
            separation of concerns. Each feature has its own services,
            components, and utilities. The API layer is centralized with
            normalized error handling and automatic token management.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900">
            Getting Started
          </h2>
          <p>
            To get started with development, check out the README file in the
            project root for installation instructions and environment setup.
          </p>
        </div>
      </div>
    </div>
  );
}
