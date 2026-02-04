import React, { useEffect } from 'react';
import { useForm } from '@shared/hooks/useForm';
import { NomineeSchema, NomineeSchemaType } from '../../schema/nomineeSchema';
import { Nominee } from '../../types/nominee';
import DynamicFormField from '@shared/components/form/FormField/DynamicFormField';
import Button from '@shared/components/ui/button/Button';
import Form from '@shared/components/form/Form';
import ComponentCard from '@shared/components/common/ComponentCard';
import { setFormErrors } from '@/shared/utils/formUtils';

interface NomineeFormProps {
    nominee?: Nominee | null;
    onSubmit: (data: NomineeSchemaType) => Promise<any>;
    isLoading: boolean;
}

const emptyValues: NomineeSchemaType = {
    name: '',
    idType: '',
    idNumber: '',
    relationship: '',
    isActive: true,
    investorId: '', 
};

export const NomineeForm: React.FC<NomineeFormProps> = ({ nominee, onSubmit, isLoading }) => {
    const {
        control,
        handleSubmit,
        reset,
        setError,
        register,
        formState: { errors }
    } = useForm(NomineeSchema,{ defaultValues: nominee ? {
        ...nominee,
        investorId: nominee.investorId ?? '',
        name: nominee.name ?? '',
        idType: nominee.idType ?? '',
        idNumber: nominee.idNumber ?? '',
        relationship: nominee.relationship ?? '',
        isActive: nominee.isActive ?? true,
    } : { ...emptyValues }});

    useEffect(() => {
        if (nominee) {
            reset({
                ...nominee,
                investorId: nominee.investorId ?? '',
                name: nominee.name ?? '',
                idType: nominee.idType ?? '',
                idNumber: nominee.idNumber ?? '',
                relationship: nominee.relationship ?? '',
                isActive: nominee.isActive ?? true,
            });
        }
    }, [nominee, reset]);

    const handleFormSubmit = async (data: NomineeSchemaType) => {
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
                    <DynamicFormField control={control} label="Name" error={errors.name} {...register('name')} />
                    <DynamicFormField control={control} label="ID Type" error={errors.idType} {...register('idType')} />
                    <DynamicFormField control={control} label="ID Number" error={errors.idNumber} {...register('idNumber')} />
                    <DynamicFormField control={control} label="Relationship" error={errors.relationship} {...register('relationship')} />
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
