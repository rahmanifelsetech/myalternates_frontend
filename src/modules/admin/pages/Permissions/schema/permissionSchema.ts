import { z } from 'zod';

export const PermissionSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  resource: z.string().min(1, 'Resource is required'),
  action: z.string().min(1, 'Action is required'),
  description: z.string().optional(),
});

export type PermissionSchemaType = z.infer<typeof PermissionSchema>;
