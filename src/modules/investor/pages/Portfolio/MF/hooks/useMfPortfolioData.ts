// import { useCallback, useMemo } from 'react';
// import { useGetMFDashboardQuery, useGetMFAccountsQuery, useGetMFHoldingsQuery, useGetMFTransactionsQuery } from '../api/mfApi';
// import type { MFDashboardSummary, MFFund, MFHolding, MFTransaction } from '../types';

// export const useMFPortfolioData = (investmentAccountId: string, productType: string = 'MF') => {
//   // Fetch all required data
//   const { data: dashboardData, isLoading: isDashboardLoading, error: dashboardError } = useGetMFDashboardQuery({ investmentAccountId, productType });
//   const { data: accountsData, isLoading: isAccountsLoading, error: accountsError } = useGetMFAccountsQuery({ investmentAccountId, productType });
//   const { data: holdingsData, isLoading: isHoldingsLoading, error: holdingsError } = useGetMFHoldingsQuery({ investmentAccountId, productType });
//   const { data: transactionsData, isLoading: isTransactionsLoading, error: transactionsError } = useGetMFTransactionsQuery({ investmentAccountId, productType });

//   // Memoized summary data
//   const summary: MFDashboardSummary | undefined = useMemo(() => {
//     return dashboardData?.data;
//   }, [dashboardData?.data]);

//   // Memoized accounts
//   const accounts: MFFund[] = useMemo(() => {
//     return accountsData?.data || [];
//   }, [accountsData?.data]);

//   // Memoized holdings
//   const holdings: MFHolding[] = useMemo(() => {
//     return holdingsData?.data || [];
//   }, [holdingsData?.data]);

//   // Memoized transactions
//   const transactions: MFTransaction[] = useMemo(() => {
//     return transactionsData?.data || [];
//   }, [transactionsData?.data]);

//   // Overall loading state
//   const isLoading = useMemo(
//     () => isDashboardLoading || isAccountsLoading || isHoldingsLoading || isTransactionsLoading,
//     [isDashboardLoading, isAccountsLoading, isHoldingsLoading, isTransactionsLoading]
//   );

//   // Error state
//   const error = dashboardError || accountsError || holdingsError || transactionsError;

//   return {
//     summary,
//     accounts,
//     holdings,
//     transactions,
//     isLoading,
//     error,
//   };
// };

// export const useMFAccountHoldings = (investmentAccountId: string, productType: string = 'MF') => {
//   const { data, isLoading, error } = useGetMFHoldingsQuery({ investmentAccountId, productType });

//   const holdings: MFHolding[] = useMemo(() => {
//     return data?.data || [];
//   }, [data?.data]);

//   return {
//     holdings,
//     isLoading,
//     error,
//   };
// };

// export const useMFAccountTransactions = (investmentAccountId: string, productType: string = 'MF') => {
//   const { data, isLoading, error } = useGetMFTransactionsQuery({ investmentAccountId, productType });

//   const transactions: MFTransaction[] = useMemo(() => {
//     return data?.data || [];
//   }, [data?.data]);

//   return {
//     transactions,
//     isLoading,
//     error,
//   };
// };


import { useCallback, useMemo } from 'react';
import { useGetMFDashboardQuery, useGetMFInvestedSchemesQuery, useGetMFHoldingsQuery, useGetMFTransactionsQuery, useGetMFSectorsQuery, useGetMFDistributionAMCQuery, useGetMFDistributionSchemeQuery, useGetMFDistributionAssetClassQuery } from '../api/mfApi';
import type { DashboardSummary, DashboardInvestedSchemes, DashboardTransaction, DashboardTopHoldings, DashboardTopSectorHoldings } from '@shared/types/dashboard-types';

