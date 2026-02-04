import RtkQueryService from "@shared/services/rtkService";
import { InvestorListResponse, InvestorResponse, InvestorFilters, InvestorByPanResponse } from "../types/investor";
import { Valuation, ValuationsResponse } from "../types/valuation";
import { Holding, HoldingsResponse } from "../types/holding";
import { Investment, InvestmentsResponse } from "../types/investment";

interface InvestmentAccount {
  id: string;
  investorId: string;
  modeOfHolding: 'SINGLE' | 'JOINT';
  holderOrderSignature: string | null;
  isActive: boolean;
  totalInvested: string;
  currentPortfolioValue: string;
  createdAt: string;
  updatedAt: string;
}

interface Transaction {
  id: string;
  investmentId: string;
  investment: {
    scheme: {
      schemeName: string;
    };
    product: {
      name: string;
    };
    amc: {
      name: string;
    };
  }
  productName?: string;
  amcName?: string;
  schemeName?: string;
  orderDate: string;
  valuationDate: string | null;
  transactionType: 'Withdrawn' | 'Addition';
  amount: string;
  capitalCommitment: string | null;
  capitalCalled: string | null;
  pendingCapital: string | null;
  remarks: string | null;
  createdAt: string;
  updatedAt: string;
}

interface AccountSummary {
  totalAccounts: number;
  totalInvested: string;
  totalPortfolioValue: string;
}

interface InvestmentAccountsResponse {
  message: string;
  data: {
    data: InvestmentAccount[];
    summary: AccountSummary;
  };
}

interface TransactionsResponse {
  data: Transaction[];
  metaData?: { total: number };
}

interface DailyValuationsResponse {
  data: Valuation[];
  metaData?: { total: number };
}

const investorApiWithTags = RtkQueryService.enhanceEndpoints({
  addTagTypes: ["Investors", "Investor", "InvestmentAccounts", "Investments", "Holdings", "Transactions", "DailyValuations"],
});

const investorApi = investorApiWithTags.injectEndpoints({
  endpoints: (builder) => ({
    getInvestors: builder.query<InvestorListResponse, InvestorFilters>({
      query: (params) => ({
        url: '/investors',
        method: 'GET',
        params,
      }),
      providesTags: ["Investors"],
    }),
    getInvestorById: builder.query<InvestorResponse, string>({
      query: (id) => ({
        url: `/investors/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: "Investor", id }],
    }),
    getInvestorByUniqueId: builder.query<InvestorByPanResponse, string>({
        query: (uniqueId) => ({
            url: `/investors/by-unique-id/${uniqueId}`,
            method: 'GET',
        }),
        providesTags: (_result, _error, uniqueId) => [{ type: "Investor", id: uniqueId }],
    }),
    // Portfolio API Endpoints
    getInvestmentAccounts: builder.query<InvestmentAccountsResponse, string>({
      query: (investorId) => ({
        url: `/investors/${investorId}/portfolio/accounts`,
        method: 'GET',
      }),
      providesTags: (_result, _error, investorId) => [{ type: "InvestmentAccounts", id: investorId }],
    }),
    getPortfolioCompleteSummary: builder.query<any, string>({
      query: (investorId) => ({
        url: `/investors/${investorId}/portfolio/complete-summary`,
        method: 'GET',
      }),
      providesTags: (_result, _error, investorId) => [{ type: "Investor", id: investorId }],
    }),
    getAccountHoldings: builder.query<HoldingsResponse, { investorId: string; accountId: string }>({
      query: ({ investorId, accountId }) => ({
        url: `/investors/${investorId}/accounts/${accountId}/holdings`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { accountId }) => [{ type: "Holdings", id: accountId }],
    }),
    getInvestmentHoldings: builder.query<HoldingsResponse, { investorId: string; investmentId: string }>({
      query: ({ investorId, investmentId }) => ({
        url: `/investors/${investorId}/investments/${investmentId}/holdings`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { investmentId }) => [{ type: "Holdings", id: investmentId }],
    }),
    updateHoldings: builder.mutation<{ message: string; data: Holding[] }, { investmentId: string; holdingsAsOnDate: string; holdings: Partial<Holding>[] }>({
      query: ({ investmentId, holdingsAsOnDate, holdings }) => ({
        url: `/investors/investments/${investmentId}/holdings`,
        method: 'PUT',
        data: { investmentId, holdingsAsOnDate, holdings },
      }),
      invalidatesTags: (_result, _error, { investmentId }) => [{ type: "Holdings", id: investmentId }],
    }),
    createHolding: builder.mutation<{ message: string; data: Holding[] }, { investmentId: string; holdings: Partial<Holding>[] }>({
      query: ({ investmentId, holdings }) => ({
        url: `/investors/investments/${investmentId}/holdings/bulk`,
        method: 'POST',
        data: { investmentId, holdings },
      }),
      invalidatesTags: (_result, _error, { investmentId }) => [{ type: "Holdings", id: investmentId }],
    }),
    getAccountInvestments: builder.query<InvestmentsResponse, { investorId: string; accountId: string }>({
      query: ({ investorId, accountId }) => ({
        url: `/investors/${investorId}/accounts/${accountId}/investments`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { accountId }) => [{ type: "Investments", id: accountId }],
    }),
    getAccountDailyValuations: builder.query<DailyValuationsResponse, { investorId: string; accountId: string; limit?: number }>({
      query: ({ investorId, accountId, limit = 100 }) => ({
        url: `/investors/${investorId}/accounts/${accountId}/daily-valuations`,
        method: 'GET',
        params: { limit },
      }),
      providesTags: (_result, _error, { accountId }) => [{ type: "DailyValuations", id: accountId }],
    }),
    getAccountTransactions: builder.query<TransactionsResponse, { investorId: string; accountId: string; limit?: number }>({
      query: ({ investorId, accountId, limit = 100 }) => ({
        url: `/investors/${investorId}/accounts/${accountId}/transactions`,
        method: 'GET',
        params: { limit },
      }),
      providesTags: (_result, _error, { accountId }) => [{ type: "Transactions", id: accountId }],
    }),
    createInvestor: builder.mutation<InvestorResponse, FormData>({
      query: (body) => ({
        url: '/investors',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ["Investors"],
    }),
    updateInvestor: builder.mutation<InvestorResponse, { id: string; data: FormData }>({
        query: ({ id, data }) => ({
            url: `/investors/${id}`,
            method: 'PUT',
            data,
        }),
        invalidatesTags: (_result, _error, { id }) => ["Investors", { type: "Investor", id }],
    }),
    deleteInvestor: builder.mutation<void, string>({
      query: (id) => ({
        url: `/investors/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Investors"],
    }),
  }),
});
export const {
    useGetInvestorsQuery,
    useGetInvestorByIdQuery,
    useCreateInvestorMutation,
    useUpdateInvestorMutation,
    useDeleteInvestorMutation,
    useLazyGetInvestorByUniqueIdQuery,
    useGetInvestmentAccountsQuery,
    useGetPortfolioCompleteSummaryQuery,
    useGetAccountHoldingsQuery,
    useGetInvestmentHoldingsQuery,
    useUpdateHoldingsMutation,
    useCreateHoldingMutation,
    useGetAccountInvestmentsQuery,
    useGetAccountDailyValuationsQuery,
    useGetAccountTransactionsQuery,
} = investorApi;
