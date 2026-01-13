import React, { useState } from 'react';
import { useGetRolesQuery } from './api/roleApi';
import { RolesTable } from './components/RolesTable';
import { RolesFilter } from './components/RolesFilter';
import { RoleModal } from './components/RoleModal';
import { PermissionAssignmentModal } from './components/PermissionAssignmentModal';
import Button from '@shared/components/ui/button/Button';
import { PlusIcon } from '@shared/icons';
import { Role, CreateRolePayload } from './types/role';
import ComponentCard from '@/shared/components/common/ComponentCard';
import { useRoles } from './hooks/useRoles';
import { CanAccess } from '@/shared/components/common/CanAccess';
import { PERMISSIONS } from '@/shared/constants/permissions';

import { typographyClasses } from '@shared/utils/typographyUtils';
import { Pagination } from '@shared/components/common/Pagination';

const Roles: React.FC = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedRoleForPermissions, setSelectedRoleForPermissions] = useState<Role | null>(null);

  const { data, isLoading } = useGetRolesQuery({ search, page, limit: 10 });
  const { handlePermissionAssignment, handleCreate: createRole, handleUpdate: updateRole, handleDelete: deleteRole, isCreating, isUpdating, isAssigningPermissions } = useRoles();

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
        await handlePermissionAssignment(selectedRoleForPermissions.id, permissionIds);
        setIsPermissionModalOpen(false);
      } catch (error: any) {
        console.error('Failed to assign permissions:', error);
      }
    }
  };

  const handleSubmit = async (formData: CreateRolePayload) => {
    if (selectedRole) {
      await updateRole({ id: selectedRole.id, ...formData });
      setIsModalOpen(false);
    } else {
      await createRole(formData);
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      await deleteRole(id);
      // Table will auto-refresh due to invalidatesTags
    }
  };

  const header = (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5">
      <div>
        <h2 className={`${typographyClasses.heading.h2} ${typographyClasses.colors.text.primary}`}>
          Roles
        </h2>
        <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted}`}>
          Manage system roles and permissions
        </p>
      </div>
      <CanAccess any={[PERMISSIONS.ROLES.CREATE]}>
        <Button onClick={handleCreate} startIcon={<PlusIcon fontSize={20} className="text-white" />}>
          Add Role
        </Button>
      </CanAccess>
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

        {data?.metaData && (
          <Pagination meta={data.metaData} onPageChange={setPage} />
        )}

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
