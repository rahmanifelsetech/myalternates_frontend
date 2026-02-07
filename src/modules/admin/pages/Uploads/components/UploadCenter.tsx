import React, { useState, useCallback, useMemo } from 'react';
import { useGetUploadLogsQuery, useGetUploadLogDetailQuery } from '../api/uploadApi';
import { useUploadManagement } from '../hooks/useUploadManagement';
import { UploadType, UploadMetadata } from '../types/upload';
import Button from '@shared/components/ui/button/Button';
import { Tabs } from '@shared/components/common/Tabs';
import { FormSection } from '@/shared/components/common/FormSection';
import { FileUploader } from '@/shared/components/common/FileUploader';
import { typographyClasses } from '@shared/utils/typographyUtils';
import { EntitySelectionModal } from './EntitySelectionModal';
import { DataProcessingHistoryTable } from './DataProcessingHistoryTable';
import { LogDetailsModal } from './LogDetailsModal';
import { SyncIcon, DownloadIcon, ArrowUpIcon } from '@shared/icons';
import { IconButton } from '@shared/components/ui/button/IconButton';
import { Pagination } from '@/shared/components/common/Pagination';
import { ReactSelectComponent, SelectOption } from '@shared/components/form/select/ReactSelect';

type MainTabType = 'bulk-upload' | 'external-api';

const MAIN_TABS: { label: string; type: MainTabType }[] = [
  { label: 'Bulk Data Upload', type: 'bulk-upload' },
  { label: 'External API Upload', type: 'external-api' },
];

