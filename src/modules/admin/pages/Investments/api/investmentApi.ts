import RtkQueryService from "@shared/services/rtkService";
import { InvestmentListResponse, InvestmentResponse, InvestmentFilters } from "../types/investment";

const investmentApiWithTags = RtkQueryService.enhanceEndpoints({
  addTagTypes: ["Investments", "Investment"],
});

const investmentApi = investmentApiWithTags.injectEndpoints({
  endpoints: (builder) => ({
    getInvestments: builder.query<InvestmentListResponse, InvestmentFilters>({
      query: (params) => ({
        url: '/investments',
        method: 'GET',
        params,
      }),
      providesTags: ["Investments"],
    }),
    getInvestmentById: builder.query<InvestmentResponse, string>({
      query: (id) => ({
        url: `/investments/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: "Investment", id }],
    }),
    createInvestment: builder.mutation<InvestmentResponse, any>({
      query: (body) => ({
        url: '/investments',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ["Investments"],
    }),
    updateInvestment: builder.mutation<InvestmentResponse, { id: string; data: any }>({
        query: ({ id, data }) => ({
            url: `/investments/${id}`,
            method: 'PUT',
            data,
        }),
        invalidatesTags: (_result, _error, { id }) => ["Investments", { type: "Investment", id }],
    }),
    deleteInvestment: builder.mutation<void, string>({
      query: (id) => ({
        url: `/investments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Investments"],
    }),
    createInvestmentOnboard: builder.mutation<InvestmentResponse, any>({
      query: (payload) => ({
        url: '/investments/onboard',
        method: 'POST',
        data: payload,
      }),
      invalidatesTags: ["Investments"],
    }),
  }),
});
export const {
    useGetInvestmentsQuery,
    useGetInvestmentByIdQuery,
    useCreateInvestmentMutation,
    useUpdateInvestmentMutation,
    useDeleteInvestmentMutation,
    useCreateInvestmentOnboardMutation,
} = investmentApi;
