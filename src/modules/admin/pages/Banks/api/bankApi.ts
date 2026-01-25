import RtkQueryService from "@shared/services/rtkService";
import { BankListResponse, BankResponse, BankFilters } from "../types/bank";

const bankApiWithTags = RtkQueryService.enhanceEndpoints({
  addTagTypes: ["Banks", "Bank"],
});

const bankApi = bankApiWithTags.injectEndpoints({
  endpoints: (builder) => ({
    getBanks: builder.query<BankListResponse, BankFilters>({
      query: (params) => ({
        url: '/banks',
        method: 'GET',
        params,
      }),
      providesTags: ["Banks"],
    }),
    getBankById: builder.query<BankResponse, string>({
      query: (id) => ({
        url: `/banks/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: "Bank", id }],
    }),
    createBank: builder.mutation<BankResponse, any>({
      query: (body) => ({
        url: '/banks',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ["Banks"],
    }),
    updateBank: builder.mutation<BankResponse, { id: string; data: any }>({
        query: ({ id, data }) => ({
            url: `/banks/${id}`,
            method: 'PUT',
            data,
        }),
        invalidatesTags: (_result, _error, { id }) => ["Banks", { type: "Bank", id }],
    }),
    deleteBank: builder.mutation<void, string>({
      query: (id) => ({
        url: `/banks/${id}`,
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