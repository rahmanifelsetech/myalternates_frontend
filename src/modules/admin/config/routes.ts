import { lazy } from 'react';
import { AppRouteConfig } from '@shared/types/route';

const Dashboard = lazy(() => import('@modules/admin/pages/Dashboard/Dashboard'));
const Roles = lazy(() => import('@modules/admin/pages/Roles/Roles'));
const Users = lazy(() => import('@modules/admin/pages/Users/Users'));
const Permissions = lazy(() => import('@modules/admin/pages/Permissions/Permission'));
const Products = lazy(() => import('@modules/admin/pages/Products/Product'));

export const adminRoutes: AppRouteConfig[] = [
  {
    key: 'dashboard',
    path: 'dashboard',
    component: Dashboard,
    authority: ['ADMIN'],
  },
  // {
  //   key: 'distributors',
  //   path: 'distributors',
  //   component: Dashboard,
  //   authority: ['ADMIN'],
  // },
  // {
  //   key: 'investors',
  //   path: 'investors',
  //   component: Dashboard,
  //   authority: ['ADMIN'],
  // },
  {
    key: 'users',
    path: 'users',
    component: Users,
    authority: ['ADMIN'],
  },
  {
    key: 'roles',
    path: 'roles',
    component: Roles,
    authority: ['ADMIN'],
  },
  {
    key: 'permissions',
    path: 'permissions',
    component: Permissions,
    authority: ['ADMIN'],
  },
  // {
  //   key: 'amcs',
  //   path: 'amcs',
  //   component: Dashboard,
  //   authority: ['ADMIN'],
  // },
  {
    key: 'products',
    path: 'products',
    component: Products,
    authority: ['ADMIN'],
  },
  // {
  //   key: 'transactions',
  //   path: 'transactions',
  //   component: Dashboard,
  //   authority: ['ADMIN'],
  // },
  // {
  //   key: 'reports',
  //   path: 'reports',
  //   component: Dashboard,
  //   authority: ['ADMIN'],
  // },
  // {
  //   key: 'settings',
  //   path: 'settings',
  //   component: Dashboard,
  //   authority: ['ADMIN'],
  // },
];
