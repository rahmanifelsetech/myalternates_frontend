import { useCreateNomineeMutation, useUpdateNomineeMutation, useDeleteNomineeMutation } from '../api/nomineeApi';
import { useAsyncMutation } from '@shared/hooks/useAsyncMutation';
import { CreateNomineePayload, UpdateNomineePayload } from '../types/nominee';
import { useCallback } from 'react';

export const useNominees = () => {
    const [createNominee, { isLoading: isCreating }] = useCreateNomineeMutation();
    const [updateNominee, { isLoading: isUpdating }] = useUpdateNomineeMutation();
    const [deleteNominee, { isLoading: isDeleting }] = useDeleteNomineeMutation();

    const { execute: create } = useAsyncMutation();
    const { execute: update } = useAsyncMutation();
    const { execute: remove } = useAsyncMutation();

    const handleCreate = useCallback(async (investorId: string, data: CreateNomineePayload) => {
        return await create(createNominee, { investorId, data }, {
            successMessage: 'Nominee created successfully!',
            errorMessage: 'Failed to create Nominee.',
        });
    }, [create, createNominee]);

    const handleUpdate = useCallback(async (investorId: string, id: string, data: UpdateNomineePayload) => {
        return await update(updateNominee, { investorId, id, data }, {
            successMessage: 'Nominee updated successfully!',
            errorMessage: 'Failed to update Nominee.',
        });
    }, [update, updateNominee]);

    const handleDelete = useCallback(async (investorId: string, id: string) => {
        return remove(deleteNominee, { investorId, id }, {
            successMessage: 'Nominee deleted successfully!',
            errorMessage: 'Failed to delete Nominee.',
        });
    }, [remove, deleteNominee]);

    return {
        handleCreate,
        handleUpdate,
        handleDelete,
        isCreating,
        isUpdating,
        isDeleting,
    };
};
