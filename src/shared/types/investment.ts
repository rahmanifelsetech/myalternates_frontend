/**
 * Investment & Holding Types
 */

import type { ProductType } from './product-domain';

export type InvestmentStatus = 'ACTIVE' | 'REDEEMED' | 'PENDING' | 'CANCELLED' | 'MATURED';

export interface Investment {
  id: string;
  userId: string;
  productId: string;
  productName: string;
  productType: ProductType;
  amount: number;
  units: number;
  unitPrice: number;
  currentValue: number;
  currentPrice: number;
  status: InvestmentStatus;
  investmentDate: string;
  maturityDate?: string;
  gains: number;
  gainPercentage: number;
  createdAt: string;
  updatedAt: string;
}
