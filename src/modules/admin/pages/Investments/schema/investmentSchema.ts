import * as z from 'zod';

const HolderSchema = z.object({
    id: z.string().optional(),
    investorId: z.string().optional(),
    holderName: z.string().min(1, 'Holder Name is required'),
    pan: z.string().min(10, 'PAN must be 10 characters').max(10, 'PAN must be 10 characters'),
    myaltCode: z.string().optional(),
    dob: z.string().optional(),
    gender: z.string().optional(),
    mobile: z.string().optional(),
    email: z.string().email('Invalid email address').optional().or(z.literal('')),
    address1: z.string().optional(),
    address2: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    pincode: z.string().optional(),
});

const NomineeSchema = z.object({
    id: z.string().optional(),
    investorId: z.string().optional(),
    name: z.string().min(1, 'Nominee Name is required'),
    idType: z.string().optional(),
    idNumber: z.string().optional(),
    relationship: z.string().optional(),
    isActive: z.boolean().default(true),
});

const GuardianSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, 'Guardian Name is required'),
    idType: z.string().optional(),
    idNumber: z.string().optional(),
});

export const InvestmentSchema = z.object({
    investorId: z.string().min(1, 'Investor is required'),
    productId: z.string().min(1, 'Product is required'),
    capitalCommitment: z.coerce.number().optional(),
    amcId: z.string().min(1, 'AMC Name is required'),
    amcCode: z.string().min(1, 'AMC Code is required'),
    amcClientCode: z.string().min(1, 'AMC Client Code is required'),
    inceptionDate: z.string().optional(),
    modeOfHolding: z.string().min(1, 'Mode of Holdings is required'),
    amcSharing: z.string().optional(),
    schemeId: z.string().min(1, 'Scheme Name is required'),
    schemeCode: z.string().min(1, 'Scheme Code is required'),
    cpId: z.string().min(1, 'CP Name is required'),
    cpCode: z.string().min(1, 'CP Code is required'),
    creId: z.string().optional(),
    creCode: z.string().optional(),
    rmId: z.string().optional(),
    rmCode: z.string().optional(),
    fmCode: z.string().optional(),
    branchCode: z.string().optional(),
    holders: z.array(HolderSchema),
    dpType: z.string().optional(),
    dpName: z.string().optional(),
    dpId: z.string().optional(),
    clientId: z.string().optional(),
    bankId: z.string().optional(),
    bankName: z.string().optional(),
    accountNumber: z.string().optional(),
    ifscCode: z.string().optional(),
    accountType: z.string().optional(),
    nominees: z.array(NomineeSchema),
    guardian: GuardianSchema.optional(),
});

export type InvestmentSchemaType = z.infer<typeof InvestmentSchema>;
