import React from 'react';
import ComponentCard from '@/shared/components/common/ComponentCard';
import { UploadCenter } from './components/UploadCenter';

const Uploads: React.FC = () => {
  const header = (
    <div className="mb-5">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        Data Upload Center
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