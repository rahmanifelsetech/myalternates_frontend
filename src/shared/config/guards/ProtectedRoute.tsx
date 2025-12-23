import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '@/modules/open/auth/hooks/useAuth';
import { hasAnyRole } from '@shared/utils/permissionUtils';
import { UserRole } from '@shared/types/user';
import appConfig from '../app.config';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  allowedApps?: string[]; // 'Admin' | 'Investor' | 'Distributor'
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles, allowedApps }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={appConfig.unAuthenticatedEntryPath} replace />;
  }

  // Check App access
  if (allowedApps && user && !allowedApps.includes(user.appType)) {
     return <Navigate to="/unauthorized" replace />;
  }

  // Check Role access (if strict roles are required)
  if (allowedRoles && user && !hasAnyRole(user, allowedRoles as UserRole[])) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
