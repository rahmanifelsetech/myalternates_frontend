import RtkQueryService from '@shared/services/rtkService';
import { MarketList, GetMarketListResponse, CreateMarketListResponse, UpdateMarketListResponse, DeleteMarketListResponse, BulkUploadMarketListResponse, CreateMarketListPayload, UpdateMarketListPayload, MarketListFilters } from '../types/marketList';

const marketListApiWithTags = RtkQueryService.enhanceEndpoints({
  addTagTypes: ['MarketLists', 'MarketList'],
});

const marketListApi = marketListApiWithTags.injectEndpoints({
  endpoints: (builder) => ({
    getMarketLists: builder.query<GetMarketListResponse, MarketListFilters>({
      query: (params) => ({
        url: '/masters/market-list',
        method: 'GET',
        params,
      }),
      providesTags: ['MarketLists'],
    }),

    getMarketListById: builder.query<CreateMarketListResponse, string>({
      query: (id) => ({
        url: `/masters/market-list/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'MarketList', id }],
    }),

    getMarketListByIsin: builder.query<CreateMarketListResponse, string>({
      query: (isinCode) => ({
        url: `/masters/market-list/by-isin/${isinCode}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, isinCode) => [{ type: 'MarketList', id: isinCode }],
    }),

    createMarketList: builder.mutation<CreateMarketListResponse, CreateMarketListPayload>({
      query: (data) => ({
        url: '/masters/market-list',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['MarketLists'],
    }),

    updateMarketList: builder.mutation<UpdateMarketListResponse, UpdateMarketListPayload>({
      query: ({ id, ...data }) => ({
        url: `/masters/market-list/${id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        'MarketLists',
        { type: 'MarketList', id },
      ],
    }),

    deleteMarketList: builder.mutation<DeleteMarketListResponse, string>({
      query: (id) => ({
        url: `/masters/market-list/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['MarketLists'],
    }),

    bulkUploadMarketList: builder.mutation<BulkUploadMarketListResponse, FormData>({
      query: (data) => ({
        url: '/masters/market-list/bulk/upload',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['MarketLists'],
    }),

    downloadMarketListTemplate: builder.query<Blob, void>({
      query: () => ({
        url: '/masters/market-list/template/download',
        method: 'GET',
        responseHandler: 'blob',
      }),
    }),
  }),
});

export const {
  useGetMarketListsQuery,
  useGetMarketListByIdQuery,
  useGetMarketListByIsinQuery,
  useLazyGetMarketListByIsinQuery,
  useCreateMarketListMutation,
  useUpdateMarketListMutation,
  useDeleteMarketListMutation,
  useBulkUploadMarketListMutation,
  useDownloadMarketListTemplateQuery,
} = marketListApi;
