import { useCallback, useMemo } from 'react';
import { useGetPMSDashboardQuery, useGetPMSInvestedSchemesQuery, useGetPMSHoldingsQuery, useGetPMSTransactionsQuery, useGetPMSSectorsQuery, useGetPMSInvestmentPerformanceQuery, useGetPMSDistributionAMCQuery, useGetPMSDistributionSchemeQuery, useGetPMSDistributionAssetClassQuery, useGetPMSMarketCapCategoryQuery } from '../api/pmsApi';
import type { PMSDashboardSummary, PMSInvestedSchemes, PMSTransaction, PMSTopHoldings, PMSTopSectorHoldings } from '../types';
import { DashboardIndexType, DashboardPerformanceData, DashboardPerformancePeriod } from '@/shared/types/dashboard-types';

export const usePMSPortfolioData = (investmentAccountId: string | null, productType: string = 'PMS') => {
  // Fetch all required data
  const { data: dashboardData, isLoading: isDashboardLoading, error: dashboardError } = useGetPMSDashboardQuery(
    { investmentAccountId: investmentAccountId || '', productType },
    { skip: !investmentAccountId }
  );
  
  const { data: investedSchemesData, isLoading: isInvestedSchemesLoading, error: investedSchemesError } = useGetPMSInvestedSchemesQuery(
    { investmentAccountId: investmentAccountId || '', productType },
    { skip: !investmentAccountId }
  );
  
  const { data: holdingsData, isLoading: isHoldingsLoading, error: holdingsError } = useGetPMSHoldingsQuery(
    { investmentAccountId: investmentAccountId || '', productType },
    { skip: !investmentAccountId }
  );
  
  const { data: sectorsData, isLoading: isSectorsLoading, error: sectorsError } = useGetPMSSectorsQuery(
    { investmentAccountId: investmentAccountId || '', productType },
    { skip: !investmentAccountId }
  );
  
  const { data: transactionsData, isLoading: isTransactionsLoading, error: transactionsError } = useGetPMSTransactionsQuery(
    { investmentAccountId: investmentAccountId || '', productType },
    { skip: !investmentAccountId }
  );

  // Distribution endpoints
  const { data: distributionAMCData, isLoading: isDistributionAMCLoading, error: distributionAMCError } = useGetPMSDistributionAMCQuery(
    { investmentAccountId: investmentAccountId || '', productType },
    { skip: !investmentAccountId }
  );
  const { data: distributionSchemeData, isLoading: isDistributionSchemeLoading, error: distributionSchemeError } = useGetPMSDistributionSchemeQuery(
    { investmentAccountId: investmentAccountId || '', productType },
    { skip: !investmentAccountId }
  );
  const { data: distributionAssetClassData, isLoading: isDistributionAssetClassLoading, error: distributionAssetClassError } = useGetPMSDistributionAssetClassQuery(
    { investmentAccountId: investmentAccountId || '', productType },
    { skip: !investmentAccountId }
  );

  const { data: marketCapCategorizationData, isLoading: isMarketCapCategorizationDataLoading, error: marketCapCategorizationDataError } = useGetPMSMarketCapCategoryQuery(
    { investmentAccountId: investmentAccountId || '', productType },
    { skip: !investmentAccountId }
  );

  // Memoized summary data
  const summary: PMSDashboardSummary | undefined = useMemo(() => {
    return dashboardData?.data;
  }, [dashboardData?.data]);

  // Memoized investedSchemes
  const investedSchemes: PMSInvestedSchemes[] = useMemo(() => {
    return investedSchemesData?.data || [];
  }, [investedSchemesData?.data]);

  // Memoized holdings
  const top5Holdings: PMSTopHoldings[] = useMemo(() => {
    return holdingsData?.data || [];
  }, [holdingsData?.data]);

  // Memoized holdings
  const top5Sectors: PMSTopSectorHoldings[] = useMemo(() => {
    return sectorsData?.data || [];
  }, [sectorsData?.data]);

  // Memoized transactions
  const transactions: PMSTransaction[] = useMemo(() => {
    return transactionsData?.data || [];
  }, [transactionsData?.data]);

  // Memoized distribution data
  const distributionAMC = useMemo(() => distributionAMCData?.data || [], [distributionAMCData?.data]);
  const distributionScheme = useMemo(() => distributionSchemeData?.data || [], [distributionSchemeData?.data]);
  const distributionAssetClass = useMemo(() => distributionAssetClassData?.data || [], [distributionAssetClassData?.data]);
  
  // Memoized market cap categorization data
  const marketCapCategorization = useMemo(() => marketCapCategorizationData?.data || [], [marketCapCategorizationData?.data]);

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
      isDistributionAssetClassLoading || 
      isMarketCapCategorizationDataLoading,
    [
      isDashboardLoading,
      isInvestedSchemesLoading,
      isHoldingsLoading,
      isTransactionsLoading,
      isSectorsLoading,
      isDistributionAMCLoading,
      isDistributionSchemeLoading,
      isDistributionAssetClassLoading,
      isMarketCapCategorizationDataLoading,
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
    distributionAssetClassError || 
    marketCapCategorizationDataError;

  return {
    summary,
    investedSchemes,
    top5Holdings,
    top5Sectors,
    transactions,
    distributionAMC,
    distributionScheme,
    distributionAssetClass,
    marketCapCategorization,
    isLoading,
    error,
  };
};

export const usePMSInvestedSchemesHoldings = (investmentAccountId: string | null, productType: string = 'PMS') => {
  const { data, isLoading, error } = useGetPMSHoldingsQuery(
    { investmentAccountId: investmentAccountId || '', productType },
    { skip: !investmentAccountId }
  );

  const holdings: PMSTopHoldings[] = useMemo(() => {
    return data?.data || [];
  }, [data?.data]);

  return {
    holdings,
    isLoading,
    error,
  };
};

export const usePMSInvestedSchemesTransactions = (investmentAccountId: string | null, productType: string = 'PMS') => {
  const { data, isLoading, error } = useGetPMSTransactionsQuery(
    { investmentAccountId: investmentAccountId || '', productType },
    { skip: !investmentAccountId }
  );

  const transactions: PMSTransaction[] = useMemo(() => {
    return data?.data || [];
  }, [data?.data]);

  return {
    transactions,
    isLoading,
    error,
  };
};

export const usePMSInvestedSchemesPerformance = (investmentAccountId: string | null, productType: string = 'PMS', indexCode: string) => {
  const { data, isLoading, error } = useGetPMSInvestmentPerformanceQuery(
    { investmentAccountId: investmentAccountId || '', productType, indexCode },
    { skip: !investmentAccountId || !indexCode }
  );

  const investmentPerformance: DashboardPerformanceData = useMemo(() => {
    return data?.data || { periods: [DashboardPerformancePeriod.ONE_DAY, DashboardPerformancePeriod.ONE_MONTH, DashboardPerformancePeriod.THREE_MONTHS, DashboardPerformancePeriod.SIX_MONTHS, DashboardPerformancePeriod.ONE_YEAR, DashboardPerformancePeriod.THREE_YEARS, DashboardPerformancePeriod.FIVE_YEARS, DashboardPerformancePeriod.SINCE_INCEPTION], indexPerformance: [], consolidatedPerformance: [] };
  }, [data?.data]);

  return {
    investmentPerformance,
    isLoading,
    error,
  };
};
