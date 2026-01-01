import { useCallback } from 'react';
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from '../api/categoryApi';
import { CreateCategoryPayload, UpdateCategoryPayload } from '../types/category';
import { useAsyncMutation } from '@shared/hooks/useAsyncMutation';

export const useCategories = () => {
  const { execute } = useAsyncMutation();
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation();

  const handleCreate = useCallback(
    (data: CreateCategoryPayload) =>
      execute(createCategory, data, {
        successMessage: 'Category created successfully!',
        errorMessage: 'Failed to create category',
      }),
    [createCategory, execute]
  );

  const handleUpdate = useCallback(
    (data: UpdateCategoryPayload) =>
      execute(updateCategory, data, {
        successMessage: 'Category updated successfully!',
        errorMessage: 'Failed to update category',
      }),
    [updateCategory, execute]
  );

  const handleDelete = useCallback(
    (id: string) =>
      execute(deleteCategory, id, {
        successMessage: 'Category deleted successfully!',
        errorMessage: 'Failed to delete category',
      }),
    [deleteCategory, execute]
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