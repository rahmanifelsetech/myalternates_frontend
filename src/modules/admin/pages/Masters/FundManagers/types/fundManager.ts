import { PaginatedResponse, PaginationParams, SingleResponse, EmptyResponse } from '@shared/types/api';

export interface FundManager {
  id: string;
  name: string;
  title?: string;
  code?: string;
  designation?: string;
  amcId?: string;
  profilePicture?: string;
  about?: string;
  experience?: string;
  fundManagerCreative?: string;
  isFeatured: boolean;
  priorityOrder: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateFundManagerPayload {
  name: string;
  title?: string;
  code?: string;
  designation?: string;
  amcId?: string;
  profilePicture?: File | null; // For upload
  about?: string;
  experience?: string;
  fundManagerCreative?: File | null; // For upload
  isFeatured?: boolean;
  priorityOrder?: number;
  isActive?: boolean;
}

export interface UpdateFundManagerPayload extends Partial<Omit<CreateFundManagerPayload, 'profilePicture' | 'fundManagerCreative'>> {
  id: string;
  profilePicture?: File | string | null; // Can be URL string if not updating
  fundManagerCreative?: File | string | null;
}

export interface FundManagerFilters extends PaginationParams {
  search?: string;
  amcId?: string;
  isActive?: boolean;
}

export type FundManagersResponse = PaginatedResponse<FundManager>;

export type CreateFundManagerResponse = SingleResponse<FundManager>;
export type UpdateFundManagerResponse = SingleResponse<FundManager>;
export type DeleteFundManagerResponse = EmptyResponse;
export type GetFundManagersResponse = PaginatedResponse<FundManager>;