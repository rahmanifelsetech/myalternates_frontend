import React, { useState } from 'react';
import { useGetBanksQuery } from './api/bankApi';
import { BanksTable } from './components/BanksTable';
import Button from '@shared/components/ui/button/Button';
import { PlusIcon } from '@shared/icons';
import { Bank } from './types/bank';
import ComponentCard from '@/shared/components/common/ComponentCard';
import { useBanks } from './hooks/useBanks';
import { CanAccess } from '@/shared/components/common/CanAccess';
import { PERMISSIONS } from '@/shared/constants/permissions';
import { useNavigate, useSearchParams } from 'react-router';
import { BanksFilter } from './components/BanksFilter';
import { typographyClasses } from '@shared/utils/typographyUtils';
import { Pagination } from '@/shared/components/common/Pagination';

const Banks: React.FC = () => {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [searchParams] = useSearchParams();
    const investorId = searchParams.get('investorId') || undefined;
    
    const { data, isLoading } = useGetBanksQuery({ search, page, limit: 10, investorId });
    const { handleDelete } = useBanks();
    const navigate = useNavigate();

    const handleEdit = (bank: Bank) => {
        navigate(`edit/${bank.id}`);
    };

    const handleDeleteBank = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this Bank?')) {
            await handleDelete(id);
        }
    };

    const header = (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5">
            <div>
                <h2 className={`${typographyClasses.heading.h2} ${typographyClasses.colors.text.primary}`}>
                  Banks
                </h2>
                <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted}`}>
                    Manage Banks
                </p>
            </div>
            <div className="flex gap-2">
              <CanAccess any={[PERMISSIONS.BANKS.CREATE]}>
                <Button 
                    onClick={() => navigate(investorId ? `create?investorId=${investorId}` : 'create')} 
                    startIcon={<PlusIcon fontSize={20} className="text-white" />}
                >
                  Add Bank
                </Button>
              </CanAccess>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <ComponentCard header={header} headerPosition="outside">
                <BanksFilter search={search} onSearchChange={setSearch} />
                <BanksTable
                    key={data?.metaData.total}
                    banks={data?.data || []}
                    isLoading={isLoading}
                    onEdit={handleEdit}
                    onDelete={handleDeleteBank}
                />
                {data?.metaData && (
                    <Pagination meta={data.metaData} onPageChange={setPage} />
                )}
            </ComponentCard>
        </div>
    );
};

export default Banks;