/**
 * User & Auth Types
 */

export type DefaultUserRole = 'ADMIN' | 'INVESTOR' | 'DISTRIBUTOR';
export type UserRole = DefaultUserRole | string;

export interface Permission {
  id: string;
  name: string;
  description?: string;
  module: string;
  action: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  appType: 'ADMIN' | 'INVESTOR' | 'DISTRIBUTOR';
  permissions?: Permission[];
  avatar?: string;
  phone?: string;
  isActive: boolean;
  lastLoginAt?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken?: string | null;
  loading: boolean;
  error: string | null;
}
