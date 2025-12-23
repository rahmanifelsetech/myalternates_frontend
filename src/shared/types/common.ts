/**
 * Common Utility Types
 */

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface DashboardStats {
  totalInvested: number;
  totalReturns: number;
  returnPercentage: number;
  activeInvestments: number;
  topProduct: any; // Product type, but avoid circular dependency
  recentTransactions: any[]; // Transaction type, but avoid circular dependency
}
