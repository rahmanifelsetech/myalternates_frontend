import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '@/modules/open/auth/hooks/useAuth';

type UserRole = 'ADMIN' | 'DISTRIBUTOR' | 'INVESTOR' | string;

interface RoleBasedRouteProps {
  children: React.ReactNode;
  requiredRoles: UserRole[];
  fallback?: React.ReactNode;
}

/**
 * Role-Based Route Guard
 * Supports:
 * - Default roles: ADMIN, INVESTOR, DISTRIBUTOR, EMPLOYEE
 * - Dynamic roles (any string)
 * - Custom fallback UI
 */
const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ 
  children, 
  requiredRoles,
  fallback = undefined
}) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/signin" replace />;
  }

  // Support both static and dynamic roles
  if (!requiredRoles.includes(user.role)) {
    return fallback || <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default RoleBasedRoute;
