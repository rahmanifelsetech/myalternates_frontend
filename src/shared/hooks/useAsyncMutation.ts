import { useCallback } from 'react';
import { useToast } from './useToast';
import { ApiError } from '../types/api';

/**
 * Hook to handle async mutations with standard success/error toast behavior
 * and error re-throwing for form handling.
 */
export const useAsyncMutation = () => {
  const { success: toastSuccess, error: toastError } = useToast();

  const execute = useCallback(
    async <TResponse, TPayload>(
      mutationTrigger: (payload: TPayload) => any,
      payload: TPayload,
      options?: {
        successMessage?: string;
        errorMessage?: string;
      }
    ): Promise<TResponse> => {
      try {
        // RTK Query mutations return an object with an .unwrap() method
        const result = await mutationTrigger(payload).unwrap();
        
        if (options?.successMessage) {
          toastSuccess(options.successMessage);
        }
        
        return result;
      } catch (err: any) {
        // Handle RTK Query error structure
        const apiError = err?.data as ApiError || err as ApiError;

        const message =
          apiError?.message ||
          err?.message ||
          options?.errorMessage ||
          'Operation failed';

        // Always show toast for the error
        toastError(message);

        // Re-throw the actual API error object (containing details) so the UI can handle it
        throw apiError;
      }
    },
    [toastSuccess, toastError]
  );

  return { execute };
};