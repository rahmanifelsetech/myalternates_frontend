import { useCallback } from 'react';
import { useToast } from '@shared/hooks/useToast';
import {
  useCreatePermissionMutation,
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
} from '../pages/Permissions/api/permissionApi';
import { CreatePermissionPayload, UpdatePermissionPayload } from '../pages/Permissions/types/permission';

export const usePermissions = () => {
  const { success: toastSuccess, error: toastError } = useToast();
  const [createPermission, { isLoading: isCreating }] = useCreatePermissionMutation();
  const [updatePermission, { isLoading: isUpdating }] = useUpdatePermissionMutation();
  const [deletePermission, { isLoading: isDeleting }] = useDeletePermissionMutation();

  const handleCreate = useCallback(
    async (data: CreatePermissionPayload) => {
      try {
        const result = await createPermission(data).unwrap();
        toastSuccess('Permission created successfully!');
        return { success: true, data: result };
      } catch (error: any) {
        const errorMessage = error?.data?.message || error?.message || 'Failed to create permission';
        toastError(errorMessage);
        return { success: false, error: errorMessage, details: error?.data?.details };
      }
    },
    [createPermission, toastSuccess, toastError]
  );

  const handleUpdate = useCallback(
    async (data: UpdatePermissionPayload) => {
      try {
        const result = await updatePermission(data).unwrap();
        toastSuccess('Permission updated successfully!');
        return { success: true, data: result };
      } catch (error: any) {
        const errorMessage = error?.data?.message || error?.message || 'Failed to update permission';
        toastError(errorMessage);
        return { success: false, error: errorMessage, details: error?.data?.details };
      }
    },
    [updatePermission, toastSuccess, toastError]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await deletePermission(id).unwrap();
        toastSuccess('Permission deleted successfully!');
        return { success: true };
      } catch (error: any) {
        const errorMessage = error?.data?.message || error?.message || 'Failed to delete permission';
        toastError(errorMessage);
        return { success: false, error: errorMessage, details: error?.data?.details };
      }
    },
    [deletePermission, toastSuccess, toastError]
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
