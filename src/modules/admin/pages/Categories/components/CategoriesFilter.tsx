import React from 'react';
import Input from '@shared/components/form/input/InputField';

interface CategoriesFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export const CategoriesFilter: React.FC<CategoriesFilterProps> = ({
  search,
  onSearchChange,
}) => {
  return (
    <div className="mb-4">
      <Input
        placeholder="Search categories..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="max-w-md"
      />
    </div>
  );
};