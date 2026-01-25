import { PaginatedResponse, SingleResponse } from "@shared/types/api";

export interface Investment {
    id: string;
    investorId: string;
    // Section 1: Product & Investment
    productId: string;
    capitalCommitment?: number;
    amcId: string;
    amcCode: string;
    amcClientCode: string;
    inceptionDate?: string;
    modeOfHolding: string;
    amcSharing?: number;

    // Section 2: Scheme & Internal Mapping
    schemeId: string;
    schemeCode: string;
    cpId: string;
    cpCode: string;
    creId?: string;
    creCode?: string;
    rmId?: string;
    rmCode?: string;
    fmCode?: string;
    branchCode?: string;

    // Section 3: Holder Details
    holders: Holder[];

    // Section 4: Bank & DP Details
    dpType?: string;
    dpName?: string;
    dpId?: string;
    clientId?: string;
    bankId?: string;
    bankName?: string;
    accountNumber?: string;
    ifscCode?: string;
    accountType?: string;
}

export interface Holder {
    id?: string;
    holderName: string;
    pan: string;
    myaltCode?: string;
    dob?: string;
    gender?: string;
    mobile?: string;
    email?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
}

export type InvestmentListResponse = PaginatedResponse<Investment>;
export type InvestmentResponse = SingleResponse<Investment>;

export interface CreateInvestmentPayload extends Omit<Investment, 'id'> {}

export interface UpdateInvestmentPayload extends Partial<CreateInvestmentPayload> {
    id: string;
}

import { PaginationParams } from "@shared/types/api";

export interface InvestmentFilters extends PaginationParams {
    search?: string;
    investorId?: string;
    productId?: string;
    amcId?: string;
    schemeId?: string;
}
