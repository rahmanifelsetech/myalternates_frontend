import { useCreateSchemeMutation, useUpdateSchemeMutation, useDeleteSchemeMutation } from '../api/schemeApi';
import { useAsyncMutation } from '@shared/hooks/useAsyncMutation';
import { CreateSchemePayload, UpdateSchemePayload } from '../types/scheme';
import { useCallback } from 'react';

export const useSchemes = () => {
    const [createScheme, { isLoading: isCreating }] = useCreateSchemeMutation();
    const [updateScheme, { isLoading: isUpdating }] = useUpdateSchemeMutation();
    const [deleteScheme, { isLoading: isDeleting }] = useDeleteSchemeMutation();

    const { execute: create } = useAsyncMutation();
    const { execute: update } = useAsyncMutation();
    const { execute: remove } = useAsyncMutation();

    const handleCreate = useCallback(async (data: CreateSchemePayload) => {
        console.log('Execute Creating scheme with data:', data);
        return create(createScheme, data, {
            successMessage: 'Scheme created successfully!',
            errorMessage: 'Failed to create Scheme.',
        });
    }, [create, createScheme]);

    const handleUpdate = useCallback(async (data: UpdateSchemePayload) => {
        return update(updateScheme, data, {
            successMessage: 'Scheme updated successfully!',
            errorMessage: 'Failed to update Scheme.',
        });
    }, [update, updateScheme]);

    const handleDelete = useCallback(async (id: string) => {
        return remove(deleteScheme, id, {
            successMessage: 'Scheme deleted successfully!',
            errorMessage: 'Failed to delete Scheme.',
        });
    }, [remove, deleteScheme]);

    return {
        handleCreate,
        handleUpdate,
        handleDelete,
        isCreating,
        isUpdating,
        isDeleting,
    };
};