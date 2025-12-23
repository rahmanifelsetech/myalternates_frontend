import { useCallback } from 'react';
import { useToast } from '@shared/hooks/useToast';
import {
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from '../api/productApi';
import { CreateProductPayload, UpdateProductPayload } from '../types/product';

export const useProducts = () => {
  const { success: toastSuccess, error: toastError } = useToast();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleCreate = useCallback(
    async (data: CreateProductPayload) => {
      try {
        const result = await createProduct(data).unwrap();
        // Extract the actual data from SingleResponse wrapper
        const productData = result?.data || result;
        toastSuccess('Product created successfully!');
        return { success: true, data: productData };
      } catch (error: any) {
        const errorMessage = error?.data?.message || error?.message || 'Failed to create product';
        toastError(errorMessage);
        return { success: false, error: errorMessage, details: error?.data?.details };
      }
    },
    [createProduct, toastSuccess, toastError]
  );

  const handleUpdate = useCallback(
    async (data: UpdateProductPayload) => {
      try {
        const result = await updateProduct(data).unwrap();
        // Extract the actual data from SingleResponse wrapper
        const productData = result?.data || result;
        toastSuccess('Product updated successfully!');
        return { success: true, data: productData };
      } catch (error: any) {
        const errorMessage = error?.data?.message || error?.message || 'Failed to update product';
        toastError(errorMessage);
        return { success: false, error: errorMessage, details: error?.data?.details };
      }
    },
    [updateProduct, toastSuccess, toastError]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await deleteProduct(id).unwrap();
        toastSuccess('Product deleted successfully!');
        return { success: true };
      } catch (error: any) {
        const errorMessage = error?.data?.message || error?.message || 'Failed to delete product';
        toastError(errorMessage);
        return { success: false, error: errorMessage, details: error?.data?.details };
      }
    },
    [deleteProduct, toastSuccess, toastError]
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
