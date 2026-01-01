import { FieldValues, Path, UseFormSetError } from 'react-hook-form';

export const setFormErrors = <T extends FieldValues>(
  error: any,
  setError: UseFormSetError<T>
) => {
  if (error?.data?.errors) {
    Object.entries(error.data.errors).forEach(([key, value]) => {
      setError(key as Path<T>, {
        type: 'manual',
        message: (value as string[])[0],
      });
    });
  }
};