import React from 'react';
import Input from '@shared/components/form/input/InputField';

interface IndexHistoriesFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export const IndexHistoriesFilter: React.FC<IndexHistoriesFilterProps> = ({
  search,
  onSearchChange,
}) => {
  return (
    <div className="mb-4">
      <Input
        placeholder="Search index histories..."
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
        className="max-w-md"
      />
    </div>
  );
};
