import * as z from 'zod';

export const DistributorSchema = z.object({
    // Basic Details
    name: z.string().min(1, 'Name is required'),
    code: z.string().min(1, 'Distributor Code is required'),
    type: z.string().min(1, 'Type is required'),
    category: z.string().min(1, 'Category is required'),
    parentDistributorId: z.string().optional().nullable(),
    relationshipManagerId: z.string().min(1, 'Relationship Manager is required'),
    isActive: z.boolean().default(true),

    // Contact Details
    email: z.string().email('Invalid email').min(1, 'Email is required'),
    contactNo: z.string().min(1, 'Contact Number is required'),
    
    // Tax Details
    panNo: z.string().min(1, 'PAN is required'),
    tanNo: z.string().optional().nullable(),
    gstType: z.string().optional().nullable(),
    gstNo: z.string().optional().nullable(),

    // Address
    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    country: z.string().min(1, 'Country is required'),
    pincode: z.string().min(1, 'Pincode is required'),

    // Financials
    totalAum: z.coerce.number().optional().nullable(),
    commission: z.coerce.number().optional().nullable(),
    dateOfAgreement: z.string().optional().nullable(),

    // Bank Details
    bankName: z.string().min(1, 'Bank Name is required'),
    bankAccountName: z.string().min(1, 'Account Name is required'),
    bankAccountNo: z.string().min(1, 'Account Number is required'),
    ifscCode: z.string().min(1, 'IFSC Code is required'),
    micrCode: z.string().optional().nullable(),

    // Registration Details
    apmiRegNo: z.string().optional().nullable(),
    apmiEuinNo: z.string().optional().nullable(),
    nismCertNo: z.string().optional().nullable(),
    amfiRegNo: z.string().optional().nullable(),
    amfiEuinNo: z.string().optional().nullable(),

    // Documents
    kyc_doc: z.any().optional(),
    pan_doc: z.any().optional(),
    address_proof_doc: z.any().optional(),
    bank_proof_doc: z.any().optional(),
    other_doc: z.any().optional(),
    
    documentsToRemove: z.array(z.string()).optional(),
});

export type DistributorSchemaType = z.infer<typeof DistributorSchema>;
