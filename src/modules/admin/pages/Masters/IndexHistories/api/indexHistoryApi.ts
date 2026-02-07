import RtkQueryService from '@shared/services/rtkService';
import { IndexHistoryFilters, CreateIndexHistoryPayload, UpdateIndexHistoryPayload, CreateIndexHistoryResponse, UpdateIndexHistoryResponse, DeleteIndexHistoryResponse, GetIndexHistoriesResponse } from '../types/indexHistory';

export const indexHistoryApi = RtkQueryService.enhanceEndpoints({
  addTagTypes: ['IndexHistories'],
}).injectEndpoints({
  endpoints: (builder) => ({
    getIndexHistories: builder.query<GetIndexHistoriesResponse, IndexHistoryFilters>({
      query: (params) => ({
        url: '/masters/index-histories',
        method: 'GET',
        params,
      }),
      providesTags: ['IndexHistories'],
    }),
    createIndexHistory: builder.mutation<CreateIndexHistoryResponse, CreateIndexHistoryPayload>({
      query: (data) => ({
        url: '/masters/index-histories',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['IndexHistories'],
    }),
    updateIndexHistory: builder.mutation<UpdateIndexHistoryResponse, UpdateIndexHistoryPayload>({
      query: ({ id, ...data }) => ({
        url: `/masters/index-histories/${id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['IndexHistories'],
    }),
    deleteIndexHistory: builder.mutation<DeleteIndexHistoryResponse, string>({
      query: (id) => ({
        url: `/masters/index-histories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['IndexHistories'],
    }),
  }),
});

export const {
  useGetIndexHistoriesQuery,
  useCreateIndexHistoryMutation,
  useUpdateIndexHistoryMutation,
  useDeleteIndexHistoryMutation,
} = indexHistoryApi;
