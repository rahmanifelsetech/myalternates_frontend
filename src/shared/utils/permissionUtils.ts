/**
 * Permission and Role Utilities
 * Handle dynamic permission and role checking throughout the app
 */

import { User, UserRole } from "@shared/types/user";

/**
 * Check if user has a specific role
 * Supports both default and dynamic roles
 */
export const hasRole = (user: User | null, role: UserRole): boolean => {
  if (!user) return false;
  return user.role === role;
};

/**
 * Check if user has any of the specified roles
 */
export const hasAnyRole = (user: User | null, roles: UserRole[]): boolean => {
  if (!user) return false;
  return roles.includes(user.role);
};

/**
 * Check if user has all of the specified roles (usually just one unless multi-role system)
 */
export const hasAllRoles = (user: User | null, roles: UserRole[]): boolean => {
  if (!user) return false;
  return roles.every(role => user.role === role);
};

/**
 * Get user's permissions (handles missing/null)
 */
export const getUserPermissions = (user: User | null): string[] => {
  return user?.permissions || [];
};

/**
 * Check if user is an admin
 */
export const isAdmin = (user: User | null): boolean => {
  return hasRole(user, 'ADMIN') || hasRole(user, 'Admin');
};

/**
 * Check if user has a specific permission by name
 */
export const hasPermission = (user: User | null, permissionName: string): boolean => {
  if (!user) return false;
  if (isAdmin(user)) return true;
  if (!user.permissions) return false;
  return user.permissions.includes(permissionName);
};

/**
 * Check if user has any of the specified permissions
 */
export const hasAnyPermission = (user: User | null, permissions: string[]): boolean => {
  if (!user) return false;
  if (isAdmin(user)) return true;
  if (!user.permissions) return false;
  return permissions.some(perm => user.permissions!.includes(perm));
};

/**
 * Check if user has all of the specified permissions
 */
export const hasAllPermissions = (user: User | null, permissions: string[]): boolean => {
  if (!user) return false;
  if (isAdmin(user)) return true;
  if (!user.permissions) return false;
  return permissions.every(perm => user.permissions!.includes(perm));
};

/**
 * Get permissions for a specific module/action
 */
export const getModulePermissions = (user: User | null, module: string): string[] => {
  if (!user || !user.permissions) return [];
  
  return user.permissions.filter((p: string) => {
    if (p && p.includes('.')) {
      const [pModule] = p.split('.');
      return pModule === module;
    }
    return false;
  });
};

/**
 * Check if user can perform an action on a module
 */
export const canPerformAction = (user: User | null, module: string, action: string): boolean => {
  if (!user) return false;
  if (isAdmin(user)) return true;
  if (!user.permissions) return false;

  const permissionString = `${module}.${action}`;
  return user.permissions.includes(permissionString);
};

/**
 * Check if user is an investor
 */
export const isInvestor = (user: User | null): boolean => {
  return hasRole(user, 'INVESTOR');
};

/**
 * Check if user is a distributor
 */
export const isDistributor = (user: User | null): boolean => {
  return hasRole(user, 'DISTRIBUTOR');
};


/**
 * Check if user is active
 */
export const isUserActive = (user: User | null): boolean => {
  return user ? user.isActive : false;
};

export default {
  hasRole,
  hasAnyRole,
  hasAllRoles,
  getUserPermissions,
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  getModulePermissions,
  canPerformAction,
  isAdmin,
  isInvestor,
  isDistributor,
  isUserActive,
};
