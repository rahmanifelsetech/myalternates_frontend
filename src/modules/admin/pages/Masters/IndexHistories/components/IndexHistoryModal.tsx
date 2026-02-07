import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '@/shared/components/ui/modal/Modal';
import Button from '@shared/components/ui/button/Button';
import Form from '@/shared/components/form/Form';
import DynamicFormField from '@/shared/components/form/FormField/DynamicFormField';
import { CreateIndexHistoryPayload, IndexHistory } from '../types/indexHistory';
import { setFormErrors } from '@/shared/utils/formUtils';
import { ApiError } from '@/shared/types/api';
import { typographyClasses } from '@shared/utils/typographyUtils';
import { formatDate } from '@/shared/utils/dateUtils';

interface IndexHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateIndexHistoryPayload) => Promise<void>;
  indexHistory?: IndexHistory | null;
  isLoading?: boolean;
}

export const IndexHistoryModal: React.FC<IndexHistoryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  indexHistory,
  isLoading,
}) => {
  const { register, handleSubmit, reset, setError, formState: { errors }, watch, setValue } = useForm<CreateIndexHistoryPayload>();

  useEffect(() => {
    setTimeout(() => {
      
      if (indexHistory) {
        reset({
          indexCode: indexHistory.indexCode,
          indexName: indexHistory.indexName,
          valuationDate: indexHistory.valuationDate ? formatDate(indexHistory.valuationDate) : '',
          openValue: indexHistory.openValue,
          highValue: indexHistory.highValue,
          lowValue: indexHistory.lowValue,
          closeValue: indexHistory.closeValue,
        });
      } else {
        reset({
          indexCode: '',
          indexName: '',
          valuationDate: '',
          openValue: '',
          highValue: '',
          lowValue: '',
          closeValue: '',
        });
      }
    }, 0);
  }, [indexHistory, reset, isOpen]);

  const handleFormSubmit = async (data: CreateIndexHistoryPayload) => {
    try {
      await onSubmit(data);
      onClose();
    } catch (error: any) {
      setFormErrors<CreateIndexHistoryPayload>(
        error as ApiError,
        setError,
        ['indexCode', 'indexName', 'valuationDate', 'openValue', 'highValue', 'lowValue', 'closeValue']
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl p-6">
      <h3 className={`${typographyClasses.heading.h4} mb-4 ${typographyClasses.colors.text.primary}`}>
        {indexHistory ? 'Edit Index History' : 'Create Index History'}
      </h3>
      <Form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DynamicFormField
            type="text"
            label="Index Name"
            placeholder="Index Name"
            error={errors.indexName}
            required
            {...register('indexName', { required: 'Index Name is required' })}
          />
          <DynamicFormField
            type="text"
            label="Index Code"
            placeholder="Index Code"
            error={errors.indexCode}
            required
            {...register('indexCode', { required: 'Index Code is required' })}
          />
        </div>

        <DynamicFormField
          type="date-picker"
          name="valuationDate"
          label="Valuation Date"
          placeholder="Valuation Date"
          error={errors.valuationDate}
          required
          setValue={setValue}
          value={watch('valuationDate')}
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <DynamicFormField
            type="number"
            label="Open Value"
            placeholder="Open Value"
            error={errors.openValue}
            step={0.01}
            {...register('openValue')}
          />

          <DynamicFormField
            type="number"
            label="High Value"
            placeholder="High Value"
            error={errors.highValue}
            step={0.01}
            {...register('highValue')}
          />

          <DynamicFormField
            type="number"
            label="Low Value"
            placeholder="Low Value"
            error={errors.lowValue}
            step={0.01}
            {...register('lowValue')}
          />

          <DynamicFormField
            type="number"
            label="Close Value"
            placeholder="Close Value"
            error={errors.closeValue}
            step={0.01}
            {...register('closeValue')}
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit" loading={isLoading} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
