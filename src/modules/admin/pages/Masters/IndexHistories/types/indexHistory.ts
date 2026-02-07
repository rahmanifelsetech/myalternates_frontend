import { PaginatedResponse, PaginationParams, SingleResponse, EmptyResponse } from '@shared/types/api';

export interface IndexHistory {
  id: string;
  indexCode: string;
  indexName: string;
  valuationDate: string;
  openValue?: string;
  highValue?: string;
  lowValue?: string;
  closeValue?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateIndexHistoryPayload {
  indexCode: string;
  indexName: string;
  valuationDate: string;
  openValue?: string;
  highValue?: string;
  lowValue?: string;
  closeValue?: string;
}

export interface UpdateIndexHistoryPayload extends Partial<CreateIndexHistoryPayload> {
  id: string;
}

export interface IndexHistoryFilters extends PaginationParams {
  search?: string;
  indexCode?: string;
  startDate?: string;
  endDate?: string;
}

export type IndexHistoriesResponse = PaginatedResponse<IndexHistory>;

export type CreateIndexHistoryResponse = SingleResponse<IndexHistory>;
export type UpdateIndexHistoryResponse = SingleResponse<IndexHistory>;
export type DeleteIndexHistoryResponse = EmptyResponse;
export type GetIndexHistoriesResponse = PaginatedResponse<IndexHistory>;
