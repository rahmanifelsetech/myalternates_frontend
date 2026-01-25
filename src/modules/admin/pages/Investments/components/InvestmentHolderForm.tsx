import React, { useEffect } from 'react';
// import { useForm } from 'react-hook-form';
import { Holder } from '../../Investors/types/holder';
import { HolderSchema } from '../../Investors/schema/holderSchema';
import DynamicFormField from '@shared/components/form/FormField/DynamicFormField';
import Button from '@shared/components/ui/button/Button';
import { useForm } from '@/shared/hooks/useForm';


interface InvestmentHolderFormProps {
  initialData?: Holder;
  onSubmit: (data: Holder) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const InvestmentHolderForm: React.FC<InvestmentHolderFormProps> = ({ initialData, onSubmit, onCancel, isLoading }) => {

  // Ensure all required fields are present as empty string if undefined (like SchemeForm)
  const normalizedInitialData = {
    investorId: initialData?.investorId ?? '',
    name: initialData?.name ?? '',
    pan: initialData?.pan ?? '',
    dateOfBirth: initialData?.dateOfBirth ?? '',
    gender: initialData?.gender ?? '',
    mobile: initialData?.mobile ?? '',
    email: initialData?.email ?? '',
    address1: initialData?.address1 ?? '',
    address2: initialData?.address2 ?? '',
    city: initialData?.city ?? '',
    state: initialData?.state ?? '',
    country: initialData?.country ?? '',
    pincode: initialData?.pincode ?? '',
    isActive: initialData?.isActive ?? true,
    id: initialData?.id,
  };

  const { control, handleSubmit, formState: { errors }, watch, register, reset, setValue } = useForm(HolderSchema, normalizedInitialData);

  useEffect(() => {
    reset(normalizedInitialData);
  }, [initialData]);

  useEffect(() => {
    console.log('InvestmentHolderForm errors:', errors);
  }, [errors]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Hidden field for investorId to satisfy validation */}
      {/* <input type="hidden" name="investorId" value={normalizedInitialData.investorId} /> */}
      <DynamicFormField control={control} label="Name" error={errors.name} {...register('name')} />
      <DynamicFormField control={control} label="PAN" error={errors.pan} {...register('pan')} />
      <DynamicFormField
        control={control}
        name="dateOfBirth"
        label="Date of Birth"
        type="date-picker"
        error={errors.dateOfBirth}
        setValue={setValue}
        value={watch ? watch('dateOfBirth') || '' : ''}
      />
      <DynamicFormField control={control} label="Gender" error={errors.gender} {...register('gender')} />
      <DynamicFormField control={control} label="Mobile" error={errors.mobile} {...register('mobile')} />
      <DynamicFormField control={control} label="Email" error={errors.email} {...register('email')} />
      <DynamicFormField control={control} label="Address 1" error={errors.address1} {...register('address1')} />
      <DynamicFormField control={control} label="Address 2" error={errors.address2} {...register('address2')} />
      <DynamicFormField control={control} label="City" error={errors.city} {...register('city')} />
      <DynamicFormField control={control} label="State" error={errors.state} {...register('state')} />
      <DynamicFormField control={control} label="Country" error={errors.country} {...register('country')} />
      <DynamicFormField control={control} label="Pincode" error={errors.pincode} {...register('pincode')} />
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" loading={isLoading}>Save</Button>
      </div>
    </form>
  );
};

export default InvestmentHolderForm;
