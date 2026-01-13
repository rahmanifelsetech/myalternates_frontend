import { PaginatedResponse, PaginationParams, SingleResponse, EmptyResponse } from '@shared/types/api';

export interface Product {
  id: string;
  name: string;
  code: string;
  desc?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductPayload {
  name: string;
  code: string;
  desc?: string;
  isActive?: boolean;
}

export interface UpdateProductPayload extends Partial<CreateProductPayload> {
  id: string;
}

export interface ProductFilters extends PaginationParams {
  search?: string;
  isActive?: boolean;
}

export type ProductsResponse = PaginatedResponse<Product>;

/**
 * Products API Response Types
 */
export type CreateProductResponse = SingleResponse<Product>;
export type UpdateProductResponse = SingleResponse<Product>;
export type DeleteProductResponse = EmptyResponse;
export type GetProductsResponse = PaginatedResponse<Product>;
