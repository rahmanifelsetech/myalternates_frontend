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
import { Valuation } from '../../types/valuation';

interface ValuationsTabProps {
  investorId: string;
  accountId?: string;
  valuations?: Valuation[];
  isLoading?: boolean;
}


export const ValuationsTab: React.FC<ValuationsTabProps> = ({
  investorId,
  accountId,
  valuations = [],
  isLoading = false,
}) => {
  if (isLoading) {
    return <div className="p-4 text-center">Loading valuations...</div>;
  }

  if (!valuations || valuations.length === 0) {
    return <NoDataRow colSpan={5} message="No valuations found for this account." />;
  }

  const totalAmount = valuations.reduce((sum, v) => sum + (parseFloat(v.valuationAmount || '0') || 0), 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <SummaryCard label="Total Valuations" value={valuations.length.toString()} />
        <SummaryCard label="Total Valuation Amount" value={`₹${totalAmount?.toLocaleString('en-IN', { maximumFractionDigits: 2 }) || 0}`} />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                  Product
                </TableCell>
                <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                  AMC
                </TableCell>
                <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                  Scheme
                </TableCell>
                <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                  Valuation Date
                </TableCell>
                <TableCell isHeader className={`px-5 py-3 text-end ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                  Amount
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {valuations.map((valuation) => (
                <TableRow key={valuation.valuationId}>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.primary} font-medium`}>
                    {valuation.product?.name || 'N/A'}
                  </TableCell>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                    {valuation.amc?.name || 'N/A'}
                  </TableCell>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                    {valuation.scheme?.schemeName || '-'}
                  </TableCell>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                    {formatDate(valuation.valuationDate)}
                  </TableCell>
                  <TableCell className={`px-5 py-4 sm:px-6 text-end ${typographyClasses.body.small} ${typographyClasses.colors.text.primary} font-medium`}>
                    ₹{parseFloat(valuation.valuationAmount || '0').toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </TableCell>
                </TableRow>
              ))}
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
}

const SummaryCard: React.FC<SummaryCardProps> = ({ label, value }) => (
  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
    <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted} mb-2`}>
      {label}
    </p>
    <p className={`${typographyClasses.heading.h4} ${typographyClasses.colors.text.primary}`}>
      {value}
    </p>
  </div>
);

export default ValuationsTab;
