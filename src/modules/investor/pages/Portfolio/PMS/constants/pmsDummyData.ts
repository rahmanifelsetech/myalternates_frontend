// PMS Portfolio Dummy Data Constants

import { PMSInvestedSchemes, PMSDashboardSummary, PMSTopHoldings, PMSTransaction } from '../types';

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
export const pmsInvestmentAccount = {
  product: 'PMS',
  summary: {
    accountId: 'e2c558e6-3995-4f1e-81ca-b228a68d1c26',
    currentValuation: '28000.00',
    totalInflows: '22000.00',
    totalOutflows: '4000.00',
    dayChange: '0.00',
    xirr: 0,
  },
  diversification: {
    amcCount: 2,
    schemeCount: 2,
  },
};

// Dummy PMS Accounts Data (Invested Strategies)
export const pmsAccounts = {
  message: 'Invested schemes retrieved successfully',
  data: [
    {
      id: '4385936e-e729-4908-8900-cf95b263bb1d',
      amcClientCode: 'TEST-027',
      status: 'IN-ACTIVE',
      currentValue: '11000.00',
      totalInflows: '7000.00',
      totalOutflows: '1000.00',
      createdAt: '2026-02-09T21:11:58.740Z',
      product: {
        id: 'b3aebae3-395c-4874-9fa1-6c8f2150f0a0',
        name: 'PMS',
        code: 'PMS',
      },
      scheme: {
        id: '8041b59c-d9ab-4e93-ae00-c18f58c084d1',
        schemeName: 'Nippon India Balanced Advantage Fund',
        schemeCode: 'RMF2269',
        schemeType: 'Open Ended',
        schemeInceptionDate: '2004-10-15',
      },
      amc: {
        id: '46fb6039-d1ad-4676-823e-528e4d07e920',
        name: 'Kotak Mahindra Asset Management company Ltd',
        amcCode: 'INP000000837',
      },
    },
    {
      id: '59adb528-ac63-4a22-b73d-1057a4357e1e',
      amcClientCode: 'TEST-026',
      status: 'IN-ACTIVE',
      currentValue: '17000.00',
      totalInflows: '15000.00',
      totalOutflows: '3000.00',
      createdAt: '2026-02-09T21:10:21.557Z',
      product: {
        id: 'b3aebae3-395c-4874-9fa1-6c8f2150f0a0',
        name: 'PMS',
        code: 'PMS',
      },
      scheme: {
        id: '2039af30-7078-4291-b30e-900dc3905888',
        schemeName: 'Sundaram Dividend Yield Fund',
        schemeCode: 'SUN2149',
        schemeType: 'Open Ended',
        schemeInceptionDate: '2004-09-05',
      },
      amc: {
        id: '4caf412a-3498-464c-b132-26c811992512',
        name: 'Motilal Oswal Asset Management',
        amcCode: 'INP 000000670',
      },
    },
  ],
  metaData: {
    page: 1,
    limit: 10,
    total: 2,
    totalPages: 1,
  },
};

// Dummy PMS Holdings Data
export const pmsHoldings = [
  {
    companyName: 'Infosys Limited',
    isinCode: 'INE009A09AZ8',
    portfolioWeightage: '80.00',
  },
  {
    companyName: 'Larsen & Toubro Limited',
    isinCode: 'INE018A01030',
    portfolioWeightage: '70.00',
  },
  {
    companyName: 'Bajaj Finance Limited',
    isinCode: 'INE029A01011',
    portfolioWeightage: '30.00',
  },
  {
    companyName: 'Kotak Mahindra Bank Limited',
    isinCode: 'INE237A01028',
    portfolioWeightage: '20.00',
  },
];

