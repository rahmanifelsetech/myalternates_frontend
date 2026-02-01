import React from 'react';
import { useNavigate, useParams } from 'react-router';
import { useGetDistributorByIdQuery } from './api/distributorApi';
import { DistributorForm } from './components/DistributorForm';
import { DistributorSchemaType } from './schema/distributorSchema';
import { typographyClasses } from '@shared/utils/typographyUtils';
import { useDistributors } from './hooks/useDistributors';

const EditDistributor: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: distributorResponse, isLoading: isFetching } = useGetDistributorByIdQuery(id || '', { skip: !id });
    const { handleUpdate, isUpdating } = useDistributors();

    const handleSubmit = async (data: DistributorSchemaType) => {
        if (!id) return;
        await handleUpdate(id, data);
    };

    if (isFetching) {
        return <div className="p-4 text-center">Loading distributor details...</div>;
    }

    if (!distributorResponse?.data) {
        return <div className="p-4 text-center text-error-500">Distributor not found</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className={`${typographyClasses.heading.h2} ${typographyClasses.colors.text.primary}`}>
                        Edit Distributor
                    </h2>
                    <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted}`}>
                        Update distributor details
                    </p>
                </div>
            </div>
            <DistributorForm 
                distributor={distributorResponse.data} 
                onSubmit={handleSubmit} 
                onCancel={() => navigate('/admin/distributors')} 
                isLoading={isUpdating} 
            />
        </div>
    );
};

export default EditDistributor;
