import React, { useEffect } from 'react';
import { useForm } from '@shared/hooks/useForm';
import { HolderSchema, HolderSchemaType } from '../schema/holderSchema';
import { Holder } from '../types/holder';
import DynamicFormField from '@shared/components/form/FormField/DynamicFormField';
import Button from '@shared/components/ui/button/Button';
import Form from '@shared/components/form/Form';
import ComponentCard from '@shared/components/common/ComponentCard';
import { setFormErrors } from '@/shared/utils/formUtils';
import { useGetInvestorsQuery } from '../../Investors/api/investorApi';
import { formatDate } from '@/shared/utils/dateUtils';

interface HolderFormProps {
    holder?: Holder | null;
    onSubmit: (data: HolderSchemaType) => Promise<any>;
    isLoading: boolean;
    investorId?: string; 
}

const emptyValues: HolderSchemaType = {
    investorId: '',
    name: '',
    pan: '',
    dateOfBirth: '',
    gender: '',
    mobile: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    guardianName: '',
    guardianIdType: '',
    guardianIdNumber: '',
    isActive: true,
};

export const HolderForm: React.FC<HolderFormProps> = ({ holder, onSubmit, isLoading, investorId }) => {
    
    const { data: investorsData } = useGetInvestorsQuery({ limit: 1000 }); 
    const investorOptions = investorsData?.data.map(inv => ({ label: inv?.primaryPerson?.fullName, value: inv.id })) || [];

    const {
        control,
        handleSubmit,
        reset,
        setError,
        register,
        setValue,
        watch,
        formState: { errors }
    } = useForm(HolderSchema,{ defaultValues: holder ? {
        ...holder,
        investorId: holder.investorId ?? '',
        name: holder.name ?? '',
        pan: holder.pan ?? '',
        dateOfBirth: holder.dateOfBirth ?? '',
        gender: holder.gender ?? '',
        mobile: holder.mobile ?? '',
        email: holder.email ?? '',
        address1: holder.address1 ?? '',
        address2: holder.address2 ?? '',
        city: holder.city ?? '',
        state: holder.state ?? '',
        country: holder.country ?? '',
        pincode: holder.pincode ?? '',
        guardianName: holder.guardianName ?? '',
        guardianIdType: holder.guardianIdType ?? '',
        guardianIdNumber: holder.guardianIdNumber ?? '',
        isActive: holder.isActive ?? true,
    } : { ...emptyValues, investorId: investorId || '' }});

    useEffect(() => {
        if (holder) {
            reset({
                ...holder,
                investorId: holder.investorId ?? '',
                name: holder.name ?? '',
                pan: holder.pan ?? '',
                dateOfBirth: holder.dateOfBirth ? formatDate(holder.dateOfBirth) : '',
                gender: holder.gender ?? '',
                mobile: holder.mobile ?? '',
                email: holder.email ?? '',
                address1: holder.address1 ?? '',
                address2: holder.address2 ?? '',
                city: holder.city ?? '',
                state: holder.state ?? '',
                country: holder.country ?? '',
                pincode: holder.pincode ?? '',
                guardianName: holder.guardianName ?? '',
                guardianIdType: holder.guardianIdType ?? '',
                guardianIdNumber: holder.guardianIdNumber ?? '',
                isActive: holder.isActive ?? true,
            });
        } else if (investorId) {
             reset({ ...emptyValues, investorId });
        }
    }, [holder, reset, investorId]);

    const handleFormSubmit = async (data: HolderSchemaType) => {
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
                        disabled={!!investorId} 
                    />
                    <DynamicFormField control={control} label="Name" error={errors.name} {...register('name')} />
                    <DynamicFormField control={control} label="PAN" error={errors.pan} {...register('pan')} />
                    <DynamicFormField
                        control={control}
                        name="dateOfBirth"
                        label="Date of Birth"
                        type="date-picker"
                        error={errors.dateOfBirth}
                        setValue={setValue}
                        value={watch('dateOfBirth')}
                    />
                    <DynamicFormField control={control} label="Gender" error={errors.gender} {...register('gender')} />
                    <DynamicFormField control={control} label="Mobile" error={errors.mobile} {...register('mobile')} />
                    <DynamicFormField control={control} label="Email" type="email" error={errors.email} {...register('email')} />
                    <DynamicFormField control={control} label="Address 1" error={errors.address1} {...register('address1')} />
                    <DynamicFormField control={control} label="Address 2" error={errors.address2} {...register('address2')} />
                    <DynamicFormField control={control} label="City" error={errors.city} {...register('city')} />
                    <DynamicFormField control={control} label="State" error={errors.state} {...register('state')} />
                    <DynamicFormField control={control} label="Country" error={errors.country} {...register('country')} />
                    <DynamicFormField control={control} label="Pincode" error={errors.pincode} {...register('pincode')} />
                    <div className="md:col-span-2">
                        <h3 className="text-lg font-medium text-gray-900 mt-4 mb-2">Guardian Details (if minor)</h3>
                    </div>
                    <DynamicFormField control={control} label="Guardian Name" error={errors.guardianName} {...register('guardianName')} />
                    <DynamicFormField control={control} label="Guardian ID Type" error={errors.guardianIdType} {...register('guardianIdType')} />
                    <DynamicFormField control={control} label="Guardian ID Number" error={errors.guardianIdNumber} {...register('guardianIdNumber')} />
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
