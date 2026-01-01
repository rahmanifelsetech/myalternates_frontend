import React from 'react';
import Input from '@shared/components/form/input/InputField';

interface AssetClassesFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export const AssetClassesFilter: React.FC<AssetClassesFilterProps> = ({
  search,
  onSearchChange,
}) => {
  return (
    <div className="mb-4">
      <Input
        placeholder="Search asset classes..."
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
        className="max-w-md"
      />
    </div>
  );
};