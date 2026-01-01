import { useCallback } from 'react';
import {
  useCreateAssetClassMutation,
  useUpdateAssetClassMutation,
  useDeleteAssetClassMutation,
} from '../api/assetClassApi';
import { CreateAssetClassPayload, UpdateAssetClassPayload } from '../types/assetClass';
import { useAsyncMutation } from '@shared/hooks/useAsyncMutation';

export const useAssetClasses = () => {
  const { execute } = useAsyncMutation();
  const [createAssetClass, { isLoading: isCreating }] = useCreateAssetClassMutation();
  const [updateAssetClass, { isLoading: isUpdating }] = useUpdateAssetClassMutation();
  const [deleteAssetClass, { isLoading: isDeleting }] = useDeleteAssetClassMutation();

  const handleCreate = useCallback(
    (data: CreateAssetClassPayload) =>
      execute(createAssetClass, data, {
        successMessage: 'Asset Class created successfully!',
        errorMessage: 'Failed to create asset class',
      }),
    [createAssetClass, execute]
  );

  const handleUpdate = useCallback(
    (data: UpdateAssetClassPayload) =>
      execute(updateAssetClass, data, {
        successMessage: 'Asset Class updated successfully!',
        errorMessage: 'Failed to update asset class',
      }),
    [updateAssetClass, execute]
  );

  const handleDelete = useCallback(
    (id: string) =>
      execute(deleteAssetClass, id, {
        successMessage: 'Asset Class deleted successfully!',
        errorMessage: 'Failed to delete asset class',
      }),
    [deleteAssetClass, execute]
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