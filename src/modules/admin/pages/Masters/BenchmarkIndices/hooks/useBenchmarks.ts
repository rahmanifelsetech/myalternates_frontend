import { useCallback } from 'react';
import {
  useCreateBenchmarkMutation,
  useUpdateBenchmarkMutation,
  useDeleteBenchmarkMutation,
} from '../api/benchmarkApi';
import { CreateBenchmarkPayload, UpdateBenchmarkPayload } from '../types/benchmark';
import { useAsyncMutation } from '@shared/hooks/useAsyncMutation';

export const useBenchmarks = () => {
  const { execute } = useAsyncMutation();
  const [createBenchmark, { isLoading: isCreating }] = useCreateBenchmarkMutation();
  const [updateBenchmark, { isLoading: isUpdating }] = useUpdateBenchmarkMutation();
  const [deleteBenchmark, { isLoading: isDeleting }] = useDeleteBenchmarkMutation();

  const handleCreate = useCallback(
    (data: CreateBenchmarkPayload) =>
      execute(createBenchmark, data, {
        successMessage: 'Benchmark created successfully!',
        errorMessage: 'Failed to create benchmark',
      }),
    [createBenchmark, execute]
  );

  const handleUpdate = useCallback(
    (data: UpdateBenchmarkPayload) =>
      execute(updateBenchmark, data, {
        successMessage: 'Benchmark updated successfully!',
        errorMessage: 'Failed to update benchmark',
      }),
    [updateBenchmark, execute]
  );

  const handleDelete = useCallback(
    (id: string) =>
      execute(deleteBenchmark, id, {
        successMessage: 'Benchmark deleted successfully!',
        errorMessage: 'Failed to delete benchmark',
      }),
    [deleteBenchmark, execute]
  );

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
    isCreating,
    isUpdating,
    isDeleting,
  };
};