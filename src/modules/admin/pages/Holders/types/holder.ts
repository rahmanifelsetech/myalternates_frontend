import { PaginatedResponse, SingleResponse } from "@shared/types/api";

export interface Holder {
    id: string;
    investorId: string;
    name: string;
    pan: string | null;
    dateOfBirth: string | null;
    gender: string | null;
    mobile: string | null;
    email: string | null;
    address1: string | null;
    address2: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    pincode: string | null;
    guardianName: string | null;
    guardianIdType: string | null;
    guardianIdNumber: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    investor?: {
        id: string;
        name: string;
    };
}

export type HolderListResponse = PaginatedResponse<Holder>;
export type HolderResponse = SingleResponse<Holder>;

export interface CreateHolderPayload {
    investorId: string;
    name: string;
    pan?: string;
    dateOfBirth?: string;
    gender?: string;
    mobile?: string;
    email?: string;
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
    guardianName?: string;
    guardianIdType?: string;
    guardianIdNumber?: string;
    isActive?: boolean;
}

export interface UpdateHolderPayload extends Partial<CreateHolderPayload> {
    id: string;
}

export interface HolderFilters {
    search?: string;
    page?: number;
    limit?: number;
    investorId?: string;
}