import { useCallback } from 'react';
import {
  useCreatePermissionMutation,
  useUpdatePermissionMutation,
  useDeletePermissionMutation,
} from '../api/permissionApi';
import { CreatePermissionPayload, UpdatePermissionPayload } from '../types/permission';
import { useAsyncMutation } from '@shared/hooks/useAsyncMutation';

export const usePermissions = () => {
  const { execute } = useAsyncMutation();
  const [createPermission, { isLoading: isCreating }] = useCreatePermissionMutation();
  const [updatePermission, { isLoading: isUpdating }] = useUpdatePermissionMutation();
  const [deletePermission, { isLoading: isDeleting }] = useDeletePermissionMutation();

  const handleCreate = useCallback(
    (data: CreatePermissionPayload) =>
      execute(createPermission, data, {
        successMessage: 'Permission created successfully!',
        errorMessage: 'Failed to create permission',
      }),
    [createPermission, execute]
  );

  const handleUpdate = useCallback(
    (data: UpdatePermissionPayload) =>
      execute(updatePermission, data, {
        successMessage: 'Permission updated successfully!',
        errorMessage: 'Failed to update permission',
      }),
    [updatePermission, execute]
  );

  const handleDelete = useCallback(
    (id: string) =>
      execute(deletePermission, id, {
        successMessage: 'Permission deleted successfully!',
        errorMessage: 'Failed to delete permission',
      }),
    [deletePermission, execute]
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
