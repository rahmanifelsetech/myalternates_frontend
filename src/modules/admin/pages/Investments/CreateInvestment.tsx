import React from 'react';
import { useNavigate } from 'react-router';
import { useInvestments } from './hooks/useInvestments';
import { InvestmentSchemaType } from './schema/investmentSchema';
import { InvestmentForm } from './components/InvestmentForm';
import ComponentCard from '@shared/components/common/ComponentCard';
import { typographyClasses } from '@shared/utils/typographyUtils';

const CreateInvestment: React.FC = () => {
    const navigate = useNavigate();
    const { handleCreate, isCreating } = useInvestments();

    const handleSubmit = async (data: InvestmentSchemaType) => {
        const result = await handleCreate(data as any);
        if (result) {
            navigate('/admin/investments');
        }
    };

    return (
        <ComponentCard>
            <h2 className={`${typographyClasses.heading.h2} ${typographyClasses.colors.text.primary}`}>Create Investment</h2>
            <InvestmentForm onSubmit={handleSubmit} isLoading={isCreating} />
        </ComponentCard>
    );
};

export default CreateInvestment;
