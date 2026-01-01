import React from 'react';
import { useNavigate } from 'react-router';
import { useAmcs } from './hooks/useAmcs';
import { AmcSchemaType } from './schema/amcSchema';
import { AmcForm } from './components/AmcForm';
import ComponentCard from '@shared/components/common/ComponentCard';

const CreateAmc: React.FC = () => {
    const navigate = useNavigate();
    const { handleCreate, isCreating } = useAmcs();

    const handleSubmit = async (data: AmcSchemaType) => {
        const result = await handleCreate(data);
        if (result) {
            navigate('/admin/amcs');
        }
    };

    return (
        <ComponentCard>
            <h2 className="text-xl font-bold mb-4">Create AMC</h2>
            <AmcForm onSubmit={handleSubmit} isLoading={isCreating} />
        </ComponentCard>
    );
};

export default CreateAmc;