const BULK_UPLOAD_OPTIONS = [
  { label: 'Daily Valuation', value: 'DAILY_VALUATION' },
  { label: 'Holdings', value: 'HOLDINGS' },
  { label: 'Market List', value: 'MARKET_LIST' },
  { label: 'Transactions', value: 'TRANSACTION' },
  { label: 'Index History', value: 'INDEX' },
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

  // Bulk Upload state
  const [selectedBulkType, setSelectedBulkType] = useState<string>('');
  const [bulkFile, setBulkFile] = useState<File | null>(null);
  const [isBulkUploading, setIsBulkUploading] = useState(false);

  // External API state
  const [showApiModal, setShowApiModal] = useState(false);
  const [selectedApiJobType, setSelectedApiJobType] = useState<string>('');
  const [showLogDetailsModal, setShowLogDetailsModal] = useState(false);
  const [selectedLogId, setSelectedLogId] = useState<string>('');
  const [externalApiUploadPage, setExternalApiUploadPage] = useState(1);

  // Custom hooks
  const { handleTriggerExternalApiFetch, handleDownloadTemplate, handleFileUpload } = useUploadManagement();

  // API queries
  // const activeMainTabType = MAIN_TABS[activeMainTabIndex].type;
  
  // const activeMainTabType = MAIN_TABS[activeMainTabIndex].type;
  const isExternalApiTab = MAIN_TABS[activeMainTabIndex].type === 'external-api';
  const logType = isExternalApiTab ? 'DATA_FETCHING' : 'DATA_UPLOAD';
  
  const { data: externalApiLogs, isLoading: isLoadingApiLogs, refetch: refetchApiLogs } = useGetUploadLogsQuery(
    { page: externalApiUploadPage, limit: 10, logType },
    { refetchOnMountOrArgChange: true }
  );


  const { data: selectedLogDetail, isLoading: isLoadingLogDetail } = useGetUploadLogDetailQuery(
    selectedLogId,
    { skip: !selectedLogId }
  );

  // Bulk Upload Handlers
  const handleBulkTypeChange = useCallback((option: SelectOption | null) => {
    setSelectedBulkType(option?.value?.toString() || '');
    setBulkFile(null);
  }, []);

  const handleBulkFileChange = useCallback((file: File | null) => {
    setBulkFile(file);
  }, []);

  const handleTemplateDownload = useCallback(async () => {
    if (selectedBulkType) {
      try {
        await handleDownloadTemplate(selectedBulkType as UploadType);
      } catch (error) {
        // Error handled by hook/UI
      }
    }
  }, [selectedBulkType, handleDownloadTemplate]);

  const handleBulkUpload = useCallback(async () => {
    if (!bulkFile || !selectedBulkType) return;
    
    setIsBulkUploading(true);
    try {
      const metadata: UploadMetadata = {
        uploadType: selectedBulkType as UploadType,
        source: 'ADMIN_PANEL',
        processMode: 'QUEUE',
        fileType: 'EXCEL',
      };
      await handleFileUpload(bulkFile, metadata);
      setBulkFile(null);
    } catch (error) {
      // Error handled
    } finally {
      setIsBulkUploading(false);
    }
  }, [bulkFile, selectedBulkType, handleFileUpload]);

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

  // Bulk Upload Tab Content
  const bulkUploadContent = useMemo(() => {
    const selectedOption = BULK_UPLOAD_OPTIONS.find(o => o.value === selectedBulkType);
    
    return (
      <FormSection title={null}>
        <div className="space-y-6">
          <div className="bg-white dark:bg-boxdark p-6 rounded-lg border border-stroke dark:border-strokedark shadow-default">
            <h3 className={`${typographyClasses.heading.h4} mb-4 ${typographyClasses.colors.text.primary}`}>
              Upload Configuration
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={`${typographyClasses.form.label} mb-2.5 block ${typographyClasses.colors.text.primary}`}>
                  Upload Type
                </label>
                <ReactSelectComponent
                  options={BULK_UPLOAD_OPTIONS}
                  value={selectedOption ? { label: selectedOption.label, value: selectedOption.value } : null}
                  onChange={(opt: any) => handleBulkTypeChange(opt)}
                  placeholder="Select upload type..."
                  isSearchable
                />
              </div>
              
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={handleTemplateDownload}
                  disabled={!selectedBulkType}
                  startIcon={<DownloadIcon />}
                  className="w-full md:w-auto"
                >
                  Download Template
                </Button>
              </div>
            </div>

            {selectedBulkType && (
              <div className="animate-fadeIn space-y-4">
                 <div className="rounded-md bg-blue-50 p-4 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Instructions:</strong> Download the template, fill in your data, and upload it below.
                      Supported formats: .xlsx, .csv (Max 10MB)
                    </p>
                </div>

                <FileUploader
                  label={`Upload ${selectedOption?.label} File`}
                  accept={{
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
                    'text/csv': ['.csv']
                  }}
                  maxSize={10 * 1024 * 1024}
                  onChange={handleBulkFileChange}
                  disabled={isBulkUploading}
                />

                <div className="flex justify-end pt-2">
                  <Button
                    onClick={handleBulkUpload}
                    disabled={!bulkFile || isBulkUploading}
                    loading={isBulkUploading}
                    size="lg"
                    startIcon={<ArrowUpIcon />}
                  >
                    {isBulkUploading ? 'Uploading...' : 'Upload File'}
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h4 className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary}`}>Upload Processing Queue</h4>
              <IconButton onClick={refetchApiLogs} icon={<SyncIcon className={isLoadingApiLogs ? 'animate-spin' : ''} />} title="Refresh History" />
            </div>
            <DataProcessingHistoryTable logs={externalApiLogs?.data} isLoading={isLoadingApiLogs} onViewDetails={handleViewLogDetails} />
            
             { externalApiLogs?.metaData && (
                <Pagination meta={externalApiLogs?.metaData || { limit: 10, page: 1, total: 0, totalPages: 0}} onPageChange={setExternalApiUploadPage} />
              )}
          </div>
        </div>
      </FormSection>
    );
  }, [selectedBulkType, bulkFile, isBulkUploading, handleBulkTypeChange, handleBulkFileChange, handleTemplateDownload, handleBulkUpload, externalApiLogs, isLoadingApiLogs, refetchApiLogs, handleViewLogDetails, setExternalApiUploadPage]);

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
    content: mainTab.type === 'bulk-upload' ? bulkUploadContent : externalApiContent
  })), [bulkUploadContent, externalApiContent]);

  return (
    <div className="space-y-2">
      <Tabs
        tabs={mainTabs}
        activeTab={activeMainTabIndex}
        onChange={setActiveMainTabIndex}
        variant="full-width"
        // className="mb-6"
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