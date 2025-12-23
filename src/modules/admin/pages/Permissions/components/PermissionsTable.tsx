import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@shared/components/ui/table';
import { Permission } from '../types/permission';
import Loading from '@shared/components/common/Loading';

interface PermissionsTableProps {
  permissions: Permission[];
  isLoading: boolean;
}

export const PermissionsTable: React.FC<PermissionsTableProps> = ({ permissions, isLoading }) => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <Loading type="cover" loading={isLoading} />
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Name
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Description
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {
              !isLoading && permissions.length === 0 && (
                <TableRow>
                  <TableCell colSpan={2} className="px-5 py-4 text-center text-gray-500 text-theme-sm dark:text-gray-400">
                    No permissions found
                  </TableCell>
                </TableRow>
              )
            }
            {permissions.map((permission) => (
              <TableRow key={permission.id}>
                <TableCell className="px-5 py-4 text-gray-800 text-theme-sm dark:text-white/90">
                  {permission.name}
                </TableCell>
                <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                  {permission.description || '-'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
