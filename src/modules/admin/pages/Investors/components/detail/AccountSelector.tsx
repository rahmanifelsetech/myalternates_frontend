import React from 'react';
import { typographyClasses } from '@shared/utils/typographyUtils';
import Badge from '@shared/components/ui/badge/Badge';

export interface InvestmentAccount {
  id: string;
  modeOfHolding: 'SINGLE' | 'JOINT';
  holderOrderSignature: string | null;
  currentPortfolioValue: string;
  totalCapitalCalledINR: string;
  totalCapitalCalledUSD: string;
  totalCapitalCommitmentINR: string;
  totalCapitalCommitmentUSD: string;
  totalInflows: string;
  totalOutflows: string;
  totalInvestments?: number;
  isActive?: boolean;
  createdAt?: string;
}

interface AccountSelectorProps {
  accounts: InvestmentAccount[];
  selectedAccountId: string;
  onAccountChange: (accountId: string) => void;
  isLoading?: boolean;
}
const formatCurrency = (value: number | string, currency: 'INR' | 'USD' = 'INR') => {
  if (value === null || value === undefined || value === '') return 'N/A';

  const currSymbol = currency === 'USD' ? '$' : '₹';

  const num = Number(value);
  if (isNaN(num)) return 'N/A';

  const abs = Math.abs(num);
  const sign = num < 0 ? '-' : '';

  if (abs >= 1e7) {
    return `${sign}${currSymbol}${(abs / 1e7).toFixed(2)}Cr`;
  }

  if (abs >= 1e5) {
    return `${sign}${currSymbol}${(abs / 1e5).toFixed(2)}L`;
  }

  if (abs >= 1e3) {
    return `${sign}${currSymbol}${(abs / 1e3).toFixed(1)}k`;
  }

  return `${sign}${currSymbol}${abs.toFixed(0)}`;
};


export const AccountSelector: React.FC<AccountSelectorProps> = ({
  accounts,
  selectedAccountId,
  onAccountChange,
  isLoading = false,
}) => {
  if (!accounts || accounts.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
        <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted}`}>
          No investment accounts found
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => (
          <button
            key={account.id}
            onClick={() => onAccountChange(account.id)}
            disabled={isLoading}
            className={`relative rounded-lg border-2 p-4 text-left transition-all ${
              selectedAccountId === account.id
                ? 'border-brand-500 bg-brand-50 dark:border-brand-400 dark:bg-brand-500/10'
                : 'border-gray-200 bg-white hover:border-brand-300 dark:border-gray-700 dark:bg-gray-800/50 dark:hover:border-brand-400'
            } ${isLoading ? 'opacity-50' : ''}`}
          >
            {/* Header: Mode and Investments */}
            <div className="flex items-center gap-2">
              <Badge
                color={account.modeOfHolding === 'JOINT' ? 'info' : 'primary'}
                variant="light"
                size="sm"
              >
                {(account.modeOfHolding === 'JOINT' ? '👤👤 Joint' : '👤 Single') + ' Account'}
              </Badge>
              <span className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted}`}>
                ({account.totalInvestments ?? 0} investment's)
              </span>
              {account.isActive === false && (
                <Badge color="error" variant="light" size="sm">
                  Inactive
                </Badge>
              )}
              {selectedAccountId === account.id && (
                <svg className="ml-auto h-4 w-4 text-brand-600 dark:text-brand-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>

            {/* Holder Order Signature */}
            <p className={`${typographyClasses.body.caption} font-mono ${typographyClasses.colors.text.primary} mt-2 truncate`}>
              holders: {account.holderOrderSignature || 'N/A'}
            </p>

            {/* Financial Summary - Net Invested & Current Value */}
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-gray-100 pt-3 dark:border-gray-700">
              <div>
                <p className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Net Invested
                </p>
                <p className={`${typographyClasses.body.small} font-bold ${typographyClasses.colors.text.primary}`}>
                  {formatCurrency(Number(account.totalInflows) - Number(account.totalOutflows))}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Current Value
                </p>
                <p className={`${typographyClasses.body.small} font-bold ${typographyClasses.colors.text.primary}`}>
                  {formatCurrency(account.currentPortfolioValue)}
                </p>
              </div>
            </div>

            {/* Additional Details - Inflows, Outflows, Called */}
            <div className="mt-2 grid grid-cols-3 gap-1 text-xs">
              <div className="truncate">
                <span className="text-gray-400">In: </span>
                <span className="text-gray-600 dark:text-gray-300">{formatCurrency(account.totalInflows)}</span>
              </div>
              <div className="truncate">
                <span className="text-gray-400">Out: </span>
                <span className="text-gray-600 dark:text-gray-300">{formatCurrency(account.totalOutflows)}</span>
              </div>
              <div className="">
                <span className="text-gray-400">Called: </span>
                <span className="text-gray-600 dark:text-gray-300">{formatCurrency(account.totalCapitalCalledINR, 'INR')}</span>
                <span className="text-gray-400"> / </span>
                <span className="text-gray-600 dark:text-gray-300">{formatCurrency(account.totalCapitalCalledUSD, 'USD')}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AccountSelector;
