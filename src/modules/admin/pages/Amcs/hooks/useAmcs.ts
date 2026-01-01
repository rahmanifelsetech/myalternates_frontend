import { useCreateAmcMutation, useUpdateAmcMutation, useDeleteAmcMutation } from '../api/amcApi';
import { useAsyncMutation } from '@shared/hooks/useAsyncMutation';
import { CreateAmcPayload, UpdateAmcPayload } from '../types/amc';
// import { setFormErrors } from '@shared/utils/setFormErrors';
import { objectToFormData } from '@shared/utils/objectToFormData';
import { useCallback } from 'react';

export const useAmcs = () => {
    const [createAmc, { isLoading: isCreating }] = useCreateAmcMutation();
    const [updateAmc, { isLoading: isUpdating }] = useUpdateAmcMutation();
    const [deleteAmc, { isLoading: isDeleting }] = useDeleteAmcMutation();

    const { execute: create } = useAsyncMutation();
    const { execute: update } = useAsyncMutation();
    const { execute: remove } = useAsyncMutation();

    const handleCreate = useCallback(async (data: CreateAmcPayload) => {
        const formData = objectToFormData(data);
        return await create(createAmc, formData, {
            successMessage: 'AMC created successfully!',
            errorMessage: 'Failed to create AMC.',
        });
    }, [create, createAmc]);

    const handleUpdate = useCallback(async (data: UpdateAmcPayload) => {
        const { id, ...rest } = data;
        const formData = objectToFormData({ ...rest });
        return await update(updateAmc, { id, data: formData }, {
            successMessage: 'AMC updated successfully!',
            errorMessage: 'Failed to update AMC.',
        });
    }, [update, updateAmc]);

    const handleDelete = useCallback(async (id: string) => {
        return remove(deleteAmc, id, {
            successMessage: 'AMC deleted successfully!',
            errorMessage: 'Failed to delete AMC.',
        });
    }, [remove, deleteAmc]);

    return {
        handleCreate,
        handleUpdate,
        handleDelete,
        isCreating,
        isUpdating,
        isDeleting,
    };
};