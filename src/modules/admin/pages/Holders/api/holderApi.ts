import RtkQueryService from "@shared/services/rtkService";
import { HolderListResponse, HolderResponse, HolderFilters } from "../types/holder";

const holderApiWithTags = RtkQueryService.enhanceEndpoints({
  addTagTypes: ["Holders", "Holder"],
});

const holderApi = holderApiWithTags.injectEndpoints({
  endpoints: (builder) => ({
    getHolders: builder.query<HolderListResponse, HolderFilters>({
      query: (params) => ({
        url: '/holders',
        method: 'GET',
        params,
      }),
      providesTags: ["Holders"],
    }),
    getHolderById: builder.query<HolderResponse, string>({
      query: (id) => ({
        url: `/holders/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: "Holder", id }],
    }),
    createHolder: builder.mutation<HolderResponse, any>({
      query: (body) => ({
        url: '/holders',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ["Holders"],
    }),
    updateHolder: builder.mutation<HolderResponse, { id: string; data: any }>({
        query: ({ id, data }) => ({
            url: `/holders/${id}`,
            method: 'PUT',
            data,
        }),
        invalidatesTags: (_result, _error, { id }) => ["Holders", { type: "Holder", id }],
    }),
    deleteHolder: builder.mutation<void, string>({
      query: (id) => ({
        url: `/holders/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Holders"],
    }),
  }),
});
export const {
    useGetHoldersQuery,
    useGetHolderByIdQuery,
    useCreateHolderMutation,
    useUpdateHolderMutation,
    useDeleteHolderMutation,
} = holderApi;
