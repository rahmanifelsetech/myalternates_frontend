import { useCallback } from 'react';
import {
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useAssignPermissionsMutation,
} from '../api/roleApi';
import { CreateRolePayload, UpdateRolePayload } from '../types/role';
import { useAsyncMutation } from '@shared/hooks/useAsyncMutation';

export const useRoles = () => {
  const { execute } = useAsyncMutation();
  const [createRole, { isLoading: isCreating }] = useCreateRoleMutation();
  const [updateRole, { isLoading: isUpdating }] = useUpdateRoleMutation();
  const [deleteRole, { isLoading: isDeleting }] = useDeleteRoleMutation();
  const [assignPermissionsToRole, { isLoading: isAssigningPermissions }] = useAssignPermissionsMutation();

  const handleCreate = useCallback(
    (data: CreateRolePayload) =>
      execute(createRole, data, {
        successMessage: 'Role created successfully!',
        errorMessage: 'Failed to create role',
      }),
    [createRole, execute]
  );

  const handleUpdate = useCallback(
    (data: UpdateRolePayload) =>
      execute(updateRole, data, {
        successMessage: 'Role updated successfully!',
        errorMessage: 'Failed to update role',
      }),
    [updateRole, execute]
  );

  const handleDelete = useCallback(
    (id: string) =>
      execute(deleteRole, id, {
        successMessage: 'Role deleted successfully!',
        errorMessage: 'Failed to delete role',
      }),
    [deleteRole, execute]
  );

  const handlePermissionAssignment = useCallback(
    (roleId: string, permissionIds: string[]) =>
      execute(
        assignPermissionsToRole,
        { id: roleId, permissionIds },
        {
          successMessage: 'Permissions assigned successfully!',
          errorMessage: 'Failed to assign permissions',
        }
      ),
    [assignPermissionsToRole, execute]
  );

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
    handlePermissionAssignment,
    isCreating,
    isUpdating,
    isDeleting,
    isAssigningPermissions,
  };
};
