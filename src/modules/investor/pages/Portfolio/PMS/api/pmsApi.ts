import RtkQueryService from '@shared/services/rtkService';
import type { PMSDashboardResponse, PMSInvestedSchemesResponse, PMSTopHoldingsResponse, PMSTransactionsResponse, PMSTopSectorsResponse } from '../types';
import { DashboardIndexPerformanceResponse } from '@/shared/types/dashboard-types';

const pmsApiWithTags = RtkQueryService.enhanceEndpoints({
  addTagTypes: ['PMSDashboard', 'PMSInvestedSchemes', 'PMSHoldings', 'PMSSectors', 'PMSTransactions', 'PMSInvestmentPerformance'],
});

const pmsApi = pmsApiWithTags.injectEndpoints({
  endpoints: (builder) => ({
    // Main dashboard data - /investors/dashboard/:investmentAccountId/summary/:productType
    getPMSDashboard: builder.query<PMSDashboardResponse, { investmentAccountId: string; productType: string }>({
      query: ({ investmentAccountId, productType }) => ({
        url: `/investors/dashboard/${investmentAccountId}/${productType}/summary`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { investmentAccountId }) => [{ type: 'PMSDashboard', id: investmentAccountId }],
    }),

    // Invested schemes list - /investors/dashboard/:investmentAccountId/:productType/invested-schemes
    getPMSInvestedSchemes: builder.query<PMSInvestedSchemesResponse, { investmentAccountId: string; productType: string }>({
      query: ({ investmentAccountId, productType }) => ({
        url: `/investors/dashboard/${investmentAccountId}/${productType}/invested-schemes`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { investmentAccountId }) => [{ type: 'PMSInvestedSchemes', id: investmentAccountId }],
    }),

    // Top 5 Holdings - /investors/dashboard/:investmentAccountId/:productType/holdings
    getPMSHoldings: builder.query<PMSTopHoldingsResponse, { investmentAccountId: string; productType: string }>({
      query: ({ investmentAccountId, productType }) => ({
        url: `/investors/dashboard/${investmentAccountId}/${productType}/holdings`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { investmentAccountId }) => [{ type: 'PMSHoldings', id: investmentAccountId }],
    }),

    // Top 5 Sectors - /investors/dashboard/:investmentAccountId/:productType/sectors
    getPMSSectors: builder.query<PMSTopSectorsResponse, { investmentAccountId: string; productType: string }>({
      query: ({ investmentAccountId, productType }) => ({
        url: `/investors/dashboard/${investmentAccountId}/${productType}/sectors`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { investmentAccountId }) => [{ type: 'PMSSectors', id: investmentAccountId }],
    }),

    // Transactions - /investors/dashboard/:investmentAccountId/:productType/transactions
    getPMSTransactions: builder.query<PMSTransactionsResponse, { investmentAccountId: string; productType: string }>({
      query: ({ investmentAccountId, productType }) => ({
        url: `/investors/dashboard/${investmentAccountId}/${productType}/transactions`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { investmentAccountId }) => [{ type: 'PMSTransactions', id: investmentAccountId }],
    }),

    // Investment Performance - /investors/dashboard/:investmentAccountId/:productType/performance
    getPMSInvestmentPerformance: builder.query<DashboardIndexPerformanceResponse, { investmentAccountId: string; productType: string, indexCode: string }>({
      query: ({ investmentAccountId, productType, indexCode}) => ({
        url: `/investors/dashboard/${investmentAccountId}/${productType}/performance?${indexCode ? `indexCode=${indexCode}` : ''}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { investmentAccountId }) => [{ type: 'PMSInvestmentPerformance', id: investmentAccountId }],
    }),

    // Distribution - AMC
    getPMSDistributionAMC: builder.query<any, { investmentAccountId: string; productType: string }>({
      query: ({ investmentAccountId, productType }) => ({
        url: `/investors/dashboard/${investmentAccountId}/${productType}/allocation/amc`,
        method: 'GET',
      }),
    }),

    // Distribution - Scheme
    getPMSDistributionScheme: builder.query<any, { investmentAccountId: string; productType: string }>({
      query: ({ investmentAccountId, productType }) => ({
        url: `/investors/dashboard/${investmentAccountId}/${productType}/allocation/scheme`,
        method: 'GET',
      }),
    }),

    // Distribution - Asset Class
    getPMSDistributionAssetClass: builder.query<any, { investmentAccountId: string; productType: string }>({
      query: ({ investmentAccountId, productType }) => ({
        url: `/investors/dashboard/${investmentAccountId}/${productType}/allocation/asset-class`,
        method: 'GET',
      }),
    }),
   
    // Market Cap Categorization
    getPMSMarketCapCategory: builder.query<any, { investmentAccountId: string; productType: string }>({
      query: ({ investmentAccountId, productType }) => ({
        url: `/investors/dashboard/${investmentAccountId}/${productType}/market-cap-categorization`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetPMSDashboardQuery,
  useGetPMSInvestedSchemesQuery,
  useGetPMSHoldingsQuery,
  useGetPMSSectorsQuery,
  useGetPMSTransactionsQuery,
  useGetPMSInvestmentPerformanceQuery,
  useGetPMSDistributionAMCQuery,
  useGetPMSDistributionSchemeQuery,
  useGetPMSDistributionAssetClassQuery,
  useGetPMSMarketCapCategoryQuery,
} = pmsApi;
