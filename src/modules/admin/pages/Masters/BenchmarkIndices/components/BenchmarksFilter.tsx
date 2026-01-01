import React from 'react';
import Input from '@shared/components/form/input/InputField';

interface BenchmarksFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export const BenchmarksFilter: React.FC<BenchmarksFilterProps> = ({
  search,
  onSearchChange,
}) => {
  return (
    <div className="mb-4">
      <Input
        placeholder="Search benchmarks..."
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
        className="max-w-md"
      />
    </div>
  );
};