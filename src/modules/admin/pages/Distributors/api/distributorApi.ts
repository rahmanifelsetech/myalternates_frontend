import RtkQueryService from "@shared/services/rtkService";
import { DistributorListResponse, DistributorResponse, DistributorFilters } from "../types/distributor";

const distributorApiWithTags = RtkQueryService.enhanceEndpoints({
  addTagTypes: ["Distributors", "Distributor"],
});

const distributorApi = distributorApiWithTags.injectEndpoints({
  endpoints: (builder) => ({
    getDistributors: builder.query<DistributorListResponse, DistributorFilters>({
      query: (params) => ({
        url: '/distributors',
        method: 'GET',
        params,
      }),
      providesTags: ["Distributors"],
    }),
    getDistributorById: builder.query<DistributorResponse, string>({
      query: (id) => ({
        url: `/distributors/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: "Distributor", id }],
    }),
    createDistributor: builder.mutation<DistributorResponse, any>({
      query: (body) => ({
        url: '/distributors',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ["Distributors"],
    }),
    updateDistributor: builder.mutation<DistributorResponse, { id: string; data: any }>({
        query: ({ id, data }) => ({
            url: `/distributors/${id}`,
            method: 'PUT',
            data,
        }),
        invalidatesTags: (_result, _error, { id }) => ["Distributors", { type: "Distributor", id }],
    }),
    deleteDistributor: builder.mutation<void, string>({
      query: (id) => ({
        url: `/distributors/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Distributors"],
    }),
  }),
});
export const {
    useGetDistributorsQuery,
    useGetDistributorByIdQuery,
    useCreateDistributorMutation,
    useUpdateDistributorMutation,
    useDeleteDistributorMutation,
} = distributorApi;
