import { z } from 'zod';

export const AssetClassSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255, 'Name must be less than 255 characters'),
  isActive: z.boolean().default(true),
});

export type AssetClassSchemaType = z.infer<typeof AssetClassSchema>;