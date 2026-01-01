import RtkQueryService from '@shared/services/rtkService';
import { AssetClassFilters, CreateAssetClassPayload, UpdateAssetClassPayload, CreateAssetClassResponse, UpdateAssetClassResponse, DeleteAssetClassResponse, GetAssetClassesResponse } from '../types/assetClass';

export const assetClassApi = RtkQueryService.enhanceEndpoints({
  addTagTypes: ['AssetClasses'],
}).injectEndpoints({
  endpoints: (builder) => ({
    getAssetClasses: builder.query<GetAssetClassesResponse, AssetClassFilters>({
      query: (params) => ({
        url: '/masters/asset-classes',
        method: 'GET',
        params,
      }),
      providesTags: ['AssetClasses'],
    }),
    createAssetClass: builder.mutation<CreateAssetClassResponse, CreateAssetClassPayload>({
      query: (data) => ({
        url: '/masters/asset-classes',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['AssetClasses'],
    }),
    updateAssetClass: builder.mutation<UpdateAssetClassResponse, UpdateAssetClassPayload>({
      query: ({ id, ...data }) => ({
        url: `/masters/asset-classes/${id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['AssetClasses'],
    }),
    deleteAssetClass: builder.mutation<DeleteAssetClassResponse, string>({
      query: (id) => ({
        url: `/masters/asset-classes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AssetClasses'],
    }),
  }),
});

export const {
  useGetAssetClassesQuery,
  useCreateAssetClassMutation,
  useUpdateAssetClassMutation,
  useDeleteAssetClassMutation,
} = assetClassApi;