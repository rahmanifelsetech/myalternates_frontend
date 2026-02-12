import type { ListResponse, SingleResponse } from '@shared/types/api';

// PMS Account
export interface PMSInvestedSchemes {
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

export interface PMSTopHoldings {
  companyName: string;
  isinCode: string;
  portfolioWeightage: string;
}
export interface PMSTopSectorHoldings {
  sector: string;
  portfolioWeightage: number;
}

export interface PMSTransaction {
  id: string;
  investmentId: string;
  amcClientCode: string;
  orderDate: string;
  valuationDate: string;
  transactionType: string;
  amount: string;
  remarks: string;
}

// Dashboard Summary
export interface PMSDashboardSummary {
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

// API Response Types
export type PMSDashboardResponse = SingleResponse<PMSDashboardSummary>;
export type PMSInvestedSchemesResponse = ListResponse<PMSInvestedSchemes>;
export type PMSTopHoldingsResponse = ListResponse<PMSTopHoldings>;
export type PMSTopSectorsResponse = ListResponse<PMSTopSectorHoldings>;
export type PMSTransactionsResponse = ListResponse<PMSTransaction>;
