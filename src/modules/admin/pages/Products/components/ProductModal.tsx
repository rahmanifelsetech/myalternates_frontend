import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '@shared/components/ui/modal';
import Input from '@shared/components/form/input/InputField';
import Button from '@shared/components/ui/button/Button';
import { CreateProductPayload, Product } from '../types/product';

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
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateProductPayload>();

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        description: product.description,
        sku: product.sku,
        price: product.price,
        stock: product.stock,
        category: product.category,
        status: product.status,
      });
    } else {
      reset({
        name: '',
        description: '',
        sku: '',
        price: undefined,
        stock: undefined,
        category: '',
        status: 'active',
      });
    }
  }, [product, reset, isOpen]);

  const handleFormSubmit = async (data: CreateProductPayload) => {
    await onSubmit(data);
    onClose();
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
            placeholder="Product Name"
          />
          {errors.name && <span className="text-error-500 text-xs">{errors.name.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            SKU
          </label>
          <Input
            {...register('sku')}
            placeholder="Product SKU"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Price
          </label>
          <Input
            {...register('price', { 
              pattern: { value: /^\d+(\.\d{2})?$/, message: 'Invalid price format' }
            })}
            type="number"
            placeholder="0.00"
          />
          {errors.price && <span className="text-error-500 text-xs">{errors.price.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Stock
          </label>
          <Input
            {...register('stock', { pattern: { value: /^\d+$/, message: 'Stock must be a number' } })}
            type="number"
            placeholder="0"
          />
          {errors.stock && <span className="text-error-500 text-xs">{errors.stock.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Category
          </label>
          <Input
            {...register('category')}
            placeholder="Product Category"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <Input
            {...register('description')}
            placeholder="Product Description"
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
      </form>
    </Modal>
  );
};
