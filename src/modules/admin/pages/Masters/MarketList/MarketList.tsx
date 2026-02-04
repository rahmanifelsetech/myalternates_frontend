import React, { useState, useCallback, useMemo } from 'react';
import ComponentCard from '@shared/components/common/ComponentCard';
import { Pagination } from '@shared/components/common/Pagination';
import Button from '@shared/components/ui/button/Button';
import {ConfirmationModal} from '@shared/components/common/ConfirmationModal';
import { PlusIcon } from '@shared/icons';
import { useGetMarketListsQuery, useDeleteMarketListMutation } from './api/marketListApi';
import { downloadMarketListTemplate } from './services/marketListService';
import { useGetCategoriesQuery } from '../../Categories/api/categoryApi';
import { useMarketList } from './hooks/useMarketList';
import { MarketListModal } from './components/MarketListModal';
import { MarketListTable } from './components/MarketListTable';
import { MarketListFilter } from './components/MarketListFilter';
// import { BulkUploadModal } from './components/BulkUploadModal';
import type { MarketList } from './types/marketList';
import typographyClasses from '@/shared/utils/typographyUtils';
import { PERMISSIONS } from '@/shared/constants/permissions';
import { CanAccess } from '@/shared/components/common/CanAccess';

const ITEMS_PER_PAGE = 10;

const MarketList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  // const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MarketList | undefined>();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // API Hooks
  const { data: marketListData, isLoading } = useGetMarketListsQuery({
    page,
    limit: ITEMS_PER_PAGE,
    search: search || undefined,
  });

  const { data: categoryData } = useGetCategoriesQuery({ limit: 1000 });
  const [deleteMutation, { isLoading: isDeleting }] = useDeleteMarketListMutation();
  
  // Custom hooks
  // const { handleBulkUpload } = useMarketList();

  // Category options
  const categoryOptions = useMemo(
    () =>
      categoryData?.data?.map((cat: any) => ({
        label: cat.name,
        value: cat.id,
      })) || [],
    [categoryData?.data]
  );

  const handleCreate = useCallback(() => {
    setSelectedItem(undefined);
    setShowModal(true);
  }, []);

  // Handlers
  const handleEdit = useCallback((item: MarketList) => {
    setSelectedItem(item);
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setSelectedItem(undefined);
  }, []);

  const handleModalSuccess = useCallback(() => {
    setPage(1);
  }, []);

  const handleDeleteClick = useCallback((id: string) => {
    setDeletingId(id);
    setShowDeleteConfirm(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (deletingId) {
      try {
        if(isDeleting) return;
        await deleteMutation(deletingId).unwrap();
        setShowDeleteConfirm(false);
        setDeletingId(null);
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  }, [deletingId, deleteMutation, isDeleting]);

  /* Commented out - Bulk upload moved to Upload Center
  const handleBulkUploadFile = useCallback(
    async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      try {
        await handleBulkUpload(formData);
        setPage(1);
        setShowBulkUploadModal(false);
      } catch (error) {
        console.error('Upload error:', error);
      }
    },
    [handleBulkUpload]
  );

  const handleDownloadTemplate = useCallback(async () => {
    try {
      await downloadMarketListTemplate();
    } catch (error) {
      console.error('Download template error:', error);
    }
  }, []);
  */

  // Pagination metadata
  const paginationMeta = useMemo(
    () => ({
      page,
      limit: ITEMS_PER_PAGE,
      total: marketListData?.metaData?.total || 0,
      totalPages: marketListData?.metaData?.totalPages || 1,
    }),
    [page, marketListData?.metaData]
  );

    const header = (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5">
        <div>
            <h2 className={`${typographyClasses.heading.h2} ${typographyClasses.colors.text.primary}`}>
                Market Lists
            </h2>
            <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted}`}>
                Manage market lists
            </p>
        </div>
        <div className="flex gap-2">
            {/* <CanAccess any={[PERMISSIONS.MASTERS.MARKET_LIST_CREATE]}>
                <Button 
                    onClick={() => setShowBulkUploadModal(true)} 
                    variant="outline"
                    disabled={isLoading}
                >
                    Bulk Upload
                </Button>
            </CanAccess> */}
            <CanAccess any={[PERMISSIONS.MASTERS.MARKET_LIST_CREATE]}>
                <Button onClick={() => setShowModal(true)} startIcon={<PlusIcon fontSize={20} className="text-white" />}>
                    Add Market List
                </Button>
            </CanAccess>
        </div>
        </div>
    );


  return (
    <div className="space-y-6">
      <ComponentCard
        title="Market List"
        header={header}
        headerPosition="outside"
      >
        <MarketListFilter
          search={search}
          onSearchChange={setSearch}
        />

        <MarketListTable
          data={marketListData?.data || []}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDeleteClick}
        />

        {marketListData && paginationMeta.totalPages > 1 && (
          <Pagination meta={paginationMeta} onPageChange={setPage} />
        )}
      </ComponentCard>

      <MarketListModal
        isOpen={showModal}
        onClose={handleCloseModal}
        initialData={selectedItem}
        onSuccess={handleModalSuccess}
        categoryOptions={categoryOptions}
      />

      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Market List"
        message="Are you sure you want to delete this market list? This action cannot be undone."
      />

      {/* <BulkUploadModal
        isOpen={showBulkUploadModal}
        onClose={() => setShowBulkUploadModal(false)}
        onUpload={handleBulkUploadFile}
        onDownloadTemplate={handleDownloadTemplate}
        isLoading={false}
      /> */}
    </div>
  );
};

export default MarketList;
