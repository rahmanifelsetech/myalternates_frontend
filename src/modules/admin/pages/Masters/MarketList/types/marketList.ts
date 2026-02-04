import { PaginatedResponse, SingleResponse } from '@shared/types/api';

export interface MarketList {
  id: string;
  companyName: string;
  isinCode: string;
  categoryId: string;
  category?: {
    id: string;
    name: string;
  };
  sector: string;
  asOnDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMarketListPayload {
  companyName: string;
  isinCode: string;
  categoryId: string;
  sector: string;
  asOnDate: string;
}

export interface UpdateMarketListPayload extends Partial<CreateMarketListPayload> {
  id: string;
}

export interface MarketListFilters {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
}

export interface BulkUploadResult {
  id: string;
  companyName: string;
  isinCode: string;
  categorization?: string;
  categoryId?: string;
  sector?: string;
  asOnDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface BulkUploadError {
  rowIndex: number;
  data: Partial<CreateMarketListPayload>;
  success: false;
  error: string;
}

export interface BulkUploadResponse {
  success: boolean;
  message: string;
  data?: {
    count: number;
    results: BulkUploadResult[];
    errors: BulkUploadError[];
    summary: {
      totalRows: number;
      successCount: number;
      failureCount: number;
    };
  };
  error?: string;
}

export type GetMarketListResponse = PaginatedResponse<MarketList>;
export type CreateMarketListResponse = SingleResponse<MarketList>;
export type UpdateMarketListResponse = SingleResponse<MarketList>;
export type DeleteMarketListResponse = void;
export type BulkUploadMarketListResponse = BulkUploadResponse;
