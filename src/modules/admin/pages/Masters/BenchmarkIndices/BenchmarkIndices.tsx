import React, { useState } from 'react';
import { useGetBenchmarksQuery } from './api/benchmarkApi';
import { BenchmarksTable } from './components/BenchmarksTable';
import { BenchmarksFilter } from './components/BenchmarksFilter';
import { BenchmarkModal } from './components/BenchmarkModal';
import Button from '@shared/components/ui/button/Button';
import { PlusIcon } from '@shared/icons';
import { Benchmark, CreateBenchmarkPayload } from './types/benchmark';
import ComponentCard from '@/shared/components/common/ComponentCard';
import { CanAccess } from '@/shared/components/common/CanAccess';
import { PERMISSIONS } from '@/shared/constants/permissions';
import { useBenchmarks } from './hooks/useBenchmarks';
import { typographyClasses } from '@shared/utils/typographyUtils';
import { Pagination } from '@/shared/components/common/Pagination';

const BenchmarkIndices: React.FC = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBenchmark, setSelectedBenchmark] = useState<Benchmark | null>(null);

  const { data, isLoading } = useGetBenchmarksQuery({ search, page });
  const { handleCreate: createBenchmark, handleUpdate: updateBenchmark, handleDelete: deleteBenchmark, isCreating, isUpdating } = useBenchmarks();

  const handleCreate = () => {
    setSelectedBenchmark(null);
    setIsModalOpen(true);
  };

  const handleEdit = (benchmark: Benchmark) => {
    setSelectedBenchmark(benchmark);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData: CreateBenchmarkPayload) => {
    if (selectedBenchmark) {
      await updateBenchmark({ id: selectedBenchmark.id, ...formData });
    } else {
      await createBenchmark(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this benchmark?')) {
      await deleteBenchmark(id);
    }
  };

  const header = (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5">
      <div>
        <h2 className={`${typographyClasses.heading.h2} ${typographyClasses.colors.text.primary}`}>
          Benchmark Indices
        </h2>
        <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted}`}>
          Manage benchmark indices
        </p>
      </div>
      <CanAccess any={[PERMISSIONS.MASTERS.BENCHMARK_CREATE]}>
        <Button onClick={handleCreate} startIcon={<PlusIcon fontSize={20} className="text-white" />}>
          Add Benchmark
        </Button>
      </CanAccess>
    </div>
  );

  return (
    <div className="space-y-6">
      <ComponentCard header={header} headerPosition="outside">
        <BenchmarksFilter search={search} onSearchChange={setSearch} />
        <BenchmarksTable
          benchmarks={data?.data || []}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {data?.metaData && (
          <Pagination meta={data.metaData} onPageChange={setPage} />
        )}

        <BenchmarkModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          benchmark={selectedBenchmark}
          isLoading={isCreating || isUpdating}
        />
      </ComponentCard>
    </div>
  );
};

export default BenchmarkIndices;