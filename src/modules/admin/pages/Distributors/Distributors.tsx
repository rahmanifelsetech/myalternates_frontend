import React, { useState } from 'react';
import { useGetDistributorsQuery } from './api/distributorApi';
import { DistributorsTable } from './components/DistributorsTable';
import Button from '@shared/components/ui/button/Button';
import { PlusIcon } from '@shared/icons';
import { Distributor } from './types/distributor';
import ComponentCard from '@/shared/components/common/ComponentCard';
import { useDistributors } from './hooks/useDistributors';
import { CanAccess } from '@/shared/components/common/CanAccess';
import { PERMISSIONS } from '@/shared/constants/permissions';
import { useNavigate } from 'react-router';
import { DistributorsFilter } from './components/DistributorsFilter';
import { typographyClasses } from '@shared/utils/typographyUtils';
import { Pagination } from '@/shared/components/common/Pagination';

const Distributors: React.FC = () => {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const { data, isLoading } = useGetDistributorsQuery({ search, page, limit: 10 });
    const { handleDelete } = useDistributors();
    const navigate = useNavigate();

    const handleEdit = (distributor: Distributor) => {
        navigate(`edit/${distributor.id}`);
    };

    const handleDeleteDistributor = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this Distributor?')) {
            await handleDelete(id);
        }
    };

    const header = (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5">
            <div>
                <h2 className={`${typographyClasses.heading.h2} ${typographyClasses.colors.text.primary}`}>
                  Distributors
                </h2>
                <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted}`}>
                    Manage Distributors
                </p>
            </div>
            <div className="flex gap-2">
              <CanAccess any={[PERMISSIONS.DISTRIBUTORS.CREATE]}>
                <Button onClick={() => navigate('create')} startIcon={<PlusIcon fontSize={20} className="text-white" />}>
                  Add Distributor
                </Button>
              </CanAccess>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <ComponentCard header={header} headerPosition="outside">
                <DistributorsFilter search={search} onSearchChange={setSearch} />
                <DistributorsTable
                    key={data?.metaData.total}
                    distributors={data?.data || []}
                    isLoading={isLoading}
                    onEdit={handleEdit}
                    onDelete={handleDeleteDistributor}
                />
                {data?.metaData && (
                    <Pagination meta={data.metaData} onPageChange={setPage} />
                )}
            </ComponentCard>
        </div>
    );
};

export default Distributors;
