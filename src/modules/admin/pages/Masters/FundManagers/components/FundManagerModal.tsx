import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '@shared/components/ui/modal';
import Input from '@shared/components/form/input/InputField';
import Button from '@shared/components/ui/button/Button';
import { FundManager } from '../types/fundManager';
import { setFormErrors } from '@/shared/utils/formUtils';
import { ApiError } from '@/shared/types/api';
import { FundManagerSchemaType } from '../schema/fundManagerSchema';

interface FundManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<void>;
  fundManager?: FundManager | null;
  isLoading?: boolean;
}

export const FundManagerModal: React.FC<FundManagerModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  fundManager,
  isLoading,
}) => {
  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm<FundManagerSchemaType>();
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [creative, setCreative] = useState<File | null>(null);

  useEffect(() => {
    if (fundManager) {
      reset({
        name: fundManager.name,
        title: fundManager.title,
        code: fundManager.code,
        designation: fundManager.designation,
        about: fundManager.about,
        experience: fundManager.experience,
        isFeatured: fundManager.isFeatured,
        priorityOrder: fundManager.priorityOrder,
        isActive: fundManager.isActive,
      });
    } else {
      reset({
        name: '',
        title: '',
        code: '',
        designation: '',
        about: '',
        experience: '',
        isFeatured: false,
        priorityOrder: 0,
        isActive: true,
      });
    }
    setProfilePic(null);
    setCreative(null);
  }, [fundManager, reset, isOpen]);

  const handleFormSubmit = async (data: FundManagerSchemaType) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });

      if (profilePic) {
        formData.append('profilePicture', profilePic);
      }
      if (creative) {
        formData.append('fundManagerCreative', creative);
      }

      await onSubmit(formData);
      onClose();
    } catch (error: any) {
      setFormErrors<FundManagerSchemaType>(
        error as ApiError,
        setError,
        ['name', 'title', 'code', 'designation', 'about', 'experience', 'priorityOrder', 'isActive']
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        {fundManager ? 'Edit Fund Manager' : 'Create Fund Manager'}
      </h3>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Name
            </label>
            <Input
              {...register('name', { required: 'Name is required' })}
              error={!!errors.name}
              placeholder="Fund Manager Name"
            />
            {errors.name && <span className="text-error-500 text-xs">{errors.name.message}</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title
            </label>
            <Input
              {...register('title')}
              placeholder="Mr./Ms./Dr."
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Code
            </label>
            <Input
              {...register('code')}
              placeholder="FM Code"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Designation
            </label>
            <Input
              {...register('designation')}
              placeholder="Designation"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfilePic(e.target.files?.[0] || null)}
            className="w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-brand-50 file:text-brand-700
              hover:file:bg-brand-100"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
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
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('isFeatured')}
                className="form-checkbox h-4 w-4 text-brand-500 transition duration-150 ease-in-out"
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Featured</span>
            </label>
          </div>
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