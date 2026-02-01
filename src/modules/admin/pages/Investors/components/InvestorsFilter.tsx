import React, { useState } from 'react';
import Input from '@shared/components/form/input/InputField';
import { CollapsibleFilter, ActiveFilter } from '@shared/components/common/CollapsibleFilter';
import { InvestorFilters } from '../types/investor';
import Select from '@/shared/components/form/select/ReactSelect';

interface InvestorsFilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (filters: InvestorFilters) => void;
}

export const InvestorsFilter: React.FC<InvestorsFilterProps> = ({ search, onSearchChange, onFilterChange }) => {
  const [filters, setFilters] = useState<InvestorFilters>({});
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  const handleApply = () => {
    onFilterChange(filters);
    setIsFilterApplied(Object.keys(filters).length > 0);
  };


  const handleClear = () => {
    const clearedFilters = {};
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const handleInputChange = (field: keyof InvestorFilters, value: any) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleRemoveFilter = (field: keyof InvestorFilters) => {
    const newFilters = { ...filters };
    delete newFilters[field];
    setFilters(newFilters);
    onFilterChange(newFilters);
  };


  const residentialStatusOptions = [
    { label: 'Resident Individual', value: 'Resident Individual' },
    { label: 'NRI', value: 'NRI' },
    // Add more options as needed based on your application's data
  ];

  const statusOptions = [
    { label: 'Active', value: 'true' },
    { label: 'Inactive', value: 'false' },
  ];

  const activeFilters: ActiveFilter[] = [];

  if (filters.pan) {
    activeFilters.push({
      id: 'pan',
      label: `PAN: ${filters.pan}`,
      onRemove: () => handleRemoveFilter('pan'),
    });
  }

  if (filters.myaltCode) {
    activeFilters.push({
      id: 'myaltCode',
      label: `MyAlt Code: ${filters.myaltCode}`,
      onRemove: () => handleRemoveFilter('myaltCode'),
    });
  }

  if (filters.email) {
    activeFilters.push({
      id: 'email',
      label: `Email: ${filters.email}`,
      onRemove: () => handleRemoveFilter('email'),
    });
  }

  if (filters.mobile) {
    activeFilters.push({
      id: 'mobile',
      label: `Mobile: ${filters.mobile}`,
      onRemove: () => handleRemoveFilter('mobile'),
    });
  }

  if (filters.residentialStatus) {
    activeFilters.push({
      id: 'residentialStatus',
      label: `Residential Status: ${filters.residentialStatus}`,
      onRemove: () => handleRemoveFilter('residentialStatus'),
    });
  }

  if (filters.isActive !== undefined) {
    activeFilters.push({
      id: 'isActive',
      label: `Status: ${filters.isActive ? 'Active' : 'Inactive'}`,
      onRemove: () => {
         const newFilters = { ...filters };
         delete newFilters.isActive;
         setFilters(newFilters);
         onFilterChange(newFilters);
      },
    });
  }


  return (
    <CollapsibleFilter
      onApply={handleApply}
      onClear={handleClear}
      isFilterApplied={isFilterApplied}
      activeFilters={activeFilters}
      searchElement={
        <Input
          placeholder="Search Investors..."
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          className="max-w-xs"
        />
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Input
          placeholder="PAN"
          value={filters.pan || ''}
          onChange={e => handleInputChange('pan', e.target.value)}
        />
        <Input
          placeholder="MyAlt Code"
          value={filters.myaltCode || ''}
          onChange={e => handleInputChange('myaltCode', e.target.value)}
        />
        <Input
          placeholder="Email"
          value={filters.email || ''}
          onChange={e => handleInputChange('email', e.target.value)}
        />
        <Input
          placeholder="Mobile"
          value={filters.mobile || ''}
          onChange={e => handleInputChange('mobile', e.target.value)}
        />
         <Select
          placeholder="Residential Status"
          options={residentialStatusOptions}
          value={residentialStatusOptions.find(opt => opt.value === filters.residentialStatus)}
          onChange={(selectedOption: any) => handleInputChange('residentialStatus', selectedOption?.value)}
          isClearable
        />
        <Select
          placeholder="Status"
          options={statusOptions}
          value={statusOptions.find(opt => opt.value === String(filters.isActive))}
          onChange={(selectedOption: any) => handleInputChange('isActive', selectedOption?.value === 'true')}
          isClearable
        />
      </div>
    </CollapsibleFilter>
  );
};
