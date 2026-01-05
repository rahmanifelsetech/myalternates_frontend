import { PaginatedResponse, PaginationParams, SingleResponse, EmptyResponse } from '@shared/types/api';

export interface FundManagerScheme {
  fromDate: string;
  scheme: {
    schemeCode: string;
    schemeName: string;
  };
}

export interface FundManager {
  id: string;
  name: string;
  code?: string;
  designation?: string;
  aum?: string | number;
  linkedinUrl?: string;
  amcId?: string;
  amc?: {
    name: string;
    logoUrl?: string;
    [key: string]: any;
  };
  profilePicture?: string; // This corresponds to "profilePicture" in payload but is URL in GET
  about?: string;
  experience?: string;
  fundManagerCreative?: string; // This corresponds to "fundManagerCreative" in payload but is URL in GET
  isFeatured: boolean;
  priorityOrder: number;
  isActive: boolean;
  schemes?: FundManagerScheme[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateFundManagerPayload {
  name: string;
  code: string;
  amcId: string;
  designation?: string;
  aum?: number | string;
  linkedinUrl?: string;
  about?: string;
  profilePicture?: File | string | null;
  fundManagerCreative?: File | string | null;
  experience?: string;
  isFeatured?: boolean;
  priorityOrder?: number;
  isActive?: boolean;
}

export interface UpdateFundManagerPayload extends Partial<CreateFundManagerPayload> {
  id: string;
  filesToRemove?: string[];
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
export type GetFundManagerResponse = SingleResponse<FundManager>;