import React from 'react';
import { AssetClass } from '../types/assetClass';
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
import { typographyClasses } from '@shared/utils/typographyUtils';

interface AssetClassesTableProps {
  assetClasses: AssetClass[];
  isLoading: boolean;
  onEdit: (assetClass: AssetClass) => void;
  onDelete: (id: string) => void;
}

export const AssetClassesTable: React.FC<AssetClassesTableProps> = ({
  assetClasses,
  isLoading,
  onEdit,
  onDelete,
}) => {
  if (isLoading) {
    return <div className="p-4 text-center">Loading asset classes...</div>;
  }

  if (assetClasses.length === 0) {
    return <div className="p-4 text-center text-gray-500">No asset classes found.</div>;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}
              >
                Name
              </TableCell>
              <TableCell
                isHeader
                className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}
              >
                Status
              </TableCell>
              <TableCell
                isHeader
                className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {assetClasses.map((assetClass) => (
              <TableRow key={assetClass.id}>
                <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                  <h5 className={`${typographyClasses.component.button} ${typographyClasses.colors.text.primary}`}>
                    {assetClass.name}
                  </h5>
                </TableCell>
                <TableCell className={`px-5 py-4 ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                  <span className={`inline-block px-2 py-1 rounded ${typographyClasses.body.caption} ${
                    assetClass.isActive
                      ? 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-100' 
                      : 'bg-error-100 text-error-800 dark:bg-error-700 dark:text-error-100'
                  }`}>
                    {assetClass.isActive ? "Active" : 'Inactive'}
                  </span>
                </TableCell>
                <TableCell className={`px-4 py-3 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                  <div className="flex items-center space-x-3.5">
                    <CanAccess any={[PERMISSIONS.MASTERS.ASSET_CLASS_UPDATE]}>
                      <IconButton
                        onClick={() => onEdit(assetClass)}
                        className="hover:text-primary"
                        icon={<PencilIcon className="size-5" />}
                      />
                    </CanAccess>
                    <CanAccess any={[PERMISSIONS.MASTERS.ASSET_CLASS_DELETE]}>
                      <IconButton
                        onClick={() => onDelete(assetClass.id)}
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