import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@shared/components/ui/table';
import { Role } from '../types/role';
import { IconButton } from '@shared/components/ui/button/IconButton';
import { PencilIcon, TrashBinIcon } from '@shared/icons';
import Loading from '@shared/components/common/Loading';
import { typographyClasses } from '@shared/utils/typographyUtils';
import { CanAccess } from '@/shared/components/common/CanAccess';
import { PERMISSIONS } from '@/shared/constants/permissions';

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
              <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                Name
              </TableCell>
              <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                Description
              </TableCell>
              <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                Created At
              </TableCell>
              <CanAccess any={[PERMISSIONS.ROLES.UPDATE,PERMISSIONS.ROLES.DELETE]}>
                <TableCell isHeader className={`px-5 py-3 text-end ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                  Actions
                </TableCell>
              </CanAccess>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {
              !isLoading && roles.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className={`px-5 py-4 text-center ${typographyClasses.body.small} ${typographyClasses.colors.text.muted}`}>
                    No roles found
                  </TableCell>
                </TableRow>
              )
            }
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell className={`px-5 py-4 ${typographyClasses.body.small} ${typographyClasses.colors.text.primary}`}>
                  {role.name}
                </TableCell>
                <TableCell className={`px-5 py-4 ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                  {role.description || '-'}
                </TableCell>
                <TableCell className={`px-5 py-4 ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                  {role.createdAt ? new Date(role.createdAt).toLocaleDateString() : '-'}
                </TableCell>
                <TableCell className="px-5 py-4 text-end">
                  <div className="flex justify-end gap-2">
                    <CanAccess any={[PERMISSIONS.ROLES.ASSIGN]}>
                      {onAssignPermissions && (
                        <IconButton
                          onClick={() => onAssignPermissions(role)}
                          className="hover:text-brand-500"
                          title="Assign Permissions"
                          icon={
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          }
                        />
                      )}
                    </CanAccess>
                    <CanAccess any={[PERMISSIONS.ROLES.UPDATE]}>
                      <IconButton
                        onClick={() => onEdit(role)}
                        className="hover:text-brand-500"
                        icon={<PencilIcon className="w-5 h-5" />}
                      />
                    </CanAccess>
                    <CanAccess any={[PERMISSIONS.ROLES.DELETE]}>
                      <IconButton
                        onClick={() => onDelete(role.id)}
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
