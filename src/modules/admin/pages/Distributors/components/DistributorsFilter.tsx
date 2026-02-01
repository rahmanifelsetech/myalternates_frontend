import React from 'react';
import DebouncedSearchInput from '@shared/components/form/input/DebouncedSearchInput';

interface DistributorsFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export const DistributorsFilter: React.FC<DistributorsFilterProps> = ({ search, onSearchChange }) => {
  return (
    <div className="p-4 border-b border-gray-200">
      <DebouncedSearchInput
        placeholder="Search Distributors..."
        value={search}
        onChange={onSearchChange}
        className="max-w-xs"
        debounceDelay={300}
      />
    </div>
  );
};
