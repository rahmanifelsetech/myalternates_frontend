import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '@/modules/open/auth/hooks/useAuth';
import appConfig from '@shared/config/app.config';

export const RoleRedirector = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      navigate(appConfig.unAuthenticatedEntryPath, { state: { from: location } });
      return;
    }

    console.log('RoleRedirector - user:', user);

    if (user) {
      // Check 'appType' field first (Admin | Investor | Distributor)
      if (user.appType === 'ADMIN') {
        navigate('/admin/dashboard');
      } else if (user.appType === 'INVESTOR') {
        navigate('/investor/dashboard');
      } else if (user.appType === 'DISTRIBUTOR') {
        navigate('/distributor/dashboard');
      } else {
        // Fallback based on roles if appType is missing or unexpected
        if (user.role.toUpperCase() === 'ADMIN' || user.role === 'EMPLOYEE') {
           navigate('/admin/dashboard');
        } else if (user.role.toUpperCase() === 'INVESTOR') {
           navigate('/investor/dashboard');
        } else if (user.role.toUpperCase() === 'DISTRIBUTOR') {
           navigate('/distributor/dashboard');
        } else {
           navigate('/unauthorized');
        }
      }
    }
  }, [user, isAuthenticated, loading, navigate, location]);

  return null; // Or a loading spinner
};
