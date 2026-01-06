import { PaginatedResponse, PaginationParams, SingleResponse, EmptyResponse } from '@shared/types/api';
import { Role } from '../../Roles/types/role';
import { UserSchema } from '../schema/userSchema';
import z from 'zod';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  countryCode?: string;
  roleId?: string;
  role?: Role;
  userCode: string;
  username: string;
  // status?: 'active' | 'Inactive' | 'suspended';
  isActive: boolean;
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateUserPayload = z.infer<typeof UserSchema>;

export interface UpdateUserPayload extends z.infer<typeof UserSchema> {
  id: string;
}

export interface UserFilters extends PaginationParams {
  search?: string;
  roleId?: string;
  status?: string;
}

export type UsersResponse = PaginatedResponse<User>;

/**
 * Users API Response Types
 */
export type CreateUserResponse = SingleResponse<User>;
export type UpdateUserResponse = SingleResponse<User>;
export type DeleteUserResponse = EmptyResponse;
export type GetUsersResponse = PaginatedResponse<User>;
