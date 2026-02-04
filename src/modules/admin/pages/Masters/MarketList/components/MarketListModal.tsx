import React, { useCallback, useEffect } from 'react';
import { useForm } from '@/shared/hooks/useForm';
import { marketListSchema, type MarketListSchemaType } from '../schema/marketListSchema';
import { MarketList } from '../types/marketList';
import DynamicFormField from '@shared/components/form/FormField/DynamicFormField';
import Button from '@shared/components/ui/button/Button';
import Form from '@shared/components/form/Form';
import {Modal} from '@shared/components/ui/modal/Modal';
import { setFormErrors } from '@shared/utils/formUtils';
import { useMarketList } from '../hooks/useMarketList';
import typographyClasses from '@/shared/utils/typographyUtils';

interface MarketListModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: MarketList;
  onSuccess?: () => void;
  categoryOptions: Array<{ label: string; value: string }>;
}

export const MarketListModal: React.FC<MarketListModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSuccess,
  categoryOptions,
}) => {
  const { handleCreate, handleUpdate } = useMarketList();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
    reset,
    setValue,
    watch,
  } = useForm(marketListSchema);

  // Handle form prefilling when modal opens or initialData changes
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset({
          companyName: initialData.companyName,
          isinCode: initialData.isinCode,
          categoryId: initialData.categoryId,
          sector: initialData.sector,
          asOnDate: initialData.asOnDate,
        });
      } else {
        reset({
          companyName: '',
          isinCode: '',
          categoryId: '',
          sector: '',
          asOnDate: '',
        });
      }
    }
  }, [isOpen, initialData, reset]);

  const onSubmit = useCallback(
    async (data: MarketListSchemaType) => {
      try {
        if (initialData) {
          await handleUpdate({ id: initialData.id, ...data });
        } else {
          await handleCreate(data);
        }
        onSuccess?.();
        reset();
        onClose();
      } catch (error: any) {
        setFormErrors(error, setError);
      }
    },
    [initialData, handleCreate, handleUpdate, onSuccess, reset, onClose, setError]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg p-6">
      <h3 className={`${typographyClasses.heading.h4} mb-6 ${typographyClasses.colors.text.primary}`}>
        {initialData ? 'Edit Market List' : 'Create Market List'}
      </h3>
      <Form onSubmit={handleSubmit(onSubmit)}  className="space-y-4">
        <div className="space-y-4">
          <DynamicFormField
            control={control}
            label="Company Name"
            type="text"
            required
            error={errors.companyName}
            {...control.register('companyName')}
          />

          <DynamicFormField
            control={control}
            label="ISIN Code"
            type="text"
            required
            error={errors.isinCode}
            {...control.register('isinCode')}
          />

          <DynamicFormField
            control={control}
            label="Categorization"
            type="select"
            options={categoryOptions}
            required
            error={errors.categoryId}
            {...control.register('categoryId')}
          />

          <DynamicFormField
            control={control}
            label="Sector"
            type="text"
            required
            error={errors.sector}
            {...control.register('sector')}
          />

          <DynamicFormField
            control={control}
            label="As On Date"
            type="date-picker"
            required
            error={errors.asOnDate}
            setValue={setValue}
            value={watch('asOnDate')}
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
