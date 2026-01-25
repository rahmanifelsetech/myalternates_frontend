import { PaginatedResponse, SingleResponse } from "@shared/types/api";

export interface Bank {
    id: string;
    investorId: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    accountType: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    investor?: {
        id: string;
        name: string;
    };
}

export type BankListResponse = PaginatedResponse<Bank>;
export type BankResponse = SingleResponse<Bank>;

export interface CreateBankPayload {
    investorId: string;
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    accountType: string;
    isActive?: boolean;
}

export interface UpdateBankPayload extends Partial<CreateBankPayload> {
    id: string;
}

export interface BankFilters {
    search?: string;
    page?: number;
    limit?: number;
    investorId?: string;
}
