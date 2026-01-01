import { PaginatedResponse, PaginationParams, SingleResponse, EmptyResponse } from '@shared/types/api';

export interface Category {
  id: string;
  name: string;
  description?: string;
  color?: string;
  parentCategoryId?: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateCategoryPayload {
  name: string;
  description?: string;
  color?: string;
  parentCategoryId?: string;
  isActive?: boolean;
}

export interface UpdateCategoryPayload extends Partial<CreateCategoryPayload> {
  id: string;
}

export interface CategoryFilters extends PaginationParams {
  search?: string;
  parentCategoryId?: string;
  isActive?: boolean;
}

export type CategoriesResponse = PaginatedResponse<Category>;

/**
 * Categories API Response Types
 */
export type CreateCategoryResponse = SingleResponse<Category>;
export type UpdateCategoryResponse = SingleResponse<Category>;
export type DeleteCategoryResponse = EmptyResponse;
export type GetCategoriesResponse = PaginatedResponse<Category>;