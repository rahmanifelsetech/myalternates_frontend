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
import { Dropdown } from '@/shared/components/ui/dropdown/Dropdown';
import { DropdownItem } from '@/shared/components/ui/dropdown/DropdownItem';
import { Investment } from '../../types/investment';
import { Holding } from '../../types/holding';
import { HoldingsModal } from './HoldingsModal';
import { InvestmentDetailsModal } from '../modals/InvestmentDetailsModal';

interface InvestmentsTabProps {
  investorId: string;
  accountId?: string;
  investments?: Investment[];
  holdings?: Holding[];
  isLoading?: boolean;
  onRefetchHoldings?: () => void;
}

export const InvestmentsTab: React.FC<InvestmentsTabProps> = ({
  investorId,
  accountId,
  investments = [],
  holdings = [],
  isLoading = false,
  onRefetchHoldings,
}) => {
  const [selectedInvestmentId, setSelectedInvestmentId] = useState<string | null>(null);
  const [isHoldingsModalOpen, setIsHoldingsModalOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
  const [showViewDetailsModal, setShowViewDetailsModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  if (isLoading) {
    return <div className="p-4 text-center">Loading investments...</div>;
  }

  if (!investments || investments.length === 0) {
    return <NoDataRow colSpan={8} message="No investments found for this account." />;
  }

  const handleUpdateHoldings = (investmentId: string) => {
    setSelectedInvestmentId(investmentId);
    setIsHoldingsModalOpen(true);
    setOpenDropdownId(null);
  };

  const handleViewDetails = (investment: Investment) => {
    setSelectedInvestment(investment);
    setShowViewDetailsModal(true);
    setOpenDropdownId(null);
  };

  const handleToggleActive = (investment: Investment) => {
    // TODO: Implement toggle active API call
    console.log('Toggle active for:', investment.id);
    setOpenDropdownId(null);
  };

  const handleCloseModal = () => {
    setIsHoldingsModalOpen(false);
    setSelectedInvestmentId(null);
    // Trigger refetch of holdings after modal closes
    if (onRefetchHoldings) {
      onRefetchHoldings();
    }
  };

  const getHoldingsForInvestment = (investmentId: string) => {
    return holdings.filter(h => h.investmentId === investmentId);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-1">
        <SummaryCard label="Total Investments" value={investments.length.toString()} />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto min-h-[300px]">
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
                  AMC
                </TableCell>
                <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                  AM Client Code
                </TableCell>
                <TableCell isHeader className={`px-5 py-3 text-start ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                  Status
                </TableCell>
                <TableCell isHeader className={`px-5 py-3 text-center ${typographyClasses.colors.text.muted} ${typographyClasses.body.caption}`}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {investments.map((investment) => (
                <TableRow key={investment.id}>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.primary} font-medium`}>
                    {investment.product?.name || 'N/A'}
                  </TableCell>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                    {investment.scheme?.schemeName || 'N/A'}
                  </TableCell>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary}`}>
                    {investment.amc?.name || 'N/A'}
                  </TableCell>
                  <TableCell className={`px-5 py-4 sm:px-6 text-start ${typographyClasses.body.small} ${typographyClasses.colors.text.secondary} font-mono`}>
                    {investment.amcClientCode || 'N/A'}
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
                  <TableCell className={`px-5 py-4 sm:px-6 text-center`}>
                    <div className="flex items-center justify-center gap-2">
                      <div className="relative inline-block">
                        <button
                            onClick={(e) => {
                                setAnchorEl(e.currentTarget);
                                setOpenDropdownId(openDropdownId === investment.id ? null : investment.id)
                            }}
                            className="p-2 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700"
                        >
                          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </button>
                        <Dropdown
                            isOpen={openDropdownId === investment.id}
                            onClose={() => setOpenDropdownId(null)}
                            anchorEl={anchorEl}
                        >
                            <DropdownItem key="view" onClick={() => handleViewDetails(investment)}>Details</DropdownItem>
                            <DropdownItem key="holdings" onClick={() => handleUpdateHoldings(investment.id)}>Holdings</DropdownItem>
                            <DropdownItem key="toggle" onClick={() => handleToggleActive(investment)}>Toggle Active</DropdownItem>
                        </Dropdown>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {selectedInvestmentId && (
        <HoldingsModal
          key={selectedInvestmentId}
          isOpen={isHoldingsModalOpen}
          onClose={handleCloseModal}
          investorId={investorId}
          investmentId={selectedInvestmentId}
          holdings={getHoldingsForInvestment(selectedInvestmentId)}
          onSuccess={handleCloseModal}
        />
      )}

      {/* Investment Details Modal */}
      <InvestmentDetailsModal
        isOpen={showViewDetailsModal}
        onClose={() => setShowViewDetailsModal(false)}
        investment={selectedInvestment}
        holdings={holdings}
      />
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
