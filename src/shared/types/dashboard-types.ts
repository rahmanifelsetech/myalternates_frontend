// Tradional PMS, MF and SIF general dashboard data types

import type { ListResponse, SingleResponse } from '@shared/types/api';

// Dashboard Summary
export interface DashboardSummary {
  product: string;
  summary: {
    accountId: string;
    currentValuation: string;
    totalInflows: string;
    totalOutflows: string;
    dayChange: string;
    xirr: number;
  };
  diversification: {
    amcCount: number;
    schemeCount: number;
  };
}


// PMS Account
export interface DashboardInvestedSchemes {
  id: string;
  amcClientCode: string;
  status: string;
  currentValue: string;
  totalInflows: string;
  totalOutflows: string;
  createdAt: string;
  product: {
    id: string;
    name: string;
    code: string;
  };
  scheme: {
    id: string;
    schemeName: string;
    schemeCode: string;
    schemeType: string;
    schemeInceptionDate: string;
  };
  amc: {
    id: string;
    name: string;
    amcCode: string;
  };
}

export interface DashboardTopHoldings {
  companyName: string;
  isinCode: string;
  portfolioWeightage: string;
}
export interface DashboardTopSectorHoldings {
  sector: string;
  portfolioWeightage: number;
}

export interface DashboardTransaction {
  id: string;
  investmentId: string;
  amcClientCode: string;
  orderDate: string;
  valuationDate: string;
  transactionType: string;
  amount: string;
  remarks: string;
}


export interface DashboardIndexType {
    name: string;
    value: number;
}

export enum DashboardPerformancePeriod {
    ONE_DAY = '1D',
    ONE_MONTH = '1M',
    THREE_MONTHS = '3M',
    SIX_MONTHS = '6M',
    ONE_YEAR = '1Y',
    THREE_YEARS = '3Y',
    FIVE_YEARS = '5Y',
    SINCE_INCEPTION = 'Since Inception',
}

export interface DashboardPerformanceData {
    periods: DashboardPerformancePeriod[];
    indexPerformance: number[] | string[];
    consolidatedPerformance: number[] | string[];
}

// API Response Types
export type DashboardSummaryResponse = SingleResponse<DashboardSummary>;
export type DashboardInvestedSchemesResponse = ListResponse<DashboardInvestedSchemes>;
export type DashboardTopHoldingsResponse = ListResponse<DashboardTopHoldings>;
export type DashboardTopSectorsResponse = ListResponse<DashboardTopSectorHoldings>;
export type DashboardTransactionsResponse = ListResponse<DashboardTransaction>;
export type DashboardIndexPerformanceResponse = SingleResponse<DashboardPerformanceData>;