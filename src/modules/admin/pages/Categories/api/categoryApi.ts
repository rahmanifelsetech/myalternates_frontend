import RtkQueryService from '@shared/services/rtkService';
import { CategoryFilters, CreateCategoryPayload, UpdateCategoryPayload, CreateCategoryResponse, UpdateCategoryResponse, DeleteCategoryResponse, GetCategoriesResponse } from '../types/category';

export const categoryApi = RtkQueryService.enhanceEndpoints({
  addTagTypes: ['Categories'],
}).injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<GetCategoriesResponse, CategoryFilters>({
      query: (params) => ({
        url: '/masters/categories',
        method: 'GET',
        params,
      }),
      providesTags: ['Categories'],
    }),
    createCategory: builder.mutation<CreateCategoryResponse, CreateCategoryPayload>({
      query: (data) => ({
        url: '/masters/categories',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Categories'],
    }),
    updateCategory: builder.mutation<UpdateCategoryResponse, UpdateCategoryPayload>({
      query: ({ id, ...data }) => ({
        url: `/masters/categories/${id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['Categories'],
    }),
    deleteCategory: builder.mutation<DeleteCategoryResponse, string>({
      query: (id) => ({
        url: `/masters/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Categories'],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;