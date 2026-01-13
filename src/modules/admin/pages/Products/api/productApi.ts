import RtkQueryService from '@shared/services/rtkService';
import { ProductFilters, CreateProductPayload, UpdateProductPayload, CreateProductResponse, UpdateProductResponse, DeleteProductResponse, GetProductsResponse } from '../types/product';

export const productApi = RtkQueryService.enhanceEndpoints({
  addTagTypes: ['Products'],
}).injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<GetProductsResponse, ProductFilters>({
      query: (params) => ({
        url: '/products',
        method: 'GET',
        params,
      }),
      providesTags: ['Products'],
    }),
    createProduct: builder.mutation<CreateProductResponse, CreateProductPayload>({
      query: (data) => ({
        url: '/products',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Products'],
    }),
    updateProduct: builder.mutation<UpdateProductResponse, UpdateProductPayload>({
      query: ({ id, ...data }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['Products'],
    }),
    deleteProduct: builder.mutation<DeleteProductResponse, string>({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
    populateProducts: builder.mutation<void, void>({
      query: () => ({
        url: '/populate/external/products',
        method: 'POST',
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  usePopulateProductsMutation,
} = productApi;