// Dummy PMS Transactions Data
export const pmsTransactions: PMSTransaction[] = [
  {
    id: '0ac7ff32-e360-4e00-8823-85a317275f45',
    investmentId: '59adb528-ac63-4a22-b73d-1057a4357e1e',
    amcClientCode: 'TEST-026',
    orderDate: '2024-01-25',
    valuationDate: '2024-01-25',
    transactionType: 'Withdrawn',
    amount: '3000.00',
    remarks: 'Partial withdrawal',
  },
  {
    id: 'ba5bfff4-dd3b-4f29-8236-9f5637a64ae6',
    investmentId: '4385936e-e729-4908-8900-cf95b263bb1d',
    amcClientCode: 'TEST-027',
    orderDate: '2024-01-20',
    valuationDate: '2024-01-20',
    transactionType: 'Withdrawn',
    amount: '1000.00',
    remarks: 'Partial withdrawal',
  },
  {
    id: '947e0b7b-8249-4827-8b98-bb82c52df439',
    investmentId: '59adb528-ac63-4a22-b73d-1057a4357e1e',
    amcClientCode: 'TEST-026',
    orderDate: '2024-01-15',
    valuationDate: '2024-01-15',
    transactionType: 'Addition',
    amount: '5000.00',
    remarks: 'Additional investment',
  },
  {
    id: 'dc6d8ff8-77fd-47bf-a6d7-484e0bfddd72',
    investmentId: '4385936e-e729-4908-8900-cf95b263bb1d',
    amcClientCode: 'TEST-027',
    orderDate: '2024-01-10',
    valuationDate: '2024-01-10',
    transactionType: 'Addition',
    amount: '2000.00',
    remarks: 'Additional investment',
  },
  {
    id: '487f4286-ba49-4e79-8abb-4571d101f6fd',
    investmentId: '59adb528-ac63-4a22-b73d-1057a4357e1e',
    amcClientCode: 'TEST-026',
    orderDate: '2024-01-05',
    valuationDate: '2024-01-05',
    transactionType: 'Addition',
    amount: '10000.00',
    remarks: 'Initial investment',
  },
];


// Performance Data by Index
export const performanceDataByIndex = {
  BSE500: {
    periods: ['1D', '1M', '3M', '6M', '1Y', '3Y', '5Y', 'Since Inception'],
    indexPerformance: [0.32, 1.85, 5.42, 12.68, 18.95, 52.35, 89.45, 145.68],
    consolidatedPerformance: [0.45, 2.15, 6.85, 14.25, 22.50, 65.42, 105.30, 165.75],
  },
  NSE500: {
    periods: ['1D', '1M', '3M', '6M', '1Y', '3Y', '5Y', 'Since Inception'],
    indexPerformance: [0.28, 1.92, 5.65, 13.45, 19.85, 54.68, 92.15, 148.50],
    consolidatedPerformance: [0.42, 2.28, 6.95, 14.85, 23.20, 67.15, 108.45, 168.95],
  },
  NIFTY_50: {
    periods: ['1D', '1M', '3M', '6M', '1Y', '3Y', '5Y', 'Since Inception'],
    indexPerformance: [0.35, 2.05, 6.15, 14.25, 21.35, 58.75, 98.45, 155.25],
    consolidatedPerformance: [0.48, 2.42, 7.35, 15.65, 24.50, 70.25, 112.65, 172.85],
  },
  SENSEX: {
    periods: ['1D', '1M', '3M', '6M', '1Y', '3Y', '5Y', 'Since Inception'],
    indexPerformance: [0.38, 2.12, 5.95, 13.85, 20.45, 56.25, 95.75, 152.30],
    consolidatedPerformance: [0.50, 2.35, 7.15, 15.25, 23.75, 68.85, 110.95, 170.50],
  },
};

export type IndexType = keyof typeof performanceDataByIndex;

// Asset Allocation Data (Pie Chart)
export const assetAllocationData = [
  {
    name: 'Equity',
    value: 65,
    percentage: 65,
  },
  {
    name: 'Debt',
    value: 20,
    percentage: 20,
  },
  {
    name: 'Cash',
    value: 10,
    percentage: 10,
  },
  {
    name: 'Others',
    value: 5,
    percentage: 5,
  },
];

// Market Cap Categorization Data
export const marketCapCategorization = [
  {
    id: 'large-cap',
    name: 'Large Cap',
    percentage: 45,
    color: '#FF5722',
  },
  {
    id: 'small-cap',
    name: 'Small Cap',
    percentage: 18,
    color: '#FF9800',
  },
  {
    id: 'mid-cap',
    name: 'Mid Cap',
    percentage: 32,
    color: '#FFC107',
  },
  {
    id: 'cash',
    name: 'Cash',
    percentage: 5,
    color: '#FFEB3B',
  },
];

