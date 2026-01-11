export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string,
    public details?: unknown,
    public requestId?: string
  ) {
    super(message);
    this.name = 'ApiError';
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export function normalizeError(error: unknown): ApiError {
  // If it's already an ApiError, return it
  if (isApiError(error)) {
    return error;
  }

  // If it's an axios error
  if (error && typeof error === 'object' && 'isAxiosError' in error) {
    const axiosError = error as {
      response?: {
        status: number;
        data?: {
          message?: string;
          code?: string;
          details?: unknown;
          requestId?: string;
        };
      };
      message?: string;
    };

    const status = axiosError.response?.status || 500;
    const message =
      axiosError.response?.data?.message ||
      axiosError.message ||
      'An error occurred';
    const code = axiosError.response?.data?.code;
    const details = axiosError.response?.data?.details;
    const requestId = axiosError.response?.data?.requestId;

    return new ApiError(status, message, code, details, requestId);
  }

  // If it's a standard Error
  if (error instanceof Error) {
    return new ApiError(500, error.message);
  }

  // Unknown error type
  return new ApiError(500, 'An unknown error occurred');
}

export function getErrorMessage(error: unknown): string {
  if (isApiError(error)) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unknown error occurred';
}
