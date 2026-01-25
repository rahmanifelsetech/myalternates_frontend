import { PaginatedResponse, SingleResponse } from "@shared/types/api";

export interface Guardian {
    id: string;
    investorId: string;
    name: string;
    idType: string;
    idNumber: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export type GuardianListResponse = PaginatedResponse<Guardian>;
export type GuardianResponse = SingleResponse<Guardian>;

export interface CreateGuardianPayload {
    investorId: string;
    name: string;
    idType: string;
    idNumber: string;
    isActive?: boolean;
}

export interface UpdateGuardianPayload extends Partial<CreateGuardianPayload> {
    id: string;
}

export interface GuardianFilters {
    search?: string;
    page?: number;
    limit?: number;
    investorId?: string;
}
