import { PaginatedResponse, PaginationParams, SingleResponse, EmptyResponse } from '@shared/types/api';

export interface AssetClass {
  id: string;
  name: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateAssetClassPayload {
  name: string;
  isActive?: boolean;
}

export interface UpdateAssetClassPayload extends Partial<CreateAssetClassPayload> {
  id: string;
}

export interface AssetClassFilters extends PaginationParams {
  search?: string;
  isActive?: boolean;
}

export type AssetClassesResponse = PaginatedResponse<AssetClass>;

export type CreateAssetClassResponse = SingleResponse<AssetClass>;
export type UpdateAssetClassResponse = SingleResponse<AssetClass>;
export type DeleteAssetClassResponse = EmptyResponse;
export type GetAssetClassesResponse = PaginatedResponse<AssetClass>;