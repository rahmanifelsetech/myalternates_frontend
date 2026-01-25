import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useBanks } from './hooks/useBanks';
import { BankSchemaType } from './schema/bankSchema';
import { BankForm } from './components/BankForm';
import { useGetBankByIdQuery } from './api/bankApi';
import ComponentCard from '@shared/components/common/ComponentCard';
import Loading from '@shared/components/common/Loading';
import { typographyClasses } from '@shared/utils/typographyUtils';

const EditBank: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: bank, isLoading: isFetching } = useGetBankByIdQuery(id!, { skip: !id });
    const { handleUpdate, isUpdating } = useBanks();

    const handleSubmit = async (data: BankSchemaType) => {
        if (!id) return;
        const result = await handleUpdate({ id, ...data } as any);
        if (result) {
            navigate('/admin/banks');
        }
    };

    if (isFetching) {
        return <Loading />;
    }

    return (
        <ComponentCard>
            <h2 className={`${typographyClasses.heading.h2} ${typographyClasses.colors.text.primary}`}>Edit Bank</h2>
            <BankForm bank={bank?.data} onSubmit={handleSubmit} isLoading={isUpdating} />
        </ComponentCard>
    );
};

export default EditBank;