import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '@shared/components/ui/modal';
import Input from '@shared/components/form/input/InputField';
import Button from '@shared/components/ui/button/Button';
import { CreateAssetClassPayload, AssetClass } from '../types/assetClass';
import { setFormErrors } from '@/shared/utils/formUtils';
import { ApiError } from '@/shared/types/api';

interface AssetClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateAssetClassPayload) => Promise<void>;
  assetClass?: AssetClass | null;
  isLoading?: boolean;
}

export const AssetClassModal: React.FC<AssetClassModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  assetClass,
  isLoading,
}) => {
  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm<CreateAssetClassPayload>();

  useEffect(() => {
    if (assetClass) {
      reset({
        name: assetClass.name,
        isActive: assetClass.isActive,
      });
    } else {
      reset({
        name: '',
        isActive: true,
      });
    }
  }, [assetClass, reset, isOpen]);

  const handleFormSubmit = async (data: CreateAssetClassPayload) => {
    try {
      await onSubmit(data);
      onClose();
    } catch (error: any) {
      setFormErrors<CreateAssetClassPayload>(
        error as ApiError,
        setError,
        ['name', 'isActive']
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        {assetClass ? 'Edit Asset Class' : 'Create Asset Class'}
      </h3>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Name
          </label>
          <Input
            {...register('name', { required: 'Name is required' })}
            error={!!errors.name}
            placeholder="Asset Class Name"
          />
          {errors.name && <span className="text-error-500 text-xs">{errors.name.message}</span>}
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('isActive')}
              className="form-checkbox h-4 w-4 text-brand-500 transition duration-150 ease-in-out"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Active</span>
          </label>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button type="submit" loading={isLoading} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};