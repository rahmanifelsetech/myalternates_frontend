import { z } from 'zod';

const ScopeSchema = z.enum(['MASTER', 'INVESTMENT']);

const ScopedStringSchema = z.object({
    value: z.string().optional(),
    scope: ScopeSchema.default('INVESTMENT'),
});

const PersonAddressSchema = z.object({
    addressLine1: ScopedStringSchema,
    addressLine2: ScopedStringSchema,
    city: ScopedStringSchema,
    state: ScopedStringSchema,
    pincode: ScopedStringSchema,
    country: ScopedStringSchema,
});

export const HolderSchema = z.object({
    pan: ScopedStringSchema,
    name: ScopedStringSchema,
    dob: ScopedStringSchema,
    gender: ScopedStringSchema,
    email: ScopedStringSchema,
    mobile: ScopedStringSchema,
    address: PersonAddressSchema.optional(),
});

export const NomineeSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    idType: z.string().optional(),
    idNumber: z.string().optional(),
    relationship: z.string().optional(),
    percentage: z.number().min(0).max(100),
    isMinor: z.boolean().optional(),
    guardianName: z.string().optional(),
    guardianIdType: z.string().optional(),
    guardianIdNumber: z.string().optional(),
});

export const InvestmentFlowSchema = z.object({
    // Investor Status Fields (Top Level)
    investorMyaltCode: z.string().optional(),
    investorResidentialStatus: ScopedStringSchema,
    investorSubStatus: ScopedStringSchema,

    // Product Details
    productType: z.string().optional(),
    amcName: z.string().optional(),
    amcCode: z.string().optional(),
    amcClientCode: z.string().optional(),
    strategyName: z.string().optional(),
    strategyCode: z.string().optional(),
    scheme: z.string().optional(),
    capitalCommitment: z.number().optional(),
    currency: z.string().optional(),
    feeStructure: z.string().optional(),
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
    fmCode: z.string().optional(),
    branchCode: z.string().optional(),

    // Fee & Drawdown
    drawdownNo: z.string().optional(),
    paymentReferenceNo: z.string().optional(),
    drawdownAmount: z.number().optional(),
    drawdownPercentage: z.number().optional(),
    paymentDueDate: z.string().optional(),
    paymentReceivedDate: z.string().optional(),
    lateFee: z.number().optional(),
    nextDueDate: z.string().optional(),
    remarks: z.string().optional(),

    // Holding Mode
    holdingMode: z.enum(['SINGLE', 'JOINT']),

    // Holders
    holders: z.array(HolderSchema).min(1, 'At least one holder is required'),

    // Nominees
    nominees: z.array(NomineeSchema),

    // Bank Selection
    bankId: z.string().optional(),
    bankName: z.string().optional(),
    accountNumber: z.string().optional(),
    ifsc: z.string().optional(),
    accountType: z.string().optional(),

    // DP Details
    dpType: z.string().optional(),
    dpName: z.string().optional(),
    dpId: z.string().optional(),
    clientId: z.string().optional(),
    
    // KYC Uploads - will store document IDs
    kycDocuments: z.object({
        pan: z.any().optional(),
        addressProof: z.any().optional(),
        bankProof: z.any().optional(),
        others: z.any().optional(),
    }).optional(),
});

export type InvestmentFlowSchemaType = z.infer<typeof InvestmentFlowSchema>;
export type HolderSchemaType = z.infer<typeof HolderSchema>;
export type NomineeSchemaType = z.infer<typeof NomineeSchema>;
