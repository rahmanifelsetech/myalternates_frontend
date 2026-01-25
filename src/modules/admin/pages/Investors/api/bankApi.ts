import RtkQueryService from "@shared/services/rtkService";
import { BankListResponse, BankResponse, BankFilters } from "../types/bank";

const bankApiWithTags = RtkQueryService.enhanceEndpoints({
  addTagTypes: ["Banks", "Bank"],
});

const bankApi = bankApiWithTags.injectEndpoints({
  endpoints: (builder) => ({
    getBanks: builder.query<BankListResponse, BankFilters>({
      query: (params) => ({
        url: `/investors/${params.investorId}/banks`,
        method: 'GET',
        params,
      }),
      providesTags: ["Banks"],
    }),
    getBankById: builder.query<BankResponse, { investorId: string, id: string }>({
      query: ({ investorId, id }) => ({
        url: `/investors/${investorId}/banks/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { id }) => [{ type: "Bank", id }],
    }),
    createBank: builder.mutation<BankResponse, { investorId: string, data: any }>({
      query: ({ investorId, data }) => ({
        url: `/investors/${investorId}/banks`,
        method: 'POST',
        data,
      }),
      invalidatesTags: ["Banks"],
    }),
    updateBank: builder.mutation<BankResponse, { investorId: string, id: string; data: any }>({
        query: ({ investorId, id, data }) => ({
            url: `/investors/${investorId}/banks/${id}`,
            method: 'PUT',
            data,
        }),
        invalidatesTags: (_result, _error, { id }) => ["Banks", { type: "Bank", id }],
    }),
    deleteBank: builder.mutation<void, { investorId: string, id: string }>({
      query: ({ investorId, id }) => ({
        url: `/investors/${investorId}/banks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Banks"],
    }),
  }),
});
export const {
    useGetBanksQuery,
    useGetBankByIdQuery,
    useCreateBankMutation,
    useUpdateBankMutation,
    useDeleteBankMutation,
} = bankApi;
