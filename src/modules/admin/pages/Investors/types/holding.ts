export interface Holding {
  holdingId: string;
  investmentId: string;
  amcClientCode?: string;
  isinCode?: string;
  companyName?: string;
  categorization?: string;
  categoryId?: string;
  category?: {
    id: string;
    name: string;
    description?: string;
    color?: string | null;
    parentCategoryId?: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  securityType?: string;
  cashEquivalent: string;
  holdingsAsOnDate?: string | null;
  sector?: string;
  securityName?: string;
  portfolioWeightage: string;
  valuationDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface HoldingsResponse {
  data: Holding[];
  metaData?: { total: number };
}
