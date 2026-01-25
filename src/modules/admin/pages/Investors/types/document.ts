import { PaginatedResponse, SingleResponse } from "@shared/types/api";

export enum InvestorDocumentType {
    PAN = "pan",
    AADHAAR = "aadhaar",
    // PASSPORT = "passport",
    ADDRESS_PROOF = "address_proof",
    BANK_PROOF = "bank_proof",
    // OTHER = "other",
}

export interface InvestorDocument {
    id: string;
    investorId: string;
    documentType: InvestorDocumentType;
    fileUrl: string;
    fileName: string | null;
    fileSize: number;
    mimeType: string | null;
    uploadedAt: string;
    uploadedBy: string | null;
}

export type InvestorDocumentListResponse = PaginatedResponse<InvestorDocument>;
export type InvestorDocumentResponse = SingleResponse<InvestorDocument>;

export interface CreateInvestorDocumentPayload {
    investorId: string;
    documentType: InvestorDocumentType;
    file: File;
}

export interface UpdateInvestorDocumentPayload extends Partial<CreateInvestorDocumentPayload> {
    id: string;
}

export interface InvestorDocumentFilters {
    investorId: string;
}
