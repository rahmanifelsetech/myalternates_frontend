import { PaginatedResponse, PaginationParams, SingleResponse } from '@shared/types/api';

export type UploadType = 'daily-valuation' | 'holdings' | 'market-list' | 'transactions' | 'index-history';

export interface UploadHistoryItem {
  id: string;
  fileName: string;
  uploadDate: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  rowCount: number;
  errorCount: number;
  uploader: {
    name: string;
  };
}

export interface UploadHistoryFilters extends PaginationParams {
  startDate?: string;
  endDate?: string;
  status?: string;
}

export interface UploadFileResponse extends SingleResponse<{ message: string }> {}
export type GetUploadHistoryResponse = PaginatedResponse<UploadHistoryItem>;