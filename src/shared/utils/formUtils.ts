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


export const objectToFormData = (obj: any, formData = new FormData(), parentKey = ''): FormData => {
    if (obj === null || obj === undefined) {
        return formData;
    }

    if (typeof obj !== 'object' || obj instanceof File) {
        if (parentKey) {
            let value: any = obj;
            if (typeof value === 'boolean') {
                value = value ? '1' : '0';
            }
            if (typeof value === 'number') {
                value = String(value);
            }
            formData.append(parentKey, value as string | Blob);
        }
    } else if (Array.isArray(obj)) {
        obj.forEach((item, index) => {
            objectToFormData(item, formData, `${parentKey}[${index}]`);
        });
    } else {
        Object.keys(obj).forEach(key => {
            const value = obj[key];
            if (value === null || value === undefined) {
                return;
            }
            const newKey = parentKey ? `${parentKey}[${key}]` : key;
            objectToFormData(value, formData, newKey);
        });
    }

    return formData;
};