import { PaginatedResponse, PaginationParams, SingleResponse, EmptyResponse } from '@shared/types/api';

export interface Benchmark {
  id: string;
  name: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateBenchmarkPayload {
  name: string;
  isActive?: boolean;
}

export interface UpdateBenchmarkPayload extends Partial<CreateBenchmarkPayload> {
  id: string;
}

export interface BenchmarkFilters extends PaginationParams {
  search?: string;
  isActive?: boolean;
}

export type BenchmarksResponse = PaginatedResponse<Benchmark>;

export type CreateBenchmarkResponse = SingleResponse<Benchmark>;
export type UpdateBenchmarkResponse = SingleResponse<Benchmark>;
export type DeleteBenchmarkResponse = EmptyResponse;
export type GetBenchmarksResponse = PaginatedResponse<Benchmark>;