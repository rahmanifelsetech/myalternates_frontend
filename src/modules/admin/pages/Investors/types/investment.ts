export interface Investment {
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
  status: string;
  capitalCommitment: string;
  commitmentCurrency: string;
  createdAt: string;
}

export interface InvestmentsResponse {
  data: Investment[];
  metaData?: { total: number };
}
