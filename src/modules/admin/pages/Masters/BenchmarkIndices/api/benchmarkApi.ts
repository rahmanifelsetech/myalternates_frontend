import RtkQueryService from '@shared/services/rtkService';
import { BenchmarkFilters, CreateBenchmarkPayload, UpdateBenchmarkPayload, CreateBenchmarkResponse, UpdateBenchmarkResponse, DeleteBenchmarkResponse, GetBenchmarksResponse } from '../types/benchmark';

export const benchmarkApi = RtkQueryService.enhanceEndpoints({
  addTagTypes: ['Benchmarks'],
}).injectEndpoints({
  endpoints: (builder) => ({
    getBenchmarks: builder.query<GetBenchmarksResponse, BenchmarkFilters>({
      query: (params) => ({
        url: '/masters/benchmark-indices',
        method: 'GET',
        params,
      }),
      providesTags: ['Benchmarks'],
    }),
    createBenchmark: builder.mutation<CreateBenchmarkResponse, CreateBenchmarkPayload>({
      query: (data) => ({
        url: '/masters/benchmark-indices',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Benchmarks'],
    }),
    updateBenchmark: builder.mutation<UpdateBenchmarkResponse, UpdateBenchmarkPayload>({
      query: ({ id, ...data }) => ({
        url: `/masters/benchmark-indices/${id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['Benchmarks'],
    }),
    deleteBenchmark: builder.mutation<DeleteBenchmarkResponse, string>({
      query: (id) => ({
        url: `/masters/benchmark-indices/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Benchmarks'],
    }),
  }),
});

export const {
  useGetBenchmarksQuery,
  useCreateBenchmarkMutation,
  useUpdateBenchmarkMutation,
  useDeleteBenchmarkMutation,
} = benchmarkApi;