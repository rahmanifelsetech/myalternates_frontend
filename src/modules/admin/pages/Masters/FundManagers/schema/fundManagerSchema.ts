import { z } from 'zod';

export const FundManagerSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  title: z.string().optional(),
  code: z.string().optional(),
  designation: z.string().optional(),
  amcId: z.string().optional(),
  about: z.string().optional(),
  experience: z.string().optional(),
  isFeatured: z.boolean().default(false),
  priorityOrder: z.coerce.number().default(0),
  isActive: z.boolean().default(true),
  profilePicture: z.any().optional(),
  fundManagerCreative: z.any().optional(),
});

export type FundManagerSchemaType = z.infer<typeof FundManagerSchema>;