import { useCreateBankMutation, useUpdateBankMutation, useDeleteBankMutation } from '../api/bankApi';
import { useAsyncMutation } from '@shared/hooks/useAsyncMutation';
import { CreateBankPayload, UpdateBankPayload } from '../types/bank';
import { useCallback } from 'react';

export const useBanks = () => {
    const [createBank, { isLoading: isCreating }] = useCreateBankMutation();
    const [updateBank, { isLoading: isUpdating }] = useUpdateBankMutation();
    const [deleteBank, { isLoading: isDeleting }] = useDeleteBankMutation();

    const { execute: create } = useAsyncMutation();
    const { execute: update } = useAsyncMutation();
    const { execute: remove } = useAsyncMutation();

    const handleCreate = useCallback(async (data: CreateBankPayload) => {
        return await create(createBank, data, {
            successMessage: 'Bank created successfully!',
            errorMessage: 'Failed to create Bank.',
        });
    }, [create, createBank]);

    const handleUpdate = useCallback(async (data: UpdateBankPayload) => {
        const { id, ...rest } = data;
        return await update(updateBank, { id, data: rest }, {
            successMessage: 'Bank updated successfully!',
            errorMessage: 'Failed to update Bank.',
        });
    }, [update, updateBank]);

    const handleDelete = useCallback(async (id: string) => {
        return remove(deleteBank, id, {
            successMessage: 'Bank deleted successfully!',
            errorMessage: 'Failed to delete Bank.',
        });
    }, [remove, deleteBank]);

    return {
        handleCreate,
        handleUpdate,
        handleDelete,
        isCreating,
        isUpdating,
        isDeleting,
    };
};