import RtkQueryService from "@shared/services/rtkService";
import { InvestorListResponse, InvestorResponse, InvestorFilters } from "../types/investor";

const investorApiWithTags = RtkQueryService.enhanceEndpoints({
  addTagTypes: ["Investors", "Investor"],
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
    getInvestorByPan: builder.query<InvestorResponse, string>({
        query: (pan) => ({
            url: `/customers/by-pan/${pan}`,
            method: 'GET',
        }),
        providesTags: (_result, _error, pan) => [{ type: "Investor", pan }],
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
    useLazyGetInvestorByPanQuery,
} = investorApi;
