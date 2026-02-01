import React from 'react';
import { Bank } from '../types/bank';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@shared/components/ui/table';
import { typographyClasses } from '@shared/utils/typographyUtils';
import { CanAccess } from '@shared/components/common/CanAccess';
import { PERMISSIONS } from '@shared/constants/permissions';
import { IconButton } from '@shared/components/ui/button/IconButton';
import { PencilIcon, TrashBinIcon } from '@shared/icons';
import NoDataRow from '@/shared/components/common/NoDataRow';

interface BanksTableProps {
  banks: Bank[];
  isLoading: boolean;
  onEdit: (bank: Bank) => void;
  onDelete: (id: string) => void;
}

export const BanksTable: React.FC<BanksTableProps> = ({ banks, isLoading, onEdit, onDelete }) => {

  if (isLoading) {
    return <div className="p-4 text-center">Loading banks...</div>;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                Bank Name
              </TableCell>
              <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                Account Number
              </TableCell>
              <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                IFSC Code
              </TableCell>
               <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                Investor
              </TableCell>
              <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                Status
              </TableCell>
              <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                Actions
              </TableCell>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {banks.length === 0 ? (
              <NoDataRow colSpan={6} message="No Banks found." />
            ) : (
              banks.map((bank) => (
                <TableRow key={bank.id}>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                    {bank.bankName}
                  </TableCell>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                    {bank.accountNumber}
                  </TableCell>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                    {bank.ifscCode}
                  </TableCell>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                    {bank.investor?.name || 'N/A'}
                  </TableCell>
                  <TableCell className={`px-5 py-4 ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                    <span className={`inline-block px-2 py-1 rounded ${typographyClasses.body.caption} ${
                      bank.isActive
                        ? 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-100'
                        : 'bg-error-100 text-error-800 dark:bg-error-700 dark:text-error-100'
                    }`}>
                      {bank.isActive ? "Active" : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell className={`px-4 py-3 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                    <div className="flex items-center space-x-3.5">
                      {/* <CanAccess any={[PERMISSIONS.BANKS.UPDATE]}>
                        <IconButton
                          onClick={() => onEdit(bank)}
                          className="hover:text-primary"
                          icon={<PencilIcon className="size-5" />}
                        />
                      </CanAccess>
                      <CanAccess any={[PERMISSIONS.BANKS.DELETE]}>
                        <IconButton
                          onClick={() => onDelete(bank.id) }
                          className="hover:text-error-500"
                          icon={<TrashBinIcon className="size-5" />}
                        />
                      </CanAccess> */}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
