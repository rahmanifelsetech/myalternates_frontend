import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from '@shared/components/ui/table';
import { IconButton } from '@shared/components/ui/button/IconButton';
import Badge from '@shared/components/ui/badge/Badge';
import { CanAccess } from '@/shared/components/common/CanAccess';
import { PERMISSIONS } from '@/shared/constants/permissions';
import { PencilIcon, TrashBinIcon } from '@shared/icons';
import { typographyClasses } from '@shared/utils/typographyUtils';

interface MarketListTableProps {
  data: Array<{
    id: string;
    companyName: string;
    isinCode: string;
    category?: { name: string };
    sector: string;
    asOnDate: string;
  }>;
  isLoading?: boolean;
  onEdit?: (item: any) => void;
  onDelete?: (id: string) => void;
}

export const MarketListTable: React.FC<MarketListTableProps> = ({
  data,
  isLoading,
  onEdit,
  onDelete,
}) => {
  if (isLoading) return <div className="p-4 text-center">Loading...</div>;
  if (!data?.length) return <div className="p-4 text-center">No market lists found</div>;

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
                Company Name
              </TableCell>
              <TableCell
                isHeader
                className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}
              >
                ISIN Code
              </TableCell>
              <TableCell
                isHeader
                className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}
              >
                Category
              </TableCell>
              <TableCell
                isHeader
                className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}
              >
                Sector
              </TableCell>
              <TableCell
                isHeader
                className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}
              >
                As On Date
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
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                  <h5 className={`${typographyClasses.component.button} ${typographyClasses.colors.text.primary}`}>
                    {item.companyName}
                  </h5>
                </TableCell>
                <TableCell className={`px-5 py-4 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                  <Badge variant="solid">{item.isinCode}</Badge>
                </TableCell>
                <TableCell className={`px-5 py-4 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                  {item.category?.name || 'N/A'}
                </TableCell>
                <TableCell className={`px-5 py-4 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                  {item.sector}
                </TableCell>
                <TableCell className={`px-5 py-4 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                  {new Date(item.asOnDate).toLocaleDateString()}
                </TableCell>
                <TableCell className={`px-4 py-3 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                  <div className="flex items-center space-x-3.5">
                    <CanAccess any={[PERMISSIONS.MASTERS.MARKET_LIST_UPDATE]}>
                      <IconButton
                        onClick={() => onEdit?.(item)}
                        className="hover:text-primary"
                        icon={<PencilIcon className="size-5" />}
                      />
                    </CanAccess>
                    <CanAccess any={[PERMISSIONS.MASTERS.MARKET_LIST_DELETE]}>
                      <IconButton
                        onClick={() => onDelete?.(item.id)}
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
