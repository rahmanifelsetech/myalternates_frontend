import React, { useState } from 'react';
import { useGetPermissionsQuery } from './api/permissionApi';
import { PermissionsTable } from './components/PermissionsTable';
import { PermissionsFilter } from './components/PermissionsFilter';
import ComponentCard from '@/shared/components/common/ComponentCard';

import { Pagination } from '@shared/components/common/Pagination';

const Permissions: React.FC = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetPermissionsQuery({ search, page, limit: 10 });

  const header = (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5">
      <div>
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Permissions
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          System permissions - read-only
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <ComponentCard header={header} headerPosition="outside">
        <PermissionsFilter search={search} onSearchChange={setSearch} />
        <PermissionsTable
          permissions={data?.data || []}
          isLoading={isLoading}
        />
        {data?.metaData && (
          <Pagination meta={data.metaData} onPageChange={setPage} />
        )}
      </ComponentCard>
    </div>
  );
};

export default Permissions;
