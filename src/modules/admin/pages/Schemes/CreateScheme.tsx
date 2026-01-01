import React from 'react';
import ComponentCard from '@/shared/components/common/ComponentCard';
import { SchemeForm } from './components/SchemeForm';
import { useSchemes } from './hooks/useSchemes';
import { useNavigate } from 'react-router';
import { SchemeSchemaType } from './schema/schemeSchema';

const CreateScheme: React.FC = () => {
  const { handleCreate, isCreating } = useSchemes();
  const navigate = useNavigate();

  const handleSubmit = async (data: SchemeSchemaType) => {
    // Map schema type to payload if needed (e.g. date formatting)
    // For now, schema matches payload largely
    await handleCreate(data as any);
    navigate('../schemes');
  };

  const header = (
    <div className="mb-5">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        Create New Scheme
      </h2>
    </div>
  );

  return (
    <ComponentCard header={header} headerPosition="outside">
      <SchemeForm
        onSubmit={handleSubmit}
        isLoading={isCreating}
        onCancel={() => navigate('../schemes')}
      />
    </ComponentCard>
  );
};

export default CreateScheme;