// Top 5 Holdings Data
export const top5Holdings = [
  {
    id: 'holding-001',
    name: 'Infosys Ltd',
    percentage: 12.5,
  },
  {
    id: 'holding-002',
    name: 'State Bank of India',
    percentage: 10.8,
  },
  {
    id: 'holding-003',
    name: 'HDFC Bank',
    percentage: 9.2,
  },
  {
    id: 'holding-004',
    name: 'Reliance Industries',
    percentage: 8.5,
  },
  {
    id: 'holding-005',
    name: 'Cash & Equivalents',
    percentage: 7.3,
  },
];

// Top 5 Sectors Data
export const top5Sectors = [
  {
    sector: 'Technology',
    portfolioWeightage: 80,
  },
  {
    sector: 'Engineering',
    portfolioWeightage: 70,
  },
  {
    sector: 'Finance',
    portfolioWeightage: 30,
  },
  {
    sector: 'Banking',
    portfolioWeightage: 20,
  },
];

// Recent Transactions Data
export const recentTransactions = [
  {
    transactionId: '0ac7ff32-e360-4e00-8823-85a317275f45',
    investmentId: '59adb528-ac63-4a22-b73d-1057a4357e1e',
    amcClientCode: 'TEST-026',
    orderDate: '2024-01-25',
    valuationDate: '2024-01-25',
    transactionType: 'Withdrawn',
    amount: '3000.00',
    remarks: 'Partial withdrawal',
  },
  {
    transactionId: 'ba5bfff4-dd3b-4f29-8236-9f5637a64ae6',
    investmentId: '4385936e-e729-4908-8900-cf95b263bb1d',
    amcClientCode: 'TEST-027',
    orderDate: '2024-01-20',
    valuationDate: '2024-01-20',
    transactionType: 'Withdrawn',
    amount: '1000.00',
    remarks: 'Partial withdrawal',
  },
  {
    transactionId: '947e0b7b-8249-4827-8b98-bb82c52df439',
    investmentId: '59adb528-ac63-4a22-b73d-1057a4357e1e',
    amcClientCode: 'TEST-026',
    orderDate: '2024-01-15',
    valuationDate: '2024-01-15',
    transactionType: 'Addition',
    amount: '5000.00',
    remarks: 'Additional investment',
  },
  {
    transactionId: 'dc6d8ff8-77fd-47bf-a6d7-484e0bfddd72',
    investmentId: '4385936e-e729-4908-8900-cf95b263bb1d',
    amcClientCode: 'TEST-027',
    orderDate: '2024-01-10',
    valuationDate: '2024-01-10',
    transactionType: 'Addition',
    amount: '2000.00',
    remarks: 'Additional investment',
  },
  {
    transactionId: '487f4286-ba49-4e79-8abb-4571d101f6fd',
    investmentId: '59adb528-ac63-4a22-b73d-1057a4357e1e',
    amcClientCode: 'TEST-026',
    orderDate: '2024-01-05',
    valuationDate: '2024-01-05',
    transactionType: 'Addition',
    amount: '10000.00',
    remarks: 'Initial investment',
  },
];

// AMC Summary Data (Pie Chart)
export const amcSummaryData = [
  {
    name: 'HDFC Asset Management',
    value: 35,
    percentage: 35,
  },
  {
    name: 'Aequitas Investment Consultancy',
    value: 28,
    percentage: 28,
  },
  {
    name: 'Maximal Capital',
    value: 22,
    percentage: 22,
  },
  {
    name: 'White Whale Partners',
    value: 15,
    percentage: 15,
  },
];

// Scheme Summary Data (Pie Chart)
export const schemeSummaryData = [
  {
    name: 'Focused Healthcare Portfolio',
    value: 30,
    percentage: 30,
  },
  {
    name: 'India Opportunities Product',
    value: 25,
    percentage: 25,
  },
  {
    name: 'Income Fund',
    value: 25,
    percentage: 25,
  },
  {
    name: 'White Whale Partners Rising Star PF',
    value: 20,
    percentage: 20,
  },
];
