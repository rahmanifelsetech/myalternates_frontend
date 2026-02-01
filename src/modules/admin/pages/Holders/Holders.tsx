import React, { useState } from 'react';
import { useGetHoldersQuery } from './api/holderApi';
import { HoldersTable } from './components/HoldersTable';
import Button from '@shared/components/ui/button/Button';
import { PlusIcon } from '@shared/icons';
import { Holder } from './types/holder';
import ComponentCard from '@/shared/components/common/ComponentCard';
import { useHolders } from './hooks/useHolders';
import { CanAccess } from '@/shared/components/common/CanAccess';
import { PERMISSIONS } from '@/shared/constants/permissions';
import { useNavigate, useSearchParams } from 'react-router';
import { HoldersFilter } from './components/HoldersFilter';
import { typographyClasses } from '@shared/utils/typographyUtils';
import { Pagination } from '@/shared/components/common/Pagination';

const Holders: React.FC = () => {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [searchParams] = useSearchParams();
    const investorId = searchParams.get('investorId') || undefined;
    
    const { data, isLoading } = useGetHoldersQuery({ search, page, limit: 10, investorId });
    const { handleDelete } = useHolders();
    const navigate = useNavigate();

    const handleEdit = (holder: Holder) => {
        navigate(`edit/${holder.id}`);
    };

    const handleDeleteHolder = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this Holder?')) {
            await handleDelete(id);
        }
    };

    const header = (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5">
            <div>
                <h2 className={`${typographyClasses.heading.h2} ${typographyClasses.colors.text.primary}`}>
                  Holders
                </h2>
                <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted}`}>
                    Manage Holders
                </p>
            </div>
            {/* <div className="flex gap-2">
              <CanAccess any={[PERMISSIONS.HOLDERS.CREATE]}>
                <Button 
                    onClick={() => navigate(investorId ? `create?investorId=${investorId}` : 'create')} 
                    startIcon={<PlusIcon fontSize={20} className="text-white" />}
                >
                  Add Holder
                </Button>
              </CanAccess>
            </div> */}
        </div>
    );

    return (
        <div className="space-y-6">
            <ComponentCard header={header} headerPosition="outside">
                <HoldersFilter search={search} onSearchChange={setSearch} />
                <HoldersTable
                    key={data?.metaData.total}
                    holders={data?.data || []}
                    isLoading={isLoading}
                    onEdit={handleEdit}
                    onDelete={handleDeleteHolder}
                />
                {data?.metaData && (
                    <Pagination meta={data.metaData} onPageChange={setPage} />
                )}
            </ComponentCard>
        </div>
    );
};

export default Holders;
