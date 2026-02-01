import React from 'react';
import { useNavigate } from 'react-router';
import { DistributorForm } from './components/DistributorForm';
import { DistributorSchemaType } from './schema/distributorSchema';
import { typographyClasses } from '@shared/utils/typographyUtils';
import { useDistributors } from './hooks/useDistributors';

const CreateDistributor: React.FC = () => {
    const navigate = useNavigate();
    const { handleCreate, isCreating } = useDistributors();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className={`${typographyClasses.heading.h2} ${typographyClasses.colors.text.primary}`}>
                        Create Distributor
                    </h2>
                    <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted}`}>
                        Add a new distributor to the system
                    </p>
                </div>
            </div>
            <DistributorForm onSubmit={handleCreate} onCancel={() => navigate('/admin/distributors')} isLoading={isCreating} />
        </div>
    );
};

export default CreateDistributor;
