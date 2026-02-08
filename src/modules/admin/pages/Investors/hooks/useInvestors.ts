import { useCreateInvestorMutation, useUpdateInvestorMutation, useDeleteInvestorMutation, useSendWelcomeMailMutation, useResetPasswordMutation } from '../api/investorApi';
import { useAsyncMutation } from '@shared/hooks/useAsyncMutation';
import { CreateInvestorPayload, UpdateInvestorPayload } from '../types/investor';
import { useCallback } from 'react';
import { objectToFormData } from '@shared/utils/formUtils';

export const useInvestors = () => {
    const [createInvestor, { isLoading: isCreating }] = useCreateInvestorMutation();
    const [updateInvestor, { isLoading: isUpdating }] = useUpdateInvestorMutation();
    const [deleteInvestor, { isLoading: isDeleting }] = useDeleteInvestorMutation();
    const [sendWelcomeMail, { isLoading: isSendingWelcomeMail }] = useSendWelcomeMailMutation();
    const [resetPassword, { isLoading: isResettingPassword }] = useResetPasswordMutation();

    const { execute } = useAsyncMutation();

    const handleCreate = useCallback(async (data: CreateInvestorPayload) => {
        const formData = objectToFormData(data);
        return await execute(createInvestor, formData, {
            successMessage: 'Investor created successfully!',
            errorMessage: 'Failed to create Investor.',
        });
    }, [execute, createInvestor]);

    const handleUpdate = useCallback(async (data: UpdateInvestorPayload) => {
        const { id, ...rest } = data;
        const formData = objectToFormData(rest);
        return await execute(updateInvestor, { id, data: formData }, {
            successMessage: 'Investor updated successfully!',
            errorMessage: 'Failed to update Investor.',
        });
    }, [execute, updateInvestor]);

    const handleDelete = useCallback(async (id: string) => {
        return execute(deleteInvestor, id, {
            successMessage: 'Investor deleted successfully!',
            errorMessage: 'Failed to delete Investor.',
        });
    }, [execute, deleteInvestor]);

    const handleSendWelcomeMail = useCallback(async (id: string) => {
        return execute(sendWelcomeMail, id, {
            successMessage: 'Welcome email sent successfully!',
            errorMessage: 'Failed to send welcome email.',
        });
    }, [execute, sendWelcomeMail]);

    const handleResetPassword = useCallback(async (id: string) => {
        return execute(resetPassword, id, {
            successMessage: 'Password reset email sent successfully!',
            errorMessage: 'Failed to reset password.',
        });
    }, [execute, resetPassword]);

    return {
        handleCreate,
        handleUpdate,
        handleDelete,
        handleSendWelcomeMail,
        handleResetPassword,
        isCreating,
        isUpdating,
        isDeleting,
        isSendingWelcomeMail,
        isResettingPassword,
    };
};
