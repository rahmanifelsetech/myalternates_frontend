import { PaginatedResponse, SingleResponse } from "@shared/types/api";

export interface Distributor {
    id: string;
    type: string;
    category: string;
    parentDistributorId?: string;
    code: string;
    name: string;
    relationshipManagerId: string;
    email: string;
    contactNo: string;
    panNo: string;
    tanNo?: string;
    gstType?: string;
    gstNo?: string;
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    totalAum?: number;
    commission?: number;
    dateOfAgreement?: string;
    bankName: string;
    bankAccountName: string;
    bankAccountNo: string;
    ifscCode: string;
    micrCode?: string;
    apmiRegNo?: string;
    apmiEuinNo?: string;
    nismCertNo?: string;
    amfiRegNo?: string;
    amfiEuinNo?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export type DistributorListResponse = PaginatedResponse<Distributor>;
export type DistributorResponse = SingleResponse<Distributor>;

export interface CreateDistributorPayload extends Omit<Distributor, 'id' | 'createdAt' | 'updatedAt'> {
    kyc_doc?: File;
    pan_doc?: File;
    address_proof_doc?: File;
    bank_proof_doc?: File;
    other_doc?: File;
}

export interface UpdateDistributorPayload extends Partial<CreateDistributorPayload> {
    id: string;
    documentsToRemove?: string[];
}

export interface DistributorFilters {
    search?: string;
    page?: number;
    limit?: number;
}
