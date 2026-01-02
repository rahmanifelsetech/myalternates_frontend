import RtkQueryService from "@shared/services/rtkService";
import { AmcListResponse, AmcResponse, AmcFilters } from "../types/amc";

const amcApiWithTags = RtkQueryService.enhanceEndpoints({
  addTagTypes: ["Amcs", "Amc"],
});

const amcApi = amcApiWithTags.injectEndpoints({
  endpoints: (builder) => ({
    getAmcs: builder.query<AmcListResponse, AmcFilters>({
      query: (params) => ({
        url: '/amcs',
        method: 'GET',
        params,
      }),
      providesTags: ["Amcs"],
    }),
    getAmcById: builder.query<AmcResponse, string>({
      query: (id) => ({
        url: `/amcs/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: "Amc", id }],
    }),
    createAmc: builder.mutation<AmcResponse, FormData>({
      query: (body) => ({
        url: '/amcs',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ["Amcs"],
    }),
    updateAmc: builder.mutation<AmcResponse, { id: string; data: FormData }>({
        query: ({ id, data }) => ({
            url: `/amcs/${id}`,
            method: 'PUT',
            data,
        }),
        invalidatesTags: (_result, _error, { id }) => ["Amcs", { type: "Amc", id }],
    }),
    deleteAmc: builder.mutation<void, string>({
      query: (id) => ({
        url: `/amcs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Amcs"],
    }),
  }),
});
export const {
    useGetAmcsQuery,
    useGetAmcByIdQuery,
    useCreateAmcMutation,
    useUpdateAmcMutation,
    useDeleteAmcMutation,
} = amcApi;