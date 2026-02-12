import React, { useMemo, useState } from 'react';
import { useAppSelector } from '@shared/hooks/useRedux';
import PageBreadcrumb from '@shared/components/common/PageBreadCrumb';
import ComponentCard from '@shared/components/common/ComponentCard';
import MetricsGrid, { MetricItem } from '@shared/components/common/MetricsGrid';
import {
  CategoryBar,
  DistributionPieChart,
  PortfolioTable,
  Top5List,
  type ColumnConfig,
} from '@shared/components/portfolio';
import { ArrowDownCircleIcon, ArrowUpCircleIcon, DollarLineIcon, GrowthArrowIcon, ModIcon, WalletIcon } from '@shared/icons';
import typographyClasses from '@shared/utils/typographyUtils';
import { useTraditionalPortfolioData } from '@/modules/investor/hooks/useDahboardPortfolioData';
import { formatCurrency, formatPercent } from '../MF/constants/mfDummyData';
import { formatDate } from '@fullcalendar/core/index.js';

const SifPortfolio: React.FC = () => {
  const { user, details: InvestorDetails } = useAppSelector((state) => state.auth);
  const [selectedInvestmentAccountId, setSelectedInvestmentAccountId] = useState<string | null>(InvestorDetails?.investor?.investmentAccounts ? InvestorDetails.investor.investmentAccounts[0].id : null);

  const { summary, investedSchemes, holdings, sectors, transactions, distributionAMC, distributionScheme, distributionAssetClass, marketCapCategory, isLoading, error } = useTraditionalPortfolioData(selectedInvestmentAccountId || '', 'SIF');

  const handleAccountChange = (accountId: string) => {
    setSelectedInvestmentAccountId(accountId);
  };

  const {
    product,
    summary: summaryData,
    diversification,
  } = summary || {};

  const sifCurrentValuation = summaryData?.currentValuation ? Number(summaryData.currentValuation) : 0;
  const sifDayChange = summaryData?.dayChange ? Number(summaryData.dayChange) : 0;
  const sifXirr = summaryData?.xirr || 0;
  const sifTotalInflows = summaryData?.totalInflows ? Number(summaryData.totalInflows) : 0;
  const sifTotalOutflows = summaryData?.totalOutflows ? Number(summaryData.totalOutflows) : 0;
  const noOfSifAmcs = diversification?.amcCount || 0;
  const noOfSifStrategies = diversification?.schemeCount || 0;


  // // Format currency helper
  // const formatCurrency = (value: number) => {
  //   return new Intl.NumberFormat('en-IN', {
  //     style: 'currency',
  //     currency: 'INR',
  //     maximumFractionDigits: 0,
  //   }).format(value);
  // };

  // const formatPercent = (value: number) => {
  //   return `${(value * 100).toFixed(2)}%`;
  // };

  // Summary metrics
  const summaryMetrics: MetricItem[] = useMemo(
    () => [
      {
        id: 'current-value',
        title: 'Current Value',
        value: formatCurrency(sifCurrentValuation),
        icon: <WalletIcon className="h-6 w-6" />,
      },
      {
        id: 'net-investment',
        title: 'Net Investment',
        value: formatCurrency(sifTotalInflows - sifTotalOutflows),
        icon: <DollarLineIcon className="h-6 w-6 text-white" />,
      },
      {
        id: 'day-change',
        title: 'Day Change',
        value: formatCurrency(sifDayChange),
        change: `${(sifCurrentValuation / (sifCurrentValuation - sifCurrentValuation) * 100).toFixed(2)}%`,
        direction: (sifDayChange) >= 0 ? 'up' : 'down',
        icon: <GrowthArrowIcon className="h-6 w-6 text-white" />,
      },
      {
        id: 'xirr',
        title: 'XIRR',
        value: formatPercent(sifXirr),
        icon: <ModIcon className="h-6 w-6 text-white" />,
      },
    ],
    [summary]
  );

  // Accounts table columns
  const accountColumns: ColumnConfig[] = [
    { key: 'fundName', header: 'Fund Name' },
    { key: 'sectorName', header: 'Sector' },
    { key: 'value', header: 'Current Value', render: (val) => formatCurrency(val) },
    { key: 'totalGain', header: 'Total Gain', render: (val) => formatCurrency(val) },
    { key: 'status', header: 'Status' },
  ];

  // Holdings table columns
  const holdingsColumns: ColumnConfig[] = [
    { key: 'instrumentName', header: 'Instrument' },
    { key: 'sectorName', header: 'Sector' },
    { key: 'quantity', header: 'Quantity' },
    { key: 'currentPrice', header: 'Price', render: (val) => formatCurrency(val) },
    { key: 'marketValue', header: 'Market Value', render: (val) => formatCurrency(val) },
    { key: 'unrealizedGainPercent', header: 'Gain %', render: (val) => formatPercent(val) },
  ];


  const getTransactionTypeIcon = (type: string) => {
    switch (type.toLocaleLowerCase()) {
      case 'initial purchase':
      case 'addition':
        return <ArrowUpCircleIcon className="h-4 w-4 text-green-600 dark:text-green-400" />;
      case 'withdrawn':
        return <ArrowDownCircleIcon className="h-4 w-4 text-red-600 dark:text-red-400" />;
      default:
        return null;
    }
  };

  const transactionColumns: ColumnConfig[] = [
    {
      key: 'scheme.schemeName',
      header: 'Scheme Name',
      render: (val, row) => row.scheme?.schemeName 
    },
    {
      key: 'amc.name',
      header: 'Amc Name',
      render: (val, row) => row.amc?.name 
    },
    {
      key: 'orderDate',
      header: 'Transaction Date', render: (value: any) => formatDate(value),
    },
    {
      key: 'transactionType',
      header: 'Type',
      render: (value: any) => (
        <div className="flex items-center gap-2">
          {getTransactionTypeIcon(value)}
          <span className={`font-medium`}>
            {value}
          </span>
        </div>
        // <span className="font-medium">
        //   {value}
        // </span>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (value: any) => (
        <span className="font-medium text-gray-900 dark:text-white">
          {formatCurrency(Number(value))}
        </span>
      ),
    }
  ];

  if (isLoading && !summary) {
    return (
      <div className="space-y-6">
        <PageBreadcrumb pageTitle="SIF Portfolio" />
        <div className="text-center py-12">
          <p className={typographyClasses.body.paragraph}>Loading SIF Portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageBreadcrumb pageTitle="SIF Portfolio" />

      {/* Summary Metrics */}
      <MetricsGrid metrics={summaryMetrics} />

      {/* Additional Info */}
      <ComponentCard title="Portfolio Summary" desc="Overview">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
            <p className={`${typographyClasses.body.caption} ${typographyClasses.colors.text.muted}`}>
              Total Inflow
            </p>
            <p className={`${typographyClasses.heading.h4} text-green-600 dark:text-green-400 mt-2`}>
              {formatCurrency(sifTotalInflows || 0)}
            </p>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
            <p className={`${typographyClasses.body.caption} ${typographyClasses.colors.text.muted}`}>
              Total Outflow
            </p>
            <p className={`${typographyClasses.heading.h4} text-red-600 dark:text-red-400 mt-2`}>
              {formatCurrency(sifTotalOutflows || 0)}
            </p>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
            <p className={`${typographyClasses.body.caption} ${typographyClasses.colors.text.muted}`}>
              No. of Amcs
            </p>
            <p className={`${typographyClasses.heading.h4} mt-2`}>
              {noOfSifAmcs || 0}
            </p>
          </div>
          <div className="text-center p-4 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
            <p className={`${typographyClasses.body.caption} ${typographyClasses.colors.text.muted}`}>
              No. of Strategies
            </p>
            <p className={`${typographyClasses.heading.h4} mt-2`}>
              {noOfSifStrategies || 0}
            </p>
          </div>
        </div>
      </ComponentCard>

      {/* SIF Accounts Overview */}
      <ComponentCard title="SIF Strategies" desc={`${investedSchemes.length} Account${investedSchemes.length !== 1 ? 's' : ''}`}>
        {isLoading ? <p>Loading...</p> : <PortfolioTable data={investedSchemes} columns={accountColumns} />}
      </ComponentCard>

      {/* <PerformanceBarChart
        title="Performance Comparison"
        data={performanceData}
        selectedIndex={selectedIndex}
        indexOptions={IndexOptions}
        onIndexChange={(index) => setSelectedIndex(index as IndexType)}
      /> */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DistributionPieChart
          title="AMC Summary"
          data={Array.isArray(distributionAMC) ? distributionAMC.map((item, idx) => ({
            id: item.id ?? idx.toString(),
            name: item.name ?? item.amcName ?? '',
            value: item.value ?? 0,
            percentage: item.percentage ?? 0,
          })) : []}
          colors={['#FFAE4C', '#9B8AFB', '#32D583', '#FFD700', '#DCDFE5']}
        />
        <DistributionPieChart
          title="Scheme Summary"
          data={Array.isArray(distributionScheme) ? distributionScheme.map((item, idx) => ({
            id: item.id ?? idx.toString(),
            name: item.name ?? item.schemeName ?? '',
            value: item.value ?? 0,
            percentage: item.percentage ?? 0,
          })) : []}
          colors={['#32D583', '#465fff', '#fdb022', '#DCDFE5', '#fd853a', '#9B8AFB',]}
        />
        <DistributionPieChart
          title="Asset Allocation"
          data={Array.isArray(distributionAssetClass) ? distributionAssetClass.map((item, idx) => ({
            id: item.id ?? idx.toString(),
            name: item.name ?? item.assetClassName ?? '',
            value: item.value ?? 0,
            percentage: item.percentage ?? 0,
          })) : []}
          colors={['#9b8afb', '#fdb022', '#32d583', '#fd853a',]}
        />
      </div>

      <CategoryBar
        title="Fund Category Composition"
        data={marketCapCategory}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ComponentCard title="Top 5 Funds">
          <Top5List
            data={holdings.map(holding => ({
              id: holding.isinCode,
              name: holding.companyName,
              value: holding.portfolioWeightage,
              percentage: Number(holding.portfolioWeightage),
            }))}
            viewAllText="View All Funds"
          />
        </ComponentCard>
        <ComponentCard title="Top 5 Sectors">
          <Top5List
            data={sectors.map(sector => ({
              id: sector.sector,
              name: sector.sector,
              value: sector.portfolioWeightage,
              percentage: sector.portfolioWeightage,
            }))}
            viewAllText="View All Funds"
          />
          </ComponentCard>
      </div>
      <ComponentCard title="Recent Transactions">
        <PortfolioTable
          placeholder="Recent Transactions"
          data={transactions}
          columns={transactionColumns}
          viewAllText="View All Transactions"
        />
      </ComponentCard>
    </div>
  );
};

export default SifPortfolio;
