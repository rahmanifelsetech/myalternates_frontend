import { RouteObject } from 'react-router';
import { lazy } from 'react';
import ProtectedRoute from '@shared/config/guards/ProtectedRoute';
import { RoleRedirector } from './RoleRedirector';
import { adminRoutes } from '@/modules/admin/config/routes';
import { investorRoutes } from '@/modules/investor/config/routes';
import { distributorRoutes } from '@/modules/distributor/config/routes';
import { openRoutes } from '@/modules/open/config/routes';

// Layouts
const AdminLayout = lazy(() => import('@modules/admin/layout/AdminLayout'));
const InvestorLayout = lazy(() => import('@modules/investor/layout/InvestorLayout'));
const DistributorLayout = lazy(() => import('@modules/distributor/layout/DistributorLayout'));

// Shared Pages
const ErrorPage = lazy(() => import('@/shared/pages/ErrorPage'));

const routes: RouteObject[] = [
  {
    path: '/auth',
    children: openRoutes.map((route) => ({
      path: route.path,
      element: <route.component />,
    })),
  },
  
  // 👨‍💼 Admin App Routes
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedApps={['ADMIN']}>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: adminRoutes.map((route) => ({
      path: route.path,
      element: <route.component />,
    })),
  },

  // 👤 Investor App Routes
  {
    path: '/investor',
    element: (
      <ProtectedRoute allowedApps={['INVESTOR']}>
        <InvestorLayout />
      </ProtectedRoute>
    ),
    children: investorRoutes.map((route) => ({
      path: route.path,
      element: <route.component />,
    })),
  },

  // 🤝 Distributor App Routes
  {
    path: '/distributor',
    element: (
      <ProtectedRoute allowedApps={['DISTRIBUTOR']}>
        <DistributorLayout />
      </ProtectedRoute>
    ),
    children: distributorRoutes.map((route) => ({
      path: route.path,
      element: <route.component />,
    })),
  },

  // 🔀 Root Redirect
  {
    path: '/',
    element: <RoleRedirector />,
  },

  {
    path: '/unauthorized',
    element: <ErrorPage type="403" />,
  },
  {
    path: '*',
    element: <ErrorPage type="404" />,
  },
];

export default routes;
