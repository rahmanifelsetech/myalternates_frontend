export interface Valuation {
  valuationId: string;
  investmentId: string;
  amcClientCode: string;
  product: {
    id: string;
    name: string;
    code: string;
  };
  scheme: {
    id: string;
    schemeName: string;
    schemeCode: string;
  };
  amc: {
    id: string;
    name: string;
  };
  valuationDate: string;
  valuationAmount: string;
}

export interface ValuationsResponse {
  data: Valuation[];
  metaData?: { total: number };
}
