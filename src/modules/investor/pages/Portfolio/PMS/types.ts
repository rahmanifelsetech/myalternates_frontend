// PMS Portfolio Types

export interface PMSAccount {
  id: string;
  accountNumber: string;
  accountName: string;
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
  schemeName: string;
  amcName: string;
  schemeType: string;
  returnsSi: number;
}

export interface PMSHolding {
  id: string;
  accountId: string;
  instrumentName: string;
  instrumentType: string;
  quantity: number;
  averageCost: number;
  currentPrice: number;
  marketValue: number;
  unrealizedGain: number;
  unrealizedGainPercent: number;
  weight: number;
}

export interface PMSTransaction {
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

export interface PMSValuation {
  id: string;
  accountId: string;
  date: string;
  aum: number;
  nav: number;
  value: number;
  cost: number;
  unrealizedGain: number;
  realizedGain: number;
  totalGain: number;
}

export interface PMSPerformanceSummary {
  totalAUM: number;
  totalCost: number;
  totalValue: number;
  totalUnrealizedGain: number;
  totalRealizedGain: number;
  totalGain: number;
  overallReturn: number;
  accountCount: number;
}

// Investment Account API Response Structure
export interface PMSInvestmentAccount {
  pmsCurrentValuation: number;
  pmsTotalInflows: number;
  pmsTotalOutflows: number;
  pmsNetInvestment: number;
  pmsDayChange: number;
  pmsDayChangePercent: number;
  pmsXirr: number;
  noOfPmsAmcs: number;
  noOfPmsStrategies: number;
}

// Summary Card Types
export interface SummaryCardProps {
  label: string;
  value: string | number;
  prefix?: string;
  suffix?: string;
  valueColor?: 'primary' | 'success' | 'error' | 'warning';
  icon?: React.ReactNode;
}

export interface StatCardProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  valueColor?: 'primary' | 'success' | 'error' | 'warning';
}
