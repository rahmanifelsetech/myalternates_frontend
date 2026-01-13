import React, { useState } from 'react';
import { useGetAmcsQuery } from './api/amcApi';
import { AmcsTable } from './components/AmcsTable';
import Button from '@shared/components/ui/button/Button';
import { PlusIcon } from '@shared/icons';
import { Amc } from './types/amc';
import ComponentCard from '@/shared/components/common/ComponentCard';
import { useAmcs } from './hooks/useAmcs';
import { CanAccess } from '@/shared/components/common/CanAccess';
import { PERMISSIONS } from '@/shared/constants/permissions';
import { useNavigate } from 'react-router';
import { AmcsFilter } from './components/AmcsFilter';
import { typographyClasses } from '@shared/utils/typographyUtils';
import FetchDataWithConfirm from '@/shared/components/common/FetchDataWithConfirm';
import { Pagination } from '@/shared/components/common/Pagination';

const Amcs: React.FC = () => {
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const { data, isLoading } = useGetAmcsQuery({ search, page, limit: 10 });
    const { handleDelete } = useAmcs();
    const navigate = useNavigate();

    const handleEdit = (amc: Amc) => {
        navigate(`edit/${amc.id}`);
    };

    const handleDeleteAmc = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this AMC?')) {
            await handleDelete(id);
        }
    };

    const header = (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-5">
            <div>
                <h2 className={`${typographyClasses.heading.h2} ${typographyClasses.colors.text.primary}`}>
                  AMCs
                </h2>
                <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted}`}>
                    Manage Asset Management Companies
                </p>
            </div>
            <div className="flex gap-2">
              {/* <CanAccess any={[PERMISSIONS.AMCS.POPULATE]}>
                <FetchDataWithConfirm
                  onConfirm={handlePopulate}
                  buttonText="Populate AMCs"
                  modalTitle="Confirm Populate"
                  modalDescription="Are you sure you want to populate AMCs? This will fetch data from an external API."
                  isLoading={isPopulating}
                />
              </CanAccess> */}
              <CanAccess any={[PERMISSIONS.AMCS.CREATE]}>
                <Button onClick={() => navigate('create')} startIcon={<PlusIcon fontSize={20} className="text-white" />}>
                  Add AMC
                </Button>
              </CanAccess>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <ComponentCard header={header} headerPosition="outside">
                <AmcsFilter search={search} onSearchChange={setSearch} />
                <AmcsTable
                    key={data?.metaData.total}
                    amcs={data?.data || []}
                    isLoading={isLoading}
                    onEdit={handleEdit}
                    onDelete={handleDeleteAmc}
                />
                {data?.metaData && (
                    <Pagination meta={data.metaData} onPageChange={setPage} />
                )}
            </ComponentCard>
        </div>
    );
};

export default Amcs;