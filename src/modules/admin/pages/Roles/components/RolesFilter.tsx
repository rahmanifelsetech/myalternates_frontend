import React from 'react';
import Input from '@shared/components/form/input/InputField';

interface RolesFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export const RolesFilter: React.FC<RolesFilterProps> = ({ search, onSearchChange }) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center mb-4">
      <div className="w-full sm:w-1/3">
        <Input
          type="text"
          placeholder="Search roles..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};
