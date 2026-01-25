import React from 'react';
import Input from '@shared/components/form/input/InputField';

interface BanksFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export const BanksFilter: React.FC<BanksFilterProps> = ({ search, onSearchChange }) => {
  return (
    <div className="p-4 border-b border-gray-200">
      <Input
        placeholder="Search Banks..."
        value={search}
        onChange={e => onSearchChange(e.target.value)}
        className="max-w-xs"
      />
    </div>
  );
};