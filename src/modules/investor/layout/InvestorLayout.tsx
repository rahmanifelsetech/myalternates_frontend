import React from 'react';
import AppLayout from '@shared/layout/AppLayout';
import { investorNavigation } from '../config/navigation';

const InvestorLayout: React.FC = () => {
  return <AppLayout menuItems={investorNavigation} />;
};

export default InvestorLayout;
