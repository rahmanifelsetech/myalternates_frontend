// PMS Portfolio Dummy Data Constants

import { PMSAccount, PMSHolding, PMSTransaction, PMSValuation, PMSPerformanceSummary, PMSInvestmentAccount } from '../types';

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

export const formatNumber = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

// Investment Account API Response Structure
export const pmsInvestmentAccount: PMSInvestmentAccount = {
  pmsCurrentValuation: 10250000,
  pmsTotalInflows: 12500000,
  pmsTotalOutflows: 2250000,
  pmsNetInvestment: 10250000,
  pmsDayChange: 85000,
  pmsDayChangePercent: 0.84,
  pmsXirr: 23.45,
  noOfPmsAmcs: 4,
  noOfPmsStrategies: 7,
};

// Dummy PMS Accounts Data (Invested Strategies)
export const pmsAccounts: PMSAccount[] = [
  {
    id: 'pms-001',
    accountNumber: 'PMS/NSDL/2024/001',
    accountName: 'Growth Portfolio - Equity',
    aum: 5250000,
    nav: 156.78,
    navDate: '2026-02-07',
    value: 5250000,
    cost: 4200000,
    unrealizedGain: 1050000,
    unrealizedGainPercent: 25.0,
    realizedGain: 185000,
    totalGain: 1235000,
    status: 'ACTIVE',
    inceptionDate: '2023-04-15',
    schemeName: 'India Growth Equity Fund',
    amcName: 'HDFC Asset Management',
    schemeType: 'Equity',
    returnsSi: 29.41,
  },
  {
    id: 'pms-002',
    accountNumber: 'PMS/NSDL/2024/002',
    accountName: 'Balanced Advantage Fund',
    aum: 3125000,
    nav: 124.56,
    navDate: '2026-02-07',
    value: 3125000,
    cost: 2800000,
    unrealizedGain: 325000,
    unrealizedGainPercent: 11.61,
    realizedGain: 75000,
    totalGain: 400000,
    status: 'ACTIVE',
    inceptionDate: '2023-08-22',
    schemeName: 'Balanced Advantage Portfolio',
    amcName: 'ICICI Prudential AMC',
    schemeType: 'Balanced',
    returnsSi: 14.29,
  },
  {
    id: 'pms-003',
    accountNumber: 'PMS/NSDL/2024/003',
    accountName: 'Small Cap Opportunities',
    aum: 1875000,
    nav: 89.45,
    navDate: '2026-02-07',
    value: 1875000,
    cost: 2100000,
    unrealizedGain: -225000,
    unrealizedGainPercent: -10.71,
    realizedGain: 45000,
    totalGain: -180000,
    status: 'ACTIVE',
    inceptionDate: '2024-01-10',
    schemeName: 'Small Cap Alpha Fund',
    amcName: 'SBI Funds Management',
    schemeType: 'Small Cap',
    returnsSi: -8.57,
  },
  {
    id: 'pms-004',
    accountNumber: 'PMS/NSDL/2024/004',
    accountName: 'Mid Cap Growth',
    aum: 2500000,
    nav: 112.34,
    navDate: '2026-02-07',
    value: 2500000,
    cost: 2200000,
    unrealizedGain: 300000,
    unrealizedGainPercent: 13.64,
    realizedGain: 50000,
    totalGain: 350000,
    status: 'ACTIVE',
    inceptionDate: '2023-06-01',
    schemeName: 'Mid Cap Growth Strategy',
    amcName: 'Kotak Mahindra AMC',
    schemeType: 'Mid Cap',
    returnsSi: 15.91,
  },
];

