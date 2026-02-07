import React from 'react';
import { Modal } from '@/shared/components/ui/modal/Modal';
import Badge from '@shared/components/ui/badge/Badge';
import Button from '@/shared/components/ui/button/Button';
import { typographyClasses } from '@shared/utils/typographyUtils';
import { Investment } from '../../types/investment';
import { Holding } from '../../types/holding';

interface InvestmentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  investment: Investment | null;
  holdings: Holding[];
}

export const InvestmentDetailsModal: React.FC<InvestmentDetailsModalProps> = ({
  isOpen,
  onClose,
  investment,
  holdings,
}) => {
  const isAIFOrGift = (code?: string) => {
    const productCode = code?.toUpperCase();
    return productCode === 'AIF' || productCode === 'GIFT_IFSC';
  };

  const formatCurrency = (value: string | null | undefined, currency?: string | null | undefined) => {
    if (!value) return '-';
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return '-';
    const curr = currency || '₹';
    return `${curr} ${numValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-2xl"
    >
      {/* Modal Header */}
      <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-transparent px-6 py-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Investment Details
            </h3>
            <div className="flex items-center mt-1">
              <p className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                {investment?.product?.name} - {investment?.scheme?.schemeName}
              </p>
              <Badge
                color={investment?.status === 'ACTIVE' ? 'success' : 'warning'}
                variant="light"
                size="md"
              >
                {investment?.status}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {investment && (
          <div className="space-y-5">
            {/* Investment Info Cards */}
            <div className="grid grid-cols-2 gap-4">
              <InfoCard label="AM Client Code">
                <p className="font-mono text-sm">{investment.amcClientCode || 'N/A'}</p>
              </InfoCard>
              <InfoCard label="Product">
                <p className="font-medium">{investment.product?.name || 'N/A'}</p>
                <p className="font-light text-xs">{investment.product?.code || 'N/A'}</p>
              </InfoCard>
              <InfoCard label="AMC">
                <p className="font-medium">{investment.amc?.name || 'N/A'}</p>
                <p className="font-light text-xs">{investment.amc?.amcCode || 'N/A'}</p>
              </InfoCard>
              <InfoCard label="Scheme">
                <p className="font-medium">{investment.scheme?.schemeName || '-'}</p>
                <p className="font-light text-xs">{investment.scheme?.schemeCode || '-'}</p>
              </InfoCard>
            </div>

            {/* AIF/GIFT Capital Details */}
            {isAIFOrGift(investment.product?.code) ? (
              <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 p-4">
                <h4 className="text-md font-semibold text-amber-800 dark:text-amber-200 mb-3">
                  Capital Details
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className={`${typographyClasses.body.caption} ${typographyClasses.colors.text.muted} mb-1`}>
                      Capital Called
                    </p>
                    <p className={`${typographyClasses.heading.h5} ${typographyClasses.colors.text.primary} font-bold`}>
                      {formatCurrency(investment.capitalCalled, investment.commitmentCurrency)}
                    </p>
                  </div>
                  <div>
                    <p className={`${typographyClasses.body.caption} ${typographyClasses.colors.text.muted} mb-1`}>
                      Capital Commitment
                    </p>
                    <p className={`${typographyClasses.heading.h5} ${typographyClasses.colors.text.primary} font-bold`}>
                      {formatCurrency(investment.capitalCommitment, investment.commitmentCurrency)}
                    </p>
                  </div>
                  <div>
                    <p className={`${typographyClasses.body.caption} ${typographyClasses.colors.text.muted} mb-1`}>
                      Pending Capital
                    </p>
                    <p className={`${typographyClasses.heading.h5} ${typographyClasses.colors.text.primary} font-bold`}>
                      {formatCurrency(investment.pendingCapital, investment.commitmentCurrency)}
                    </p>
                  </div>
                  <div>
                    <p className={`${typographyClasses.body.caption} ${typographyClasses.colors.text.muted} mb-1`}>
                      Commitment Currency
                    </p>
                    <p className={`${typographyClasses.heading.h5} ${typographyClasses.colors.text.primary}`}>
                      {investment.commitmentCurrency || '-'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              /* PMS, MF, SIF - Net Investment and Current Value */
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 p-4">
                  <p className={`${typographyClasses.body.caption} ${typographyClasses.colors.text.muted} mb-1`}>
                    Net Investment
                  </p>
                  <p className={`${typographyClasses.heading.h4} font-bold text-green-600`}>
                    {formatCurrency(investment.netInvestment)}
                  </p>
                </div>
                <div className="rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 p-4">
                  <p className={`${typographyClasses.body.caption} ${typographyClasses.colors.text.muted} mb-1`}>
                    Current Value
                  </p>
                  <p className={`${typographyClasses.heading.h4} font-bold text-blue-600`}>
                    {formatCurrency(investment.currentValue)}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex justify-end">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
      </div>
    </Modal>
  );
};

interface InfoCardProps {
  label: string;
  children: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ label, children }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3">
    <p className={`${typographyClasses.body.caption} ${typographyClasses.colors.text.muted} mb-1`}>
      {label}
    </p>
    <div className="text-gray-900 dark:text-white">
      {children}
    </div>
  </div>
);

export default InvestmentDetailsModal;
