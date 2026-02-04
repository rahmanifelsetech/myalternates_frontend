import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@shared/components/ui/table';
import { typographyClasses } from '@shared/utils/typographyUtils';
import NoDataRow from '@shared/components/common/NoDataRow';
import Badge from '@shared/components/ui/badge/Badge';
import Button from '@shared/components/ui/button/Button';
import { Investment } from '../../types/investment';
import { Holding } from '../../types/holding';
import { HoldingsModal } from './HoldingsModal';

interface InvestmentsTabProps {
  investorId: string;
  accountId?: string;
  investments?: Investment[];
  holdings?: Holding[];
  isLoading?: boolean;
}

export const InvestmentsTab: React.FC<InvestmentsTabProps> = ({
  investorId,
  accountId,
  investments = [],
  holdings = [],
  isLoading = false,
}) => {
  const [selectedInvestmentId, setSelectedInvestmentId] = useState<string | null>(null);
  const [isHoldingsModalOpen, setIsHoldingsModalOpen] = useState(false);

  if (isLoading) {
    return <div className="p-4 text-center">Loading investments...</div>;
  }

  if (!investments || investments.length === 0) {
    return <NoDataRow colSpan={7} message="No investments found for this account." />;
  }

  const totalCommitment = investments.reduce((sum, inv) => sum + (parseFloat(inv.capitalCommitment || '0') || 0), 0);

  const handleUpdateHoldings = (investmentId: string) => {
    setSelectedInvestmentId(investmentId);
    setIsHoldingsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsHoldingsModalOpen(false);
    setSelectedInvestmentId(null);
  };

  const getHoldingsForInvestment = (investmentId: string) => {
    return holdings.filter(h => h.investmentId === investmentId);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <SummaryCard label="Total Investments" value={investments.length.toString()} />
        <SummaryCard label="Total Capital Commitment" value={`₹${totalCommitment?.toLocaleString('en-IN', { maximumFractionDigits: 2 }) || 0}`} />
        <SummaryCard label="Currency" value={investments.length > 0 ? investments[0].commitmentCurrency : 'INR'} />
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
                  Scheme
                </TableCell>
                <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                  AMC Code
                </TableCell>
                <TableCell isHeader className={`px-5 py-3 text-end ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                  Capital Commitment
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
              {investments.map((investment) => (
                <TableRow key={investment.investmentId}>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.primary} font-medium`}>
                    {investment.product?.name || 'N/A'}
                  </TableCell>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                    {investment.scheme?.schemeName || 'N/A'}
                  </TableCell>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary} font-mono`}>
                    {investment.amcClientCode || 'N/A'}
                  </TableCell>
                  <TableCell className={`px-5 py-4 sm:px-6 text-end ${typographyClasses.body.small} ${typographyClasses.colors.text.primary} font-medium`}>
                    ₹{parseFloat(investment.capitalCommitment || '0').toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start`}>
                    <Badge
                      color={investment.status === 'ACTIVE' ? 'success' : 'warning'}
                      variant="light"
                      size="sm"
                    >
                      {investment.status}
                    </Badge>
                  </TableCell>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start`}>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleUpdateHoldings(investment.investmentId)}
                    >
                      Update Holdings
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {selectedInvestmentId && (
        <HoldingsModal
          isOpen={isHoldingsModalOpen}
          onClose={handleCloseModal}
          investorId={investorId}
          investmentId={selectedInvestmentId}
          holdings={getHoldingsForInvestment(selectedInvestmentId)}
        />
      )}
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

export default InvestmentsTab;
