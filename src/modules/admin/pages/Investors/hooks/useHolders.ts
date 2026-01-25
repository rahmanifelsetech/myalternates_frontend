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

    const handleCreate = useCallback(async (investorId: string, data: CreateHolderPayload) => {
        return await create(createHolder, { investorId, data }, {
            successMessage: 'Holder created successfully!',
            errorMessage: 'Failed to create Holder.',
        });
    }, [create, createHolder]);

    const handleUpdate = useCallback(async (investorId: string, id: string, data: UpdateHolderPayload) => {
        return await update(updateHolder, { investorId, id, data }, {
            successMessage: 'Holder updated successfully!',
            errorMessage: 'Failed to update Holder.',
        });
    }, [update, updateHolder]);

    const handleDelete = useCallback(async (investorId: string, id: string) => {
        return remove(deleteHolder, { investorId, id }, {
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
