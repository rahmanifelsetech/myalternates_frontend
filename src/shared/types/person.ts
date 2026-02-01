export interface Person {
    id: string;
    firstName: string;
    lastName: string;
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
    addresses?: PersonAddresses[]
    kycDocuments?: KYCDocument[];
}

export interface PersonAddresses {
    id?: string;
    personId?: string;
    address1: string | null;
    address2: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    pincode: string | null;
    isPrimary?: boolean;
}

export interface KYCDocument {
    id: string;
    personId: string;
    documentType: string;
    fileUrl: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
    status?: string | null;
    verifiedAt?: string | null;
    uploadedAt: string;
}