import React from 'react';
import { typographyClasses } from '@shared/utils/typographyUtils';
import { pmsInvestmentAccount, formatCurrency, formatPercent } from '../constants/pmsDummyData';

// First Row Card Component
interface StatCardProps {
  label: string;
  value: string | number;
  valueColor?: 'primary' | 'success' | 'error' | 'warning';
  prefix?: string;
  suffix?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, valueColor = 'primary', prefix = '', suffix = '' }) => {
  const getColorClass = () => {
    switch (valueColor) {
      case 'success':
        return 'text-success-600 dark:text-success-400';
      case 'error':
        return 'text-error-600 dark:text-error-400';
      case 'warning':
        return 'text-warning-600 dark:text-warning-400';
      default:
        return 'text-gray-900 dark:text-white';
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted} mb-1`}>
        {label}
      </p>
      <p className={`${typographyClasses.heading.h4} ${getColorClass()}`}>
        {prefix}{typeof value === 'number' ? value.toLocaleString('en-IN') : value}{suffix}
      </p>
    </div>
  );
};

// Second Row Summary Card Component
interface SummaryCardProps {
  label: string;
  value: string | number;
  valueColor?: 'primary' | 'success' | 'error' | 'warning';
}

const SummaryCard: React.FC<SummaryCardProps> = ({ label, value, valueColor = 'primary' }) => {
  const getColorClass = () => {
    switch (valueColor) {
      case 'success':
        return 'text-success-600 dark:text-success-400';
      case 'error':
        return 'text-error-600 dark:text-error-400';
      case 'warning':
        return 'text-warning-600 dark:text-warning-400';
      default:
        return 'text-gray-900 dark:text-white';
    }
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
      <p className={`${typographyClasses.body.small} ${typographyClasses.colors.text.muted} mb-1`}>
        {label}
      </p>
      <p className={`${typographyClasses.heading.h4} ${getColorClass()}`}>
        {typeof value === 'number' ? value.toLocaleString('en-IN') : value}
      </p>
    </div>
  );
};

export const PmsSummaryCards: React.FC = () => {
  const { 
    pmsCurrentValuation, 
    pmsNetInvestment, 
    pmsDayChange, 
    pmsDayChangePercent, 
    pmsXirr,
    pmsTotalInflows,
    pmsTotalOutflows,
    noOfPmsAmcs,
    noOfPmsStrategies 
  } = pmsInvestmentAccount;

  return (
    <div className="space-y-4">
      {/* First Row: Current Value, Net Investment, Day Change, XIRR */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Current Value"
          value={formatCurrency(pmsCurrentValuation)}
          valueColor="primary"
        />
        <StatCard
          label="Net Investment"
          value={formatCurrency(pmsNetInvestment)}
          valueColor="primary"
        />
        <StatCard
          label="Day Change"
          value={`${formatCurrency(pmsDayChange)} (${formatPercent(pmsDayChangePercent)})`}
          valueColor={pmsDayChange >= 0 ? 'success' : 'error'}
        />
        <StatCard
          label="XIRR"
          value={`${pmsXirr.toFixed(2)}%`}
          valueColor="success"
        />
      </div>

      {/* Second Row: Total Inflow, Total Outflow, No. of AMC, No. of Strategies */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          label="Total Inflow"
          value={formatCurrency(pmsTotalInflows)}
        />
        <SummaryCard
          label="Total Outflow"
          value={formatCurrency(pmsTotalOutflows)}
        />
        <SummaryCard
          label="No. of AMC"
          value={noOfPmsAmcs}
        />
        <SummaryCard
          label="No. of Strategies"
          value={noOfPmsStrategies}
        />
      </div>
    </div>
  );
};

export default PmsSummaryCards;
