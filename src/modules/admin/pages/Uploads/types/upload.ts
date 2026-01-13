import { PaginatedResponse, PaginationParams, SingleResponse } from '@shared/types/api';

export type UploadType = 'daily-valuation' | 'holdings' | 'market-list' | 'transactions' | 'index-history' | 'external-api-upload';
export type ExternalApiJobType = 'FETCH_SCHEMES' | 'FETCH_AMC_DOCUMENTS' | 'FETCH_DISTRIBUTOR_DOCUMENTS' | 'FETCH_INVESTOR_DOCUMENTS';

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

// DataFetchingLog mirrors the backend schema structure
export interface UploadLog {
  id: string;
  jobType: ExternalApiJobType;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  totalRecords: number;
  processedRecords: number;
  addedRecords: number;
  updatedRecords: number;
  failedRecords: number;
  startedAt: string;
  completedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// Detailed log with error details for modal view
export interface UploadLogDetail extends UploadLog {
  errorDetails?: Array<{ identifier: string; reason: string }>;
}

export interface UploadFileResponse extends SingleResponse<{ message: string }> {}
export type GetUploadHistoryResponse = PaginatedResponse<UploadHistoryItem>;
export interface TriggerExternalApiResponse extends SingleResponse<{ jobId: string; message: string }> {}