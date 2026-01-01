import React, { useState } from 'react';
import { useGetUsersQuery } from './api/userApi';
import { UsersTable } from './components/UsersTable';
import { UsersFilter } from './components/UsersFilter';
import { UserModal } from './components/UserModal';
import Button from '@shared/components/ui/button/Button';
import { PlusIcon } from '@shared/icons';
import { User, CreateUserPayload } from './types/user';
import ComponentCard from '@/shared/components/common/ComponentCard';
import { useUsers } from './hooks/useUsers';
import { CanAccess } from '@/shared/components/common/CanAccess';
import { PERMISSIONS } from '@/shared/constants/permissions';
import { UserSchemaType } from './schema/userSchema';


import { Pagination } from '@shared/components/common/Pagination';

const Users: React.FC = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { data, isLoading } = useGetUsersQuery({ search, page, limit: 10 });
  const { handleCreate: createUser, handleUpdate: updateUser, handleDelete: deleteUser, isCreating, isUpdating } = useUsers();

  const handleCreate = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData: UserSchemaType) => {
    if (selectedUser) {
      const result = await updateUser({ id: selectedUser.id, ...formData });
      setIsModalOpen(false);
      return result;
    } else {
      const result = await createUser(formData);
      setIsModalOpen(false);
      return result;
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id);
      // Table will auto-refresh due to invalidatesTags
    }
  };

  const header = (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5">
      <div>
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Users
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage system users and accounts
        </p>
      </div>
      <CanAccess any={[PERMISSIONS.USERS.CREATE]}>
        <Button onClick={handleCreate} startIcon={<PlusIcon fontSize={20} className="text-white" />}>
          Add User
        </Button>
      </CanAccess>
    </div>
  );

  return (
    <div className="space-y-6">
      <ComponentCard header={header} headerPosition="outside">
        <UsersFilter search={search} onSearchChange={setSearch} />
        <UsersTable
          users={data?.data || []}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {data?.metaData && (
          <Pagination meta={data.metaData} onPageChange={setPage} />
        )}

        <UserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          user={selectedUser}
          isLoading={isCreating || isUpdating}
        />
      </ComponentCard>
    </div>
  );
};

export default Users;
