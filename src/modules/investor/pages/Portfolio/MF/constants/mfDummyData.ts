// MF Portfolio Dummy Data Constants

import { MFAccount, MFHolding, MFTransaction, MFValuation, MFPerformanceSummary, MFInvestmentAccount } from '../types';

// Format currency helper
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatPercent = (value: number): string => {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
};

// Investment Account API Response Structure
export const mfInvestmentAccount: MFInvestmentAccount = {
  mfCurrentValuation: 8750000,
  mfTotalInflows: 10000000,
  mfTotalOutflows: 1250000,
  mfNetInvestment: 8750000,
  mfDayChange: 65000,
  mfDayChangePercent: 0.74,
  mfXirr: 18.25,
  noOfFunds: 8,
  noOfCategories: 5,
};


// Dummy MF Valuations Data
export const mfValuations: MFValuation[] = [
  {
    id: 'val-mf-001',
    fundId: 'mf-001',
    date: '2026-02-07',
    value: 4390750,
    cost: 3800000,
    unrealizedGain: 590750,
    realizedGain: 50000,
    totalGain: 640750,
    returns: 16.86,
  },
  {
    id: 'val-mf-002',
    fundId: 'mf-001',
    date: '2026-01-31',
    value: 4320000,
    cost: 3750000,
    unrealizedGain: 570000,
    realizedGain: 50000,
    totalGain: 620000,
    returns: 16.53,
  },
];

// Performance Data by Index for MF
export const mfPerformanceDataByIndex = {
  NIFTY50: {
    periods: ['1D', '1M', '3M', '6M', '1Y', '3Y', '5Y', 'Since Inception'],
    indexPerformance: [0.35, 2.05, 6.15, 14.25, 21.35, 58.75, 98.45, 155.25],
    consolidatedPerformance: [0.42, 2.28, 6.95, 14.85, 23.20, 67.15, 108.45, 168.95],
  },
  SENSEX: {
    periods: ['1D', '1M', '3M', '6M', '1Y', '3Y', '5Y', 'Since Inception'],
    indexPerformance: [0.38, 2.12, 5.95, 13.85, 20.45, 56.25, 95.75, 152.30],
    consolidatedPerformance: [0.50, 2.35, 7.15, 15.25, 23.75, 68.85, 110.95, 170.50],
  },
  BSE500: {
    periods: ['1D', '1M', '3M', '6M', '1Y', '3Y', '5Y', 'Since Inception'],
    indexPerformance: [0.32, 1.85, 5.42, 12.68, 18.95, 52.35, 89.45, 145.68],
    consolidatedPerformance: [0.45, 2.15, 6.85, 14.25, 22.50, 65.42, 105.30, 165.75],
  },
};

export type MFIndexType = keyof typeof mfPerformanceDataByIndex;

// Category Breakdown Data for MF
export const mfCategoryBreakdown = [
  {
    id: 'large-cap',
    name: 'Large Cap',
    value: 50,
    percentage: 50,
    color: '#465fff',
  },
  {
    id: 'mid-cap',
    name: 'Mid Cap',
    value: 22,
    percentage: 22,
    color: '#fdb022',
  },
  {
    id: 'small-cap',
    name: 'Small Cap',
    value: 18,
    percentage: 18,
    color: '#fd853a',
  },
  {
    id: 'debt',
    name: 'Debt',
    value: 10,
    percentage: 10,
    color: '#32d583',
  },
];

// Asset Class Distribution for MF
export const mfAssetAllocationData = [
  {
    name: 'Equity',
    value: 80,
    percentage: 80,
  },
  {
    name: 'Debt',
    value: 15,
    percentage: 15,
  },
  {
    name: 'Cash',
    value: 5,
    percentage: 5,
  },
];

// Top 5 Holdings for MF
export const mfTop5Holdings = [
  {
    id: 'holding-mf-001',
    name: 'ICICI Prudential Bluechip Fund',
    value: 50.2,
    percentage: 50.2,
  },
  {
    id: 'holding-mf-002',
    name: 'Axis Focused 25 Fund',
    value: 22.6,
    percentage: 22.6,
  },
  {
    id: 'holding-mf-003',
    name: 'Kotak Balanced Advantage Fund',
    value: 16.4,
    percentage: 16.4,
  },
  {
    id: 'holding-mf-004',
    name: 'SBI Small Cap Fund',
    value: 10.8,
    percentage: 10.8,
  },
  {
    id: 'holding-mf-005',
    name: 'Other Funds',
    value: 0,
    percentage: 0,
  },
];

// Top 5 Fund Categories for MF
export const mfTop5Categories = [
  {
    id: 'category-001',
    name: 'Large Cap Equity',
    percentage: 50.2,
  },
  {
    id: 'category-002',
    name: 'Multi Cap Equity',
    percentage: 22.6,
  },
  {
    id: 'category-003',
    name: 'Balanced Advantage',
    percentage: 16.4,
  },
  {
    id: 'category-004',
    name: 'Small Cap Equity',
    percentage: 10.8,
  },
];

// Recent Transactions for MF
export const mfRecentTransactions = [
  {
    id: 'txn-mf-001',
    fundName: 'ICICI Prudential Bluechip Fund',
    amcName: 'ICICI Prudential',
    orderDate: '2026-02-05',
    type: 'Purchase',
    typeIcon: 'purchase',
    amount: 61750,
  },
  {
    id: 'txn-mf-002',
    fundName: 'Axis Focused 25 Fund',
    amcName: 'Axis',
    orderDate: '2026-02-03',
    type: 'Purchase',
    typeIcon: 'purchase',
    amount: 26400,
  },
  {
    id: 'txn-mf-003',
    fundName: 'Kotak Balanced Advantage Fund',
    amcName: 'Kotak',
    orderDate: '2026-01-28',
    type: 'Dividend',
    typeIcon: 'dividend',
    amount: 35000,
  },
  {
    id: 'txn-mf-004',
    fundName: 'ICICI Prudential Bluechip Fund',
    amcName: 'ICICI Prudential',
    orderDate: '2026-01-15',
    type: 'Purchase',
    typeIcon: 'purchase',
    amount: 500000,
  },
];

// Performance Summary
export const mfPerformanceSummary: MFPerformanceSummary = {
  totalAUM: mfInvestmentAccount.mfCurrentValuation,
  totalCost: 7400000,
  totalValue: mfInvestmentAccount.mfCurrentValuation,
  totalUnrealizedGain: 1350000,
  totalRealizedGain: 110000,
  totalGain: 1460000,
  overallReturn: 19.73,
  fundCount: 4,
};
