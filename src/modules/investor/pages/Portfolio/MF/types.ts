import type { ListResponse, SingleResponse } from '@shared/types/api';

// MF Fund
export interface MFFund {
  id: string;
  accountNumber: string;
  fundName: string;
  aum: number;
  nav: number;
  navDate: string;
  value: number;
  cost: number;
  unrealizedGain: number;
  unrealizedGainPercent: number;
  realizedGain: number;
  totalGain: number;
  status: 'ACTIVE' | 'INACTIVE' | 'CLOSED';
  inceptionDate: string;
  categoryName: string;
  fundHouseName: string;
  riskLevel: string;
}

// Legacy type support
export type MFAccount = MFFund;

export interface MFHolding {
  id: string;
  accountId: string;
  fundName: string;
  fundCategory: string;
  quantity: number;
  averageCost: number;
  currentPrice: number;
  marketValue: number;
  unrealizedGain: number;
  unrealizedGainPercent: number;
  weight: number;
}

export interface MFTransaction {
  id: string;
  accountId: string;
  date: string;
  type: 'BUY' | 'SELL' | 'DIVIDEND' | 'SIP' | 'SWITCH';
  fundName: string;
  quantity: number;
  price: number;
  amount: number;
  nav: number;
  units: number;
}

// Dashboard Summary
export interface MFDashboardSummary {
  mfCurrentValuation: number;
  mfTotalInflows: number;
  mfTotalOutflows: number;
  mfNetInvestment: number;
  mfDayChange: number;
  mfDayChangePercent: number;
  mfXirr: number;
  noOfFunds: number;
  noOfCategories: number;
}

// Legacy type support
export type MFInvestmentAccount = MFDashboardSummary;

// API Response Types
export type MFDashboardResponse = SingleResponse<MFDashboardSummary>;
export type MFAccountsResponse = ListResponse<MFFund>;
export type MFHoldingsResponse = ListResponse<MFHolding>;
export type MFTransactionsResponse = ListResponse<MFTransaction>;
export interface MFValuation {
  id: string;
  fundId: string;
  date: string;
  value: number;
  cost: number;
  unrealizedGain: number;
  realizedGain: number;
  totalGain: number;
  returns: number;
}


export interface MFHolding {
  id: string;
  fundId: string;
  fundName: string;
  category: string;
  nav: number;
  units: number;
  value: number;
  cost: number;
  unrealizedGain: number;
  unrealizedGainPercent: number;
  weight: number;
}

export interface MFPerformanceSummary {
  totalAUM: number;
  totalCost: number;
  totalValue: number;
  totalUnrealizedGain: number;
  totalRealizedGain: number;
  totalGain: number;
  overallReturn: number;
  fundCount: number;
}
