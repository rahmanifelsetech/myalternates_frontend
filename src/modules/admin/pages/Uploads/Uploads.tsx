import React from 'react';
import ComponentCard from '@/shared/components/common/ComponentCard';
import { typographyClasses } from '@shared/utils/typographyUtils';
import { UploadCenter } from './components/UploadCenter';

const Uploads: React.FC = () => {
  const header = (
    <div className="mb-5">
      <h2 className={`${typographyClasses.heading.h2} ${typographyClasses.colors.text.primary}`}>
        Data File Upload Queue
      </h2>
    </div>
  );

  return (
    <ComponentCard header={header} headerPosition="outside">
      <UploadCenter />
    </ComponentCard>
  );
};

export default Uploads;