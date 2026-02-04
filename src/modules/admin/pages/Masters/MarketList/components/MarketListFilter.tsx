import React from 'react';
import DebouncedSearchInput from '@shared/components/form/input/DebouncedSearchInput';

interface MarketListFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export const MarketListFilter: React.FC<MarketListFilterProps> = ({
  search,
  onSearchChange,
}) => {
  return (
    <div className="p-4 border-b border-gray-200">
      <DebouncedSearchInput
        placeholder="Search by Company Name or ISIN Code..."
        value={search}
        onChange={onSearchChange}
        debounceDelay={300}
      />
    </div>
  );
};
