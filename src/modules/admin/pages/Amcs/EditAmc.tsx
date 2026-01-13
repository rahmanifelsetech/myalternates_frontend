import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useAmcs } from './hooks/useAmcs';
import { AmcSchemaType } from './schema/amcSchema';
import { AmcForm } from './components/AmcForm';
import { useGetAmcByIdQuery } from './api/amcApi';
import ComponentCard from '@shared/components/common/ComponentCard';
import Loading from '@shared/components/common/Loading';
import { typographyClasses } from '@shared/utils/typographyUtils';

const EditAmc: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: amc, isLoading: isFetching } = useGetAmcByIdQuery(id!, { skip: !id });
    const { handleUpdate, isUpdating } = useAmcs();

    const handleSubmit = async (data: AmcSchemaType) => {
        if (!id) return;
        console.log('Submitting data:', data);
        const result = await handleUpdate({ id, ...data });
        if (result) {
            navigate('/admin/amcs');
        }
    };

    if (isFetching) {
        return <Loading />;
    }

    return (
        <ComponentCard>
            <h2 className={`${typographyClasses.heading.h2} ${typographyClasses.colors.text.primary}`}>Edit AMC</h2>
            <AmcForm amc={amc?.data} onSubmit={handleSubmit} isLoading={isUpdating} />
        </ComponentCard>
    );
};

export default EditAmc;