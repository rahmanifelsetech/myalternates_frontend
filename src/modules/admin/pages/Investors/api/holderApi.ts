import RtkQueryService from "@shared/services/rtkService";
import { HolderListResponse, HolderResponse, HolderFilters } from "../types/holder";
import { HolderByPanResponse, PersonResponse } from "../types/investor";

const holderApiWithTags = RtkQueryService.enhanceEndpoints({
  addTagTypes: ["Holders", "Holder"],
});

const holderApi = holderApiWithTags.injectEndpoints({
  endpoints: (builder) => ({
    getHolders: builder.query<HolderListResponse, HolderFilters>({
      query: (params) => ({
        url: `/investors/${params.investorId}/holders`,
        method: 'GET',
        params,
      }),
      providesTags: ["Holders"],
    }),
    getHolderById: builder.query<HolderResponse, { investorId: string, id: string }>({
      query: ({ investorId, id }) => ({
        url: `/investors/${investorId}/holders/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { id }) => [{ type: "Holder", id }],
    }),
    getHolderByPan: builder.query<PersonResponse, string>({
        query: (pan) => ({
            url: `/persons/by-pan/${pan}`,
            method: 'GET',
        }),
    }),
    createHolder: builder.mutation<HolderResponse, { investorId: string, data: any }>({
      query: ({ investorId, data }) => ({
        url: `/investors/${investorId}/holders`,
        method: 'POST',
        data,
      }),
      invalidatesTags: ["Holders"],
    }),
    updateHolder: builder.mutation<HolderResponse, { investorId: string, id: string; data: any }>({
        query: ({ investorId, id, data }) => ({
            url: `/investors/${investorId}/holders/${id}`,
            method: 'PUT',
            data,
        }),
        invalidatesTags: (_result, _error, { id }) => ["Holders", { type: "Holder", id }],
    }),
    deleteHolder: builder.mutation<void, { investorId: string, id: string }>({
      query: ({ investorId, id }) => ({
        url: `/investors/${investorId}/holders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Holders"],
    }),
  }),
});
export const {
    useGetHoldersQuery,
    useGetHolderByIdQuery,
    useLazyGetHolderByPanQuery,
    useCreateHolderMutation,
    useUpdateHolderMutation,
    useDeleteHolderMutation,
} = holderApi;
