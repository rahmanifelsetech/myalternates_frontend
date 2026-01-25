import { useCreateInvestmentMutation, useUpdateInvestmentMutation, useDeleteInvestmentMutation } from '../api/investmentApi';
import { useAsyncMutation } from '@shared/hooks/useAsyncMutation';
import { CreateInvestmentPayload, UpdateInvestmentPayload } from '../types/investment';
import { useCallback } from 'react';
import { objectToFormData } from '@shared/utils/objectToFormData';

export const useInvestments = () => {
    const [createInvestment, { isLoading: isCreating }] = useCreateInvestmentMutation();
    const [updateInvestment, { isLoading: isUpdating }] = useUpdateInvestmentMutation();
    const [deleteInvestment, { isLoading: isDeleting }] = useDeleteInvestmentMutation();

    const { execute: create } = useAsyncMutation();
    const { execute: update } = useAsyncMutation();
    const { execute: remove } = useAsyncMutation();

    const handleCreate = useCallback(async (data: CreateInvestmentPayload) => {
        // const formData = objectToFormData(data);
        return await create(createInvestment, data, {
            successMessage: 'Investment created successfully!',
            errorMessage: 'Failed to create Investment.',
        });
    }, [create, createInvestment]);

    const handleUpdate = useCallback(async (data: UpdateInvestmentPayload) => {
        const { id, ...rest } = data;
        // const formData = objectToFormData(rest);
        return await update(updateInvestment, { id, data: rest }, {
            successMessage: 'Investment updated successfully!',
            errorMessage: 'Failed to update Investment.',
        });
    }, [update, updateInvestment]);

    const handleDelete = useCallback(async (id: string) => {
        return remove(deleteInvestment, id, {
            successMessage: 'Investment deleted successfully!',
            errorMessage: 'Failed to delete Investment.',
        });
    }, [remove, deleteInvestment]);

    return {
        handleCreate,
        handleUpdate,
        handleDelete,
        isCreating,
        isUpdating,
        isDeleting,
    };
};
