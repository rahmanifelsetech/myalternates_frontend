import React, { useState, useCallback, useMemo } from 'react';
import { useGetUploadHistoryQuery, useGetUploadLogsQuery, useGetUploadLogDetailQuery } from '../api/uploadApi';
import { useUploadManagement } from '../hooks/useUploadManagement';
import type { UploadType, UploadHistoryItem, UploadLogDetail } from '../types/upload';
import Button from '@shared/components/ui/button/Button';
import { Tabs } from '@shared/components/common/Tabs';
import { FormSection } from '@/shared/components/common/FormSection';
import { FileUploader } from '@/shared/components/common/FileUploader';
import { Table, TableHeader, TableBody, TableCell, TableRow } from '@shared/components/ui/table';
import NoDataRow from '@/shared/components/common/NoDataRow';
import Badge from '@shared/components/ui/badge/Badge';
import { typographyClasses } from '@shared/utils/typographyUtils';
import { EntitySelectionModal } from './EntitySelectionModal';
import { DataProcessingHistoryTable } from './DataProcessingHistoryTable';
import { LogDetailsModal } from './LogDetailsModal';
import { formatDate } from '@shared/utils/dateUtils';
import { SyncIcon } from '@shared/icons';
import { IconButton } from '@shared/components/ui/button/IconButton';
import { Pagination } from '@/shared/components/common/Pagination';

type MainTabType = 'file-upload' | 'external-api';

const MAIN_TABS: { label: string; type: MainTabType }[] = [
  // { label: 'File Upload', type: 'file-upload' },
  { label: 'External API Upload', type: 'external-api' },
];

const FILE_UPLOAD_OPTIONS = [
  { label: 'Daily Valuation', value: 'daily-valuation' },
  { label: 'Holdings', value: 'holdings' },
  { label: 'Market List', value: 'market-list' },
  { label: 'Transactions', value: 'transactions' },
  { label: 'Index History', value: 'index-history' },
];

const EXTERNAL_API_OPTIONS = [
  { label: 'Products', value: 'FETCH_PRODUCTS' },
  { label: 'Fund Manger', value: 'FETCH_FUND_MANAGERS' },
  { label: 'Amcs', value: 'FETCH_AMCS' },
  { label: 'Schemes', value: 'FETCH_SCHEMES' },
  // { label: 'AMC Documents', value: 'FETCH_AMC_DOCUMENTS' },
  // { label: 'Distributor Documents', value: 'FETCH_DISTRIBUTOR_DOCUMENTS' },
  // { label: 'Investor Documents', value: 'FETCH_INVESTOR_DOCUMENTS' },
];

