import { PaginatedResponse, SingleResponse } from "@shared/types/api";

export interface Nominee {
    id: string;
    investorId: string;
    name: string;
    idType: string;
    idNumber: string;
    relationship: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export type NomineeListResponse = PaginatedResponse<Nominee>;
export type NomineeResponse = SingleResponse<Nominee>;

export interface CreateNomineePayload {
    investorId: string;
    name: string;
    idType: string;
    idNumber: string;
    relationship: string;
    isActive?: boolean;
}

export interface UpdateNomineePayload extends Partial<CreateNomineePayload> {
    id: string;
}

export interface NomineeFilters {
    search?: string;
    page?: number;
    limit?: number;
    investorId?: string;
}
