import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@shared/components/ui/table';
import { User } from '../types/user';
import { IconButton } from '@shared/components/ui/button/IconButton';
import { PencilIcon, TrashBinIcon } from '@shared/icons';
import Loading from '@shared/components/common/Loading';
import { CanAccess } from '@/shared/components/common/CanAccess';
import { PERMISSIONS } from '@/shared/constants/permissions';

interface UsersTableProps {
  users: User[];
  isLoading: boolean;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

export const UsersTable: React.FC<UsersTableProps> = ({ users, isLoading, onEdit, onDelete }) => {
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
                Email
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Phone
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Role
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Status
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400">
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {
              !isLoading && users.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="px-5 py-4 text-center text-gray-500 text-theme-sm dark:text-gray-400">
                    No users found
                  </TableCell>
                </TableRow>
              )
            }
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="px-5 py-4 text-gray-800 text-theme-sm dark:text-white/90">
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                  {user.email}
                </TableCell>
                <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                  {user.phone || '-'}
                </TableCell>
                <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                  {user.role?.name || '-'}
                </TableCell>
                <TableCell className="px-5 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    user.isActive
                      ? 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-100' 
                      : 'bg-error-100 text-error-800 dark:bg-error-700 dark:text-error-100'
                  }`}>
                    {user.isActive ? "Active" : 'Inactive'}
                  </span>
                </TableCell>
                <TableCell className="px-5 py-4 text-end">
                  <div className="flex justify-end gap-2">
                    <CanAccess any={[PERMISSIONS.USERS.UPDATE]}>
                      <IconButton
                        onClick={() => onEdit(user)}
                        className="hover:text-brand-500"
                        icon={<PencilIcon className="w-5 h-5" />}
                      />
                    </CanAccess>
                    <CanAccess any={[PERMISSIONS.USERS.DELETE]}>
                      <IconButton
                        onClick={() => onDelete(user.id)}
                        className="hover:text-error-500"
                        icon={<TrashBinIcon className="w-5 h-5" />}
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
