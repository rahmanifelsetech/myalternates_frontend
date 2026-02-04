import { useCallback } from 'react';
import { useAsyncMutation } from '@shared/hooks/useAsyncMutation';
import {
  useCreateMarketListMutation,
  useUpdateMarketListMutation,
  useDeleteMarketListMutation,
  useBulkUploadMarketListMutation,
} from '../api/marketListApi';
import { CreateMarketListPayload, UpdateMarketListPayload, CreateMarketListResponse, UpdateMarketListResponse, DeleteMarketListResponse, BulkUploadMarketListResponse } from '../types/marketList';

export const useMarketList = () => {
  const { execute } = useAsyncMutation();

  const [createMutation] = useCreateMarketListMutation();
  const [updateMutation] = useUpdateMarketListMutation();
  const [deleteMutation] = useDeleteMarketListMutation();
  const [bulkUploadMutation] = useBulkUploadMarketListMutation();

  const handleCreate = useCallback(
    (data: CreateMarketListPayload): Promise<CreateMarketListResponse> =>
      execute(createMutation, data, {
        successMessage: 'Market List created successfully!',
        errorMessage: 'Failed to create Market List',
      }),
    [createMutation, execute]
  );

  const handleUpdate = useCallback(
    (data: UpdateMarketListPayload): Promise<UpdateMarketListResponse> =>
      execute(updateMutation, data, {
        successMessage: 'Market List updated successfully!',
        errorMessage: 'Failed to update Market List',
      }),
    [updateMutation, execute]
  );

  const handleDelete = useCallback(
    (id: string): Promise<DeleteMarketListResponse> =>
      execute(deleteMutation, id, {
        successMessage: 'Market List deleted successfully!',
        errorMessage: 'Failed to delete Market List',
      }),
    [deleteMutation, execute]
  );

  const handleBulkUpload = useCallback(
    (file: FormData): Promise<BulkUploadMarketListResponse> =>
      execute(bulkUploadMutation, file, {
        successMessage: 'Bulk upload completed successfully!',
        errorMessage: 'Failed to upload bulk data',
      }),
    [bulkUploadMutation, execute]
  );

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
    handleBulkUpload,
  };
};
