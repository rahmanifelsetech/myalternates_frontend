import * as z from 'zod';

export const HolderSchema = z.object({
    investorId: z.string().min(1, 'Investor is required'),
    name: z.string().min(1, 'Name is required'),
    pan: z.string().min(10, 'PAN must be 10 characters').max(10, 'PAN must be 10 characters').optional(),
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
    guardianName: z.string().optional(),
    guardianIdType: z.string().optional(),
    guardianIdNumber: z.string().optional(),
    isActive: z.boolean().default(true),
});

export type HolderSchemaType = z.infer<typeof HolderSchema>;
