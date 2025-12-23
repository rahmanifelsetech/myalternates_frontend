import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@shared/components/ui/table';
import { Role } from '../types/role';
import { PencilIcon, TrashBinIcon } from '@shared/icons';
import Loading from '@shared/components/common/Loading';

interface RolesTableProps {
  roles: Role[];
  isLoading: boolean;
  onEdit: (role: Role) => void;
  onDelete: (id: string) => void;
  onAssignPermissions?: (role: Role) => void;
}

export const RolesTable: React.FC<RolesTableProps> = ({ roles, isLoading, onEdit, onDelete, onAssignPermissions }) => {
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
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Created At
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400">
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {
              !isLoading && roles.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="px-5 py-4 text-center text-gray-500 text-theme-sm dark:text-gray-400">
                    No roles found
                  </TableCell>
                </TableRow>
              )
            }
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell className="px-5 py-4 text-gray-800 text-theme-sm dark:text-white/90">
                  {role.name}
                </TableCell>
                <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                  {role.description || '-'}
                </TableCell>
                <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                  {role.createdAt ? new Date(role.createdAt).toLocaleDateString() : '-'}
                </TableCell>
                <TableCell className="px-5 py-4 text-end">
                  <div className="flex justify-end gap-2">
                    {onAssignPermissions && (
                      <button
                        onClick={() => onAssignPermissions(role)}
                        className="text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400 transition"
                        title="Assign Permissions"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    )}
                    <button
                      onClick={() => onEdit(role)}
                      className="text-gray-500 hover:text-brand-500 dark:text-gray-400 dark:hover:text-brand-400"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDelete(role.id)}
                      className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-400"
                    >
                      <TrashBinIcon className="w-5 h-5" />
                    </button>
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
