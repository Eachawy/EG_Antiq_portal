'use client';

import { useTranslations } from 'next-intl';
import { isApiError } from '@/lib/api/errors';

interface ErrorStateProps {
  error: Error & { digest?: string };
  reset?: () => void;
}

export default function ErrorState({ error, reset }: ErrorStateProps) {
  const t = useTranslations('errors');

  const isApi = isApiError(error);
  const message = isApi ? error.message : t('general');
  const statusCode = isApi ? error.status : undefined;

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{t('error')}</h2>
          <p className="mt-2 text-gray-600">{message}</p>
        </div>

        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 rounded-lg bg-gray-50 p-4">
            <div className="text-sm text-gray-700">
              <p className="font-semibold">Debug Information:</p>
              {statusCode && (
                <p className="mt-1">
                  <span className="font-medium">Status Code:</span> {statusCode}
                </p>
              )}
              {error.digest && (
                <p className="mt-1">
                  <span className="font-medium">Digest:</span> {error.digest}
                </p>
              )}
              <p className="mt-2 text-xs text-gray-500">{error.stack}</p>
            </div>
          </div>
        )}

        {reset && (
          <button
            onClick={reset}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-white transition-colors hover:bg-blue-700"
          >
            {t('retry')}
          </button>
        )}
      </div>
    </div>
  );
}
