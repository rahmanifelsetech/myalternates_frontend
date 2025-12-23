import ApiService from '../ApiService';
import type {
  GetProductsResponse,
  GetProductResponse,
  CreateProductResponse,
  UpdateProductResponse,
  DeleteProductResponse,
  ProductFilter,
} from '@/types/product';
import type { PaginationParams } from '@/types/api';

export const productService = {
  getAll: async (params?: PaginationParams & ProductFilter): Promise<GetProductsResponse> => {
    return ApiService.get<GetProductsResponse>('/products', { params });
  },

  getById: async (id: string): Promise<GetProductResponse> => {
    return ApiService.get<GetProductResponse>(`/products/${id}`);
  },

  getByType: async (type: string, params?: PaginationParams): Promise<GetProductsResponse> => {
    return ApiService.get<GetProductsResponse>(`/products/type/${type}`, { params });
  },

  create: async (data: Partial<any>): Promise<CreateProductResponse> => {
    return ApiService.post<CreateProductResponse>('/products', data);
  },

  update: async (id: string, data: Partial<any>): Promise<UpdateProductResponse> => {
    return ApiService.put<UpdateProductResponse>(`/products/${id}`, data);
  },

  deleteProduct: async (id: string): Promise<DeleteProductResponse> => {
    return ApiService.deleteRequest<DeleteProductResponse>(`/products/${id}`);
  },

  search: async (searchTerm: string, params?: PaginationParams): Promise<GetProductsResponse> => {
    return ApiService.get<GetProductsResponse>('/products/search', {
      params: { q: searchTerm, ...params },
    });
  },
};

export default productService;
