import { z } from 'zod';

export const RoleSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  permissions: z.array(z.string()).optional(),
});

export type RoleSchemaType = z.infer<typeof RoleSchema>;
