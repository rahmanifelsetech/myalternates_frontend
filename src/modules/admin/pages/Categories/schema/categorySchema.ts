import { z } from 'zod';

export const CategorySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  slug: z.string().optional(),
  description: z.string().optional(),
  parentId: z.string().optional(),
  isActive: z.boolean().default(true),
});

export type CategorySchemaType = z.infer<typeof CategorySchema>;