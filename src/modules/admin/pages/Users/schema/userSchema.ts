import { z } from 'zod';

export const UserSchema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  userCode: z.string().min(3, 'User Code must be at least 3 characters'),
  isActive: z.boolean(),
  email: z.email('Invalid email address'),
  // password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  countryCode: z.string().min(1, 'Country code is required'),
  roleId: z.string().min(6, 'Role is required'),
});

export type UserSchemaType = z.infer<typeof UserSchema>;
