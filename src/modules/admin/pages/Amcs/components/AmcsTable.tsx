import React from 'react';
import { Amc } from '../types/amc';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@shared/components/ui/table';
import { useNavigate } from 'react-router';
import { CanAccess } from '@shared/components/common/CanAccess';
import { PERMISSIONS } from '@shared/constants/permissions';
import { IconButton } from '@shared/components/ui/button/IconButton';
import { PencilIcon, TrashBinIcon } from '@shared/icons';

interface AmcsTableProps {
  amcs: Amc[];
  isLoading: boolean;
  onEdit: (amc: Amc) => void;
  onDelete: (id: string) => void;
}

export const AmcsTable: React.FC<AmcsTableProps> = ({ amcs, isLoading, onEdit, onDelete }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="p-4 text-center">Loading amcs...</div>;
  }

  if (amcs.length === 0) {
    return <div className="p-4 text-center text-gray-500">No amcs found.</div>;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Code
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Name
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Short Name
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Status
              </TableCell>
              <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {amcs.map((amc) => (
              <TableRow key={amc.id} onClick={() => navigate(`${amc.id}`)} className="cursor-pointer">
                <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-sm dark:text-gray-400">
                  {amc.amcCode}
                </TableCell>
                <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-sm dark:text-gray-400">
                  <h5 className="font-medium text-gray-800 dark:text-white/90">
                    {amc.name}
                  </h5>
                </TableCell>
                <TableCell className="px-5 py-4 sm:px-6 text-start text-theme-sm dark:text-gray-400">
                  {amc.shortName}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <span
                    className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                      amc.isActive
                        ? 'bg-success/10 text-success'
                        : 'bg-error/10 text-error-500'
                    }`}
                  >
                    {amc.isActive ? 'Active' : 'Inactive'}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex items-center space-x-3.5">
                    <CanAccess any={[PERMISSIONS.AMCS.UPDATE]}>
                      <IconButton
                        onClick={(e) => { e.stopPropagation(); onEdit(amc); }}
                        className="hover:text-primary"
                        icon={<PencilIcon className="size-5" />}
                      />
                    </CanAccess>
                    <CanAccess any={[PERMISSIONS.AMCS.DELETE]}>
                      <IconButton
                        onClick={(e) => { e.stopPropagation(); onDelete(amc.id); }}
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