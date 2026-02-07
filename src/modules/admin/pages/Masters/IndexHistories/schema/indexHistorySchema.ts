import { z } from 'zod';

export const IndexHistorySchema = z.object({
  indexCode: z.string().min(1, 'Index Code is required').max(50, 'Index Code must be less than 50 characters'),
  indexName: z.string().min(1, 'Index Name is required').max(100, 'Index Name must be less than 100 characters'),
  valuationDate: z.string().min(1, 'Valuation Date is required'),
  openValue: z.string().optional(),
  highValue: z.string().optional(),
  lowValue: z.string().optional(),
  closeValue: z.string().optional(),
});

export type IndexHistorySchemaType = z.infer<typeof IndexHistorySchema>;
