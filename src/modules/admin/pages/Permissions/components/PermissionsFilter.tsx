import React from 'react';
import Input from '@shared/components/form/input/InputField';

interface PermissionsFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export const PermissionsFilter: React.FC<PermissionsFilterProps> = ({ search, onSearchChange }) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center mb-4">
      <div className="w-full sm:w-1/3">
        <Input
          type="text"
          placeholder="Search permissions..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};
