import { PaginatedResponse, PaginationParams, SingleResponse, EmptyResponse } from '@shared/types/api';

export interface Permission {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  resource?: string;
  action?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreatePermissionPayload {
  name: string;
  slug?: string;
  description?: string;
  resource?: string;
  action?: string;
}

export interface UpdatePermissionPayload extends Partial<CreatePermissionPayload> {
  id: string;
}

export interface PermissionFilters extends PaginationParams {
  search?: string;
  resource?: string;
}

export type PermissionsResponse = PaginatedResponse<Permission>;

/**
 * Permissions API Response Types
 */
export type CreatePermissionResponse = SingleResponse<Permission>;
export type UpdatePermissionResponse = SingleResponse<Permission>;
export type DeletePermissionResponse = EmptyResponse;
export type GetPermissionsResponse = PaginatedResponse<Permission>;
