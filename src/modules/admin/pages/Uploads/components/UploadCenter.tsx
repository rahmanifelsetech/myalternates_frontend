import React, { useState, useCallback } from 'react';
import { useUploadFileMutation, useGetUploadHistoryQuery } from '../api/uploadApi';
import { UploadType, UploadHistoryItem } from '../types/upload';
import Button from '@shared/components/ui/button/Button';
import { Tabs } from '@shared/components/common/Tabs';
import { Table, TableHeader, TableBody, TableCell, TableRow } from '@shared/components/ui/table';
import { FileUploader } from '@/shared/components/common/FileUploader';
import { FormSection } from '@/shared/components/common/FormSection';

const UPLOAD_TABS: { label: string; type: UploadType }[] = [
  { label: 'Daily Valuation', type: 'daily-valuation' },
  { label: 'Holdings', type: 'holdings' },
  { label: 'Market List', type: 'market-list' },
  { label: 'Transactions', type: 'transactions' },
  { label: 'Index History', type: 'index-history' },
];

export const UploadCenter: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const activeTabType = UPLOAD_TABS[activeTabIndex].type;

  const [uploadFileMutation, { isLoading: isUploading }] = useUploadFileMutation();
  const { data: history, isLoading: isLoadingHistory } = useGetUploadHistoryQuery({ type: activeTabType });

  const handleFileChange = useCallback((file: File | null) => {
    setFile(file);
  }, [setFile]);

  const handleUpload = useCallback(async () => {
    if (file) {
      try {
        await uploadFileMutation({ type: activeTabType, file }).unwrap();
        setFile(null);
        alert('File uploaded successfully!');
      } catch (err) {
        console.error('Upload failed:', err);
        alert('Upload failed');
      }
    }
  }, [uploadFileMutation, activeTabType, file]);

  const renderUploadContent = () => (
    <FormSection title="Upload Data">
      <FileUploader label="Choose a file to upload" onChange={handleFileChange} />
      <Button onClick={handleUpload} loading={isUploading} disabled={!file || isUploading}>
        {isUploading ? 'Uploading...' : 'Upload'}
      </Button>

      <div className="mt-8">
        <h4 className="text-lg font-medium mb-4">Upload History</h4>
        {isLoadingHistory ? (
          <p>Loading history...</p>
        ) : (
          <div className="max-w-full overflow-x-auto rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell isHeader className="px-4 py-4 font-medium text-black dark:text-white">File Name</TableCell>
                  <TableCell isHeader className="px-4 py-4 font-medium text-black dark:text-white">Date</TableCell>
                  <TableCell isHeader className="px-4 py-4 font-medium text-black dark:text-white">Status</TableCell>
                  <TableCell isHeader className="px-4 py-4 font-medium text-black dark:text-white">Rows</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history?.data && history.data.length > 0 ? (
                  history.data.map((item: UploadHistoryItem) => (
                    <TableRow key={item.id} className="border-b border-[#eee] dark:border-strokedark">
                      <TableCell className="py-5 px-4">{item.fileName}</TableCell>
                      <TableCell className="py-5 px-4">{new Date(item.uploadDate).toLocaleDateString()}</TableCell>
                      <TableCell className="py-5 px-4"><span className={`capitalize ${item.status === 'completed' ? 'text-success' : 'text-error-500'}`}>{item.status}</span></TableCell>
                      <TableCell className="py-5 px-4">{item.rowCount}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="py-5 px-4 text-center text-gray-500">No history found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </FormSection>
  );

  const tabs = UPLOAD_TABS.map(t => ({
    label: t.label,
    content: renderUploadContent()
  }));

  return (
    <Tabs
      tabs={tabs}
      activeTab={activeTabIndex}
      onChange={setActiveTabIndex}
    />
  );
};