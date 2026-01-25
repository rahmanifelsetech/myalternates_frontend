import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useHolders } from './hooks/useHolders';
import { HolderSchemaType } from './schema/holderSchema';
import { HolderForm } from './components/HolderForm';
import { useGetHolderByIdQuery } from './api/holderApi';
import ComponentCard from '@shared/components/common/ComponentCard';
import Loading from '@shared/components/common/Loading';
import { typographyClasses } from '@shared/utils/typographyUtils';

const EditHolder: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: holder, isLoading: isFetching } = useGetHolderByIdQuery(id!, { skip: !id });
    const { handleUpdate, isUpdating } = useHolders();

    const handleSubmit = async (data: HolderSchemaType) => {
        if (!id) return;
        const result = await handleUpdate({ id, ...data } as any);
        if (result) {
            navigate('/admin/holders');
        }
    };

    if (isFetching) {
        return <Loading />;
    }

    return (
        <ComponentCard>
            <h2 className={`${typographyClasses.heading.h2} ${typographyClasses.colors.text.primary}`}>Edit Holder</h2>
            <HolderForm holder={holder?.data} onSubmit={handleSubmit} isLoading={isUpdating} />
        </ComponentCard>
    );
};

export default EditHolder;
