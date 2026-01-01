import { useCallback } from 'react';
import {
  useCreateFundManagerMutation,
  useUpdateFundManagerMutation,
  useDeleteFundManagerMutation,
} from '../api/fundManagerApi';
import { useAsyncMutation } from '@shared/hooks/useAsyncMutation';

export const useFundManagers = () => {
  const { execute } = useAsyncMutation();
  const [createFundManager, { isLoading: isCreating }] = useCreateFundManagerMutation();
  const [updateFundManager, { isLoading: isUpdating }] = useUpdateFundManagerMutation();
  const [deleteFundManager, { isLoading: isDeleting }] = useDeleteFundManagerMutation();

  const handleCreate = useCallback(
    (formData: FormData) =>
      execute(createFundManager, formData, {
        successMessage: 'Fund Manager created successfully!',
        errorMessage: 'Failed to create fund manager',
      }),
    [createFundManager, execute]
  );

  const handleUpdate = useCallback(
    (id: string, formData: FormData) =>
      execute(
        updateFundManager,
        { id, data: formData },
        {
          successMessage: 'Fund Manager updated successfully!',
          errorMessage: 'Failed to update fund manager',
        }
      ),
    [updateFundManager, execute]
  );

  const handleDelete = useCallback(
    (id: string) =>
      execute(deleteFundManager, id, {
        successMessage: 'Fund Manager deleted successfully!',
        errorMessage: 'Failed to delete fund manager',
      }),
    [deleteFundManager, execute]
  );

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
    isCreating,
    isUpdating,
    isDeleting,
  };
};