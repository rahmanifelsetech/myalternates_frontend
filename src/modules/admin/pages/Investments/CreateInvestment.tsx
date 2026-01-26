import React from 'react';
import { InvestmentStepper } from './components/InvestmentStepper';
import ComponentCard from '@shared/components/common/ComponentCard';
import { typographyClasses } from '@shared/utils/typographyUtils';

const CreateInvestment: React.FC = () => {
    return (
        <ComponentCard>
            <h2 className={`${typographyClasses.heading.h2} ${typographyClasses.colors.text.primary}`}>Create Investment</h2>
            <InvestmentStepper />
        </ComponentCard>
    );
};

export default CreateInvestment;
