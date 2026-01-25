import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useInvestments } from './hooks/useInvestments';
import { InvestmentSchemaType } from './schema/investmentSchema';
import { InvestmentForm } from './components/InvestmentForm';
import { useGetInvestmentByIdQuery } from './api/investmentApi';
import ComponentCard from '@shared/components/common/ComponentCard';
import Loading from '@shared/components/common/Loading';
import { typographyClasses } from '@shared/utils/typographyUtils';

const EditInvestment: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: investment, isLoading: isFetching } = useGetInvestmentByIdQuery(id!, { skip: !id });
    const { handleUpdate, isUpdating } = useInvestments();

    const handleSubmit = async (data: InvestmentSchemaType) => {
        if (!id) return;
        const result = await handleUpdate({ id, ...data } as any);
        if (result) {
            navigate('/admin/investments');
        }
    };

    if (isFetching) {
        return <Loading />;
    }

    return (
        <ComponentCard>
            <h2 className={`${typographyClasses.heading.h2} ${typographyClasses.colors.text.primary}`}>Edit Investment</h2>
            <InvestmentForm investment={investment?.data} onSubmit={handleSubmit} isLoading={isUpdating} />
        </ComponentCard>
    );
};

export default EditInvestment;
