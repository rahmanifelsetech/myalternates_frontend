import { useCallback } from 'react';
import { useToast } from '@shared/hooks/useToast';
import {
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from '../pages/Users/api/userApi';
import { CreateUserPayload, UpdateUserPayload } from '../pages/Users/types/user';

export const useUsers = () => {
  const { success: toastSuccess, error: toastError } = useToast();
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const handleCreate = useCallback(
    async (data: CreateUserPayload) => {
      try {
        const result = await createUser(data).unwrap();
        toastSuccess('User created successfully!');
        return { success: true, data: result };
      } catch (error: any) {
        const errorMessage = error?.data?.message || error?.message || 'Failed to create user';
        toastError(errorMessage);
        return { success: false, error: errorMessage, details: error?.data?.details };
      }
    },
    [createUser, toastSuccess, toastError]
  );

  const handleUpdate = useCallback(
    async (data: UpdateUserPayload) => {
      try {
        const result = await updateUser(data).unwrap();
        toastSuccess('User updated successfully!');
        return { success: true, data: result };
      } catch (error: any) {
        const errorMessage = error?.data?.message || error?.message || 'Failed to update user';
        toastError(errorMessage);
        return { success: false, error: errorMessage, details: error?.data?.details };
      }
    },
    [updateUser, toastSuccess, toastError]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await deleteUser(id).unwrap();
        toastSuccess('User deleted successfully!');
        return { success: true };
      } catch (error: any) {
        const errorMessage = error?.data?.message || error?.message || 'Failed to delete user';
        toastError(errorMessage);
        return { success: false, error: errorMessage, details: error?.data?.details };
      }
    },
    [deleteUser, toastSuccess, toastError]
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
