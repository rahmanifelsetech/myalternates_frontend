import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@shared/components/ui/table';
import { typographyClasses } from '@shared/utils/typographyUtils';
import NoDataRow from '@shared/components/common/NoDataRow';
import { formatDate } from '@shared/utils/dateUtils';
import Badge from '@shared/components/ui/badge/Badge';
import { Holding } from '../../types/holding';

interface HoldingsTabProps {
  investorId: string;
  accountId?: string;
  holdings?: Holding[];
  isLoading?: boolean;
}

export const HoldingsTab: React.FC<HoldingsTabProps> = ({
  investorId,
  accountId,
  holdings = [],
  isLoading = false,
}) => {
  if (isLoading) {
    return <div className="p-4 text-center">Loading holdings...</div>;
  }

  if (!holdings || holdings.length === 0) {
    return <NoDataRow colSpan={7} message="No holdings found for this account." />;
  }

  // Get totalWeightage from investment holdings (from API)
  const totalWeightage = holdings.length > 0 ? parseFloat(holdings[0]?.totalWeightage || '0') || 0 : 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <SummaryCard label="Total Holdings" value={holdings.length.toString()} />
        <SummaryCard label="Avg Weightage" value={holdings.length > 0 ? (totalWeightage / holdings.length).toFixed(2) + '%' : '0%'} />
        <SummaryCard label="Total Weightage" value={totalWeightage?.toFixed(2) + '%' || '0%'} />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                  Company Name
                </TableCell>
                <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                  ISIN Code
                </TableCell>
                <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                  Security Type
                </TableCell>
                <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                  Sector
                </TableCell>
                <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                  AMC Code
                </TableCell>
                <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                  Category
                </TableCell>
                <TableCell isHeader className={`px-5 py-3 text-end ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                  Weightage (%)
                </TableCell>
                <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                  As On Date
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {holdings.map((holding) => {
                return (
                  <TableRow key={holding.holdingId}>
                    <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.primary} font-medium`}>
                      {holding.companyName || '-'}
                    </TableCell>
                    <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary} font-mono`}>
                      {holding.isinCode || '-'}
                    </TableCell>
                    <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small}`}>
                      <Badge color="info" variant="light" size="sm">
                        {holding.securityType || '-'}
                      </Badge>
                    </TableCell>
                    <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                      {holding.sector || '-'}
                    </TableCell>
                    <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary} font-mono`}>
                      {holding.amcClientCode || '-'}
                    </TableCell>
                    <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                      <Badge color="primary" variant="light" size="sm">
                        {holding.category?.name || '-'}
                      </Badge>
                    </TableCell>
                    <TableCell className={`px-5 py-4 sm:px-6 text-end ${typographyClasses.body.small} font-medium text-brand-600 dark:text-brand-400`}>
                      {(parseFloat(holding.portfolioWeightage || '0') || 0).toFixed(2)}%
                    </TableCell>
                    <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                      {holding.valuationDate ? formatDate(holding.valuationDate) : '-'}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

interface SummaryCardProps {
  label: string;
  value: string | number;
  valueColor?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ label, value, valueColor }) => (
  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
    <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted} mb-2`}>
      {label}
    </p>
    <p className={`${typographyClasses.heading.h4} ${valueColor || typographyClasses.colors.text.primary}`}>
      {value}
    </p>
  </div>
);

export default HoldingsTab;
