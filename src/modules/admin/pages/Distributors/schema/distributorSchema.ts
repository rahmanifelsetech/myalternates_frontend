import * as z from 'zod';

export const DistributorSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    distributorCode: z.string().min(1, 'Distributor Code is required'),
    isActive: z.boolean().default(true),
});

export type DistributorSchemaType = z.infer<typeof DistributorSchema>;
