import React, { useState } from 'react';
import { useGetIndexHistoriesQuery } from './api/indexHistoryApi';
import { IndexHistoriesTable } from './components/IndexHistoriesTable';
import { IndexHistoriesFilter } from './components/IndexHistoriesFilter';
import { IndexHistoryModal } from './components/IndexHistoryModal';
import Button from '@shared/components/ui/button/Button';
import { PlusIcon } from '@shared/icons';
import { IndexHistory, CreateIndexHistoryPayload } from './types/indexHistory';
import ComponentCard from '@/shared/components/common/ComponentCard';
import { CanAccess } from '@/shared/components/common/CanAccess';
import { PERMISSIONS } from '@/shared/constants/permissions';
import { useIndexHistories } from './hooks/useIndexHistories';
import { typographyClasses } from '@shared/utils/typographyUtils';
import { Pagination } from '@/shared/components/common/Pagination';
import { ConfirmationModal } from '@/shared/components/common/ConfirmationModal';

const IndexHistories: React.FC = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIndexHistory, setSelectedIndexHistory] = useState<IndexHistory | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { data, isLoading } = useGetIndexHistoriesQuery({ search, page });
  const { handleCreate: createIndexHistory, handleUpdate: updateIndexHistory, handleDelete: deleteIndexHistory, isCreating, isUpdating } = useIndexHistories();

  const handleCreate = () => {
    setSelectedIndexHistory(null);
    setIsModalOpen(true);
  };

  const handleEdit = (indexHistory: IndexHistory) => {
    setSelectedIndexHistory(indexHistory);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData: CreateIndexHistoryPayload) => {
    if (selectedIndexHistory) {
      await updateIndexHistory({ id: selectedIndexHistory.id, ...formData });
    } else {
      await createIndexHistory(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteId) {
      await deleteIndexHistory(deleteId);
    }
    setIsDeleteModalOpen(false);
    setDeleteId(null);
  };

  const header = (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5">
      <div>
        <h2 className={`${typographyClasses.heading.h2} ${typographyClasses.colors.text.primary}`}>
          Index Histories
        </h2>
        <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted}`}>
          Manage index histories
        </p>
      </div>
      <CanAccess any={[PERMISSIONS.MASTERS.BENCHMARK_CREATE]}>
        <Button onClick={handleCreate} startIcon={<PlusIcon fontSize={20} className="text-white" />}>
          Add Index History
        </Button>
      </CanAccess>
    </div>
  );

  return (
    <div className="space-y-6">
      <ComponentCard header={header} headerPosition="outside">
        <IndexHistoriesFilter search={search} onSearchChange={setSearch} />
        <IndexHistoriesTable
          indexHistories={data?.data || []}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {data?.metaData && (
          <Pagination meta={data.metaData} onPageChange={setPage} />
        )}

        <IndexHistoryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          indexHistory={selectedIndexHistory}
          isLoading={isCreating || isUpdating}
        />

        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          title="Delete Index History"
          message="Are you sure you want to delete this index history?"
          confirmText="Delete"
        />
      </ComponentCard>
    </div>
  );
};

export default IndexHistories;
