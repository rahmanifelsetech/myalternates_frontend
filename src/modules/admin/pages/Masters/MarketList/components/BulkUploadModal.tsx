import React, { useRef, useState } from 'react';
import { Modal } from '@shared/components/ui/modal/Modal';
import Button from '@shared/components/ui/button/Button';
import { DownloadIcon, ArrowUpIcon, AlertIcon, CheckCircleIcon } from '@shared/icons';
import typographyClasses from '@/shared/utils/typographyUtils';

interface BulkUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
  onDownloadTemplate: () => void;
  isLoading?: boolean;
}

export const BulkUploadModal: React.FC<BulkUploadModalProps> = ({
  isOpen,
  onClose,
  onUpload,
  onDownloadTemplate,
  isLoading,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
      const validExtensions = ['.csv', '.xlsx', '.xls'];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      
      if (!validTypes.includes(file.type) && !validExtensions.includes(fileExtension)) {
        setUploadError('Invalid file type. Please upload an Excel file (.xlsx, .xls) or CSV file.');
        setSelectedFile(null);
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setUploadError('File size exceeds 5MB limit.');
        setSelectedFile(null);
        return;
      }

      setSelectedFile(file);
      setUploadError(null);
    }
  };

  const handleFileUploadClick = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      handleReset();
    }
  };

  const handleDownloadClick = async () => {
    try {
      setUploadError(null);
      await onDownloadTemplate();
    } catch (error) {
      setUploadError('Failed to download template. Please try again.');
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setUploadError(null);
    fileInputRef.current!.value = '';
    onClose();
  };

  const handleReset = () => {
    setSelectedFile(null);
    setUploadError(null);
    fileInputRef.current!.value = '';
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className="max-w-lg p-6">
      <div className="space-y-4">
        <h3 className={`${typographyClasses.heading.h4} mb-6 ${typographyClasses.colors.text.primary}`}>
          Bulk Upload Market List
        </h3>

        {/* Download Template Section */}
        <div className="space-y-2">
          <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted}`}>
            Step 1: Download the template to see the required format
          </p>
          <Button
            type="button"
            variant="outline"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadClick}
            disabled={isLoading}
            className="w-full"
          >
            Download Template
          </Button>
        </div>

        {/* File Upload Section */}
        <div className="space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
          <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted}`}>
            Step 2: Select and upload your file
          </p>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Select File
          </label>
          <div className="relative">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileSelect}
              disabled={isLoading}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="w-full px-3 py-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:border-brand-500 dark:hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {selectedFile ? selectedFile.name : 'Click to select file or drag and drop'}
            </button>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Supported formats: CSV, XLSX, XLS (Max 5MB)
          </p>

          {/* Error Message */}
          {uploadError && (
            <div className="flex gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertIcon className="text-red-600 dark:text-red-400 flex-shrink-0" fontSize={18} />
              <p className="text-sm text-red-700 dark:text-red-300">{uploadError}</p>
            </div>
          )}

          {/* Selected File Display */}
          {selectedFile && !uploadError && (
            <div className="flex items-center justify-between p-3 bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="text-brand-600 dark:text-brand-400" fontSize={18} />
                <div>
                  <p className="text-sm font-medium text-brand-900 dark:text-brand-100">{selectedFile.name}</p>
                  <p className="text-xs text-brand-700 dark:text-brand-300">
                    {(selectedFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="text-sm text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            startIcon={<ArrowUpIcon />}
            onClick={handleFileUploadClick}
            disabled={isLoading || !selectedFile}
          >
            {isLoading ? 'Uploading...' : 'Upload File'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
