import RtkQueryService from '@shared/services/rtkService';
import type { SIFDashboardResponse, SIFAccountsResponse, SIFHoldingsResponse, SIFTransactionsResponse } from '../types';

const sifApiWithTags = RtkQueryService.enhanceEndpoints({
  addTagTypes: ['SIFDashboard', 'SIFAccounts', 'SIFHoldings', 'SIFTransactions'],
});


const sifApi = sifApiWithTags.injectEndpoints({
  endpoints: (builder) => ({
    // Main dashboard data - /investors/dashboard/:investmentAccountId/summary/:productType
    getSIFDashboard: builder.query<SIFDashboardResponse, { investmentAccountId: string; productType: string }>({
      query: ({ investmentAccountId, productType }) => ({
        url: `/investors/dashboard/${investmentAccountId}/${productType}/summary`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { investmentAccountId }) => [{ type: 'SIFDashboard', id: investmentAccountId }],
    }),

    // Accounts list - /investors/dashboard/:investmentAccountId/:productType/invested-schemes
    getSIFAccounts: builder.query<SIFAccountsResponse, { investmentAccountId: string; productType: string }>({
      query: ({ investmentAccountId, productType }) => ({
        url: `/investors/dashboard/${investmentAccountId}/${productType}/invested-schemes`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { investmentAccountId }) => [{ type: 'SIFAccounts', id: investmentAccountId }],
    }),

    // Holdings - /investors/dashboard/:investmentAccountId/:productType/holdings
    getSIFHoldings: builder.query<SIFHoldingsResponse, { investmentAccountId: string; productType: string }>({
      query: ({ investmentAccountId, productType }) => ({
        url: `/investors/dashboard/${investmentAccountId}/${productType}/holdings`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { investmentAccountId }) => [{ type: 'SIFHoldings', id: investmentAccountId }],
    }),

    // Transactions - /investors/dashboard/:investmentAccountId/:productType/transactions
    getSIFTransactions: builder.query<SIFTransactionsResponse, { investmentAccountId: string; productType: string }>({
      query: ({ investmentAccountId, productType }) => ({
        url: `/investors/dashboard/${investmentAccountId}/${productType}/transactions`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { investmentAccountId }) => [{ type: 'SIFTransactions', id: investmentAccountId }],
    }),

    // Distribution - AMC
    getSIFDistributionAMC: builder.query<any, { investmentAccountId: string; productType: string }>({
      query: ({ investmentAccountId, productType }) => ({
        url: `/investors/dashboard/${investmentAccountId}/${productType}/allocation/amc`,
        method: 'GET',
      }),
    }),

    // Distribution - Scheme
    getSIFDistributionScheme: builder.query<any, { investmentAccountId: string; productType: string }>({
      query: ({ investmentAccountId, productType }) => ({
        url: `/investors/dashboard/${investmentAccountId}/${productType}/allocation/scheme`,
        method: 'GET',
      }),
    }),

    // Distribution - Asset Class
    getSIFDistributionAssetClass: builder.query<any, { investmentAccountId: string; productType: string }>({
      query: ({ investmentAccountId, productType }) => ({
        url: `/investors/dashboard/${investmentAccountId}/${productType}/allocation/asset-class`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useGetSIFDashboardQuery,
  useGetSIFAccountsQuery,
  useGetSIFHoldingsQuery,
  useGetSIFTransactionsQuery,
  useGetSIFDistributionAMCQuery,
  useGetSIFDistributionSchemeQuery,
  useGetSIFDistributionAssetClassQuery,
} = sifApi;
