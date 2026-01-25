import React, { useState } from 'react';
import { useGetInvestorsQuery } from './api/investorApi';
import { InvestorsTable } from './components/InvestorsTable';
import Button from '@shared/components/ui/button/Button';
import { PlusIcon } from '@shared/icons';
import { Investor } from './types/investor';
import ComponentCard from '@/shared/components/common/ComponentCard';
import { useInvestors } from './hooks/useInvestors';
import { CanAccess } from '@/shared/components/common/CanAccess';
import { PERMISSIONS } from '@/shared/constants/permissions';
import { useNavigate } from 'react-router';
import { InvestorsFilter } from './components/InvestorsFilter';
import { typographyClasses } from '@shared/utils/typographyUtils';
import { Pagination } from '@/shared/components/common/Pagination';

const Investors: React.FC = () => {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const { data, isLoading } = useGetInvestorsQuery({ search, page, limit: 10 });
    const { handleDelete } = useInvestors();
    const navigate = useNavigate();

    const handleEdit = (investor: Investor) => {
        navigate(`edit/${investor.id}`);
    };

    const handleDeleteInvestor = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this Investor?')) {
            await handleDelete(id);
        }
    };

    const header = (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5">
            <div>
                <h2 className={`${typographyClasses.heading.h2} ${typographyClasses.colors.text.primary}`}>
                  Investors
                </h2>
                <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted}`}>
                    Manage Investors
                </p>
            </div>
            <div className="flex gap-2">
              <CanAccess any={[PERMISSIONS.INVESTORS.CREATE]}>
                <Button onClick={() => navigate('create')} startIcon={<PlusIcon fontSize={20} className="text-white" />}>
                  Add Investor
                </Button>
              </CanAccess>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <ComponentCard header={header} headerPosition="outside">
                <InvestorsFilter search={search} onSearchChange={setSearch} />
                <InvestorsTable
                    key={data?.metaData.total}
                    investors={data?.data || []}
                    isLoading={isLoading}
                    onEdit={handleEdit}
                    onDelete={handleDeleteInvestor}
                />
                {data?.metaData && (
                    <Pagination meta={data.metaData} onPageChange={setPage} />
                )}
            </ComponentCard>
        </div>
    );
};

export default Investors;