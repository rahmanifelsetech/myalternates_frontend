import React from 'react';
import Input from '@shared/components/form/input/InputField';

interface FundManagersFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export const FundManagersFilter: React.FC<FundManagersFilterProps> = ({
  search,
  onSearchChange,
}) => {
  return (
    <div className="mb-4">
      <Input
        placeholder="Search fund managers..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-md"
      />
    </div>
  );
};