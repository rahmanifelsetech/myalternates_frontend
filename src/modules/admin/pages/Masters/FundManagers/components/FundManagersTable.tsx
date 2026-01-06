import React from 'react';
import { FundManager } from '../types/fundManager';
import { IconButton } from '@shared/components/ui/button/IconButton';
import { PencilIcon, TrashBinIcon } from '@shared/icons';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@shared/components/ui/table';
import { CanAccess } from '@/shared/components/common/CanAccess';
import { PERMISSIONS } from '@/shared/constants/permissions';
import appConfig from '@/shared/config/app.config';

interface FundManagersTableProps {
  fundManagers: FundManager[];
  isLoading: boolean;
  onEdit: (fundManager: FundManager) => void;
  onDelete: (id: string) => void;
}

export const FundManagersTable: React.FC<FundManagersTableProps> = ({
  fundManagers,
  isLoading,
  onEdit,
  onDelete,
}) => {
  if (isLoading) {
    return <div className="p-4 text-center">Loading fund managers...</div>;
  }

  if (fundManagers.length === 0) {
    return <div className="p-4 text-center text-gray-500">No fund managers found.</div>;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Name
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Code
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                AMC
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                AUM (Cr.)
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {fundManagers.map((fm) => (
              <TableRow key={fm.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex items-center gap-3">
                    {fm.profilePicture ? (
                      <div className="w-10 h-10 overflow-hidden rounded-full">
                        <img
                          width={40}
                          height={40}
                          src={fm.profilePicture.startsWith('http') ? fm.profilePicture : `${appConfig.baseUrl}${fm.profilePicture}`}
                          alt={fm.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                        {fm.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <span className="block font-medium text-gray-800 dark:text-white/90">
                        {fm.name}
                      </span>
                      <span className="block text-xs text-gray-500">
                        {fm.designation}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {fm.code || '-'}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {fm.amc?.name || '-'}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {fm.aum ? Number(fm.aum).toLocaleString() : '-'}
                </TableCell>
                <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    fm.isActive
                      ? 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-100' 
                      : 'bg-error-100 text-error-800 dark:bg-error-700 dark:text-error-100'
                  }`}>
                    {fm.isActive ? "Active" : 'Inactive'}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex items-center space-x-3.5">
                    <CanAccess any={[PERMISSIONS.MASTERS.FUND_MANAGER_UPDATE]}>
                      <IconButton
                        onClick={() => onEdit(fm)}
                        className="hover:text-primary"
                        icon={<PencilIcon className="size-5" />}
                      />
                    </CanAccess>
                    <CanAccess any={[PERMISSIONS.MASTERS.FUND_MANAGER_DELETE]}>
                      <IconButton
                        onClick={() => onDelete(fm.id)}
                        className="hover:text-error-500"
                        icon={<TrashBinIcon className="size-5" />}
                      />
                    </CanAccess>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};