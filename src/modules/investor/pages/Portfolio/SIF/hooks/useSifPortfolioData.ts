import { useCallback, useMemo } from 'react';
import { useGetSIFDashboardQuery, useGetSIFAccountsQuery, useGetSIFHoldingsQuery, useGetSIFTransactionsQuery, useGetSIFDistributionAMCQuery, useGetSIFDistributionSchemeQuery, useGetSIFDistributionAssetClassQuery } from '../api/sifApi';
import type { SIFDashboardSummary, SIFAccount, SIFHolding, SIFTransaction } from '../types';

export const useSIFPortfolioData = (investmentAccountId: string | null, productType: string = 'SIF') => {

  // Fetch all required data
  const { data: dashboardData, isLoading: isDashboardLoading, error: dashboardError } = useGetSIFDashboardQuery({ investmentAccountId: investmentAccountId || '', productType });
  const { data: accountsData, isLoading: isAccountsLoading, error: accountsError } = useGetSIFAccountsQuery({ investmentAccountId: investmentAccountId || '', productType });
  const { data: holdingsData, isLoading: isHoldingsLoading, error: holdingsError } = useGetSIFHoldingsQuery({ investmentAccountId: investmentAccountId || '', productType });
  const { data: transactionsData, isLoading: isTransactionsLoading, error: transactionsError } = useGetSIFTransactionsQuery({ investmentAccountId: investmentAccountId || '', productType });
  // Distribution endpoints
  const { data: distributionAMCData, isLoading: isDistributionAMCLoading, error: distributionAMCError } = useGetSIFDistributionAMCQuery(
    { investmentAccountId: investmentAccountId || '', productType },
    { skip: !investmentAccountId }
  );
  const { data: distributionSchemeData, isLoading: isDistributionSchemeLoading, error: distributionSchemeError } = useGetSIFDistributionSchemeQuery(
    { investmentAccountId: investmentAccountId || '', productType },
    { skip: !investmentAccountId }
  );
  const { data: distributionAssetClassData, isLoading: isDistributionAssetClassLoading, error: distributionAssetClassError } = useGetSIFDistributionAssetClassQuery(
    { investmentAccountId: investmentAccountId || '', productType },
    { skip: !investmentAccountId }
  );
  
  // Memoized summary data
  const summary: SIFDashboardSummary | undefined = useMemo(() => {
    return dashboardData?.data;
  }, [dashboardData?.data]);

  // Memoized accounts
  const accounts: SIFAccount[] = useMemo(() => {
    return accountsData?.data || [];
  }, [accountsData?.data]);

  // Memoized holdings
  const holdings: SIFHolding[] = useMemo(() => {
    return holdingsData?.data || [];
  }, [holdingsData?.data]);

  // Memoized transactions
  const transactions: SIFTransaction[] = useMemo(() => {
    return transactionsData?.data || [];
  }, [transactionsData?.data]);

  // Memoized distribution data
  const distributionAMC = useMemo(() => distributionAMCData?.data || [], [distributionAMCData?.data]);
  const distributionScheme = useMemo(() => distributionSchemeData?.data || [], [distributionSchemeData?.data]);
  const distributionAssetClass = useMemo(() => distributionAssetClassData?.data || [], [distributionAssetClassData?.data]);

  // Overall loading state
  const isLoading = useMemo(
    () =>
      isDashboardLoading ||
      isAccountsLoading ||
      isHoldingsLoading ||
      isTransactionsLoading ||
      isDistributionAMCLoading ||
      isDistributionSchemeLoading ||
      isDistributionAssetClassLoading,
    [
      isDashboardLoading,
      isAccountsLoading,
      isHoldingsLoading,
      isTransactionsLoading,
      isDistributionAMCLoading,
      isDistributionSchemeLoading,
      isDistributionAssetClassLoading,
    ]
  );

  // Error state
  const error =
    dashboardError ||
    accountsError ||
    holdingsError ||
    transactionsError ||
    distributionAMCError ||
    distributionSchemeError ||
    distributionAssetClassError;

  return {
    summary,
    accounts,
    holdings,
    transactions,
    distributionAMC,
    distributionScheme,
    distributionAssetClass,
    isLoading,
    error,
  };
};

export const useSIFAccountHoldings = (investmentAccountId: string, productType: string = 'SIF') => {
  const { data, isLoading, error } = useGetSIFHoldingsQuery({ investmentAccountId, productType });

  const holdings: SIFHolding[] = useMemo(() => {
    return data?.data || [];
  }, [data?.data]);

  return {
    holdings,
    isLoading,
    error,
  };
};

export const useSIFAccountTransactions = (investmentAccountId: string, productType: string = 'SIF') => {
  const { data, isLoading, error } = useGetSIFTransactionsQuery({ investmentAccountId, productType });

  const transactions: SIFTransaction[] = useMemo(() => {
    return data?.data || [];
  }, [data?.data]);

  return {
    transactions,
    isLoading,
    error,
  };
};
