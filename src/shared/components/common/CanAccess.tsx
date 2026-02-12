import React from 'react';
import { useAuth } from '@/modules/open/auth/hooks/useAuth';
import { canPerformAction, hasAnyPermission, hasAllPermissions } from '@shared/utils/permissionUtils';

interface CanAccessProps {
  children: React.ReactNode;
  module?: string;
  action?: string;
  any?: string[];
  all?: string[];
  fallback?: React.ReactNode;
}

export const CanAccess: React.FC<CanAccessProps> = ({ module, action, any, all, children, fallback = null }) => {
  const { user } = useAuth();

  let hasAccess = false;



  if (module && action) {
    hasAccess = canPerformAction(user, module, action);
  } else if (any) {
    hasAccess = hasAnyPermission(user, any);
  } else if (all) {
    hasAccess = hasAllPermissions(user, all);
  }

  return hasAccess ? <>{children}</> : <>{fallback}</>;
};