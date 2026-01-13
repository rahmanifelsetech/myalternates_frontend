import RtkQueryService from "@shared/services/rtkService";
import { 
  FundManagersResponse, 
  GetFundManagerResponse, 
  CreateFundManagerResponse, 
  UpdateFundManagerResponse, 
  FundManagerFilters 
} from "../types/fundManager";

const fundManagerApiWithTags = RtkQueryService.enhanceEndpoints({
  addTagTypes: ["FundManagers", "FundManager"],
});

const fundManagerApi = fundManagerApiWithTags.injectEndpoints({
  endpoints: (builder) => ({
    getFundManagers: builder.query<FundManagersResponse, FundManagerFilters>({
      query: (params) => ({
        url: '/masters/fund-managers',
        method: 'GET',
        params,
      }),
      providesTags: ["FundManagers"],
    }),
    getFundManagerById: builder.query<GetFundManagerResponse, string>({
      query: (id) => ({
        url: `/masters/fund-managers/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: "FundManager", id }],
    }),
    createFundManager: builder.mutation<CreateFundManagerResponse, FormData>({
      query: (body) => ({
        url: '/masters/fund-managers',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ["FundManagers"],
    }),
    updateFundManager: builder.mutation<UpdateFundManagerResponse, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/masters/fund-managers/${id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: (_result, _error, { id }) => ["FundManagers", { type: "FundManager", id }],
    }),
    deleteFundManager: builder.mutation<void, string>({
      query: (id) => ({
        url: `/masters/fund-managers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["FundManagers"],
    }),
    populateFundManagers: builder.mutation<void, void>({
      query: () => ({
        url: '/populate/external/fund-managers',
        method: 'POST',
      }),
      invalidatesTags: ["FundManagers"],
    }),
  }),
});

export const {
  useGetFundManagersQuery,
  useGetFundManagerByIdQuery,
  useCreateFundManagerMutation,
  useUpdateFundManagerMutation,
  useDeleteFundManagerMutation,
  usePopulateFundManagersMutation,
} = fundManagerApi;