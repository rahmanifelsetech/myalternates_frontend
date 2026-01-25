import { useCreateHolderMutation, useUpdateHolderMutation, useDeleteHolderMutation } from '../api/holderApi';
import { useAsyncMutation } from '@shared/hooks/useAsyncMutation';
import { CreateHolderPayload, UpdateHolderPayload } from '../types/holder';
import { useCallback } from 'react';

export const useHolders = () => {
    const [createHolder, { isLoading: isCreating }] = useCreateHolderMutation();
    const [updateHolder, { isLoading: isUpdating }] = useUpdateHolderMutation();
    const [deleteHolder, { isLoading: isDeleting }] = useDeleteHolderMutation();

    const { execute: create } = useAsyncMutation();
    const { execute: update } = useAsyncMutation();
    const { execute: remove } = useAsyncMutation();

    const handleCreate = useCallback(async (data: CreateHolderPayload) => {
        return await create(createHolder, data, {
            successMessage: 'Holder created successfully!',
            errorMessage: 'Failed to create Holder.',
        });
    }, [create, createHolder]);

    const handleUpdate = useCallback(async (data: UpdateHolderPayload) => {
        const { id, ...rest } = data;
        return await update(updateHolder, { id, data: rest }, {
            successMessage: 'Holder updated successfully!',
            errorMessage: 'Failed to update Holder.',
        });
    }, [update, updateHolder]);

    const handleDelete = useCallback(async (id: string) => {
        return remove(deleteHolder, id, {
            successMessage: 'Holder deleted successfully!',
            errorMessage: 'Failed to delete Holder.',
        });
    }, [remove, deleteHolder]);

    return {
        handleCreate,
        handleUpdate,
        handleDelete,
        isCreating,
        isUpdating,
        isDeleting,
    };
};
