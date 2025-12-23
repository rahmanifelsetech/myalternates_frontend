import { useCallback } from 'react';
import { useToast } from '@shared/hooks/useToast';
import {
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} from '../pages/Roles/api/roleApi';
import { CreateRolePayload, UpdateRolePayload } from '../pages/Roles/types/role';

export const useRoles = () => {
  const { success: toastSuccess, error: toastError } = useToast();
  const [createRole, { isLoading: isCreating }] = useCreateRoleMutation();
  const [updateRole, { isLoading: isUpdating }] = useUpdateRoleMutation();
  const [deleteRole, { isLoading: isDeleting }] = useDeleteRoleMutation();

  const handleCreate = useCallback(
    async (data: CreateRolePayload) => {
      try {
        const result = await createRole(data).unwrap();
        toastSuccess('Role created successfully!');
        return { success: true, data: result };
      } catch (error: any) {
        const errorMessage = error?.data?.message || error?.message || 'Failed to create role';
        toastError(errorMessage);
        return { success: false, error: errorMessage, details: error?.data?.details };
      }
    },
    [createRole, toastSuccess, toastError]
  );

  const handleUpdate = useCallback(
    async (data: UpdateRolePayload) => {
      try {
        const result = await updateRole(data).unwrap();
        toastSuccess('Role updated successfully!');
        return { success: true, data: result };
      } catch (error: any) {
        const errorMessage = error?.data?.message || error?.message || 'Failed to update role';
        toastError(errorMessage);
        return { success: false, error: errorMessage, details: error?.data?.details };
      }
    },
    [updateRole, toastSuccess, toastError]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await deleteRole(id).unwrap();
        toastSuccess('Role deleted successfully!');
        return { success: true };
      } catch (error: any) {
        const errorMessage = error?.data?.message || error?.message || 'Failed to delete role';
        toastError(errorMessage);
        return { success: false, error: errorMessage, details: error?.data?.details };
      }
    },
    [deleteRole, toastSuccess, toastError]
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
