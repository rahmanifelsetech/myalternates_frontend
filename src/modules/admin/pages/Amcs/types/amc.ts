import { PaginatedResponse, SingleResponse } from "@shared/types/api";

export interface Amc {
    id: string;
    productId?: string;
    amcCode: string | null;
    name: string | null;
    shortName: string | null;
    logoUrl: string | null;
    about: string | null;
    inceptionDate: string | null;
    sebiRegistrationNo: string | null;
    commonInvestmentPhilosophy: string | null;
    noOfStrategies: number | null;
    investmentTeam: string | null;
    investorLoginUrl: string | null;
    address: string | null;
    websiteUrl: string | null;
    twitterUrl: string | null;
    facebookUrl: string | null;
    linkedinUrl: string | null;
    youtubeUrl: string | null;
    creativeUrl: string | null;
    googleMapLink: string | null;
    restrictDisplay: boolean;
    isFeatured: boolean;
    priorityOrder: number;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export type AmcListResponse = PaginatedResponse<Amc>;
export type AmcResponse = SingleResponse<Amc>;

export interface CreateAmcPayload {
    amcCode: string;
    name: string;
    shortName?: string;
    logoUrl?: File | string;
    about?: string;
    inceptionDate?: string;
    sebiRegistrationNo?: string;
    commonInvestmentPhilosophy?: string;
    noOfStrategies?: number;
    investmentTeam?: string;
    investorLoginUrl?: string;
    address?: string;
    websiteUrl?: string;
    twitterUrl?: string;
    facebookUrl?: string;
    linkedinUrl?: string;
    youtubeUrl?: string;
    creativeUrl?: File | string;
    googleMapLink?: string;
    restrictDisplay: boolean;
    isFeatured: boolean;
    priorityOrder?: number;
}

export interface UpdateAmcPayload extends Partial<CreateAmcPayload> {
    id: string;
}

export interface AmcFilters {
    search?: string;
    page?: number;
    limit?: number;
}