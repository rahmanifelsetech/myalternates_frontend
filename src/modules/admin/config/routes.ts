import { lazy } from 'react';
import { AppRouteConfig } from '@shared/types/route';

const Dashboard = lazy(() => import('@modules/admin/pages/Dashboard/Dashboard'));
const Roles = lazy(() => import('@modules/admin/pages/Roles/Roles'));
const Users = lazy(() => import('@modules/admin/pages/Users/Users'));
const Permissions = lazy(() => import('@modules/admin/pages/Permissions/Permission'));
const Products = lazy(() => import('@modules/admin/pages/Products/Product'));
const Categories = lazy(() => import('@modules/admin/pages/Categories/Categories'));
const AssetClasses = lazy(() => import('@modules/admin/pages/Masters/AssetClasses/AssetClasses'));
const BenchmarkIndices = lazy(() => import('@modules/admin/pages/Masters/BenchmarkIndices/BenchmarkIndices'));
const FundManagers = lazy(() => import('@modules/admin/pages/Masters/FundManagers/FundManagers'));
const SchemeList = lazy(() => import('@modules/admin/pages/Schemes/SchemeList'));
const CreateScheme = lazy(() => import('@modules/admin/pages/Schemes/CreateScheme'));
const Uploads = lazy(() => import('@modules/admin/pages/Uploads/Uploads'));
const Amcs = lazy(() => import('@modules/admin/pages/Amcs/Amcs'));
const CreateAmc = lazy(() => import('@modules/admin/pages/Amcs/CreateAmc'));
const EditAmc = lazy(() => import('@modules/admin/pages/Amcs/EditAmc'));

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
  {
    key: 'categories',
    path: 'categories',
    component: Categories,
    authority: ['ADMIN'],
  },
  {
    key: 'asset-classes',
    path: 'masters/asset-classes',
    component: AssetClasses,
    authority: ['ADMIN'],
  },
  {
    key: 'benchmarks',
    path: 'masters/benchmarks',
    component: BenchmarkIndices,
    authority: ['ADMIN'],
  },
  {
    key: 'fund-managers',
    path: 'masters/fund-managers',
    component: FundManagers,
    authority: ['ADMIN'],
  },
  {
    key: 'amcs',
    path: 'amcs',
    component: Amcs,
    authority: ['ADMIN'],
  },
  {
    key: 'amcs-create',
    path: 'amcs/create',
    component: CreateAmc,
    authority: ['ADMIN'],
  },
  {
    key: 'amcs-edit',
    path: 'amcs/edit/:id',
    component: EditAmc,
    authority: ['ADMIN'],
  },
  {
    key: 'schemes',
    path: 'schemes',
    component: SchemeList,
    authority: ['ADMIN'],
  },
  {
    key: 'create-scheme',
    path: 'schemes/create',
    component: CreateScheme,
    authority: ['ADMIN'],
  },
  {
    key: 'uploads',
    path: 'uploads',
    component: Uploads,
    authority: ['ADMIN'],
  },
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
