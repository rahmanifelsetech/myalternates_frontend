import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from '@/shared/components/ui/modal/Modal';
import Input from '@shared/components/form/input/InputField';
import Button from '@shared/components/ui/button/Button';
import { typographyClasses } from '@shared/utils/typographyUtils';
import { CreateRolePayload, Role } from '../types/role';
// import { PermissionsSelector } from './PermissionsSelector';
// import { usePermissionsList } from '../../Permissions/hooks/usePermissionsList';
import { setFormErrors } from '@/shared/utils/formUtils';
import { ApiError } from '@/shared/types/api';

interface RoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateRolePayload) => Promise<void>;
  role?: Role | null;
  isLoading?: boolean;
}

export const RoleModal: React.FC<RoleModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  role,
  isLoading,
}) => {
  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm<CreateRolePayload>();
  // const { permissions, isLoading: isLoadingPermissions } = usePermissionsList();
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<string[]>([]);
  
  // Only show permissions selector when creating a new role
  const isCreating = !role;

  useEffect(() => {
    if (isOpen) {
      if (role) {
        reset({
          name: role.name,
          description: role.description,
        });
      } else {
        reset({
          name: '',
          description: '',
        });
        setSelectedPermissionIds([]);
      }
    }
  }, [role, reset, isOpen]);

  // const handlePermissionToggle = (permissionId: string) => {
  //   setSelectedPermissionIds(prev => 
  //     prev.includes(permissionId)
  //       ? prev.filter(p => p !== permissionId)
  //       : [...prev, permissionId]
  //   );
  // };

  const handleFormSubmit = async (data: CreateRolePayload) => {
    try {
      await onSubmit({
        ...data,
        permissions: isCreating ? selectedPermissionIds : undefined,
      });
      onClose();
    } catch (error: any) {
      setFormErrors<CreateRolePayload>(
        error as ApiError,
        setError,
        ['name', 'description']
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className={`${isCreating ? 'max-w-2xl' : 'max-w-lg'} p-6 ${isCreating ? 'max-h-[90vh] overflow-y-auto' : ''}`}>
      <h3 className={`${typographyClasses.heading.h4} mb-4 ${typographyClasses.colors.text.primary}`}>
        {role ? 'Edit Role' : 'Create Role'}
      </h3>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div>
          <label className={`block ${typographyClasses.form.label} mb-1`}>
            Name
          </label>
          <Input
            {...register('name', { required: 'Name is required' })}
            error={!!errors.name}
            placeholder="Role Name"
          />
          {errors.name && <span className={`${typographyClasses.form.error}`}>{errors.name.message}</span>}
        </div>
        
        <div>
          <label className={`block ${typographyClasses.form.label} mb-1`}>
            Description
          </label>
          <Input
            {...register('description')}
            placeholder="Description"
          />
        </div>

        {/* Permissions Section - Only for Creating New Roles */}
        {/* {isCreating && (
          <div className="border-t pt-4 mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Permissions
            </label>
            <PermissionsSelector
              selectedPermissionIds={selectedPermissionIds}
              onPermissionToggle={handlePermissionToggle}
              isLoading={isLoadingPermissions}
              permissions={permissions}
            />
          </div>
        )} */}

        <div className="flex justify-end gap-3 mt-6 border-t pt-4">
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
