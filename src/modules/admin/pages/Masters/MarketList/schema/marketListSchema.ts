import { z } from 'zod';

export const marketListSchema = z.object({
  companyName: z.string().min(1, 'Company Name is required').max(255, 'Max 255 characters'),
  isinCode: z.string().min(1, 'ISIN Code is required').max(20, 'Max 20 characters'),
  categoryId: z.string().min(1, 'Category is required'),
  sector: z.string().min(1, 'Sector is required').max(100, 'Max 100 characters'),
  asOnDate: z.string().min(1, 'As On Date is required'),
});

export type MarketListSchemaType = z.infer<typeof marketListSchema>;
