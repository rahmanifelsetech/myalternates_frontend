import PageBreadcrumb from '@shared/components/common/PageBreadCrumb';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { amcSummaryData, assetAllocationData, formatCurrency, IndexType, marketCapCategorization, performanceDataByIndex, pmsInvestmentAccount, pmsTransactions, schemeSummaryData, top5Holdings, top5Sectors } from './constants/pmsDummyData';
import { useMemo, useState } from 'react';
// import { usePMSInvestedSchemesPerformance } from './hooks/usePmsPortfolioData';
import { useTraditionalPortfolioData } from '@/modules/investor/hooks/useDahboardPortfolioData';
import { ArrowDownCircleIcon, ArrowUpCircleIcon, DollarLineIcon, GrowthArrowIcon, ModIcon, WalletIcon } from '@/shared/icons';
import MetricsGrid, { MetricItem } from '@/shared/components/common/MetricsGrid';
import { CategoryBar, ColumnConfig, DistributionPieChart, PerformanceBarChart, PortfolioTable, Top5List } from '@/shared/components/portfolio';
import ComponentCard from '@/shared/components/common/ComponentCard';
import typographyClasses from '@/shared/utils/typographyUtils';
import HeaderWithAccountSelector from '@/modules/investor/components/HeaderWithAccountSelector';
import { formatDate } from '@/shared/utils/dateUtils';

const IndexOptions: { value: IndexType; label: string }[] = [
  { value: 'NIFTY_50', label: 'NIFTY 50' },
  { value: 'SENSEX', label: 'SENSEX' },
  { value: 'BSE500', label: 'BSE 500' },
];

const xirrOptions = [
  { value: 'xirr', label: 'XIRR (SI)' },
  { value: 'ar', label: 'AR' },
];


