import React from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useHolders } from './hooks/useHolders';
import { HolderSchemaType } from './schema/holderSchema';
import { HolderForm } from './components/HolderForm';
import ComponentCard from '@shared/components/common/ComponentCard';
import { typographyClasses } from '@shared/utils/typographyUtils';

const CreateHolder: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const investorId = searchParams.get('investorId') || undefined;

    const { handleCreate, isCreating } = useHolders();

    const handleSubmit = async (data: HolderSchemaType) => {
        const result = await handleCreate(data as any);
        if (result) {
            navigate('/admin/holders');
        }
    };

    return (
        <ComponentCard>
            <h2 className={`${typographyClasses.heading.h2} ${typographyClasses.colors.text.primary}`}>Create Holder</h2>
            <HolderForm onSubmit={handleSubmit} isLoading={isCreating} investorId={investorId} />
        </ComponentCard>
    );
};

export default CreateHolder;
