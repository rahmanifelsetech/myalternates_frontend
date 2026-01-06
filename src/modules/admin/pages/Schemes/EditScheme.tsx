import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useGetSchemeByIdQuery } from './api/schemeApi';
import { SchemeForm } from './components/SchemeForm';
import { Scheme } from './types/scheme';
import { useSchemes } from './hooks/useSchemes';
import ComponentCard from '@shared/components/common/ComponentCard';
import { SchemeSchemaType } from './schema/schemeSchema';
import ErrorPage from '@/shared/pages/ErrorPage';

const EditScheme: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetSchemeByIdQuery(id!, { skip: !id });
  const { handleUpdate } = useSchemes();

  const handleSubmit = async (data: SchemeSchemaType) => {
    const payload = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, value === null ? undefined : value])
    );
    await handleUpdate({ id: id!, ...payload });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <ErrorPage title='Scheme Not Found' description='Scheme not found.' />;
  }

  return (
    <ComponentCard>
      <SchemeForm
        scheme={data.data}
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
        isLoading={isLoading}
      />
    </ComponentCard>
  );
};

export default EditScheme;