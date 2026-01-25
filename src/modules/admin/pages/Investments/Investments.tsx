import React, { useState } from 'react';
import { useGetInvestmentsQuery } from './api/investmentApi';
import { InvestmentsTable } from './components/InvestmentsTable';
import Button from '@shared/components/ui/button/Button';
import { PlusIcon } from '@shared/icons';
import { Investment } from './types/investment';
import ComponentCard from '@/shared/components/common/ComponentCard';
import { useInvestments } from './hooks/useInvestments';
import { CanAccess } from '@/shared/components/common/CanAccess';
import { PERMISSIONS } from '@/shared/constants/permissions';
import { useNavigate } from 'react-router';
import { InvestmentsFilter } from './components/InvestmentsFilter';
import { typographyClasses } from '@shared/utils/typographyUtils';
import { Pagination } from '@/shared/components/common/Pagination';

const Investments: React.FC = () => {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const { data, isLoading } = useGetInvestmentsQuery({ search, page, limit: 10 });
    const { handleDelete } = useInvestments();
    const navigate = useNavigate();

    const handleEdit = (investment: Investment) => {
        navigate(`edit/${investment.id}`);
    };

    const handleDeleteInvestment = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this Investment?')) {
            await handleDelete(id);
        }
    };

    const header = (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5">
            <div>
                <h2 className={`${typographyClasses.heading.h2} ${typographyClasses.colors.text.primary}`}>
                  Investments
                </h2>
                <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted}`}>
                    Manage Investments
                </p>
            </div>
            <div className="flex gap-2">
              <CanAccess any={[PERMISSIONS.INVESTMENTS.CREATE]}>
                <Button onClick={() => navigate('create')} startIcon={<PlusIcon fontSize={20} className="text-white" />}>
                  Add Investment
                </Button>
              </CanAccess>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <ComponentCard header={header} headerPosition="outside">
                <InvestmentsFilter search={search} onSearchChange={setSearch} />
                <InvestmentsTable
                    key={data?.metaData.total}
                    investments={data?.data || []}
                    isLoading={isLoading}
                    onEdit={handleEdit}
                    onDelete={handleDeleteInvestment}
                />
                {data?.metaData && (
                    <Pagination meta={data.metaData} onPageChange={setPage} />
                )}
            </ComponentCard>
        </div>
    );
};

export default Investments;
