import React, { useEffect, useState } from 'react';
import { useForm } from '@shared/hooks/useForm';
import { FundManagerSchema, FundManagerSchemaType } from '../schema/fundManagerSchema';
import { FundManager } from '../types/fundManager';
import DynamicFormField from '@shared/components/form/FormField/DynamicFormField';
import Button from '@shared/components/ui/button/Button';
import Form from '@shared/components/form/Form';
import { setFormErrors } from '@/shared/utils/formUtils';
import { useGetAmcsQuery } from '@/modules/admin/pages/Amcs/api/amcApi';
import { useGetAmcListQuery } from '@/shared/services/api/masterDataApi';

interface FundManagerFormProps {
  fundManager?: FundManager | null;
  onSubmit: (data: any) => Promise<any>;
  isLoading: boolean;
  onCancel: () => void;
}

const emptyValues: FundManagerSchemaType = {
  name: '',
  code: '',
  amcId: '',
  designation: '',
  aum: undefined,
  linkedinUrl: '',
  about: '',
  experience: '',
  profilePicture: undefined,
  fundManagerCreative: undefined,
  isFeatured: false,
  priorityOrder: 0,
  isActive: true,
};

export const FundManagerForm: React.FC<FundManagerFormProps> = ({
  fundManager,
  onSubmit,
  isLoading,
  onCancel,
}) => {
  const [filesToRemove, setFilesToRemove] = useState<string[]>([]);
  const { data: amcsData } = useGetAmcListQuery(); // Fetch AMCs for dropdown

  const {
    control,
    handleSubmit,
    reset,
    setError,
    register,
    formState: { errors },
  } = useForm(FundManagerSchema, {
    defaultValues: emptyValues,
  });

  useEffect(() => {
    if (fundManager) {
      reset({
        name: fundManager.name,
        code: fundManager.code ?? '',
        amcId: fundManager.amcId ?? '',
        designation: fundManager.designation ?? '',
        aum: fundManager.aum ? Number(fundManager.aum) : undefined,
        linkedinUrl: fundManager.linkedinUrl ?? '',
        about: fundManager.about ?? '',
        experience: fundManager.experience ?? '',
        profilePicture: undefined, // Controlled by FileInput via imageUrl
        fundManagerCreative: undefined, // Controlled by FileInput via imageUrl
        isFeatured: fundManager.isFeatured,
        priorityOrder: fundManager.priorityOrder ?? 0,
        isActive: fundManager.isActive,
      });
      setFilesToRemove([]);
    } else {
      reset(emptyValues);
      setFilesToRemove([]);
    }
  }, [fundManager, reset]);

    useEffect(() => {
        console.log('file errros: ', errors);
    }, [errors]);

  const handleFormSubmit = async (data: FundManagerSchemaType) => {
    try {
      await onSubmit({ ...data, filesToRemove });
    } catch (error: any) {
      setFormErrors(error, setError, [
        'name',
        'code',
        'amcId',
        'designation',
        'aum',
        'linkedinUrl',
        'about',
        'experience',
        'profilePicture',
        'fundManagerCreative',
        'isFeatured',
        'priorityOrder',
        'isActive',
      ]);
    }
  };

  const amcOptions = amcsData?.data?.map((amc: any) => ({
    label: amc.name || '',
    value: amc.id,
  })) || [];

  return (
    <Form onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DynamicFormField
          control={control}
          label="Name"
          error={errors.name}
          {...register('name')}
          required
        />
        <DynamicFormField
          control={control}
          label="Code"
          error={errors.code}
          {...register('code')}
          required
        />
        <DynamicFormField
          type="select"
          control={control}
          label="AMC"
          options={amcOptions}
          error={errors.amcId}
          {...register('amcId')}
          required
        />
        <DynamicFormField
          control={control}
          label="Designation"
          error={errors.designation}
          {...register('designation')}
        />
        <DynamicFormField
          type="number"
          control={control}
          label="AUM (Cr.)"
          error={errors.aum}
          step={0.01}
          {...register('aum')}
        />
        <DynamicFormField
          control={control}
          label="LinkedIn URL"
          error={errors.linkedinUrl}
          {...register('linkedinUrl')}
        />
        <DynamicFormField
          control={control}
          label="Profile Picture"
          name="profilePicture"
          type="file"
          error={errors.profilePicture}
          imageUrl={fundManager?.profilePicture}
          onRemove={() => setFilesToRemove((prev) => [...prev, 'profilePicture'])}
        />
        <DynamicFormField
          control={control}
          label="Creative"
          name="fundManagerCreative"
          type="file"
          error={errors.fundManagerCreative}
          imageUrl={fundManager?.fundManagerCreative}
          onRemove={() => setFilesToRemove((prev) => [...prev, 'fundManagerCreative'])}
        />
        <div className="col-span-1 md:col-span-2">
          <DynamicFormField
            type="textarea"
            control={control}
            label="About"
            error={errors.about}
            {...register('about')}
          />
        </div>
        <div className="col-span-1 md:col-span-2">
          <DynamicFormField
            type="textarea"
            control={control}
            label="Experience"
            error={errors.experience}
            {...register('experience')}
          />
        </div>
        <DynamicFormField
          type="number"
          control={control}
          label="Priority Order"
          error={errors.priorityOrder}
          {...register('priorityOrder')}
        />
        <div className="flex items-center gap-4 mt-8">
            <DynamicFormField
                type="checkbox"
                control={control}
                label="Is Active"
                error={errors.isActive}
                {...register('isActive')}
            />
            <DynamicFormField
                type="checkbox"
                control={control}
                label="Is Featured"
                error={errors.isFeatured}
                {...register('isFeatured')}
            />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button variant="outline" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button type="submit" loading={isLoading} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </Form>
  );
};