import React, { useState } from 'react';
import { useGetRolesQuery, useAssignPermissionsMutation } from './api/roleApi';
import { RolesTable } from './components/RolesTable';
import { RolesFilter } from './components/RolesFilter';
import { RoleModal } from './components/RoleModal';
import { PermissionAssignmentModal } from './components/PermissionAssignmentModal';
import Button from '@shared/components/ui/button/Button';
import { PlusIcon } from '@shared/icons';
import { Role, CreateRolePayload } from './types/role';
import ComponentCard from '@/shared/components/common/ComponentCard';
import { useRoles } from './hooks/useRoles';

const Roles: React.FC = () => {
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedRoleForPermissions, setSelectedRoleForPermissions] = useState<Role | null>(null);

  const { data, isLoading } = useGetRolesQuery({ search });
  const { handleCreate: createRole, handleUpdate: updateRole, handleDelete: deleteRole, isCreating, isUpdating } = useRoles();
  const [assignPermissions, { isLoading: isAssigningPermissions }] = useAssignPermissionsMutation();

  const handleCreate = () => {
    setSelectedRole(null);
    setIsModalOpen(true);
  };

  const handleEdit = (role: Role) => {
    setSelectedRole(role);
    setIsModalOpen(true);
  };

  const handleAssignPermissions = (role: Role) => {
    setSelectedRoleForPermissions(role);
    setIsPermissionModalOpen(true);
  };

  const handlePermissionsSave = async (permissionIds: string[]) => {
    if (selectedRoleForPermissions) {
      try {
        await assignPermissions({ 
          id: selectedRoleForPermissions.id, 
          permissionIds 
        }).unwrap();
        setIsPermissionModalOpen(false);
      } catch (error: any) {
        console.error('Failed to assign permissions:', error);
      }
    }
  };

  const handleSubmit = async (formData: CreateRolePayload) => {
    if (selectedRole) {
      const result = await updateRole({ id: selectedRole.id, ...formData });
      if (result.success) {
        setIsModalOpen(false);
      }
    } else {
      const result = await createRole(formData);
      if (result.success) {
        setIsModalOpen(false);
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      const result = await deleteRole(id);
      if (result.success) {
        // Table will auto-refresh due to invalidatesTags
      }
    }
  };

  const header = (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5">
      <div>
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Roles
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage system roles and permissions
        </p>
      </div>
      <Button onClick={handleCreate} startIcon={<PlusIcon fontSize={20} className="text-white" />}>
        Add Role
      </Button>
    </div>
  );

  return (
    <div className="space-y-6">
      <ComponentCard header={header} headerPosition="outside">
        <RolesFilter search={search} onSearchChange={setSearch} />
        <RolesTable
          roles={data?.data || []}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAssignPermissions={handleAssignPermissions}
        />

        <RoleModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          role={selectedRole}
          isLoading={isCreating || isUpdating}
        />

        <PermissionAssignmentModal
          isOpen={isPermissionModalOpen}
          onClose={() => setIsPermissionModalOpen(false)}
          onSave={handlePermissionsSave}
          role={selectedRoleForPermissions}
          isLoading={isAssigningPermissions}
        />
      </ComponentCard>
    </div>
  );
};

export default Roles;
