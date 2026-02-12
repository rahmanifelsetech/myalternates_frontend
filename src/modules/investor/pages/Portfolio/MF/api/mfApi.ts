import RtkQueryService from '@shared/services/rtkService';
import type { DashboardSummaryResponse, DashboardInvestedSchemesResponse, DashboardTopHoldingsResponse, DashboardTransactionsResponse, DashboardTopSectorsResponse } from '@shared/types/dashboard-types';

const mfApiWithTags = RtkQueryService.enhanceEndpoints({
  addTagTypes: ['MFDashboard', 'MFInvestedSchemes', 'MFHoldings', 'MFSectors', 'MFTransactions'],
});

const mfApi = mfApiWithTags.injectEndpoints({
  endpoints: (builder) => ({
    // Main dashboard data - /investors/dashboard/:investmentAccountId/summary/:productType
    getMFDashboard: builder.query<DashboardSummaryResponse, { investmentAccountId: string; productType: string }>({
      query: ({ investmentAccountId, productType }) => ({
        url: `/investors/dashboard/${investmentAccountId}/${productType}/summary`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { investmentAccountId }) => [{ type: 'MFDashboard', id: investmentAccountId }],
    }),

    // Invested schemes list - /investors/dashboard/:investmentAccountId/:productType/invested-schemes
    getMFInvestedSchemes: builder.query<DashboardInvestedSchemesResponse, { investmentAccountId: string; productType: string }>({
      query: ({ investmentAccountId, productType }) => ({
        url: `/investors/dashboard/${investmentAccountId}/${productType}/invested-schemes`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { investmentAccountId }) => [{ type: 'MFInvestedSchemes', id: investmentAccountId }],
    }),

    // Top 5 Holdings - /investors/dashboard/:investmentAccountId/:productType/holdings
    getMFHoldings: builder.query<DashboardTopHoldingsResponse, { investmentAccountId: string; productType: string }>({
      query: ({ investmentAccountId, productType }) => ({
        url: `/investors/dashboard/${investmentAccountId}/${productType}/holdings`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { investmentAccountId }) => [{ type: 'MFHoldings', id: investmentAccountId }],
    }),

    // Top 5 Sectors - /investors/dashboard/:investmentAccountId/:productType/sectors
    getMFSectors: builder.query<DashboardTopSectorsResponse, { investmentAccountId: string; productType: string }>({
      query: ({ investmentAccountId, productType }) => ({
        url: `/investors/dashboard/${investmentAccountId}/${productType}/sectors`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { investmentAccountId }) => [{ type: 'MFSectors', id: investmentAccountId }],
    }),

    // Transactions - /investors/dashboard/:investmentAccountId/:productType/transactions
    getMFTransactions: builder.query<DashboardTransactionsResponse, { investmentAccountId: string; productType: string }>({
      query: ({ investmentAccountId, productType }) => ({
        url: `/investors/dashboard/${investmentAccountId}/${productType}/transactions`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { investmentAccountId }) => [{ type: 'MFTransactions', id: investmentAccountId }],
    }),

    // Distribution - AMC
    getMFDistributionAMC: builder.query<any, { investmentAccountId: string; productType: string }>({
      query: ({ investmentAccountId, productType }) => ({
        url: `/investors/dashboard/${investmentAccountId}/${productType}/allocation/amc`,
        method: 'GET',
      }),
    }),

    // Distribution - Scheme
    getMFDistributionScheme: builder.query<any, { investmentAccountId: string; productType: string }>({
      query: ({ investmentAccountId, productType }) => ({
        url: `/investors/dashboard/${investmentAccountId}/${productType}/allocation/scheme`,
        method: 'GET',
      }),
    }),

    // Distribution - Asset Class
    getMFDistributionAssetClass: builder.query<any, { investmentAccountId: string; productType: string }>({
      query: ({ investmentAccountId, productType }) => ({
        url: `/investors/dashboard/${investmentAccountId}/${productType}/allocation/asset-class`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetMFDashboardQuery,
  useGetMFInvestedSchemesQuery,
  useGetMFHoldingsQuery,
  useGetMFSectorsQuery,
  useGetMFTransactionsQuery,
  useGetMFDistributionAMCQuery,
  useGetMFDistributionSchemeQuery,
  useGetMFDistributionAssetClassQuery,
} = mfApi;
