import { useCreateInvestmentMutation, useUpdateInvestmentMutation, useDeleteInvestmentMutation, useCreateInvestmentOnboardMutation } from '../api/investmentApi';
import { useAsyncMutation } from '@shared/hooks/useAsyncMutation';
import { CreateInvestmentPayload, UpdateInvestmentPayload } from '../types/investment';
import { useCallback } from 'react';
import { objectToFormData } from '@shared/utils/formUtils';

export const useInvestments = () => {
    const [createInvestment, { isLoading: isCreating }] = useCreateInvestmentMutation();
    const [updateInvestment, { isLoading: isUpdating }] = useUpdateInvestmentMutation();
    const [deleteInvestment, { isLoading: isDeleting }] = useDeleteInvestmentMutation();
    const [createInvestmentOnboard, { isLoading: isOnboarding }] = useCreateInvestmentOnboardMutation();

    const { execute: create } = useAsyncMutation();
    const { execute: update } = useAsyncMutation();
    const { execute: remove } = useAsyncMutation();
    const { execute: onboard } = useAsyncMutation();

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

    const handleOnboard = useCallback(async (payload: any) => {
        return onboard(createInvestmentOnboard, payload, {
            successMessage: 'Investment onboarded successfully!',
            errorMessage: 'Failed to onboard investment.',
        });
    }, [onboard, createInvestmentOnboard]);

    return {
        handleCreate,
        handleUpdate,
        handleDelete,
        handleOnboard,
        isCreating,
        isUpdating,
        isDeleting,
        isOnboarding,
    };
};
