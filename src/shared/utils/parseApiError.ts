// src/utils/parseApiError.ts
import { ApiError } from '@shared/types/api';

export function parseApiError(err: any): ApiError {
  if (err?.response?.data) {
    return err.response.data as ApiError;
  }

  // Network / unknown error
  return {
    statusCode: 0,
    message: 'Something went wrong. Please try again.',
    error: 'Unknown Error',
    timestamp: new Date().toISOString(),
    path: '',
  };
}
