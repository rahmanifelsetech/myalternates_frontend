import React, { useState } from 'react';
import { useGetSchemesQuery, usePopulateSchemesMutation } from './api/schemeApi';
import { Scheme } from './types/scheme';
import ComponentCard from '@/shared/components/common/ComponentCard';
import Button from '@shared/components/ui/button/Button';
import { PlusIcon } from '@shared/icons';
import FetchDataButton from '@/shared/components/common/FetchDataButton';
import { useNavigate } from 'react-router';
import { CanAccess } from '@/shared/components/common/CanAccess';
import { PERMISSIONS } from '@/shared/constants/permissions';
import { typographyClasses } from '@shared/utils/typographyUtils';
import { Pagination } from '@shared/components/common/Pagination';
import { SchemesTable } from './components/SchemesTable';
import { SchemesFilter } from './components/SchemesFilter';
import { useSchemes } from './hooks/useSchemes';

const SchemeList: React.FC = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  
  const { data, isLoading } = useGetSchemesQuery({ search, page, limit: 10 });
  const { handleDelete: deleteScheme } = useSchemes();

  const handleEdit = (scheme: Scheme) => {
    navigate(`edit/${scheme.id}`);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this scheme?')) {
      await deleteScheme(id);
    }
  };

  const header = (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5">
      <div>
        <h2 className={`${typographyClasses.heading.h2} ${typographyClasses.colors.text.primary}`}>
          Schemes
        </h2>
        <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted}`}>
          Manage investment schemes
        </p>
      </div>
      <div className="flex gap-2">
        {/* <CanAccess any={[PERMISSIONS.SCHEMES.POPULATE]}>
          <FetchDataButton
            mutationHook={usePopulateSchemesMutation}
            buttonText="Populate Schemes"
            successMessage="Schemes populated successfully!"
            errorMessage="Failed to populate schemes."
          />
        </CanAccess> */}
        <CanAccess any={[PERMISSIONS.SCHEMES.CREATE]}>
          <Button onClick={() => navigate('create')} startIcon={<PlusIcon fontSize={20} className="text-white" />}>
            Add Scheme
          </Button>
        </CanAccess>
      </div>
    </div>
  );

  return (
    <ComponentCard header={header} headerPosition="outside">
      <SchemesFilter search={search} onSearchChange={setSearch} />
      <div className="p-4">
        <SchemesTable
          schemes={data?.data || []}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        {data?.metaData && (
          <Pagination meta={data.metaData} onPageChange={setPage} />
        )}
      </div>
    </ComponentCard>
  );
};

export default SchemeList;