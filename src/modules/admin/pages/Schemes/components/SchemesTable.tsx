import React from 'react';
import { Scheme } from '../types/scheme';
import { IconButton } from '@shared/components/ui/button/IconButton';
import { PencilIcon, TrashBinIcon } from '@shared/icons';
import { CanAccess } from '@/shared/components/common/CanAccess';
import { PERMISSIONS } from '@/shared/constants/permissions';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@shared/components/ui/table';

interface SchemesTableProps {
  schemes: Scheme[];
  isLoading: boolean;
  onEdit: (scheme: Scheme) => void;
  onDelete: (id: string) => void;
}

export const SchemesTable: React.FC<SchemesTableProps> = ({
  schemes,
  isLoading,
  onEdit,
  onDelete,
}) => {
  if (isLoading) {
    return <div className="p-4 text-center">Loading schemes...</div>;
  }

  if (schemes.length === 0) {
    return <div className="p-4 text-center text-gray-500">No schemes found.</div>;
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
                Code
              </TableCell>
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
            {schemes.map((scheme) => (
              <TableRow key={scheme.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-sm dark:text-gray-400">
                  {scheme.schemeCode}
                </TableCell>
                <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-sm dark:text-gray-400">
                  <h5 className="font-medium text-gray-800 dark:text-white/90">
                    {scheme.schemeName}
                  </h5>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <span
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      scheme.isActive
                        ? 'bg-success/10 text-success'
                        : 'bg-error/10 text-error-500'
                    }`}
                  >
                    {scheme.isActive ? 'Active' : 'Inactive'}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex items-center space-x-3.5">
                    <CanAccess any={[PERMISSIONS.SCHEMES.UPDATE]}>
                      <IconButton
                        onClick={() => onEdit(scheme)}
                        className="hover:text-primary"
                        icon={<PencilIcon className="size-5" />}
                      />
                    </CanAccess>
                    <CanAccess any={[PERMISSIONS.SCHEMES.DELETE]}>
                      <IconButton
                        onClick={() => onDelete(scheme.id)}
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