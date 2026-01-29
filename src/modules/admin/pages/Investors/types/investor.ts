import { PaginatedResponse, SingleResponse } from "@shared/types/api";
import { InvestorDocument } from "./document";
import { Bank } from "./bank";
import { Holder } from "./holder";
import { Nominee } from "./nominee";

export interface Person {
    id: string;
    fullName: string;
    pan: string;
    dob: string | null;
    gender: string | null;
    mobile: string | null;
    email: string | null;
    isMinor: boolean;
    guardianName: string | null;
    guardianIdType: string | null;
    guardianIdNumber: string | null;
    guardianRelationship: string | null;
    createdAt: string;
    addresses: {
        address1: string | null;
        address2: string | null;
        city: string | null;
        state: string | null;
        country: string | null;
        pincode: string | null;
    }[];
}

export interface Investor {
    id: string;
    myaltCode?: string;
    residentialStatus: string;
    subStatus: string | null;
    inceptionDate: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    primaryPerson: Person;
    documents: InvestorDocument[];
    banks: Bank[];
    holders: Holder[];
    nominees: Nominee[];
}

export type InvestorListResponse = PaginatedResponse<Investor>;
export type InvestorResponse = SingleResponse<Investor>;

export interface CreateInvestorPayload {
    name: string;
    pan: string;
    myaltCode?: string;
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
    residentialStatus: string;
    subStatus?: string;
    guardianName?: string;
    guardianIdType?: string;
    guardianIdNumber?: string;
    isActive?: boolean;
    pan_doc?: File;
    aadhaar_doc?: File;
    passport_doc?: File;
    address_proof_doc?: File;
    bank_proof_doc?: File;
    other_doc?: File;
}

export interface UpdateInvestorPayload extends Partial<CreateInvestorPayload> {
    id: string;
    documentsToRemove?: string[];
}

export interface InvestorByPan {
    id:string;
    myaltCode: string;
    primaryPersonId: string;
    primaryPan: string;
    residentialStatus: string;
    subStatus: string | null;
    inceptionDate: string | null;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    primaryPerson: Person;
}

export interface HolderByPan {
    id?: string;
    holderOrder?: number;
    person: Person;
}

export type InvestorByPanResponse = SingleResponse<InvestorByPan>;
export type HolderByPanResponse = SingleResponse<HolderByPan>;
export type PersonResponse = SingleResponse<Person>;

export interface InvestorFilters {
    search?: string;
    page?: number;
    limit?: number;
}
