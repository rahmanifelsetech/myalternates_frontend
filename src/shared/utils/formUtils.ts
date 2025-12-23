import { UseFormSetError, FieldValues, Path } from 'react-hook-form';
import { ApiError } from '@shared/types/api';

interface SetFormErrorsOptions {
  onError?: (message: string) => void;
}

export function setFormErrors<T extends FieldValues>(
  apiError: ApiError | unknown,
  setError: UseFormSetError<T>,
  formFields?: readonly Path<T>[],
  options?: SetFormErrorsOptions
) {
  if (!apiError || typeof apiError !== 'object') return;

  const error = apiError as ApiError;

  if (error.details && typeof error.details === 'object') {
    Object.entries(error.details).forEach(([field, message]) => {
      const isKnownField =
        !formFields || formFields.includes(field as Path<T>);

      if (isKnownField) {
        setError(field as Path<T>, {
          type: 'server',
          message,
        });
      } else if (options?.onError) {
        options.onError(`${field}: ${message}`);
      } else {
        console.warn(`Unhandled validation error: ${field} → ${message}`);
      }
    });
    return;
  }

  // Fallback: non-field error
  if (error.message && options?.onError) {
    options.onError(error.message);
  }
}
