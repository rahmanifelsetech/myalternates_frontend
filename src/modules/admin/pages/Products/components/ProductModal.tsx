import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '@shared/components/ui/modal';
import Input from '@shared/components/form/input/InputField';
import Button from '@shared/components/ui/button/Button';
import { CreateProductPayload, Product } from '../types/product';
import { setFormErrors } from '@/shared/utils/formUtils';
import { ApiError } from '@/shared/types/api';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateProductPayload) => Promise<void>;
  product?: Product | null;
  isLoading?: boolean;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  product,
  isLoading,
}) => {
  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm<CreateProductPayload>();

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        desc: product.desc,
        isActive: product.isActive,
      });
    } else {
      reset({
        name: '',
        desc: '',
        isActive: true,
      });
    }
  }, [product, reset, isOpen]);

  const handleFormSubmit = async (data: CreateProductPayload) => {
    try {
      await onSubmit(data);
      onClose();
    } catch (error: any) {
      setFormErrors<CreateProductPayload>(
        error as ApiError,
        setError,
        ['name', 'desc', 'isActive']
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        {product ? 'Edit Product' : 'Create Product'}
      </h3>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Name
          </label>
          <Input
            {...register('name', { required: 'Name is required' })}
            error={!!errors.name}
            placeholder="Product Name (e.g. PMS, AIF)"
          />
          {errors.name && <span className="text-error-500 text-xs">{errors.name.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <Input
            {...register('desc')}
            placeholder="Product Description"
          />
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
