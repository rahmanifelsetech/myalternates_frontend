import React from 'react';
import ComponentCard from '@/shared/components/common/ComponentCard';
import { SchemeForm } from './components/SchemeForm';
import { useSchemes } from './hooks/useSchemes';
import { useNavigate } from 'react-router';

import { SchemeSchemaType } from './schema/schemeSchema';
import { typographyClasses } from '@shared/utils/typographyUtils';


const CreateScheme: React.FC = () => {
  const { handleCreate, isCreating } = useSchemes();
  const navigate = useNavigate();

  const handleSubmit = async (data: SchemeSchemaType) => {
    console.log('Submitting scheme data:', data);
    await handleCreate(data as any);
    navigate('../schemes');
  };

  const header = (
    <div className="mb-5">
      <h2 className={`${typographyClasses.heading.h2} text-black dark:text-white`}>
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