import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '@/shared/components/ui/modal/Modal';
import Input from '@shared/components/form/input/InputField';
import Button from '@shared/components/ui/button/Button';
import { typographyClasses } from '@shared/utils/typographyUtils';
import { CreateCategoryPayload, Category } from '../types/category';
import { setFormErrors } from '@/shared/utils/formUtils';
import { ApiError } from '@/shared/types/api';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateCategoryPayload) => Promise<void>;
  category?: Category | null;
  isLoading?: boolean;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  category,
  isLoading,
}) => {
  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm<CreateCategoryPayload>();

  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
        description: category.description,
        color: category.color,
        parentCategoryId: category.parentCategoryId,
        isActive: category.isActive,
      });
    } else {
      reset({
        name: '',
        description: '',
        color: '',
        parentCategoryId: undefined,
        isActive: true,
      });
    }
  }, [category, reset, isOpen]);

  const handleFormSubmit = async (data: CreateCategoryPayload) => {
    try {
      await onSubmit(data);
      onClose();
    } catch (error: any) {
      setFormErrors<CreateCategoryPayload>(
        error as ApiError,
        setError,
        ['name', 'description', 'color', 'parentCategoryId', 'isActive']
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg p-6">
      <h3 className={`${typographyClasses.heading.h4} mb-4 ${typographyClasses.colors.text.primary}`}>
        {category ? 'Edit Category' : 'Create Category'}
      </h3>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <label className={`${typographyClasses.form.label} block mb-1`}>
            Name
          </label>
          <Input
            {...register('name', { required: 'Name is required' })}
            error={!!errors.name}
            placeholder="Category Name"
          />
          {errors.name && <span className={`${typographyClasses.form.error}`}>{errors.name.message}</span>}
        </div>

        <div>
          <label className={`${typographyClasses.form.label} block mb-1`}>
            Color
          </label>
          <Input
            {...register('color')}
            placeholder="#RRGGBB"
          />
        </div>

        <div>
          <label className={`${typographyClasses.form.label} block mb-1`}>
            Description
          </label>
          <Input
            {...register('description')}
            placeholder="Category Description"
          />
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('isActive')}
              className="form-checkbox h-4 w-4 text-brand-500 transition duration-150 ease-in-out"
            />
            <span className={`${typographyClasses.form.label}`}>Active</span>
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