import { z } from 'zod';

const PersonAddressSchema = z.object({
    addressLine1: z.string().optional(),
    addressLine2: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    pincode: z.string().optional(),
    country: z.string().optional(),
});

export const HolderSchema = z.object({
    pan: z.string().min(1, 'PAN is required'),
    name: z.string().min(1, 'Name is required'),
    dob: z.string().min(1, 'DOB is required'),
    gender: z.string().min(1, 'Gender is required'),
    email: z.string().email('Valid email required').optional(),
    mobile: z.string().min(10, 'Valid mobile required').optional(),
    address: PersonAddressSchema.optional(),
    isMinor: z.boolean().optional(),
    guardian: z.object({
        fullName: z.string().optional(),
        idType: z.string().optional(),
        idNumber: z.string().optional(),
        relationship: z.string().optional(),
    }).optional(),
});

export const NomineeSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    idType: z.string().min(1, 'ID Type is required'),
    idNumber: z.string().min(1, 'ID Number is required'),
    relationship: z.string().min(1, 'Relationship is required'),
    percentage: z.coerce.number().min(0).max(100).optional(),
    isMinor: z.boolean().optional(),
    guardian: z.object({
        fullName: z.string().optional(),
        idType: z.string().min(1, 'Guardian ID Type is required').optional(),
        idNumber: z.string().optional(),
        relationship: z.string().optional(),
    }).optional(),
});

export const InvestmentFlowSchema = z.object({
    // Investor Status Fields (Top Level)
    investorMyaltCode: z.string().optional(),
    investorResidentialStatus: z.string().min(1, 'Residential Status is required'),
    investorSubStatus: z.string().optional(),

    // Product Details
    productId: z.uuid().min(1, 'Product is required'),
    amcId: z.string().min(1, 'AMC Name is required'),
    amcClientCode: z.string().optional(),
    schemeId: z.string().optional(),
    capitalCommitment: z.string().optional(),
    currency: z.string().optional(),
    fixedFee: z.string().optional(),
    variableFee: z.string().optional(),
    performanceFee: z.string().optional(),
    hurdleFee: z.string().optional(),
    drawdownNo: z.string().optional(),
    inceptionDate: z.string().optional(),
    amcSharing: z.string().optional(),

    // Internal Mapping
    cpId: z.string().optional(),
    cpName: z.string().optional(),
    cpCode: z.string().optional(),
    creId: z.string().optional(),
    creName: z.string().optional(),
    creCode: z.string().optional(),
    rmId: z.string().optional(),
    rmName: z.string().optional(),
    rmCode: z.string().optional(),
    fmId: z.string().optional(),
    fmName: z.string().optional(),
    fmCode: z.string().optional(),
    branchCode: z.string().optional(),

    // Drawdown Details
    drawdownNumber: z.string().optional(),
    paymentReference: z.string().optional(),
    drawdownAmount: z.string().optional(),
    drawdownPercentage: z.coerce.number().optional(),
    paymentDueDate: z.string().optional(),
    paymentReceivedDate: z.string().optional().nullable(),
    lateFee: z.coerce.number().optional(),
    nextDueDate: z.string().optional(),
    
    // Remarks
    remarks: z.string().optional(),

    // Holding Mode
    holdingMode: z.enum(['SINGLE', 'JOINT']),

    // Holders
    holders: z.array(HolderSchema).min(1, 'At least one holder is required'),

    // Nominees
    nominees: z.array(NomineeSchema),

    // Bank Selection
    bankId: z.string().nullable().optional(),
    bankName: z.string().min(1, 'Bank Name is required'),
    accountNumber: z.string().min(1, 'Account Number is required'),
    ifsc: z.string().min(1, 'IFSC is required'),
    accountType: z.string().min(1, 'Account Type is required'),

    // DP Details
    dpType: z.string().optional(),
    dpName: z.string().optional(),
    dpId: z.string().optional(),
    clientId: z.string().optional(),
    
    // KYC Uploads - stores uploaded document details with file paths
    kycDocuments: z.array(z.object({
        id: z.string().optional(),
        documentType: z.string(),
        fileName: z.string(),
        fileUrl: z.string(),
        fileSize: z.coerce.string().optional(),
        mimeType: z.string().optional(),
        personPan: z.string().optional(),
        holderIndex: z.number(),
    })).optional(),
});

export type InvestmentFlowSchemaType = z.infer<typeof InvestmentFlowSchema>;
export type HolderSchemaType = z.infer<typeof HolderSchema>;
export type NomineeSchemaType = z.infer<typeof NomineeSchema>;
