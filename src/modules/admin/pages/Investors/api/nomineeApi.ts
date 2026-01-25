import RtkQueryService from "@shared/services/rtkService";
import { NomineeListResponse, NomineeResponse, NomineeFilters } from "../types/nominee";

const nomineeApiWithTags = RtkQueryService.enhanceEndpoints({
  addTagTypes: ["Nominees", "Nominee"],
});

const nomineeApi = nomineeApiWithTags.injectEndpoints({
  endpoints: (builder) => ({
    getNominees: builder.query<NomineeListResponse, NomineeFilters>({
      query: (params) => ({
        url: `/investors/${params.investorId}/nominees`,
        method: 'GET',
        params,
      }),
      providesTags: ["Nominees"],
    }),
    getNomineeById: builder.query<NomineeResponse, { investorId: string, id: string }>({
      query: ({ investorId, id }) => ({
        url: `/investors/${investorId}/nominees/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, { id }) => [{ type: "Nominee", id }],
    }),
    createNominee: builder.mutation<NomineeResponse, { investorId: string, data: any }>({
      query: ({ investorId, data }) => ({
        url: `/investors/${investorId}/nominees`,
        method: 'POST',
        data,
      }),
      invalidatesTags: ["Nominees"],
    }),
    updateNominee: builder.mutation<NomineeResponse, { investorId: string, id: string; data: any }>({
        query: ({ investorId, id, data }) => ({
            url: `/investors/${investorId}/nominees/${id}`,
            method: 'PUT',
            data,
        }),
        invalidatesTags: (_result, _error, { id }) => ["Nominees", { type: "Nominee", id }],
    }),
    deleteNominee: builder.mutation<void, { investorId: string, id: string }>({
      query: ({ investorId, id }) => ({
        url: `/investors/${investorId}/nominees/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Nominees"],
    }),
  }),
});
export const {
    useGetNomineesQuery,
    useGetNomineeByIdQuery,
    useCreateNomineeMutation,
    useUpdateNomineeMutation,
    useDeleteNomineeMutation,
} = nomineeApi;
