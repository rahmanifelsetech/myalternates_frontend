import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Nominee } from '../../Investors/types/nominee';
import { NomineeSchema } from '../../Investors/schema/nomineeSchema';
import DynamicFormField from '@shared/components/form/FormField/DynamicFormField';
import Button from '@shared/components/ui/button/Button';
import { useForm } from '@/shared/hooks/useForm';

interface InvestmentNomineeFormProps {
  initialData?: Nominee;
  onSubmit: (data: Nominee) => void;
  onCancel: () => void;
  isLoading?: boolean;
}


const InvestmentNomineeForm: React.FC<InvestmentNomineeFormProps> = ({ initialData, onSubmit, onCancel, isLoading }) => {
  const normalizedInitialData = {
    name: initialData?.name ?? '',
    idType: initialData?.idType ?? '',
    idNumber: initialData?.idNumber ?? '',
    relationship: initialData?.relationship ?? '',
    isActive: initialData?.isActive ?? true,
    id: initialData?.id,
  };
  const { register, control, handleSubmit, formState: { errors }, reset } = useForm(NomineeSchema, {
    defaultValues: normalizedInitialData,
  });

  useEffect(() => {
    reset(normalizedInitialData);
  }, [initialData]);

//   useEffect(() => {
//     console.log('InvestmentNomineeForm errors:', errors);
//     console.log('NomineeForm nominee prop:', initialData);
//   }, [errors, initialData]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Hidden field for investorId to satisfy validation */}
      {/* <input type="hidden" {...register('investorId')} value={investorId} /> */}
      <DynamicFormField control={control} label="Name" error={errors.name}  {...register('name')} />
      <DynamicFormField control={control} label="ID Type" error={errors.idType}  {...register('idType')} />
      <DynamicFormField control={control} label="ID Number" error={errors.idNumber}  {...register('idNumber')} />
      <DynamicFormField control={control} label="Relationship" error={errors.relationship}  {...register('relationship')} />
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" loading={isLoading}>Save</Button>
      </div>
    </form>
  );
};

export default InvestmentNomineeForm;
