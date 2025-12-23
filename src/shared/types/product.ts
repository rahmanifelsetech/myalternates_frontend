import type { PaginatedResponse, SingleResponse, EmptyResponse } from './api';

/**
 * Product Domain Model
 */
export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Product Response Types
 * Domain-specific responses extending base API response types
 */
export type GetProductsResponse = PaginatedResponse<Product>;

export type GetProductResponse = SingleResponse<Product>;

export type CreateProductResponse = SingleResponse<Product>;

export type UpdateProductResponse = SingleResponse<Product>;

export type DeleteProductResponse = EmptyResponse;

/**
 * Product Request Payloads
 */
export interface ProductFilter {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface CreateProductPayload {
  name: string;
  description?: string;
  price: number;
  category: string;
  image?: string;
}

export interface UpdateProductPayload {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  image?: string;
  [key: string]: any;
}