const PmsPortfolio: React.FC = () => {
  const [ selectedXirrOption, setSelectedXirrOption] = useState(xirrOptions[0]);
  const [selectedIndex, setSelectedIndex] = useState<IndexType>('NIFTY_50');
  const { user, details: InvestorDetails } = useAppSelector((state) => state.auth);
  const [selectedInvestmentAccountId, setSelectedInvestmentAccountId] = useState<string | null>(InvestorDetails?.investor?.investmentAccounts ? InvestorDetails.investor.investmentAccounts[0].id : null);
  
  // const personId = user?.person?.id || '';
  
  // console.log(user, 'Person ID:', personId); // Debug log to check personId
  
  const { summary, investedSchemes, holdings, sectors, transactions, distributionAMC, distributionScheme, distributionAssetClass, marketCapCategory, isLoading } = useTraditionalPortfolioData(selectedInvestmentAccountId || '', 'PMS');
  // const { investmentPerformance, isLoading: isPerformanceLoading } = usePMSInvestedSchemesPerformance(selectedInvestmentAccountId, 'PMS', selectedIndex);
  

  // console.log('PMS Performance Data:', investmentPerformance); // Debug log to check the fetched performance data


  const handleAccountChange = (accountId: string) => {
    console.log('Selected account ID:', accountId);
    setSelectedInvestmentAccountId(accountId);
  }

  // const performanceData = useMemo(() => {
  //   return performanceDataByIndex[selectedIndex];
  // }, [selectedIndex]);
  
    // Summary metrics
    const {
      product,
      summary: summaryData,
      diversification,
    } = summary || {};

    const pmsCurrentValuation = summaryData?.currentValuation ? Number(summaryData.currentValuation) : 0;
    const pmsDayChange = summaryData?.dayChange ? Number(summaryData.dayChange) : 0;
    const pmsXirr = summaryData?.xirr || 0;
    const pmsTotalInflows = summaryData?.totalInflows ? Number(summaryData.totalInflows) : 0;
    const pmsTotalOutflows = summaryData?.totalOutflows ? Number(summaryData.totalOutflows) : 0;
    const noOfPmsAmcs = diversification?.amcCount || 0;
    const noOfPmsStrategies = diversification?.schemeCount || 0;
  
    const firstRowMetrics: MetricItem[] = [
      {
        id: 'current-value',
        title: 'Current Value',
        value: formatCurrency(pmsCurrentValuation),
        icon: <WalletIcon className="h-6 w-6" />,
      },
      {
        id: 'net-investment',
        title: 'Net Investment',
        value: formatCurrency(pmsTotalInflows - pmsTotalOutflows),
        icon: <DollarLineIcon className="h-6 w-6 text-white" />,
      },
      {
        id: 'day-change',
        title: 'Day Change',
        value: formatCurrency(pmsDayChange),
        change: `${(pmsDayChange / (pmsCurrentValuation - pmsDayChange) * 100).toFixed(2)}%`,
        direction: pmsDayChange >= 0 ? 'up' : 'down',
        icon: <GrowthArrowIcon className="h-6 w-6 text-white" />,
      },
      {
        id: 'xirr',
        // title: 'XIRR',
        title: (
          <select
            className={`rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs ${typographyClasses.body.caption} ${typographyClasses.colors.text.primary} dark:border-gray-700 dark:bg-gray-900 dark:text-white cursor-pointer hover:border-gray-300 dark:hover:border-gray-600 transition-colors`}
          >
            {xirrOptions.map(option => (
              <option key={option.value} value={option.value} onChange={() => setSelectedXirrOption(option)}>
                {option.label}
              </option>
            ))}
          </select>
        ),
        value: `${pmsXirr.toFixed(2)}%`,
        icon: <ModIcon className="h-6 w-6" />,
      },
    ];
  
    const secondRowMetrics: MetricItem[] = [
      {
        id: 'total-inflow',
        title: 'Total Inflow',
        value: formatCurrency(pmsTotalInflows),
        valueClassName: 'text-green-600 dark:text-green-400',
        cardClass: 'bg-gray-50! dark:bg-gray-900/20! border-gray-200! dark:border-gray-700/50!',
      },
      {
        id: 'total-outflow',
        title: 'Total Outflow',
        valueClassName: 'text-red-600 dark:text-red-400',
        value: formatCurrency(pmsTotalOutflows),
        cardClass: 'bg-gray-50! dark:bg-gray-900/20! border-gray-200! dark:border-gray-700/50!',
      },
      {
        id: 'no-of-amcs',
        title: 'No. of AMCs',
        value: noOfPmsAmcs.toString(),
        cardClass: 'bg-gray-50! dark:bg-gray-900/20! border-gray-200! dark:border-gray-700/50!',
      },
      {
        id: 'no-of-strategies',
        title: 'No. of Strategies',
        value: noOfPmsStrategies.toString(),
        cardClass: 'bg-gray-50! dark:bg-gray-900/20! border-gray-200! dark:border-gray-700/50!',
      },
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
  
    const getTransactionTypeColor = (type: string) => {
      switch (type.toLocaleLowerCase()) {
        case 'initial purchase':
        case 'addition':
          return 'text-green-600 dark:text-green-400';
        case 'withdrawn':
          return 'text-red-600 dark:text-red-400';
        case 'dividend':
          return 'text-blue-600 dark:text-blue-400';
        default:
          return '';
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

    // Strategies Invested table columns
    const strtegiesInvestedColumns: ColumnConfig[] = [
      { key: 'amc.name', header: 'AMC Name', render: (val, row) => row.amc?.name },
      { key: 'scheme.schemeName', header: 'Strategy Name', render: (val, row) => row.scheme?.schemeName },
      { key: 'currentValue', header: 'Current Value', render: (val) => formatCurrency(Number(val)) },
      { key: 'scheme.schemeType', header: 'Scheme Type', render: (val, row) => row.scheme?.schemeType },
      { key: 'createdAt', header: 'Inception Date', render: (val) => val ? formatDate(val) : 'N/A' },
      { key: 'status', header: 'Status',  render: (val) => (
        <span className={`inline-block px-2 py-1 rounded w-fit ${typographyClasses.body.caption} ${
          val === 'active'
            ? 'bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-100'
            : 'bg-error-100 text-error-800 dark:bg-error-700 dark:text-error-100'
        }`}>
          {val === 'active' ? "Active" : 'Inactive'}
        </span>
      ) },
    ];

  return (
    <div className="space-y-6">
      <HeaderWithAccountSelector pageTitle="PMS Portfolio" pageDesc="Overview of your PMS investments and performance" accounts={InvestorDetails?.investor?.investmentAccounts} onChange={handleAccountChange} />
      {/* <PageBreadcrumb pageTitle="PMS Portfolio" /> */}
      
      <div className="space-y-4">
        <MetricsGrid metrics={firstRowMetrics} columns={4} />
        <ComponentCard title="Investment Summary">
          <MetricsGrid metrics={secondRowMetrics} columns={4} labelPosition="top" contentPosition="center" />
        </ComponentCard>
      </div>

      {/* PMS Invested Strategies */}
      <ComponentCard title="Invested Strategies">
        {isLoading ? <p>Loading...</p> : <PortfolioTable data={investedSchemes} columns={strtegiesInvestedColumns} placeholder='Invested Strategies' />}
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

export default PmsPortfolio;