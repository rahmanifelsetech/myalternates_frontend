import React, { useMemo } from 'react';
import { Table, TableHeader, TableBody, TableCell, TableRow } from '@shared/components/ui/table';
import Badge from '@shared/components/ui/badge/Badge';
import NoDataRow from '@/shared/components/common/NoDataRow';
import Button from '@shared/components/ui/button/Button';
import { formatDateTime } from '@shared/utils/dateUtils';
import { typographyClasses } from '@shared/utils/typographyUtils';
import type { UploadLog } from '../types/upload';

interface DataProcessingHistoryTableProps {
  logs: UploadLog[] | undefined;
  isLoading: boolean;
  onViewDetails?: (logId: string) => void;
}

export const DataProcessingHistoryTable: React.FC<DataProcessingHistoryTableProps> = ({ logs, isLoading, onViewDetails }) => {
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

  const totalRecordsMetrics = useMemo(() => {
    if (!logs || logs.length === 0) return null;
    return logs.map((log) => (
      <div key={log.id} className={`flex gap-4 ${typographyClasses.body.small}`}>
        <span>Total: {log.totalRecords}</span>
        <span>Processed: {log.processedRecords}</span>
        <span>Added: {log.addedRecords}</span>
        <span>Updated: {log.updatedRecords}</span>
        <span className="text-error-500">Failed: {log.failedRecords}</span>
      </div>
    ));
  }, [logs]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
            <p className={`${typographyClasses.colors.text.muted}`}>Loading data processing history...</p>
        </div>
      </div>
    );
  }

  if (!logs || logs.length === 0) {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
            <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>Job Type</TableCell>
            <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>Status</TableCell>
            <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>Started At</TableCell>
            <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>Completed At</TableCell>
            <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>Records</TableCell>
            <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>Errors</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <NoDataRow colSpan={6} message="No data processing history found" />
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className={`px-4 py-4 ${typographyClasses.table.header} ${typographyClasses.colors.text.primary}`}>Job Type</TableCell>
              <TableCell isHeader className={`px-4 py-4 ${typographyClasses.table.header} ${typographyClasses.colors.text.primary}`}>Status</TableCell>
              <TableCell isHeader className={`px-4 py-4 ${typographyClasses.table.header} ${typographyClasses.colors.text.primary}`}>Started At</TableCell>
              <TableCell isHeader className={`px-4 py-4 ${typographyClasses.table.header} ${typographyClasses.colors.text.primary}`}>Completed At</TableCell>
              <TableCell isHeader className={`px-4 py-4 ${typographyClasses.table.header} ${typographyClasses.colors.text.primary}`}>Records</TableCell>
              <TableCell isHeader className={`px-4 py-4 ${typographyClasses.table.header} ${typographyClasses.colors.text.primary}`}>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id} className="border-b border-[#eee] dark:border-strokedark">
                <TableCell className={`py-5 px-4 ${typographyClasses.table.cell} ${typographyClasses.colors.text.primary}`}>{log.jobType}</TableCell>
                <TableCell className="py-5 px-4">
                  <Badge color={getStatusVariant(log.status)}>
                    {log.status}
                  </Badge>
                </TableCell>
                <TableCell className={`py-5 px-4 ${typographyClasses.table.cell} ${typographyClasses.colors.text.secondary}`}>
                  {log.startedAt ? formatDateTime(log.startedAt) : 'N/A'}
                </TableCell>
                <TableCell className={`py-5 px-4 ${typographyClasses.table.cell} ${typographyClasses.colors.text.secondary}`}>
                  {log.completedAt ? formatDateTime(log.completedAt) : 'In Progress'}
                </TableCell>
                <TableCell className="py-5 px-4">
                  <div className={`flex gap-3 ${typographyClasses.body.xsmall}`}>
                    <span>T: {log.totalRecords}</span>
                    <span className="text-blue-500">P: {log.processedRecords}</span>
                    <span className="text-success">A: {log.addedRecords}</span>
                    <span className="text-warning-500">U: {log.updatedRecords}</span>
                    {log.failedRecords > 0 && (
                      <span className="text-error-500">F: {log.failedRecords}</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="py-5 px-4">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewDetails && onViewDetails(log.id)}
                    >
                      View Details
                    </Button>
                  </div>
                </TableCell>
                {/* <TableCell className="py-5 px-4">
                  {log.errorDetails && log.errorDetails.length > 0 ? (
                    <div className="text-xs max-h-24 overflow-y-auto">
                      <ul className="list-disc list-inside space-y-1">
                        {log.errorDetails.slice(0, 3).map((error, idx) => (
                          <li key={idx} className="text-error-500 truncate">
                            {error.identifier}: {error.reason}
                          </li>
                        ))}
                        {log.errorDetails.length > 3 && (
                          <li className="text-error-500">+{log.errorDetails.length - 3} more</li>
                        )}
                      </ul>
                    </div>
                  ) : (
                    <span className="text-success">None</span>
                  )}
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
