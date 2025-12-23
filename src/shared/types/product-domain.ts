/**
 * Product Types
 */

export type ProductType = 'PMS' | 'AIF' | 'SIF' | 'MF' | 'GIFT';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH';
export type ProductStatus = 'ACTIVE' | 'INACTIVE' | 'CLOSED' | 'SUSPENDED';

export interface ProductDetails {
  managerId: string;
  managerName: string;
  category: string;
  assetUnderManagement: number;
  inception: string;
  benchmark: string;
  strategy: string;
}

export interface Product {
  id: string;
  name: string;
  type: ProductType;
  description: string;
  minimumInvestment: number;
  maximumInvestment?: number;
  currentValue: number;
  riskLevel: RiskLevel;
  expectedReturn: number;
  actualReturn?: number;
  status: ProductStatus;
  details?: ProductDetails;
  documents?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductFilter {
  type?: ProductType;
  status?: ProductStatus;
  riskLevel?: RiskLevel;
  minInvestment?: number;
  maxInvestment?: number;
  searchTerm?: string;
}
