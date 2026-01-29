import { PaginatedResponse, SingleResponse } from "@shared/types/api";

// Account Type
export enum AccountType {
  SAVINGS = 'Savings',
  CURRENT = 'Current',
  NRE = 'NRE',
  NRO = 'NRO',
}

export interface Bank {
    id: string;
    investorId: string;
    bankName: string;
    accountNumber: string;
    ifsc: string;
    accountType: AccountType;
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
