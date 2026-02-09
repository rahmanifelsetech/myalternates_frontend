export interface Investment {
  id: string;
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
  amc?: {
    id: string;
    name: string;
    amcCode: string;
  };
  status: string;
  capitalCalled?: string | null;
  pendingCapital?: string | null;
  capitalCommitment?: string | null;
  commitmentCurrency?: string | null;
  currentValue?: string | null;
  totalInflows?: string | null;
  totalOutflows?: string | null;
  createdAt: string;
}

export interface InvestmentsResponse {
  data: Investment[];
  metaData?: { total: number };
}