export const useMFPortfolioData = (investmentAccountId: string | null, productType: string = 'MF') => {
  // Fetch all required data
  const { data: dashboardData, isLoading: isDashboardLoading, error: dashboardError } = useGetMFDashboardQuery(
    { investmentAccountId: investmentAccountId || '', productType },
    { skip: !investmentAccountId }
  );
  
  const { data: investedSchemesData, isLoading: isInvestedSchemesLoading, error: investedSchemesError } = useGetMFInvestedSchemesQuery(
    { investmentAccountId: investmentAccountId || '', productType },
    { skip: !investmentAccountId }
  );
  
  const { data: holdingsData, isLoading: isHoldingsLoading, error: holdingsError } = useGetMFHoldingsQuery(
    { investmentAccountId: investmentAccountId || '', productType },
    { skip: !investmentAccountId }
  );
  
  const { data: sectorsData, isLoading: isSectorsLoading, error: sectorsError } = useGetMFSectorsQuery(
    { investmentAccountId: investmentAccountId || '', productType },
    { skip: !investmentAccountId }
  );
  
  const { data: transactionsData, isLoading: isTransactionsLoading, error: transactionsError } = useGetMFTransactionsQuery(
    { investmentAccountId: investmentAccountId || '', productType },
    { skip: !investmentAccountId }
  );

  // Distribution endpoints
  const { data: distributionAMCData, isLoading: isDistributionAMCLoading, error: distributionAMCError } = useGetMFDistributionAMCQuery(
    { investmentAccountId: investmentAccountId || '', productType },
    { skip: !investmentAccountId }
  );
  const { data: distributionSchemeData, isLoading: isDistributionSchemeLoading, error: distributionSchemeError } = useGetMFDistributionSchemeQuery(
    { investmentAccountId: investmentAccountId || '', productType },
    { skip: !investmentAccountId }
  );
  const { data: distributionAssetClassData, isLoading: isDistributionAssetClassLoading, error: distributionAssetClassError } = useGetMFDistributionAssetClassQuery(
    { investmentAccountId: investmentAccountId || '', productType },
    { skip: !investmentAccountId }
  );

  // Memoized summary data
  const summary: DashboardSummary | undefined = useMemo(() => {
    return dashboardData?.data;
  }, [dashboardData?.data]);

  // Memoized investedSchemes
  const investedSchemes: DashboardInvestedSchemes[] = useMemo(() => {
    return investedSchemesData?.data || [];
  }, [investedSchemesData?.data]);

  // Memoized holdings
  const top5Holdings: DashboardTopHoldings[] = useMemo(() => {
    return holdingsData?.data || [];
  }, [holdingsData?.data]);

  // Memoized holdings
  const top5Sectors: DashboardTopSectorHoldings[] = useMemo(() => {
    return sectorsData?.data || [];
  }, [sectorsData?.data]);

  // Memoized transactions
  const transactions: DashboardTransaction[] = useMemo(() => {
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
      isInvestedSchemesLoading ||
      isHoldingsLoading ||
      isTransactionsLoading ||
      isSectorsLoading ||
      isDistributionAMCLoading ||
      isDistributionSchemeLoading ||
      isDistributionAssetClassLoading,
    [
      isDashboardLoading,
      isInvestedSchemesLoading,
      isHoldingsLoading,
      isTransactionsLoading,
      isSectorsLoading,
      isDistributionAMCLoading,
      isDistributionSchemeLoading,
      isDistributionAssetClassLoading,
    ]
  );

  // Error state
  const error =
    dashboardError ||
    investedSchemesError ||
    holdingsError ||
    transactionsError ||
    sectorsError ||
    distributionAMCError ||
    distributionSchemeError ||
    distributionAssetClassError;

  return {
    summary,
    investedSchemes,
    top5Holdings,
    top5Sectors,
    transactions,
    distributionAMC,
    distributionScheme,
    distributionAssetClass,
    isLoading,
    error,
  };
};

export const useMFInvestedSchemesHoldings = (investmentAccountId: string | null, productType: string = 'MF') => {
  const { data, isLoading, error } = useGetMFHoldingsQuery(
    { investmentAccountId: investmentAccountId || '', productType },
    { skip: !investmentAccountId }
  );

  const holdings: DashboardTopHoldings[] = useMemo(() => {
    return data?.data || [];
  }, [data?.data]);

  return {
    holdings,
    isLoading,
    error,
  };
};

export const useMFInvestedSchemesTransactions = (investmentAccountId: string | null, productType: string = 'MF') => {
  const { data, isLoading, error } = useGetMFTransactionsQuery(
    { investmentAccountId: investmentAccountId || '', productType },
    { skip: !investmentAccountId }
  );

  const transactions: DashboardTransaction[] = useMemo(() => {
    return data?.data || [];
  }, [data?.data]);

  return {
    transactions,
    isLoading,
    error,
  };
};
