import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useInvestors } from './hooks/useInvestors';
import { InvestorSchemaType } from './schema/investorSchema';
import { InvestorForm } from './components/forms/InvestorForm';
import { useGetInvestorByIdQuery } from './api/investorApi';
import ComponentCard from '@shared/components/common/ComponentCard';
import Loading from '@shared/components/common/Loading';
import { typographyClasses } from '@shared/utils/typographyUtils';

const EditInvestor: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: investor, isLoading: isFetching } = useGetInvestorByIdQuery(id!, { skip: !id });
    const { handleUpdate, isUpdating } = useInvestors();

    const handleSubmit = async (data: InvestorSchemaType) => {
        if (!id) return;
        const result = await handleUpdate({ id, ...data } as any);
        if (result) {
            navigate('/admin/investors');
        }
    };

    if (isFetching) {
        return <Loading />;
    }

    return (
        <ComponentCard>
            <h2 className={`${typographyClasses.heading.h2} ${typographyClasses.colors.text.primary}`}>Edit Investor</h2>
            {investor?.data && <InvestorForm key={investor.data.id} investor={investor.data} onSubmit={handleSubmit} isLoading={isUpdating} />}
        </ComponentCard>
    );
};

export default EditInvestor;
