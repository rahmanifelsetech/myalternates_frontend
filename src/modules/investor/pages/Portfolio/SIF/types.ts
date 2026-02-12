import type { ListResponse, SingleResponse } from '@shared/types/api';

// SIF Account/Fund
export interface SIFAccount {
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
  sectorName: string;
  fundManagerName: string;
  investmentStrategy: string;
}

export interface SIFHolding {
  id: string;
  accountId: string;
  instrumentName: string;
  sectorName: string;
  quantity: number;
  averageCost: number;
  currentPrice: number;
  marketValue: number;
  unrealizedGain: number;
  unrealizedGainPercent: number;
  weight: number;
}

export interface SIFTransaction {
  id: string;
  accountId: string;
  date: string;
  type: 'BUY' | 'SELL' | 'DIVIDEND' | 'DEPOSIT' | 'WITHDRAWAL';
  instrumentName: string;
  quantity: number;
  price: number;
  amount: number;
  nav: number;
  units: number;
}

// Dashboard Summary
export interface SIFDashboardSummary {
  sifCurrentValuation: number;
  sifTotalInflows: number;
  sifTotalOutflows: number;
  sifNetInvestment: number;
  sifDayChange: number;
  sifDayChangePercent: number;
  sifXirr: number;
  noOfSIFAccounts: number;
  noOfSectors: number;
}

// API Response Types
export type SIFDashboardResponse = SingleResponse<SIFDashboardSummary>;
export type SIFAccountsResponse = ListResponse<SIFAccount>;
export type SIFHoldingsResponse = ListResponse<SIFHolding>;
export type SIFTransactionsResponse = ListResponse<SIFTransaction>;
