import { useCallback } from 'react';
import { useCreateFundManagerMutation, useUpdateFundManagerMutation, useDeleteFundManagerMutation, usePopulateFundManagersMutation } from '../api/fundManagerApi';
import { useAsyncMutation } from '@shared/hooks/useAsyncMutation';
import { CreateFundManagerPayload, UpdateFundManagerPayload } from '../types/fundManager';
import { objectToFormData } from '@shared/utils/objectToFormData';

export const useFundManagers = () => {
  const [createFundManager, { isLoading: isCreating }] = useCreateFundManagerMutation();
  const [updateFundManager, { isLoading: isUpdating }] = useUpdateFundManagerMutation();
  const [deleteFundManager, { isLoading: isDeleting }] = useDeleteFundManagerMutation();
  // const [populateFundManagers, { isLoading: isPopulating }] = usePopulateFundManagersMutation();

  const { execute: create } = useAsyncMutation();
  const { execute: update } = useAsyncMutation();
  const { execute: remove } = useAsyncMutation();
  const { execute: populate } = useAsyncMutation();

  // const handlePopulate = useCallback(async () => {
  //   return populate(populateFundManagers, undefined, {
  //     successMessage: 'Fund Managers populated successfully!',
  //     errorMessage: 'Failed to populate Fund Managers.',
  //   });
  // }, [populate, populateFundManagers]);

  const handleCreate = useCallback(async (data: CreateFundManagerPayload) => {
    const formData = objectToFormData(data);
    return await create(createFundManager, formData, {
      successMessage: 'Fund Manager created successfully!',
      errorMessage: 'Failed to create Fund Manager.',
    });
  }, [create, createFundManager]);

  const handleUpdate = useCallback(async (id: string, data: UpdateFundManagerPayload) => {
    // Note: The structure in types says data includes filesToRemove. 
    // objectToFormData handles simple types, arrays, and files.
    const { id: _, ...rest } = data; // remove ID from body if present
    const formData = objectToFormData(rest); 
    
    return await update(updateFundManager, { id, data: formData }, {
      successMessage: 'Fund Manager updated successfully!',
      errorMessage: 'Failed to update Fund Manager.',
    });
  }, [update, updateFundManager]);

  const handleDelete = useCallback(async (id: string) => {
    return remove(deleteFundManager, id, {
      successMessage: 'Fund Manager deleted successfully!',
      errorMessage: 'Failed to delete Fund Manager.',
    });
  }, [remove, deleteFundManager]);

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
    // handlePopulate,
    isCreating,
    isUpdating,
    isDeleting,
    // isPopulating,
  };
};