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
import { typographyClasses } from '@shared/utils/typographyUtils';
import { CanAccess } from '@shared/components/common/CanAccess';
import { PERMISSIONS } from '@shared/constants/permissions';
import { IconButton } from '@shared/components/ui/button/IconButton';
import { PencilIcon, TrashBinIcon } from '@shared/icons';
import appConfig from '@/shared/config/app.config';
import { formatDate } from '@/shared/utils/dateUtils';
import NoDataRow from '@/shared/components/common/NoDataRow';

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


  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                AMC Code
              </TableCell>
              <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                AMC Name
              </TableCell>
              <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                Inception Date
              </TableCell>
              <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                SEBI Reg. No.
              </TableCell>
              <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                Strategies
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
            {amcs.length === 0 ? (
              <NoDataRow colSpan={7} message="No AMCs found." />
            ) : (
              amcs.map((amc) => (
                <TableRow key={amc.id}>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                    {amc.amcCode}
                  </TableCell>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                    <div className="flex items-center gap-3">
                      {/* {amc.logoUrl && (
                        <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-gray-100 dark:border-white/[0.05]">
                          <img
                            src={amc.logoUrl.startsWith('http') ? amc.logoUrl : `${appConfig.baseUrl}${amc.logoUrl}`}
                            alt={amc.name || 'AMC Logo'}
                            className="h-full w-full object-contain"
                          />
                        </div>
                      )} */}
                      <h5 className={`${typographyClasses.component.button} ${typographyClasses.colors.text.primary}`}>
                        {amc.name}
                      </h5>
                    </div>
                  </TableCell>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                    {amc.inceptionDate ? formatDate(amc.inceptionDate) : 'N/A'}
                  </TableCell>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                    {amc.sebiRegistrationNo || 'N/A'}
                  </TableCell>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                    {amc.noOfStrategies || 'N/A'}
                  </TableCell>
                  <TableCell className={`px-5 py-4 ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                    <span className={`inline-block px-2 py-1 rounded ${typographyClasses.body.caption} ${
                      amc.isActive
                        ? 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-100'
                        : 'bg-error-100 text-error-800 dark:bg-error-700 dark:text-error-100'
                    }`}>
                      {amc.isActive ? "Active" : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell className={`px-4 py-3 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                    <div className="flex items-center space-x-3.5">
                      <CanAccess any={[PERMISSIONS.AMCS.UPDATE]}>
                        <IconButton
                          onClick={() => onEdit(amc)}
                          className="hover:text-primary"
                          icon={<PencilIcon className="size-5" />}
                        />
                      </CanAccess>
                      <CanAccess any={[PERMISSIONS.AMCS.DELETE]}>
                        <IconButton
                          onClick={() => onDelete(amc.id) }
                          className="hover:text-error-500"
                          icon={<TrashBinIcon className="size-5" />}
                        />
                      </CanAccess>
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