// Dummy PMS Holdings Data
export const pmsHoldings: PMSHolding[] = [
  {
    id: 'holding-001',
    accountId: 'pms-001',
    instrumentName: 'HDFC Bank Ltd',
    instrumentType: 'EQUITY',
    quantity: 2500,
    averageCost: 1650.0,
    currentPrice: 1850.0,
    marketValue: 4625000,
    unrealizedGain: 500000,
    unrealizedGainPercent: 12.12,
    weight: 22.5,
  },
  {
    id: 'holding-002',
    accountId: 'pms-001',
    instrumentName: 'Reliance Industries Ltd',
    instrumentType: 'EQUITY',
    quantity: 1500,
    averageCost: 2850.0,
    currentPrice: 2950.0,
    marketValue: 4425000,
    unrealizedGain: 150000,
    unrealizedGainPercent: 3.51,
    weight: 21.5,
  },
  {
    id: 'holding-003',
    accountId: 'pms-001',
    instrumentName: 'ICICI Bank Ltd',
    instrumentType: 'EQUITY',
    quantity: 3000,
    averageCost: 980.0,
    currentPrice: 1050.0,
    marketValue: 3150000,
    unrealizedGain: 210000,
    unrealizedGainPercent: 7.14,
    weight: 15.3,
  },
  {
    id: 'holding-004',
    accountId: 'pms-001',
    instrumentName: 'Infosys Ltd',
    instrumentType: 'EQUITY',
    quantity: 1200,
    averageCost: 1450.0,
    currentPrice: 1680.0,
    marketValue: 2016000,
    unrealizedGain: 276000,
    unrealizedGainPercent: 15.86,
    weight: 9.8,
  },
  {
    id: 'holding-005',
    accountId: 'pms-001',
    instrumentName: 'Tata Consultancy Services Ltd',
    instrumentType: 'EQUITY',
    quantity: 800,
    averageCost: 3850.0,
    currentPrice: 4120.0,
    marketValue: 3296000,
    unrealizedGain: 216000,
    unrealizedGainPercent: 7.01,
    weight: 16.0,
  },
  {
    id: 'holding-006',
    accountId: 'pms-002',
    instrumentName: 'HDFC Bank Ltd',
    instrumentType: 'EQUITY',
    quantity: 1500,
    averageCost: 1650.0,
    currentPrice: 1850.0,
    marketValue: 2775000,
    unrealizedGain: 300000,
    unrealizedGainPercent: 12.12,
    weight: 25.0,
  },
  {
    id: 'holding-007',
    accountId: 'pms-002',
    instrumentName: 'Bharat Petroleum Corp Ltd',
    instrumentType: 'EQUITY',
    quantity: 4000,
    averageCost: 580.0,
    currentPrice: 620.0,
    marketValue: 2480000,
    unrealizedGain: 160000,
    unrealizedGainPercent: 6.9,
    weight: 22.4,
  },
];

// Dummy PMS Transactions Data
export const pmsTransactions: PMSTransaction[] = [
  {
    id: 'txn-001',
    accountId: 'pms-001',
    date: '2026-02-05',
    type: 'BUY',
    instrumentName: 'HDFC Bank Ltd',
    quantity: 500,
    price: 1825.5,
    amount: 912750,
    nav: 0,
    units: 0,
  },
  {
    id: 'txn-002',
    accountId: 'pms-001',
    date: '2026-02-03',
    type: 'SELL',
    instrumentName: 'Infosys Ltd',
    quantity: 200,
    price: 1675.0,
    amount: 335000,
    nav: 0,
    units: 0,
  },
  {
    id: 'txn-003',
    accountId: 'pms-001',
    date: '2026-01-28',
    type: 'DIVIDEND',
    instrumentName: 'Reliance Industries Ltd',
    quantity: 0,
    price: 0,
    amount: 45000,
    nav: 0,
    units: 0,
  },
  {
    id: 'txn-004',
    accountId: 'pms-001',
    date: '2026-01-15',
    type: 'DEPOSIT',
    instrumentName: '',
    quantity: 0,
    price: 0,
    amount: 500000,
    nav: 0,
    units: 0,
  },
  {
    id: 'txn-005',
    accountId: 'pms-001',
    date: '2026-01-10',
    type: 'BUY',
    instrumentName: 'ICICI Bank Ltd',
    quantity: 1000,
    price: 1025.0,
    amount: 1025000,
    nav: 0,
    units: 0,
  },
  {
    id: 'txn-006',
    accountId: 'pms-002',
    date: '2026-02-01',
    type: 'BUY',
    instrumentName: 'HDFC Bank Ltd',
    quantity: 300,
    price: 1800.0,
    amount: 540000,
    nav: 0,
    units: 0,
  },
  {
    id: 'txn-007',
    accountId: 'pms-003',
    date: '2026-01-25',
    type: 'SELL',
    instrumentName: 'Adani Enterprises Ltd',
    quantity: 1000,
    price: 3200.0,
    amount: 3200000,
    nav: 0,
    units: 0,
  },
  {
    id: 'txn-008',
    accountId: 'pms-004',
    date: '2026-02-04',
    type: 'DIVIDEND',
    instrumentName: 'Larsen & Toubro Ltd',
    quantity: 0,
    price: 0,
    amount: 75000,
    nav: 0,
    units: 0,
  },
];

