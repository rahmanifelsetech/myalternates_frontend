/**
 * User & Auth Types
 */


export type DefaultUserRole = 'ADMIN' | 'INVESTOR' | 'DISTRIBUTOR';
export type UserRole = DefaultUserRole | string;

export interface Permission {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  module: string;
  action: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Role {
  id: string;
  name: string;
  permissions?: Permission[];
}

export interface Person {
  id: string;
  fullName?: string;
  pan?: string;
  dob?: string;
  mobile?: string;
  email?: string;
  gender?: string;
  isMinor?: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  appType: 'ADMIN' | 'INVESTOR' | 'DISTRIBUTOR';
  permissions?: string[];
  avatar?: string;
  personId: string;
  person?: Person | null;
  phone?: string;
  isActive: boolean;
  lastLoginAt?: string;
  requiresPasswordChange?: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken?: string | null;
  loading: boolean;
  error: string | null;
}
