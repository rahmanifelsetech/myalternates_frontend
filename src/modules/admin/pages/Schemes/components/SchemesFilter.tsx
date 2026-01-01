import React from 'react';
import Input from '@shared/components/form/input/InputField';

interface SchemesFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export const SchemesFilter: React.FC<SchemesFilterProps> = ({ search, onSearchChange }) => {
  return (
    <div className="p-4 border-b border-gray-200">
      <Input
        placeholder="Search Schemes..."
        value={search}
        onChange={e => onSearchChange(e.target.value)}
        className="max-w-xs"
      />
    </div>
  );
};