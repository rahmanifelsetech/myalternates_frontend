import { useCallback } from 'react';
import {
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from '../api/productApi';
import { CreateProductPayload, UpdateProductPayload } from '../types/product';
import { useAsyncMutation } from '@shared/hooks/useAsyncMutation';

export const useProducts = () => {
  const { execute } = useAsyncMutation();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleCreate = useCallback(
    (data: CreateProductPayload) =>
      execute(createProduct, data, {
        successMessage: 'Product created successfully!',
        errorMessage: 'Failed to create product',
      }),
    [createProduct, execute]
  );

  const handleUpdate = useCallback(
    (data: UpdateProductPayload) =>
      execute(updateProduct, data, {
        successMessage: 'Product updated successfully!',
        errorMessage: 'Failed to update product',
      }),
    [updateProduct, execute]
  );

  const handleDelete = useCallback(
    (id: string) =>
      execute(deleteProduct, id, {
        successMessage: 'Product deleted successfully!',
        errorMessage: 'Failed to delete product',
      }),
    [deleteProduct, execute]
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
