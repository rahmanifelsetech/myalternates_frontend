import React from 'react';
import { Modal } from '@/shared/components/ui/modal/Modal';
import Button from '@shared/components/ui/button/Button';
import Badge from '@shared/components/ui/badge/Badge';
import { formatDateTime } from '@shared/utils/dateUtils';
import { typographyClasses } from '@shared/utils/typographyUtils';
import type { UploadLogDetail } from '../types/upload';

interface LogDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  log: UploadLogDetail | null;
  isLoading?: boolean;
}

export const LogDetailsModal: React.FC<LogDetailsModalProps> = ({
  isOpen,
  onClose,
  log,
  isLoading = false,
}) => {
  if (!log) return null;

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'success';
      case 'FAILED':
        return 'error';
      case 'IN_PROGRESS':
        return 'warning';
      case 'PENDING':
        return 'info';
      default:
        return 'info';
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className='max-w-lg p-6'>
      <div className="p-6 w-full max-w-2xl">
        <h3 className={`${typographyClasses.heading.h4} mb-6 ${typographyClasses.colors.text.primary}`}>
          Data Processing Details
        </h3>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className={`${typographyClasses.form.label} ${typographyClasses.colors.text.muted}`}>Job Type</p>
              <p className={`${typographyClasses.body.default} font-medium whitespace-normal break-words ${typographyClasses.colors.text.primary}`}>{log.jobType}</p>
            </div>
            <div>
              <p className={`${typographyClasses.form.label} ${typographyClasses.colors.text.muted}`}>Status</p>
              <div className="mt-1">
                <Badge color={getStatusVariant(log.status)}>
                  {log.status}
                </Badge>
              </div>
            </div>
            <div>
              <p className={`${typographyClasses.form.label} ${typographyClasses.colors.text.muted}`}>Started At</p>
              <p className={`${typographyClasses.body.default} font-medium ${typographyClasses.colors.text.primary}`}>
                {log.startedAt ? formatDateTime(log.startedAt) : 'N/A'}
              </p>
            </div>
            <div>
              <p className={`${typographyClasses.form.label} ${typographyClasses.colors.text.muted}`}>Completed At</p>
              <p className={`${typographyClasses.body.default} font-medium ${typographyClasses.colors.text.primary}`}>
                {log.completedAt ? formatDateTime(log.completedAt) : 'In Progress'}
              </p>
            </div>
          </div>

          {/* Record Statistics */}
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-md p-4">
            <p className={`${typographyClasses.form.label} font-semibold ${typographyClasses.colors.text.primary} mb-3`}>Processing Statistics</p>
            <div className="grid grid-cols-5 gap-4">
              <div>
                <p className={`${typographyClasses.body.caption} ${typographyClasses.colors.text.muted}`}>Total</p>
                <p className={`text-lg font-bold ${typographyClasses.colors.text.primary}`}>{log.totalRecords}</p>
              </div>
              <div>
                <p className={`${typographyClasses.body.caption} ${typographyClasses.colors.text.muted}`}>Processed</p>
                <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{log.processedRecords}</p>
              </div>
              <div>
                <p className={`${typographyClasses.body.caption} ${typographyClasses.colors.text.muted}`}>Added</p>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">{log.addedRecords}</p>
              </div>
              <div>
                <p className={`${typographyClasses.body.caption} ${typographyClasses.colors.text.muted}`}>Updated</p>
                <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">{log.updatedRecords}</p>
              </div>
              <div>
                <p className={`${typographyClasses.body.caption} ${typographyClasses.colors.text.muted}`}>Failed</p>
                <p className="text-lg font-bold text-red-600 dark:text-red-400">{log.failedRecords}</p>
              </div>
            </div>
          </div>

          {/* Error Details */}
          {log.errorDetails && log.errorDetails.length > 0 && (
            <div className="bg-red-50 dark:bg-red-900/20 rounded-md p-4 border border-red-200 dark:border-red-800">
              <p className={`${typographyClasses.form.label} font-semibold text-red-900 dark:text-red-200 mb-3`}>
                Errors ({log.errorDetails.length})
              </p>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {log.errorDetails.map((error, idx) => (
                  <div key={idx} className={`${typographyClasses.body.small} bg-white dark:bg-gray-800 p-3 rounded border border-red-200 dark:border-red-800`}>
                    <p className="font-medium text-red-900 dark:text-red-200">{error.identifier}</p>
                    <p className="text-red-800 dark:text-red-300 mt-1">{error.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(!log.errorDetails || log.errorDetails.length === 0) && (
            <div className="bg-green-50 dark:bg-green-900/20 rounded-md p-4 border border-green-200 dark:border-green-800">
              <p className={`${typographyClasses.form.label} font-semibold text-green-900 dark:text-green-200`}>✓ No errors found</p>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={onClose} variant="outline">
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
};
