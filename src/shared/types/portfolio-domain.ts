/**
 * Portfolio Types
 */

import type { ProductType, RiskLevel } from './product-domain';
import type { Investment } from './investment';

export interface PortfolioSummary {
  totalInvested: number;
  totalCurrentValue: number;
  totalGains: number;
  totalGainPercentage: number;
  totalInvestments: number;
  activeInvestments: number;
}

export interface Portfolio {
  id: string;
  userId: string;
  summary: PortfolioSummary;
  investments: Investment[];
  allocationByType: Record<ProductType, number>;
  allocationByRisk: Record<RiskLevel, number>;
  createdAt: string;
  updatedAt: string;
}
