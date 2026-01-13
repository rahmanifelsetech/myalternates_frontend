import React, { useState } from 'react';
import { useGetAssetClassesQuery } from './api/assetClassApi';
import { AssetClassesTable } from './components/AssetClassesTable';
import { AssetClassesFilter } from './components/AssetClassesFilter';
import { AssetClassModal } from './components/AssetClassModal';
import Button from '@shared/components/ui/button/Button';
import { PlusIcon } from '@shared/icons';
import { AssetClass, CreateAssetClassPayload } from './types/assetClass';
import ComponentCard from '@/shared/components/common/ComponentCard';
import { useAssetClasses } from './hooks/useAssetClasses';
import { typographyClasses } from '@shared/utils/typographyUtils';
import { CanAccess } from '@/shared/components/common/CanAccess';
import { PERMISSIONS } from '@/shared/constants/permissions';
import { Pagination } from '@/shared/components/common/Pagination';

const AssetClasses: React.FC = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssetClass, setSelectedAssetClass] = useState<AssetClass | null>(null);

  const { data, isLoading } = useGetAssetClassesQuery({ search, page });
  const { handleCreate: createAssetClass, handleUpdate: updateAssetClass, handleDelete: deleteAssetClass, isCreating, isUpdating } = useAssetClasses();

  const handleCreate = () => {
    setSelectedAssetClass(null);
    setIsModalOpen(true);
  };

  const handleEdit = (assetClass: AssetClass) => {
    setSelectedAssetClass(assetClass);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData: CreateAssetClassPayload) => {
    if (selectedAssetClass) {
      await updateAssetClass({ id: selectedAssetClass.id, ...formData });
    } else {
      await createAssetClass(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this asset class?')) {
      await deleteAssetClass(id);
    }
  };

  const header = (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5">
      <div>
        <h2 className={`${typographyClasses.heading.h2} ${typographyClasses.colors.text.primary}`}>
          Asset Classes
        </h2>
        <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted}`}>
          Manage asset classes
        </p>
      </div>
      <CanAccess any={[PERMISSIONS.MASTERS.ASSET_CLASS_CREATE]}>
        <Button onClick={handleCreate} startIcon={<PlusIcon fontSize={20} className="text-white" />}>
          Add Asset Class
        </Button>
      </CanAccess>
    </div>
  );

  return (
    <div className="space-y-6">
      <ComponentCard header={header} headerPosition="outside">
        <AssetClassesFilter search={search} onSearchChange={setSearch} />
        <AssetClassesTable
          assetClasses={data?.data || []}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {data?.metaData && (
          <Pagination meta={data.metaData} onPageChange={setPage} />
        )}

        <AssetClassModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          assetClass={selectedAssetClass}
          isLoading={isCreating || isUpdating}
        />
      </ComponentCard>
    </div>
  );
};

export default AssetClasses;