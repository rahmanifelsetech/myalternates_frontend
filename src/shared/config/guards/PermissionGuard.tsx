import React from 'react';
import { Navigate } from 'react-router';
import { useAppSelector } from '@shared/hooks/useRedux';
import { isAdmin } from '@shared/utils/permissionUtils';

interface PermissionGuardProps {
  children: React.ReactNode;
  requiredPermissions?: string[];
  requiredRoles?: string[];
  requireAll?: boolean;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

/**
 * Dynamic Permission Guard - Handles permission-based access control
 * Supports:
 * - Dynamic permissions (any role/permission)
 * - Role-based access
 * - Flexible matching (some/all)
 * - Custom fallback UI or redirect
 */
const PermissionGuard: React.FC<PermissionGuardProps> = ({
  children,
  requiredPermissions = [],
  requiredRoles = [],
  requireAll = false,
  fallback = null,
  redirectTo = '/unauthorized',
}) => {
  const { user } = useAppSelector((state: any) => state.auth);

  console.log("PermissionGuard - user:", user);

  if (!user) {
    return redirectTo ? <Navigate to={redirectTo} replace /> : fallback;
  }

  // Check roles if specified
  if (requiredRoles.length > 0) {
    const hasRole = requiredRoles.includes(user.role);
    if (!hasRole) {
      return redirectTo ? <Navigate to={redirectTo} replace /> : fallback;
    }
  }

  // Check permissions if specified
  if (requiredPermissions.length > 0) {
    // Admin has full access, bypass permission checks
    if (!isAdmin(user)) {
      if (!user.permissions || user.permissions.length === 0) {
        return redirectTo ? <Navigate to={redirectTo} replace /> : fallback;
      }

      const userPermissions = user.permissions.map((p: any) => p.name || p);

      const hasPermission = requireAll
        ? requiredPermissions.every((permission) => userPermissions.includes(permission))
        : requiredPermissions.some((permission) => userPermissions.includes(permission));

      if (!hasPermission) {
        return redirectTo ? <Navigate to={redirectTo} replace /> : fallback;
      }
    }
  }

  return <>{children}</>;
};

export default PermissionGuard;
