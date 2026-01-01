import { useCallback } from 'react';
import {
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from '../pages/Users/api/userApi';
import { CreateUserPayload, UpdateUserPayload } from '../pages/Users/types/user';
import { useAsyncMutation } from '@shared/hooks/useAsyncMutation';

export const useUsers = () => {
  const { execute } = useAsyncMutation();
  
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const handleCreate = useCallback(
    (data: CreateUserPayload) =>
      execute(createUser, data, {
        successMessage: 'User created successfully!',
        errorMessage: 'Failed to create user',
      }),
    [createUser, execute]
  );

  const handleUpdate = useCallback(
    (data: UpdateUserPayload) =>
      execute(updateUser, data, {
        successMessage: 'User updated successfully!',
        errorMessage: 'Failed to update user',
      }),
    [updateUser, execute]
  );

  const handleDelete = useCallback(
    (id: string) =>
      execute(deleteUser, id, {
        successMessage: 'User deleted successfully!',
        errorMessage: 'Failed to delete user',
      }),
    [deleteUser, execute]
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
