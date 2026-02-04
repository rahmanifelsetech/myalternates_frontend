import React, { useEffect } from 'react';
import { useForm } from '@shared/hooks/useForm';
import { BankSchema, BankSchemaType } from '../../schema/bankSchema';
import { Bank } from '../../types/bank';
import DynamicFormField from '@shared/components/form/FormField/DynamicFormField';
import Button from '@shared/components/ui/button/Button';
import Form from '@shared/components/form/Form';
import ComponentCard from '@shared/components/common/ComponentCard';
import { setFormErrors } from '@/shared/utils/formUtils';
import { useGetInvestorsQuery } from '../../api/investorApi';

interface BankFormProps {
    bank?: Bank | null;
    onSubmit: (data: BankSchemaType) => Promise<any>;
    isLoading: boolean;
    investorId?: string; // Optional: pre-select investor if creating from investor details page
}

const emptyValues: BankSchemaType = {
    investorId: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    accountType: '',
    isActive: true,
};

export const BankForm: React.FC<BankFormProps> = ({ bank, onSubmit, isLoading, investorId }) => {
    
    const { data: investorsData } = useGetInvestorsQuery({ limit: 1000 }); // Fetch all investors for dropdown
    const investorOptions = investorsData?.data.map((inv: any) => ({ label: inv.name, value: inv.id })) || [];

    const {
        control,
        handleSubmit,
        reset,
        setError,
        register,
        formState: { errors }
    } = useForm(BankSchema,{ defaultValues: bank ? {
        ...bank,
        investorId: bank.investorId ?? '',
        bankName: bank.bankName ?? '',
        accountNumber: bank.accountNumber ?? '',
        ifscCode: bank.ifsc ?? '',
        accountType: bank.accountType ?? '',
        isActive: bank.isActive ?? true,
    } : { ...emptyValues, investorId: investorId || '' }});

    useEffect(() => {
        if (bank) {
            reset({
                ...bank,
                investorId: bank.investorId ?? '',
                bankName: bank.bankName ?? '',
                accountNumber: bank.accountNumber ?? '',
                ifscCode: bank.ifsc ?? '',
                accountType: bank.accountType ?? '',
                isActive: bank.isActive ?? true,
            });
        } else if (investorId) {
             reset({ ...emptyValues, investorId });
        }
    }, [bank, reset, investorId]);

    const handleFormSubmit = async (data: BankSchemaType) => {
        try {
            await onSubmit(data);
        } catch (error: any) {
            console.error('Submission error:', error);
            setFormErrors(error, setError);
        }
    };

    return (
        <ComponentCard>
            <Form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <DynamicFormField
                        control={control}
                        label="Investor"
                        type="select"
                        options={investorOptions}
                        error={errors.investorId}
                        {...register('investorId')}
                        disabled={!!investorId} // Disable if investorId is passed (e.g. from query param)
                    />
                    <DynamicFormField control={control} label="Bank Name" error={errors.bankName} {...register('bankName')} />
                    <DynamicFormField control={control} label="Account Number" error={errors.accountNumber} {...register('accountNumber')} />
                    <DynamicFormField control={control} label="IFSC Code" error={errors.ifscCode} {...register('ifscCode')} />
                    <DynamicFormField control={control} label="Account Type" error={errors.accountType} {...register('accountType')} />
                    <DynamicFormField control={control} name="isActive" label="Is Active" type="checkbox" error={errors.isActive} />
                </div>
                <div className="flex justify-end mt-4">
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Saving...' : 'Save'}
                    </Button>
                </div>
            </Form>
        </ComponentCard>
    );
};
