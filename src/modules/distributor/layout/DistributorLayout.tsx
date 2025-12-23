import React from 'react';
import AppLayout from '@shared/layout/AppLayout';
import { distributorNavigation } from '../config/navigation';

const DistributorLayout: React.FC = () => {
  return <AppLayout menuItems={distributorNavigation} />;
};

export default DistributorLayout;
