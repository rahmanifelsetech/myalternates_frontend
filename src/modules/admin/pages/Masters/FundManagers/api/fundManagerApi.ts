import RtkQueryService from '@shared/services/rtkService';
import { FundManagerFilters, CreateFundManagerResponse, UpdateFundManagerResponse, DeleteFundManagerResponse, GetFundManagersResponse } from '../types/fundManager';

export const fundManagerApi = RtkQueryService.enhanceEndpoints({
  addTagTypes: ['FundManagers'],
}).injectEndpoints({
  endpoints: (builder) => ({
    getFundManagers: builder.query<GetFundManagersResponse, FundManagerFilters>({
      query: (params) => ({
        url: '/masters/fund-managers',
        method: 'GET',
        params,
      }),
      providesTags: ['FundManagers'],
    }),
    createFundManager: builder.mutation<CreateFundManagerResponse, FormData>({
      query: (data) => ({
        url: '/masters/fund-managers',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['FundManagers'],
    }),
    updateFundManager: builder.mutation<UpdateFundManagerResponse, { id: string; data: FormData }>({
      query: ({ id, data }) => ({
        url: `/masters/fund-managers/${id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['FundManagers'],
    }),
    deleteFundManager: builder.mutation<DeleteFundManagerResponse, string>({
      query: (id) => ({
        url: `/masters/fund-managers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['FundManagers'],
    }),
  }),
});

export const {
  useGetFundManagersQuery,
  useCreateFundManagerMutation,
  useUpdateFundManagerMutation,
  useDeleteFundManagerMutation,
} = fundManagerApi;