// Dummy PMS Valuations Data
export const pmsValuations: PMSValuation[] = [
  {
    id: 'val-001',
    accountId: 'pms-001',
    date: '2026-02-07',
    aum: 5250000,
    nav: 156.78,
    value: 5250000,
    cost: 4200000,
    unrealizedGain: 1050000,
    realizedGain: 185000,
    totalGain: 1235000,
  },
  {
    id: 'val-002',
    accountId: 'pms-001',
    date: '2026-01-31',
    aum: 5180000,
    nav: 154.52,
    value: 5180000,
    cost: 4150000,
    unrealizedGain: 1030000,
    realizedGain: 175000,
    totalGain: 1205000,
  },
  {
    id: 'val-003',
    accountId: 'pms-001',
    date: '2025-12-31',
    aum: 4950000,
    nav: 147.82,
    value: 4950000,
    cost: 4000000,
    unrealizedGain: 950000,
    realizedGain: 160000,
    totalGain: 1110000,
  },
  {
    id: 'val-004',
    accountId: 'pms-001',
    date: '2025-11-30',
    aum: 5100000,
    nav: 152.25,
    value: 5100000,
    cost: 3950000,
    unrealizedGain: 1150000,
    realizedGain: 150000,
    totalGain: 1300000,
  },
  {
    id: 'val-005',
    accountId: 'pms-001',
    date: '2025-10-31',
    aum: 4850000,
    nav: 144.75,
    value: 4850000,
    cost: 3850000,
    unrealizedGain: 1000000,
    realizedGain: 145000,
    totalGain: 1145000,
  },
];

// Performance Summary
export const pmsPerformanceSummary: PMSPerformanceSummary = {
  totalAUM: pmsInvestmentAccount.pmsCurrentValuation,
  totalCost: 9100000,
  totalValue: pmsInvestmentAccount.pmsCurrentValuation,
  totalUnrealizedGain: 1150000,
  totalRealizedGain: 305000,
  totalGain: 1455000,
  overallReturn: 15.99,
  accountCount: 4,
};

// Helper functions
export const getHoldingsByAccountId = (accountId: string): PMSHolding[] => {
  return pmsHoldings.filter(h => h.accountId === accountId);
};

export const getTransactionsByAccountId = (accountId: string): PMSTransaction[] => {
  return pmsTransactions.filter(t => t.accountId === accountId);
};

export const getValuationsByAccountId = (accountId: string): PMSValuation[] => {
  return pmsValuations.filter(v => v.accountId === accountId);
};

// Get all unique holdings across all accounts
export const getAllHoldings = (): PMSHolding[] => {
  return pmsHoldings;
};

// Get all transactions across all accounts
export const getAllTransactions = (): PMSTransaction[] => {
  return pmsTransactions;
};
