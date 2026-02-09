import React, { useCallback, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router';
import {
  useGetInvestorByIdQuery,
  useGetInvestmentAccountsQuery,
  useGetAccountHoldingsQuery,
  useGetAccountInvestmentsQuery,
  useGetAccountTransactionsQuery,
  useGetAccountDailyValuationsQuery,
  InvestmentAccount,
} from './api/investorApi';
import { useInvestors } from './hooks/useInvestors';
import { InvestorProfile } from './components/detail/InvestorProfile';
import { DetailTabs } from './components/detail/DetailTabs';
import { AccountSelector } from './components/detail/AccountSelector';
import { InvestmentsTab } from './components/tabs/InvestmentsTab';
import { HoldingsTab } from './components/tabs/HoldingsTab';
import { TransactionsTab } from './components/tabs/TransactionsTab';
import { ValuationsTab } from './components/tabs/ValuationsTab';
import ComponentCard from '@shared/components/common/ComponentCard';
import Loading from '@shared/components/common/Loading';
import { ConfirmationModal } from '@shared/components/common/ConfirmationModal';
import { typographyClasses } from '@shared/utils/typographyUtils';
import { CanAccess } from '@shared/components/common/CanAccess';
import { PERMISSIONS } from '@shared/constants/permissions';

const InvestorDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState('info');
  const [selectedAccount, setSelectedAccount] = useState<InvestmentAccount | null>(null);

  // API Calls - Investor Profile
  const { data: investorData, isLoading: isFetching } = useGetInvestorByIdQuery(id!, {
    skip: !id,
  });

  // Fetch investment accounts
  const {
    data: accountsData,
    isLoading: isFetchingAccounts,
  } = useGetInvestmentAccountsQuery(id!, {
    skip: !id,
  });

  // Debug: Log when accountsData changes
  React.useEffect(() => {
    console.log('accountsData changed:', accountsData);
    if (accountsData) {
      console.log('accountsData.data:', accountsData.data);
      console.log('accountsData.data.data:', accountsData.data?.data);
      console.log('accountsData.data.data length:', accountsData.data?.data?.length);
    }
  }, [accountsData]);

  // Set default account if not already set
  React.useEffect(() => {
    if (accountsData?.data?.data && accountsData.data.data.length > 0 && !selectedAccount) {
      console.log('✓ Auto-selecting first account:', accountsData.data.data[0].id);
      setSelectedAccount(accountsData.data.data[0]);
    }
  }, [accountsData, selectedAccount]);

  // Fetch holdings for selected account
  const { data: holdingsData, isLoading: isFetchingHoldings, refetch: refetchHoldings } = useGetAccountHoldingsQuery(
    {
      investorId: id!,
      accountId: selectedAccount?.id!,
    },
    {
      skip: !id || !selectedAccount?.id,
    }
  );
  // Fetch holdings for selected account
  const { data: valuationssData, isLoading: isFetchingValuations } = useGetAccountDailyValuationsQuery(
    {
      investorId: id!,
      accountId: selectedAccount?.id!,
    },
    {
      skip: !id || !selectedAccount?.id,
    }
  );

  // Fetch investments for selected account
  const { data: investmentsData, isLoading: isFetchingInvestments } = useGetAccountInvestmentsQuery(
    {
      investorId: id!,
      accountId: selectedAccount?.id!,
    },
    {
      skip: !id || !selectedAccount?.id,
    }
  );

  // Fetch transactions for selected account
  const { data: transactionsData, isLoading: isFetchingTransactions } = useGetAccountTransactionsQuery(
    {
      investorId: id!,
      accountId: selectedAccount?.id!,
      limit: 100,
    },
    {
      skip: !id || !selectedAccount?.id,
    }
  );

  const { handleDelete } = useInvestors();

  // Memoized data
  const investor = investorData?.data;
  const accounts = useMemo(() => accountsData?.data?.data || [], [accountsData?.data?.data]);
  const investments = useMemo(() => investmentsData?.data || [], [investmentsData]);
  const holdings = useMemo(() => holdingsData?.data || [], [holdingsData]);
  const valuations = useMemo(() => valuationssData?.data || [], [valuationssData]);
  const transactions = useMemo(() => transactionsData?.data || [], [transactionsData]);

  // Handlers
  const handleEditClick = useCallback(() => {
    navigate(`/admin/investors/edit/${id}`);
  }, [id, navigate]);

  const handleDeleteClick = useCallback(() => {
    setShowDeleteConfirm(true);
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    if (!id) return;
    const result = await handleDelete(id);
    if (result) {
      navigate('/admin/investors');
    }
  }, [id, handleDelete, navigate]);

  // Tab configuration
  const tabs = [
    { id: 'info', label: 'Info' },
    { id: 'investments', label: 'Investments', badge: investments.length },
    // { id: 'holdings', label: 'Holdings', badge: holdings.length },
    { id: 'transactions', label: 'Transactions', badge: transactions.length },
    { id: 'valuations', label: 'Valuations', badge: valuations.length },
  ];

  // Loading state
  if (isFetching) {
    return <Loading />;
  }

  // Not found state
  if (!investor) {
    return (
      <ComponentCard>
        <div className="py-12 text-center">
          <p className={`${typographyClasses.heading.h3} ${typographyClasses.colors.text.muted} mb-4`}>
            Investor not found
          </p>
          <button
            onClick={() => navigate('/admin/investors')}
            className="text-brand-600 hover:text-brand-700 dark:text-brand-400"
          >
            Back to Investors
          </button>
        </div>
      </ComponentCard>
    );
  }

  return (
    <div className="space-y-6">
      {/* Debug Section */}
      {/* <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-900 dark:bg-yellow-900/20">
        <p className="text-xs text-yellow-800 dark:text-yellow-200">
          DEBUG: accounts.length = {accounts.length}, isFetchingAccounts = {isFetchingAccounts}, selectedAccountId = {selectedAccountId}
        </p>
      </div> */}

      

      {/* Account Selector - Show if accounts exist */}
      {accounts && accounts.length > 0 && (
        <ComponentCard title={`Investment Accounts (${accounts.length})`}>
          <AccountSelector
            accounts={accounts}
            selectedAccountId={selectedAccount?.id || ''}
            onAccountChange={(accountId) => {
              const account = accounts.find(a => a.id === accountId);
              if (account) setSelectedAccount(account);
            }}
            isLoading={isFetchingAccounts}
          />
        </ComponentCard>
      )}

      {/* Tabs Section */}
      {selectedAccount && (
        <CanAccess any={[PERMISSIONS.INVESTORS.READ]}>
          <DetailTabs tabs={tabs} activeTabId={activeTab} onTabChange={setActiveTab}>
            {activeTab === 'info' && (
              <InvestorProfile
                investor={investor}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            )}
            {activeTab === 'investments' && (
              <InvestmentsTab
                investorId={id!}
                accountId={selectedAccount?.id}
                investments={investments}
                holdings={holdings}
                isLoading={isFetchingInvestments}
                onRefetchHoldings={refetchHoldings}
              />
            )}
            {activeTab === 'holdings' && (
              <HoldingsTab
                investorId={id!}
                accountId={selectedAccount?.id}
                holdings={holdings}
                isLoading={isFetchingHoldings}
              />
            )}
            {activeTab === 'transactions' && (
              <TransactionsTab
                investorId={id!}
                accountId={selectedAccount?.id}
                investmentAccount={selectedAccount}
                transactions={transactions}
                isLoading={isFetchingTransactions}
              />
            )}
            {activeTab === 'valuations' && (
              <ValuationsTab
                investorId={id!}
                accountId={selectedAccount?.id}
                valuations={valuations}
                isLoading={isFetchingValuations}
              />
            )}
          </DetailTabs>
        </CanAccess>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Investor"
        message={`Are you sure you want to delete ${investor.primaryPerson?.fullName}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default InvestorDetail;
