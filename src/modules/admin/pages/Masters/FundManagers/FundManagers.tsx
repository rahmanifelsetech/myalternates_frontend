import React, { useState } from 'react';
import { useGetFundManagersQuery } from './api/fundManagerApi';
import { FundManagersTable } from './components/FundManagersTable';
import { FundManagersFilter } from './components/FundManagersFilter';
import { FundManagerModal } from './components/FundManagerModal';
import Button from '@shared/components/ui/button/Button';
import { PlusIcon } from '@shared/icons';
import { FundManager } from './types/fundManager';
import { CanAccess } from '@/shared/components/common/CanAccess';
import { PERMISSIONS } from '@/shared/constants/permissions';
import ComponentCard from '@/shared/components/common/ComponentCard';
import { useFundManagers } from './hooks/useFundManagers';
import { Pagination } from '@shared/components/common/Pagination';

const FundManagers: React.FC = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFundManager, setSelectedFundManager] = useState<FundManager | null>(null);

  const { data, isLoading } = useGetFundManagersQuery({ search, page });
  const { handleCreate: createFundManager, handleUpdate: updateFundManager, handleDelete: deleteFundManager, isCreating, isUpdating } = useFundManagers();

  const handleCreate = () => {
    setSelectedFundManager(null);
    setIsModalOpen(true);
  };

  const handleEdit = (fundManager: FundManager) => {
    setSelectedFundManager(fundManager);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData: FormData) => {
    if (selectedFundManager) {
      await updateFundManager(selectedFundManager.id, formData);
    } else {
      await createFundManager(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this fund manager?')) {
      await deleteFundManager(id);
    }
  };

  const header = (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5">
      <div>
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Fund Managers
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage fund managers
        </p>
      </div>
      <CanAccess any={[PERMISSIONS.MASTERS.FUND_MANAGER_CREATE]}>
        <Button onClick={handleCreate} startIcon={<PlusIcon fontSize={20} className="text-white" />}>
          Add Fund Manager
        </Button>
      </CanAccess>
    </div>
  );

  return (
    <div className="space-y-6">
      <ComponentCard header={header} headerPosition="outside">
        <FundManagersFilter search={search} onSearchChange={setSearch} />
        <FundManagersTable
          fundManagers={data?.data || []}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {data?.metaData && (
          <Pagination meta={data.metaData} onPageChange={setPage} />
        )}

        <FundManagerModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          fundManager={selectedFundManager}
          isLoading={isCreating || isUpdating}
        />
      </ComponentCard>
    </div>
  );
};

export default FundManagers;