export const UploadCenter: React.FC = () => {
  // Main tab state
  const [activeMainTabIndex, setActiveMainTabIndex] = useState(0);

  // File upload state
  const [showFileUploadModal, setShowFileUploadModal] = useState(false);
  const [selectedFileUploadType, setSelectedFileUploadType] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [fileUploadPage, setFileUploadPage] = useState(1);

  // External API state
  const [showApiModal, setShowApiModal] = useState(false);
  const [selectedApiJobType, setSelectedApiJobType] = useState<string>('');
  const [showLogDetailsModal, setShowLogDetailsModal] = useState(false);
  const [selectedLogId, setSelectedLogId] = useState<string>('');
  const [externalApiUploadPage, setExternalApiUploadPage] = useState(1);

  // Custom hooks
  const { handleFileUpload, handleTriggerExternalApiFetch } = useUploadManagement();

  // API queries
  const activeMainTabType = MAIN_TABS[activeMainTabIndex].type;
  
  const { data: fileUploadHistory, isLoading: isLoadingFileHistory } = useGetUploadHistoryQuery(
    { type: selectedFileUploadType as UploadType, page: 1, limit: 10 },
    { skip: !selectedFileUploadType || activeMainTabType !== 'file-upload' }
  );

  const { data: externalApiLogs, isLoading: isLoadingApiLogs, refetch: refetchApiLogs } = useGetUploadLogsQuery(
    { page: externalApiUploadPage, limit: 10 },
    { skip: activeMainTabType !== 'external-api' }
  );


  const { data: selectedLogDetail, isLoading: isLoadingLogDetail } = useGetUploadLogDetailQuery(
    selectedLogId,
    { skip: !selectedLogId }
  );

  // File Upload Handlers
  const handleFileChange = useCallback((file: File | null) => {
    setFile(file);
  }, []);

  const handleFileUploadModalOpen = useCallback(() => {
    setShowFileUploadModal(true);
  }, []);

  const handleFileUploadModalClose = useCallback(() => {
    setShowFileUploadModal(false);
    setSelectedFileUploadType('');
    setFile(null);
  }, []);

  const handleFileUploadConfirm = useCallback(async (selected: string) => {
    if (file) {
      try {
        await handleFileUpload(selected as UploadType, file);
        setFile(null);
      } catch (error) {
        // Error handled by useAsyncMutation
      }
    }
  }, [file, handleFileUpload]);

  // External API Handlers
  const handleApiModalOpen = useCallback(() => {
    setShowApiModal(true);
  }, []);

  const handleApiModalClose = useCallback(() => {
    setShowApiModal(false);
    setSelectedApiJobType('');
  }, []);

  const handleApiConfirm = useCallback(async (selected: string) => {
    try {
      await handleTriggerExternalApiFetch(selected as any);
    } catch (error) {
      // Error handled by useAsyncMutation
    }
  }, [handleTriggerExternalApiFetch]);

  const handleViewLogDetails = useCallback((logId: string) => {
    setSelectedLogId(logId);
    setShowLogDetailsModal(true);
  }, []);

  const handleCloseLogDetailsModal = useCallback(() => {
    setShowLogDetailsModal(false);
    setSelectedLogId('');
  }, []);

  // Upload History Table
  const renderFileUploadHistory = useMemo(() => {
    if (!selectedFileUploadType) {
      return (
        <div className={`text-center py-8 ${typographyClasses.colors.text.muted}`}>
          Select a file upload type from the modal to view upload history
        </div>
      );
    }

    const data = fileUploadHistory?.data;
    if (isLoadingFileHistory) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p className={`${typographyClasses.colors.text.muted}`}>Loading upload history...</p>
          </div>
        </div>
      );
    }

    if (!data || data.length === 0) {
      return (
        <div className="overflow-x-auto rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className={`px-4 py-4 ${typographyClasses.table.header} ${typographyClasses.colors.text.primary}`}>File Name</TableCell>
                <TableCell isHeader className={`px-4 py-4 ${typographyClasses.table.header} ${typographyClasses.colors.text.primary}`}>Upload Date</TableCell>
                <TableCell isHeader className={`px-4 py-4 ${typographyClasses.table.header} ${typographyClasses.colors.text.primary}`}>Status</TableCell>
                <TableCell isHeader className={`px-4 py-4 ${typographyClasses.table.header} ${typographyClasses.colors.text.primary}`}>Rows</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <NoDataRow colSpan={4} message="No file upload history found" />
            </TableBody>
          </Table>
        </div>
      );
    }

    return (
      <div className="max-w-full overflow-x-auto rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className={`px-4 py-4 ${typographyClasses.table.header} ${typographyClasses.colors.text.primary}`}>File Name</TableCell>
              <TableCell isHeader className={`px-4 py-4 ${typographyClasses.table.header} ${typographyClasses.colors.text.primary}`}>Upload Date</TableCell>
              <TableCell isHeader className={`px-4 py-4 ${typographyClasses.table.header} ${typographyClasses.colors.text.primary}`}>Status</TableCell>
              <TableCell isHeader className={`px-4 py-4 ${typographyClasses.table.header} ${typographyClasses.colors.text.primary}`}>Rows</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item: UploadHistoryItem) => (
              <TableRow key={item.id} className="border-b border-[#eee] dark:border-strokedark">
                <TableCell className={`py-5 px-4 ${typographyClasses.table.cell} ${typographyClasses.colors.text.primary}`}>{item.fileName}</TableCell>
                <TableCell className={`py-5 px-4 ${typographyClasses.table.cell} ${typographyClasses.colors.text.secondary}`}>{formatDate(item.uploadDate)}</TableCell>
                <TableCell className="py-5 px-4">
                  <Badge 
                    color={
                      item.status === 'completed' ? 'success' : 
                      item.status === 'failed' ? 'error' : 
                      item.status === 'processing' ? 'warning' : 
                      'info'
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className={`py-5 px-4 ${typographyClasses.table.cell} ${typographyClasses.colors.text.secondary}`}>{item.rowCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }, [selectedFileUploadType, fileUploadHistory, isLoadingFileHistory]);

  // File Upload Tab Content
  const fileUploadContent = useMemo(() => (
    <FormSection title="File Upload">
      <div className="space-y-6">
        <div>
          <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted} mb-4`}>
            Choose the type of data you want to upload and select a file.
          </p>
          <Button onClick={handleFileUploadModalOpen} size="md">
            Upload File
          </Button>
        </div>

        <div className="mt-8">
          <h4 className={`${typographyClasses.heading.h4} mb-4 ${typographyClasses.colors.text.primary}`}>Upload History</h4>
          {renderFileUploadHistory}
        </div>
      </div>
    </FormSection>
  ), [handleFileUploadModalOpen, selectedFileUploadType, file, handleFileUploadConfirm, renderFileUploadHistory]);

  // External API Tab Content
  const externalApiContent = useMemo(() => (
    <FormSection title={
        (
          <div className='flex justify-between items-start'>
            <div>
              <h3 className={`${typographyClasses.heading.h3} ${typographyClasses.colors.text.primary} mb-2`}>
                External API Data Fetch
              </h3>
              <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted} mb-4`}>
                Select an entity to trigger data fetching from an external API.
              </p>
            </div>
            <Button onClick={handleApiModalOpen} size="md">
              Select Entity & Fetch Data
            </Button>
          </div>
        )
      }>
      <div className="space-y-6">
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h4 className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary}`}>Data Processing History</h4>
            <IconButton onClick={refetchApiLogs} icon={<SyncIcon className={isLoadingApiLogs ? 'animate-spin' : ''} />} title="Refresh History" />
          </div>
          <DataProcessingHistoryTable logs={externalApiLogs?.data} isLoading={isLoadingApiLogs} onViewDetails={handleViewLogDetails} />

           { externalApiLogs?.metaData && (
              <Pagination meta={externalApiLogs?.metaData || { limit: 10, page: 1, total: 0, totalPages: 0}} onPageChange={setExternalApiUploadPage} />
            )}
        </div>
      </div>
    </FormSection>
  ), [handleApiModalOpen, externalApiLogs, isLoadingApiLogs]);

  // Main Tabs
  const mainTabs = useMemo(() => MAIN_TABS.map(mainTab => ({
    label: mainTab.label,
    content: mainTab.type === 'file-upload' ? fileUploadContent : externalApiContent
  })), [fileUploadContent, externalApiContent]);

  return (
    <div className="space-y-2">
      <Tabs
        tabs={mainTabs}
        activeTab={activeMainTabIndex}
        onChange={setActiveMainTabIndex}
        variant="full-width"
        // className="mb-6"
      />

      {/* File Upload Selection Modal */}
      <EntitySelectionModal
        isOpen={showFileUploadModal}
        onClose={handleFileUploadModalClose}
        onConfirm={async (selected) => {
          setSelectedFileUploadType(selected);
          setShowFileUploadModal(false);
          return Promise.resolve();
        }}
        type="file-upload"
        options={FILE_UPLOAD_OPTIONS}
        selectedValue={selectedFileUploadType}
        onSelectedValueChange={setSelectedFileUploadType}
        onFileChange={handleFileChange}
        file={file}
      />

      {/* External API Selection Modal */}
      <EntitySelectionModal
        isOpen={showApiModal}
        onClose={handleApiModalClose}
        onConfirm={handleApiConfirm}
        type="external-api"
        options={EXTERNAL_API_OPTIONS}
        selectedValue={selectedApiJobType}
        onSelectedValueChange={setSelectedApiJobType}
      />

      {/* Log Details Modal */}
      <LogDetailsModal
        isOpen={showLogDetailsModal}
        onClose={handleCloseLogDetailsModal}
        log={selectedLogDetail?.data || null}
        isLoading={isLoadingLogDetail}
      />
    </div>
  );
};