import React from 'react';
import { useNavigate } from 'react-router';
import { useInvestors } from './hooks/useInvestors';
import { InvestorSchemaType } from './schema/investorSchema';
import { InvestorForm } from './components/forms/InvestorForm';
import ComponentCard from '@shared/components/common/ComponentCard';
import { typographyClasses } from '@shared/utils/typographyUtils';

const CreateInvestor: React.FC = () => {
    const navigate = useNavigate();
    const { handleCreate, isCreating } = useInvestors();

    const handleSubmit = async (data: InvestorSchemaType) => {
        const result = await handleCreate(data as any);
        if (result) {
            navigate('/admin/investors');
        }
    };

    return (
        <ComponentCard>
            <h2 className={`${typographyClasses.heading.h2} ${typographyClasses.colors.text.primary}`}>Create Investor</h2>
            <InvestorForm onSubmit={handleSubmit} isLoading={isCreating} />
        </ComponentCard>
    );
};

export default CreateInvestor;
