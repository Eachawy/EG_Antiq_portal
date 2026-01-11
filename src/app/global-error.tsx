'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
          <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
            <div className="mb-4 text-center">
              <h1 className="text-2xl font-bold text-red-600">
                Application Error
              </h1>
              <p className="mt-2 text-gray-600">
                Something went wrong with the application
              </p>
            </div>
            {process.env.NODE_ENV === 'development' && (
              <div className="mb-4 rounded bg-red-50 p-4">
                <p className="text-sm text-red-800">{error.message}</p>
                {error.digest && (
                  <p className="mt-2 text-xs text-red-600">
                    Digest: {error.digest}
                  </p>
                )}
              </div>
            )}
            <button
              onClick={reset}
              className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
