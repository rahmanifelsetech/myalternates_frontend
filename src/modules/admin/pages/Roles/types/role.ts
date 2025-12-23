import { PaginatedResponse, PaginationParams, SingleResponse, EmptyResponse } from '@shared/types/api';
import { Permission } from '../../Permissions/types/permission';

export interface RolePermission {
  roleId: string;
  permissionId: string;
  permission: Permission;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  slug?: string;
  permissions?: RolePermission[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateRolePayload {
  name: string;
  description?: string;
  permissions?: string[];
}

export interface UpdateRolePayload extends Partial<CreateRolePayload> {
  id: string;
}

export interface RoleFilters extends PaginationParams {
  search?: string;
}

export type RolesResponse = PaginatedResponse<Role>;

/**
 * Roles API Response Types
 */
export type CreateRoleResponse = SingleResponse<Role>;
export type UpdateRoleResponse = SingleResponse<Role>;
export type DeleteRoleResponse = EmptyResponse;
export type GetRolesResponse = PaginatedResponse<Role>;
