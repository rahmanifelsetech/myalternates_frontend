import React, { useCallback, useEffect, useMemo } from 'react';
import { useForm } from '@/shared/hooks/useForm';
import { marketListSchema, type MarketListSchemaType } from '../schema/marketListSchema';
import { MarketList } from '../types/marketList';
import DynamicFormField from '@shared/components/form/FormField/DynamicFormField';
import Button from '@shared/components/ui/button/Button';
import Form from '@shared/components/form/Form';
import {Modal} from '@shared/components/ui/modal/Modal';
import { setFormErrors } from '@shared/utils/formUtils';
import typographyClasses from '@/shared/utils/typographyUtils';
import { formatDate } from '@/shared/utils/dateUtils';
import { SingleResponse } from '@/shared/types/api';
import { useGetCategoriesQuery } from '@modules/admin/pages/Categories/api/categoryApi';
import { Category } from '@modules/admin/pages/Categories/types/category';

interface MarketListModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: MarketList;
  handleCreate: (data: any) => Promise<any>;
  handleUpdate: (data: any) => Promise<any>;
  onSuccess?: (marketList: MarketList) => void;
}

export const MarketListModal: React.FC<MarketListModalProps> = ({
  isOpen,
  onClose,
  initialData,
  handleCreate,
  handleUpdate,
  onSuccess,
}) => {
  const { data: categoriesData } = useGetCategoriesQuery({limit: 1000});
  const categories = useMemo(() => categoriesData?.data || [], [categoriesData]);
  const categoryOptions = useMemo(() => 
    categories.map((category: Category) => ({ label: category.name, value: category.id })), 
    [categories]
  );

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
    reset,
    setValue,
    watch,
  } = useForm(marketListSchema, {
    defaultValues: {
      companyName: '',
      isinCode: '',
      categoryId: '',
      sector: '',
      asOnDate: initialData?.asOnDate ?? '',
    },
  });

  // Handle form prefilling when modal opens or initialData changes
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (initialData) {
          console.log('Prefilling form with initial data:', initialData, formatDate(initialData.asOnDate));
          reset({
            companyName: initialData.companyName,
            isinCode: initialData.isinCode,
            categoryId: initialData.categoryId || '',
            sector: initialData.sector,
            asOnDate: initialData.asOnDate ? formatDate(initialData.asOnDate) : undefined,
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
      }, 0);
    }
  }, [isOpen, initialData, reset]);

  const onSubmit = useCallback(
    async (data: MarketListSchemaType) => {
      try {
        console.log('Submitting form with data:', data);
        let result: SingleResponse<MarketList>;
        if (initialData?.id) {
          result = await handleUpdate({ id: initialData.id, ...data });
        } else {
          result = await handleCreate(data);
        }
        reset();
        onClose();
        if (onSuccess && result?.data) {
          onSuccess(result.data);
        }
      } catch (error: any) {
        setFormErrors(error, setError);
      }
    },
    [initialData, handleCreate, handleUpdate, reset, onClose, onSuccess, setError]
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
            label="Category"
            type="select"
            options={categoryOptions}
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
            name="asOnDate"
            label="As On Date"
            type="date-picker"
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

export default MarketListModal;
