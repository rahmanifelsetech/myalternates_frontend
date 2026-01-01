import { lazy } from 'react';
import { AppRouteConfig } from '@shared/types/route';

const Dashboard = lazy(() => import('@shared/pages/Blank'));

export const distributorRoutes: AppRouteConfig[] = [
  {
    key: 'dashboard',
    path: 'dashboard',
    component: Dashboard,
    authority: ['DISTRIBUTOR'],
  },
  // {
  //   key: 'investors',
  //   path: 'investors',
  //   component: Dashboard,
  //   authority: ['DISTRIBUTOR'],
  // },
  // {
  //   key: 'commissions',
  //   path: 'commissions',
  //   component: Dashboard,
  //   authority: ['DISTRIBUTOR'],
  // },
];
