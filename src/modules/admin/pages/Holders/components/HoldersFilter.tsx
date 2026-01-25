import React from 'react';
import Input from '@shared/components/form/input/InputField';

interface HoldersFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export const HoldersFilter: React.FC<HoldersFilterProps> = ({ search, onSearchChange }) => {
  return (
    <div className="p-4 border-b border-gray-200">
      <Input
        placeholder="Search Holders..."
        value={search}
        onChange={e => onSearchChange(e.target.value)}
        className="max-w-xs"
      />
    </div>
  );
};
