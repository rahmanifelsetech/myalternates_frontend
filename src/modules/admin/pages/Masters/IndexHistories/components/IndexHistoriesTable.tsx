import React from 'react';
import { IndexHistory } from '../types/indexHistory';
import { IconButton } from '@shared/components/ui/button/IconButton';
import { PencilIcon, TrashBinIcon } from '@shared/icons';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@shared/components/ui/table';
import { typographyClasses } from '@shared/utils/typographyUtils';
import { CanAccess } from '@/shared/components/common/CanAccess';
import { PERMISSIONS } from '@/shared/constants/permissions';
import { formatDate } from '@/shared/utils/dateUtils';

interface IndexHistoriesTableProps {
  indexHistories: IndexHistory[];
  isLoading: boolean;
  onEdit: (indexHistory: IndexHistory) => void;
  onDelete: (id: string) => void;
}

export const IndexHistoriesTable: React.FC<IndexHistoriesTableProps> = ({
  indexHistories,
  isLoading,
  onEdit,
  onDelete,
}) => {
  if (isLoading) {
    return <div className="p-4 text-center">Loading index histories...</div>;
  }

  if (indexHistories.length === 0) {
    return <div className="p-4 text-center text-gray-500">No index histories found.</div>;
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
                Index Code
              </TableCell>
              <TableCell
                isHeader
                className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}
              >
                Index Name
              </TableCell>
              <TableCell
                isHeader
                className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}
              >
                Valuation Date
              </TableCell>
              <TableCell
                isHeader
                className={`px-5 py-3 text-end ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}
              >
                Open
              </TableCell>
              <TableCell
                isHeader
                className={`px-5 py-3 text-end ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}
              >
                High
              </TableCell>
              <TableCell
                isHeader
                className={`px-5 py-3 text-end ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}
              >
                Low
              </TableCell>
              <TableCell
                isHeader
                className={`px-5 py-3 text-end ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}
              >
                Close
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
            {indexHistories.map((indexHistory) => (
              <TableRow key={indexHistory.id}>
                <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                  <h5 className={`${typographyClasses.component.button} ${typographyClasses.colors.text.primary}`}>
                    {indexHistory.indexCode}
                  </h5>
                </TableCell>
                <TableCell className={`px-5 py-4 ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                  {indexHistory.indexName}
                </TableCell>
                <TableCell className={`px-5 py-4 ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                  {formatDate(indexHistory.valuationDate)}
                </TableCell>
                <TableCell className={`px-5 py-4 text-end ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                  {indexHistory.openValue}
                </TableCell>
                <TableCell className={`px-5 py-4 text-end ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                  {indexHistory.highValue}
                </TableCell>
                <TableCell className={`px-5 py-4 text-end ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                  {indexHistory.lowValue}
                </TableCell>
                <TableCell className={`px-5 py-4 text-end ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                  {indexHistory.closeValue}
                </TableCell>
                <TableCell className={`px-4 py-3 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                  <div className="flex items-center space-x-3.5">
                    <CanAccess any={[PERMISSIONS.MASTERS.BENCHMARK_UPDATE]}>
                      <IconButton
                        onClick={() => onEdit(indexHistory)}
                        className="hover:text-primary"
                        icon={<PencilIcon className="size-5" />}
                      />
                    </CanAccess>
                    <CanAccess any={[PERMISSIONS.MASTERS.BENCHMARK_DELETE]}>
                      <IconButton
                        onClick={() => onDelete(indexHistory.id)}
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
