import * as z from 'zod';

export const NomineeSchema = z.object({
    id: z.string().optional(),
    investorId: z.string().optional(),
    name: z.string().min(1, 'Nominee Name is required'),
    idType: z.string().optional(),
    idNumber: z.string().optional(),
    relationship: z.string().optional(),
    isActive: z.boolean().default(true),
});

export type NomineeSchemaType = z.infer<typeof NomineeSchema>;
