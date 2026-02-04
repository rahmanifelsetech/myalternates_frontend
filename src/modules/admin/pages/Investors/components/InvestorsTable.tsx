import React from 'react';
import { Investor } from '../types/investor';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@shared/components/ui/table';
import { useNavigate } from 'react-router';
import { typographyClasses } from '@shared/utils/typographyUtils';
import { CanAccess } from '@shared/components/common/CanAccess';
import { PERMISSIONS } from '@shared/constants/permissions';
import { IconButton } from '@shared/components/ui/button/IconButton';
import Button from '@shared/components/ui/button/Button';
import { PencilIcon, TrashBinIcon, EyeIcon } from '@shared/icons';
import NoDataRow from '@/shared/components/common/NoDataRow';
import { formatDate } from '@/shared/utils/dateUtils';

interface InvestorsTableProps {
  investors: Investor[];
  isLoading: boolean;
  onEdit: (investor: Investor) => void;
  onDelete: (id: string) => void;
}

export const InvestorsTable: React.FC<InvestorsTableProps> = ({ investors, isLoading, onEdit, onDelete }) => {
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="p-4 text-center">Loading investors...</div>;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                Investor
              </TableCell>
              <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                Contact
              </TableCell>
              <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                Identifiers
              </TableCell>
              <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                Res. Status
              </TableCell>
              <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                Inception
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
            {investors.length === 0 ? (
              <NoDataRow colSpan={6} message="No Investors found." />
            ) : (
              investors.map((investor) => (
                <TableRow key={investor.id}>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                    <div className="flex flex-col">
                      <span className={`${typographyClasses.component.button} ${typographyClasses.colors.text.primary}`}>
                        {investor.primaryPerson?.fullName}
                      </span>
                      <span className="text-xs text-gray-500">{investor.myaltCode || '-'}</span>
                    </div>
                  </TableCell>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                    <div className="flex flex-col">
                      <span>{investor.primaryPerson?.email}</span>
                      <span className="text-xs text-gray-500">{investor.primaryPerson?.mobile}</span>
                    </div>
                  </TableCell>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                    <span className="font-medium">{investor.primaryPerson?.pan}</span>
                  </TableCell>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                    <div className="flex flex-col">
                      <span>{investor.residentialStatus}</span>
                      {investor.subStatus && <span className="text-xs text-gray-500">{investor.subStatus}</span>}
                    </div>
                  </TableCell>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary} ${
                        !investor.inceptionDate && 'text-red-800'}`}>
                    {investor.inceptionDate ? formatDate(investor.inceptionDate) : 'Not Disclosed'}
                  </TableCell>
                  <TableCell className={`px-5 py-4 ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                    <div className="flex flex-col gap-1">
                      <span className={`inline-block px-2 py-1 rounded w-fit ${typographyClasses.body.caption} ${
                        investor.isActive
                          ? 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-100'
                          : 'bg-error-100 text-error-800 dark:bg-error-700 dark:text-error-100'
                      }`}>
                        {investor.isActive ? "Active" : 'Inactive'}
                      </span>
                      <span className="text-xs text-gray-500">Created: {investor.createdAt ? formatDate(investor.createdAt) : '-'}</span>
                    </div>
                  </TableCell>
                  <TableCell className={`px-5 py-4 ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                    <div className="flex items-center space-x-2">
                      <IconButton
                        onClick={() => navigate(`/admin/investors/${investor.id}`)}
                        className="hover:text-brand-600"
                        icon={<EyeIcon className="size-5" />}
                        title="View Details"
                      />
                      {/* <CanAccess any={[PERMISSIONS.INVESTORS.UPDATE]}>
                        <IconButton
                          onClick={() => onEdit(investor)}
                          className="hover:text-primary"
                          icon={<PencilIcon className="size-5" />}
                        />
                      </CanAccess>
                      <CanAccess any={[PERMISSIONS.INVESTORS.DELETE]}>
                        <IconButton
                          onClick={() => onDelete(investor.id) }
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