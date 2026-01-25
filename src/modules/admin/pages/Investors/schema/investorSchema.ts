import * as z from 'zod';
import { BankSchema } from './bankSchema';

import { HolderSchema } from './holderSchema';
import { NomineeSchema } from './nomineeSchema';

export const InvestorSchema = z.object({
    myaltCode: z.string().optional(),
    name: z.string().min(1, 'Name is required'),
    pan: z.string().min(10, 'PAN must be 10 characters').max(10, 'PAN must be 10 characters'),
    dateOfBirth: z.string().optional(),
    gender: z.string().optional(),
    mobile: z.string().optional(),
    email: z.string().email('Invalid email address').optional().or(z.literal('')),
    address1: z.string().optional(),
    address2: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    pincode: z.string().optional(),
    residentialStatus: z.string().min(1, 'Residential Status is required'),
    subStatus: z.string().optional(),
    guardianName: z.string().optional(),
    guardianIdType: z.string().optional(),
    guardianIdNumber: z.string().optional(),
    isActive: z.boolean().default(true),
    banks: z.array(BankSchema).optional(),
    holders: z.array(HolderSchema).optional(),
    nominees: z.array(NomineeSchema).optional(),
    pan_doc: z.any().optional(),
    aadhaar_doc: z.any().optional(),
    passport_doc: z.any().optional(),
    address_proof_doc: z.any().optional(),
    bank_proof_doc: z.any().optional(),
    other_doc: z.any().optional(),
});

export type InvestorSchemaType = z.infer<typeof InvestorSchema>;
