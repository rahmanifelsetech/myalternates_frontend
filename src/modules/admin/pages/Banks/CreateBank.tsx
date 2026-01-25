import React from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useBanks } from './hooks/useBanks';
import { BankSchemaType } from './schema/bankSchema';
import { BankForm } from './components/BankForm';
import ComponentCard from '@shared/components/common/ComponentCard';
import { typographyClasses } from '@shared/utils/typographyUtils';

const CreateBank: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const investorId = searchParams.get('investorId') || undefined;

    const { handleCreate, isCreating } = useBanks();

    const handleSubmit = async (data: BankSchemaType) => {
        const result = await handleCreate(data as any);
        if (result) {
            navigate('/admin/banks');
        }
    };

    return (
        <ComponentCard>
            <h2 className={`${typographyClasses.heading.h2} ${typographyClasses.colors.text.primary}`}>Create Bank</h2>
            <BankForm onSubmit={handleSubmit} isLoading={isCreating} investorId={investorId} />
        </ComponentCard>
    );
};

export default CreateBank;