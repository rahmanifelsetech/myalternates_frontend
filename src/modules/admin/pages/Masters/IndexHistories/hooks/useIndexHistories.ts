import { useCallback } from 'react';
import {
  useCreateIndexHistoryMutation,
  useUpdateIndexHistoryMutation,
  useDeleteIndexHistoryMutation,
} from '../api/indexHistoryApi';
import { CreateIndexHistoryPayload, UpdateIndexHistoryPayload } from '../types/indexHistory';
import { useAsyncMutation } from '@shared/hooks/useAsyncMutation';

export const useIndexHistories = () => {
  const { execute } = useAsyncMutation();
  const [createIndexHistory, { isLoading: isCreating }] = useCreateIndexHistoryMutation();
  const [updateIndexHistory, { isLoading: isUpdating }] = useUpdateIndexHistoryMutation();
  const [deleteIndexHistory, { isLoading: isDeleting }] = useDeleteIndexHistoryMutation();

  const handleCreate = useCallback(
    (data: CreateIndexHistoryPayload) =>
      execute(createIndexHistory, data, {
        successMessage: 'Index history created successfully!',
        errorMessage: 'Failed to create index history',
      }),
    [createIndexHistory, execute]
  );

  const handleUpdate = useCallback(
    (data: UpdateIndexHistoryPayload) =>
      execute(updateIndexHistory, data, {
        successMessage: 'Index history updated successfully!',
        errorMessage: 'Failed to update index history',
      }),
    [updateIndexHistory, execute]
  );

  const handleDelete = useCallback(
    (id: string) =>
      execute(deleteIndexHistory, id, {
        successMessage: 'Index history deleted successfully!',
        errorMessage: 'Failed to delete index history',
      }),
    [deleteIndexHistory, execute]
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
