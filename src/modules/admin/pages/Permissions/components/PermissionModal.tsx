import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '@shared/components/ui/modal';
import Input from '@shared/components/form/input/InputField';
import Button from '@shared/components/ui/button/Button';
import { CreatePermissionPayload, Permission } from '../types/permission';
import { setFormErrors } from '@/shared/utils/formUtils';
import { ApiError } from '@/shared/types/api';

interface PermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreatePermissionPayload) => Promise<void>;
  permission?: Permission | null;
  isLoading?: boolean;
}

export const PermissionModal: React.FC<PermissionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  permission,
  isLoading,
}) => {
  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm<CreatePermissionPayload>();

  useEffect(() => {
    if (permission) {
      reset({
        name: permission.name,
        slug: permission.slug,
        description: permission.description,
        resource: permission.resource,
        action: permission.action,
      });
    } else {
      reset({
        name: '',
        slug: '',
        description: '',
        resource: '',
        action: '',
      });
    }
  }, [permission, reset, isOpen]);

  const handleFormSubmit = async (data: CreatePermissionPayload) => {
    try {
      await onSubmit(data);
      onClose();
    } catch (error: any) {
      setFormErrors<CreatePermissionPayload>(
        error as ApiError,
        setError,
        ['name', 'slug', 'resource', 'action', 'description']
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        {permission ? 'Edit Permission' : 'Create Permission'}
      </h3>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Name
          </label>
          <Input
            {...register('name', { required: 'Name is required' })}
            error={!!errors.name}
            placeholder="Permission Name"
          />
          {errors.name && <span className="text-error-500 text-xs">{errors.name.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Slug
          </label>
          <Input
            {...register('slug')}
            placeholder="permission-slug"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Resource
          </label>
          <Input
            {...register('resource')}
            placeholder="e.g., users, products"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Action
          </label>
          <Input
            {...register('action')}
            placeholder="e.g., create, read, update, delete"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <Input
            {...register('description')}
            placeholder="Permission Description"
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
