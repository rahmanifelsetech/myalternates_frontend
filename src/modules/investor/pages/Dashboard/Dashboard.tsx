import React, { useMemo, useState } from 'react';
import { useAppSelector } from '@/shared/hooks/useRedux';
import MetricsGrid from '@/shared/components/common/MetricsGrid';
import ComponentCard from '@/shared/components/common/ComponentCard';
import { UserDetails } from '@/modules/open/auth/store/authSlice';
import { DollarLineIcon, GrowthArrowIcon, ModIcon, WalletIcon } from '@/shared/icons';
import HeaderWithAccountSelector from '../../components/HeaderWithAccountSelector';


const MfPortfolio: React.FC = () => {

  const InvestorDetails = useAppSelector((state) => state.auth).details as UserDetails;

//   console.log('InvestorDetails in Dashboard:', InvestorDetails);

  const firstRowMetrics = useMemo(() => {
    return [
      {
        label: 'Total Investment Value',
        value: InvestorDetails?.totalInvestmentValue ? `₹${InvestorDetails.totalInvestmentValue.toLocaleString()}` : 'N/A',
        icon: <DollarLineIcon className="h-6 w-6 text-white" />,
        iconColor: 'text-green-500',
      },
      {
        label: 'Total Current Value',
        value: InvestorDetails?.totalCurrentValue ? `₹${InvestorDetails.totalCurrentValue.toLocaleString()}` : 'N/A',
        icon: <GrowthArrowIcon className="h-6 w-6 text-white" />,
        iconColor: 'text-blue-500',
      },
      {
        label: 'Total Returns',
        value: InvestorDetails?.totalReturns ? `₹${InvestorDetails.totalReturns.toLocaleString()}` : 'N/A',
        icon: InvestorDetails?.totalReturns >= 0 ? 'ArrowUpCircleIcon' : 'ArrowDownCircleIcon',
        iconColor: InvestorDetails?.totalReturns >= 0 ? 'text-green-500' : 'text-red-500',
      },
      {
        label: 'Total Pending Capital',
        value: InvestorDetails?.totalPendingCapital ? `₹${InvestorDetails.totalPendingCapital.toLocaleString()}` : 'N/A',
        icon: <WalletIcon className="h-6 w-6" />,
        iconColor: 'text-yellow-500',
      },
    ];
  }, [InvestorDetails]);

  const secondRowMetrics = useMemo(() => {
    if (!InvestorDetails) return [];

    return [
      {
        label: 'Capital Commitment',
        value: InvestorDetails.capitalCommitment ? `₹${InvestorDetails.capitalCommitment.toLocaleString()}` : 'N/A',
        icon: <ModIcon className="h-6 w-6" />,
        iconColor: 'text-purple-500',
      },
      {
        label: 'Pending Capital',
        value: InvestorDetails.pendingCapital ? `₹${InvestorDetails.pendingCapital.toLocaleString()}` : 'N/A',
        icon: <WalletIcon className="h-6 w-6" />,
        iconColor: 'text-yellow-500',
      },
      {
        label: 'Net Investment',
        value: InvestorDetails.netInvestment ? `₹${InvestorDetails.netInvestment.toLocaleString()}` : 'N/A',
        icon: <DollarLineIcon className="h-6 w-6 text-white" />,
        iconColor: 'text-green-500',
      },
      {
        label: 'Current Value',
        value: InvestorDetails.currentValue ? `₹${InvestorDetails.currentValue.toLocaleString()}` : 'N/A',
        icon: <GrowthArrowIcon className="h-6 w-6 text-white" />,
        iconColor: 'text-blue-500',
      },
    ];
  }, [InvestorDetails]);

  const handleAccountChange = (accountId: string) => {
    console.log('Selected account ID:', accountId);
  }
  
  return (
    <>
        <HeaderWithAccountSelector pageTitle="Dashboard" pageDesc="Overview of your investments and performance" accounts={InvestorDetails.investor?.investmentAccounts} onChange={handleAccountChange} />
        <div className="space-y-6">
            <div className="space-y-4">
                <MetricsGrid metrics={firstRowMetrics} columns={4} />
                <ComponentCard title="Investment Summary">
                    <MetricsGrid metrics={secondRowMetrics} columns={4} labelPosition="top" contentPosition="center" />
                </ComponentCard>
            </div>
        </div>
    </>
  );
};

export default MfPortfolio;
