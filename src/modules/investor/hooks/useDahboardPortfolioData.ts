import { useMemo } from 'react';
import { useGetDashboardSummaryQuery, useGetDistributionAMCQuery, useGetDistributionAssetClassQuery, useGetDistributionSchemeQuery, useGetInvestedSchemesQuery, useGetMarketCapCategoryQuery, useGetTopHoldingsQuery, useGetTopSectorsQuery, useGetTransactionsQuery } from '../api/dashboardPortfolioApi';

// General hook for PMS, MF, SIF portfolio data
export const useTraditionalPortfolioData = (investmentAccountId: string, productType: string) => {
  const { data: summaryData, isLoading: isSummaryLoading, error: summaryError } = useGetDashboardSummaryQuery({ investmentAccountId, productType }, { skip: !investmentAccountId });
  const { data: investedSchemesData, isLoading: isSchemesLoading, error: schemesError } = useGetInvestedSchemesQuery({ investmentAccountId, productType }, { skip: !investmentAccountId });
  const { data: holdingsData, isLoading: isHoldingsLoading, error: holdingsError } = useGetTopHoldingsQuery({ investmentAccountId, productType }, { skip: !investmentAccountId });
  const { data: sectorsData, isLoading: isSectorsLoading, error: sectorsError } = useGetTopSectorsQuery({ investmentAccountId, productType }, { skip: !investmentAccountId });
  const { data: transactionsData, isLoading: isTransactionsLoading, error: transactionsError } = useGetTransactionsQuery({ investmentAccountId, productType }, { skip: !investmentAccountId });
  const { data: distributionAMCData, isLoading: isDistributionAMCLoading, error: distributionAMCError } = useGetDistributionAMCQuery({ investmentAccountId, productType }, { skip: !investmentAccountId });
  const { data: distributionSchemeData, isLoading: isDistributionSchemeLoading, error: distributionSchemeError } = useGetDistributionSchemeQuery({ investmentAccountId, productType }, { skip: !investmentAccountId });
  const { data: distributionAssetClassData, isLoading: isDistributionAssetClassLoading, error: distributionAssetClassError } = useGetDistributionAssetClassQuery({ investmentAccountId, productType }, { skip: !investmentAccountId });
  const { data: marketCapCategoryData, isLoading: isMarketCapLoading, error: marketCapError } = useGetMarketCapCategoryQuery({ investmentAccountId, productType }, { skip: !investmentAccountId });

  const summary = useMemo(() => summaryData?.data, [summaryData?.data]);
  const investedSchemes = useMemo(() => investedSchemesData?.data || [], [investedSchemesData?.data]);
  const holdings = useMemo(() => holdingsData?.data || [], [holdingsData?.data]);
  const sectors = useMemo(() => sectorsData?.data || [], [sectorsData?.data]);
  const transactions = useMemo(() => transactionsData?.data || [], [transactionsData?.data]);
  const distributionAMC = useMemo(() => distributionAMCData?.data || [], [distributionAMCData?.data]);
  const distributionScheme = useMemo(() => distributionSchemeData?.data || [], [distributionSchemeData?.data]);
  const distributionAssetClass = useMemo(() => distributionAssetClassData?.data || [], [distributionAssetClassData?.data]);
  const marketCapCategory = useMemo(() => marketCapCategoryData?.data || [], [marketCapCategoryData?.data]);

  const isLoading = isSummaryLoading || isSchemesLoading || isHoldingsLoading || isSectorsLoading || isTransactionsLoading || isDistributionAMCLoading || isDistributionSchemeLoading || isDistributionAssetClassLoading || isMarketCapLoading;
  const error = summaryError || schemesError || holdingsError || sectorsError || transactionsError || distributionAMCError || distributionSchemeError || distributionAssetClassError || marketCapError;

  return {
    summary,
    investedSchemes,
    holdings,
    sectors,
    transactions,
    distributionAMC,
    distributionScheme,
    distributionAssetClass,
    marketCapCategory,
    isLoading,
    error,
  };
};