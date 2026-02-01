import { useNavigate } from 'react-router';
import { useCreateDistributorMutation, useUpdateDistributorMutation, useDeleteDistributorMutation } from '../api/distributorApi';
import { useToast } from '@shared/hooks/useToast';
import { DistributorSchemaType } from '../schema/distributorSchema';
import { objectToFormData } from '@shared/utils/formUtils';

export const useDistributors = () => {
    const navigate = useNavigate();
    const { success, error: toastError } = useToast();

    const [createDistributor, { isLoading: isCreating }] = useCreateDistributorMutation();
    const [updateDistributor, { isLoading: isUpdating }] = useUpdateDistributorMutation();
    const [deleteDistributor, { isLoading: isDeleting }] = useDeleteDistributorMutation();

    const handleCreate = async (data: DistributorSchemaType) => {
        try {
            const formData = objectToFormData(data);
            await createDistributor(formData).unwrap();
            success('Distributor created successfully');
            navigate('/admin/distributors');
        } catch (error: any) {
            toastError(error?.data?.message || 'Failed to create distributor');
            throw error;
        }
    };

    const handleUpdate = async (id: string, data: DistributorSchemaType) => {
        try {
            const formData = objectToFormData(data);
            await updateDistributor({ id, data: formData }).unwrap();
            success('Distributor updated successfully');
            navigate('/admin/distributors');
        } catch (error: any) {
            toastError(error?.data?.message || 'Failed to update distributor');
            throw error;
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteDistributor(id).unwrap();
            success('Distributor deleted successfully');
        } catch (error: any) {
            toastError(error?.data?.message || 'Failed to delete distributor');
        }
    };

    return {
        handleCreate,
        handleUpdate,
        handleDelete,
        isCreating,
        isUpdating,
        isDeleting,
    };
};
