import React from 'react';
import { typographyClasses } from '@shared/utils/typographyUtils';
import Badge from '@shared/components/ui/badge/Badge';

interface InvestmentAccount {
  id: string;
  modeOfHolding: 'SINGLE' | 'JOINT';
  holderOrderSignature: string | null;
  totalInvested: string;
  currentPortfolioValue: string;
}

interface AccountSelectorProps {
  accounts: InvestmentAccount[];
  selectedAccountId: string;
  onAccountChange: (accountId: string) => void;
  isLoading?: boolean;
}

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
      {/* <h3 className={`${typographyClasses.heading.h5} ${typographyClasses.colors.text.primary}`}>
        Investment Accounts ({accounts.length})
      </h3> */}
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        {accounts.map((account) => (
          <button
            key={account.id}
            onClick={() => onAccountChange(account.id)}
            disabled={isLoading}
            className={`rounded-lg border-2 p-4 text-left transition-all ${
              selectedAccountId === account.id
                ? 'border-brand-500 bg-brand-50 dark:border-brand-400 dark:bg-brand-500/10'
                : 'border-gray-200 bg-white hover:border-brand-300 dark:border-gray-700 dark:bg-gray-800/50 dark:hover:border-brand-400'
            } ${isLoading ? 'opacity-50' : ''}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-2">
                  <Badge color="info" variant="light" size="sm">
                    {account.modeOfHolding === 'JOINT' ? '👥 Joint' : '👤 Single'}
                  </Badge>
                  {selectedAccountId === account.id && (
                    <svg className="h-4 w-4 text-brand-600 dark:text-brand-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted}`}>
                  {account.holderOrderSignature || 'Account'}
                </p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-gray-100 pt-3 dark:border-gray-700">
              <div>
                <p className={`${typographyClasses.body.caption} ${typographyClasses.colors.text.muted} mb-1`}>
                  Invested
                </p>
                <p className={`${typographyClasses.body.small} font-medium ${typographyClasses.colors.text.primary}`}>
                  ₹{parseFloat(account.totalInvested).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p className={`${typographyClasses.body.caption} ${typographyClasses.colors.text.muted} mb-1`}>
                  Current Value
                </p>
                <p className={`${typographyClasses.body.small} font-medium ${typographyClasses.colors.text.primary}`}>
                  ₹{parseFloat(account.currentPortfolioValue).toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AccountSelector;
