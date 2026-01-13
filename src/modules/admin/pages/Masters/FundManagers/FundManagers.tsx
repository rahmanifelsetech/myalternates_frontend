import React, { useState } from 'react';
import { useGetFundManagersQuery } from './api/fundManagerApi';
import { FundManagersTable } from './components/FundManagersTable';
import { FundManagersFilter } from './components/FundManagersFilter';
import { FundManagerModal } from './components/FundManagerModal';
import Button from '@shared/components/ui/button/Button';
import { PlusIcon } from '@shared/icons';
import FetchDataWithConfirm from '@/shared/components/common/FetchDataWithConfirm';
import { FundManager } from './types/fundManager';
import { CanAccess } from '@/shared/components/common/CanAccess';
import { PERMISSIONS } from '@/shared/constants/permissions';
import ComponentCard from '@/shared/components/common/ComponentCard';
import { useFundManagers } from './hooks/useFundManagers';
import { typographyClasses } from '@shared/utils/typographyUtils';
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

  const handleSubmit = async (data: any) => {
    if (selectedFundManager) {
      await updateFundManager(selectedFundManager.id, data);
    } else {
      await createFundManager(data);
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
        <h2 className={`${typographyClasses.heading.h2} ${typographyClasses.colors.text.primary}`}>
          Fund Managers
        </h2>
        <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted}`}>
          Manage fund managers
        </p>
      </div>
      <div className="flex gap-2">
        {/* <CanAccess any={[PERMISSIONS.MASTERS.FUND_MANAGER_POPULATE]}>
          <FetchDataWithConfirm
            onConfirm={handlePopulate}
            buttonText="Populate Fund Managers"
            modalTitle="Confirm Populate"
            modalDescription="Are you sure you want to populate fund managers? This will fetch data from an external API."
            isLoading={isPopulating}
          />
        </CanAccess> */}
        <CanAccess any={[PERMISSIONS.MASTERS.FUND_MANAGER_CREATE]}>
          <Button onClick={handleCreate} startIcon={<PlusIcon fontSize={20} className="text-white" />}>
            Add Fund Manager
          </Button>
        </CanAccess>
      </div>
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