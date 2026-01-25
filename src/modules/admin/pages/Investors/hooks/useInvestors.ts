import { useCreateInvestorMutation, useUpdateInvestorMutation, useDeleteInvestorMutation } from '../api/investorApi';
import { useAsyncMutation } from '@shared/hooks/useAsyncMutation';
import { CreateInvestorPayload, UpdateInvestorPayload } from '../types/investor';
import { useCallback } from 'react';
import { objectToFormData } from '@shared/utils/objectToFormData';

export const useInvestors = () => {
    const [createInvestor, { isLoading: isCreating }] = useCreateInvestorMutation();
    const [updateInvestor, { isLoading: isUpdating }] = useUpdateInvestorMutation();
    const [deleteInvestor, { isLoading: isDeleting }] = useDeleteInvestorMutation();

    const { execute: create } = useAsyncMutation();
    const { execute: update } = useAsyncMutation();
    const { execute: remove } = useAsyncMutation();

    const handleCreate = useCallback(async (data: CreateInvestorPayload) => {
        const formData = objectToFormData(data);
        return await create(createInvestor, formData, {
            successMessage: 'Investor created successfully!',
            errorMessage: 'Failed to create Investor.',
        });
    }, [create, createInvestor]);

    const handleUpdate = useCallback(async (data: UpdateInvestorPayload) => {
        const { id, ...rest } = data;
        const formData = objectToFormData(rest);
        return await update(updateInvestor, { id, data: formData }, {
            successMessage: 'Investor updated successfully!',
            errorMessage: 'Failed to update Investor.',
        });
    }, [update, updateInvestor]);

    const handleDelete = useCallback(async (id: string) => {
        return remove(deleteInvestor, id, {
            successMessage: 'Investor deleted successfully!',
            errorMessage: 'Failed to delete Investor.',
        });
    }, [remove, deleteInvestor]);

    return {
        handleCreate,
        handleUpdate,
        handleDelete,
        isCreating,
        isUpdating,
        isDeleting,
    };
};
