import * as z from 'zod';
import { fileValidation } from '@/shared/utils/zodUtils';

export const FundManagerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  code: z.string().min(1, 'Code is required'),
  amcId: z.string().min(1, 'AMC is required'),
  designation: z.string().optional(),
  aum: z.preprocess(
    (a) => {
      if (a === "" || a === undefined || a === null) return undefined;
      if (typeof a === 'number') return a;
      return parseFloat(String(a));
    },
    z.number().optional()
  ),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  about: z.string().optional(),
  experience: z.string().optional(),
  profilePicture: fileValidation().optional(),
  fundManagerCreative: fileValidation().optional(),
  isFeatured: z.boolean().default(false),
  priorityOrder: z.coerce.number().optional().default(0),
  isActive: z.boolean().default(true),
});

export type FundManagerSchemaType = z.infer<typeof FundManagerSchema>;