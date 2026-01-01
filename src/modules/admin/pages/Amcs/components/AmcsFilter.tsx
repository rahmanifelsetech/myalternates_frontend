import React from 'react';
import Input from '@shared/components/form/input/InputField';

interface AmcsFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export const AmcsFilter: React.FC<AmcsFilterProps> = ({ search, onSearchChange }) => {
  return (
    <div className="p-4 border-b border-gray-200">
      <Input
        placeholder="Search Amcs..."
        value={search}
        onChange={e => onSearchChange(e.target.value)}
        className="max-w-xs"
      />
    </div>
  );
};