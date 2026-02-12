import RtkQueryService from '@shared/services/rtkService';
// import type { PMSDashboardResponse, PMSInvestedSchemesResponse, PMSTopHoldingsResponse, PMSTransactionsResponse, PMSTopSectorsResponse } from '../types';
import { DashboardSummaryResponse, DashboardInvestedSchemesResponse, DashboardTopHoldingsResponse, DashboardTopSectorsResponse, DashboardTransactionsResponse, DashboardIndexPerformanceResponse } from '@/shared/types/dashboard-types';

const traditionalProductApiWithTags = RtkQueryService.enhanceEndpoints({
  addTagTypes: ['Dashboard', 'InvestedSchemes', 'Holdings', 'Sectors', 'Transactions', 'InvestmentPerformance', 'DistributionAMC', 'DistributionScheme', 'DistributionAssetClass', 'MarketCapCategory'],
});

const traditionalProductApi = traditionalProductApiWithTags.injectEndpoints({
  endpoints: (builder) => ({
    // Main dashboard data - /investors/dashboard/:investmentAccountId/summary/:productType
    getDashboardSummary: builder.query<DashboardSummaryResponse, { investmentAccountId: string; productType: string }>({
      query: ({ investmentAccountId, productType }) => ({
        url: `/investors/dashboard/${investmentAccountId}/${productType}/summary`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { investmentAccountId, productType }) => [{ type: 'Dashboard', id: `${investmentAccountId}-${productType}` }],
    }),

    // Invested schemes list - /investors/dashboard/:investmentAccountId/:productType/invested-schemes
    getInvestedSchemes: builder.query<DashboardInvestedSchemesResponse, { investmentAccountId: string; productType: string }>({
      query: ({ investmentAccountId, productType }) => ({
        url: `/investors/dashboard/${investmentAccountId}/${productType}/invested-schemes`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { investmentAccountId, productType }) => [{ type: 'InvestedSchemes', id: `${investmentAccountId}-${productType}` }],
    }),

    // Top 5 Holdings - /investors/dashboard/:investmentAccountId/:productType/holdings
    getTopHoldings: builder.query<DashboardTopHoldingsResponse, { investmentAccountId: string; productType: string }>({
      query: ({ investmentAccountId, productType }) => ({
        url: `/investors/dashboard/${investmentAccountId}/${productType}/holdings`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { investmentAccountId, productType }) => [{ type: 'Holdings', id: `${investmentAccountId}-${productType}` }],
    }),

    // Top 5 Sectors - /investors/dashboard/:investmentAccountId/:productType/sectors
    getTopSectors: builder.query<DashboardTopSectorsResponse, { investmentAccountId: string; productType: string }>({
      query: ({ investmentAccountId, productType }) => ({
        url: `/investors/dashboard/${investmentAccountId}/${productType}/sectors`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { investmentAccountId, productType }) => [{ type: 'Sectors', id: `${investmentAccountId}-${productType}` }],
    }),

    // Transactions - /investors/dashboard/:investmentAccountId/:productType/transactions
    getTransactions: builder.query<DashboardTransactionsResponse, { investmentAccountId: string; productType: string }>({
      query: ({ investmentAccountId, productType }) => ({
        url: `/investors/dashboard/${investmentAccountId}/${productType}/transactions`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { investmentAccountId, productType }) => [{ type: 'Transactions', id: `${investmentAccountId}-${productType}` }],
    }),

    // Investment Performance - /investors/dashboard/:investmentAccountId/:productType/performance
    getInvestmentPerformance: builder.query<DashboardIndexPerformanceResponse, { investmentAccountId: string; productType: string; indexCode: string }>({
      query: ({ investmentAccountId, productType, indexCode }) => ({
        url: `/investors/dashboard/${investmentAccountId}/${productType}/performance?${indexCode ? `indexCode=${indexCode}` : ''}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { investmentAccountId, productType }) => [{ type: 'InvestmentPerformance', id: `${investmentAccountId}-${productType}` }],
    }),

    // Distribution - AMC
    getDistributionAMC: builder.query<any, { investmentAccountId: string; productType: string }>({
      query: ({ investmentAccountId, productType }) => ({
        url: `/investors/dashboard/${investmentAccountId}/${productType}/allocation/amc`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { investmentAccountId, productType }) => [{ type: 'DistributionAMC', id: `${investmentAccountId}-${productType}` }],
    }),

    // Distribution - Scheme
    getDistributionScheme: builder.query<any, { investmentAccountId: string; productType: string }>({
      query: ({ investmentAccountId, productType }) => ({
        url: `/investors/dashboard/${investmentAccountId}/${productType}/allocation/scheme`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { investmentAccountId, productType }) => [{ type: 'DistributionScheme', id: `${investmentAccountId}-${productType}` }],
    }),

    // Distribution - Asset Class
    getDistributionAssetClass: builder.query<any, { investmentAccountId: string; productType: string }>({
      query: ({ investmentAccountId, productType }) => ({
        url: `/investors/dashboard/${investmentAccountId}/${productType}/allocation/asset-class`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { investmentAccountId, productType }) => [{ type: 'DistributionAssetClass', id: `${investmentAccountId}-${productType}` }],
    }),

    // Market Cap Categorization
    getMarketCapCategory: builder.query<any, { investmentAccountId: string; productType: string }>({
      query: ({ investmentAccountId, productType }) => ({
        url: `/investors/dashboard/${investmentAccountId}/${productType}/market-cap-categorization`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { investmentAccountId, productType }) => [{ type: 'MarketCapCategory', id: `${investmentAccountId}-${productType}` }],
    }),
  }),
});

export const {
  useGetDashboardSummaryQuery,
  useGetInvestedSchemesQuery,
  useGetTopHoldingsQuery,
  useGetTopSectorsQuery,
  useGetTransactionsQuery,
  useGetInvestmentPerformanceQuery,
  useGetDistributionAMCQuery,
  useGetDistributionSchemeQuery,
  useGetDistributionAssetClassQuery,
  useGetMarketCapCategoryQuery,
} = traditionalProductApi;
