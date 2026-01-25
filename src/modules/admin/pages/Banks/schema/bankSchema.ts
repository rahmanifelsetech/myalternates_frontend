import * as z from 'zod';

export const BankSchema = z.object({
    investorId: z.string().min(1, 'Investor is required'),
    bankName: z.string().min(1, 'Bank Name is required'),
    accountNumber: z.string().min(1, 'Account Number is required'),
    ifscCode: z.string().min(1, 'IFSC Code is required'),
    accountType: z.string().min(1, 'Account Type is required'),
    isActive: z.boolean().default(true),
});

export type BankSchemaType = z.infer<typeof BankSchema>;
