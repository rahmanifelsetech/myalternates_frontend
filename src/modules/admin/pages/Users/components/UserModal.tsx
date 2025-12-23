import React, { useEffect, useMemo } from 'react';
// import { useForm } from 'react-hook-form';
import { Modal } from '@shared/components/ui/modal';
import Button from '@shared/components/ui/button/Button';
import DynamicFormField from '@shared/components/form/FormField/DynamicFormField';
import { CreateUserPayload, CreateUserResponse, User } from '../types/user';
import { useRolesList } from '../../Roles/hooks/useRolesList';
import { ApiError } from '@/shared/types/api';
import { setFormErrors } from '@/shared/utils/formUtils';
import { UserSchema, UserSchemaType } from '../schema/userSchema';
import { useForm } from '@/shared/hooks/useForm';


interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserSchemaType) => Promise<any | ApiError>;
  user?: User | null;
  isLoading?: boolean;
}

export const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  user,
  isLoading,
}) => {
  const { register, handleSubmit, reset, control, setError, setValue, getValues, formState: { errors } } = useForm(UserSchema);
  const { roles } = useRolesList();

  // Convert roles to select options
  const roleOptions = useMemo(() => {
    return roles.map(role => ({
      value: role.id,
      label: role.name,
      text: role.name,
    }));
  }, [roles]);

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        countryCode: user.countryCode || '',
        userCode: user.userCode,
        username: user.username,
        roleId: user.roleId || '',
        isActive: user.isActive,
      });
    } else {
      reset({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        countryCode: '',
        userCode: '',
        username: '',
        roleId: '',
        isActive: true,
        password: '',
      });
    }
  }, [user, reset, isOpen]);

  const handleFormSubmit = async (data: UserSchemaType) => {
    try {
      await onSubmit(data);
      onClose();
    } catch (error: any) {
      const result = error as ApiError;
      if (result && result.details) {
        // console.log('User Creation Failed Error Details:', result);
        if (result.details) {
          setFormErrors<UserSchemaType>(
            result,
            setError,
            ['firstName', 'lastName', 'email', 'phone', 'countryCode', 'userCode', 'username', 'roleId', 'isActive', 'password'],
          );
        }
        return;
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        {user ? 'Edit User' : 'Create User'}
      </h3>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <DynamicFormField
              type="text"
              // name="firstName"
              label="First Name"
              placeholder="First Name"
              control={control}
              error={errors.firstName}
              {...register("firstName")}
            />
          </div>

          <div> 
            <DynamicFormField
              type="text"
              // name="lastName"
              label="Last Name"
              placeholder="Last Name"
              control={control}
              error={errors.lastName}
              {...register("lastName")}
            />
          </div>
            
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <DynamicFormField
              type="email"
              // name="email"
              label="Email"
              placeholder="Email"
              control={control}
              error={errors.email}
              {...register("email")}
            />
          </div>
          <div>
            <DynamicFormField
              type="phone-input"
              label="Phone Number"
              name="phone"
              control={control}
              setValue={setValue}
              getValues={getValues}
              countryCodeName="countryCode"
              placeholder="8551234567"
              error={errors.phone}
              required
              codeDisabled={true}
              codeClassName="!w-fit"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <DynamicFormField
              type="text"
              // name="username"
              label="User Name"
              placeholder="Username"
              control={control}
              error={errors.username}
              {...register("username")}
            />
          </div>
          <div>
            <DynamicFormField
              type="text"
              // name="userCode"
              label="User Code"
              placeholder="EX : MYALT123"
              control={control}
              error={errors.userCode}
              {...register("userCode")}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <DynamicFormField
              type="select"
              // name="roleId"
              label="Role"
              placeholder="Select a role"
              options={roleOptions}
              control={control}
              error={errors.roleId}
              {...register("roleId")}
            />
          </div>
          {!user && (
            <div>
              <DynamicFormField
                type="password"
                // name="password"
                label="Password"
                placeholder="Password"
                control={control}
                error={errors.password}
                {...register("password")}
              />
            </div>
          )}
        </div>
        <div>
          <DynamicFormField
            type="checkbox"
            // name="roleId"
            label="Is Active"
            placeholder=""
            options={roleOptions}
            control={control}
            error={errors.isActive}
            {...register("isActive")}
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
