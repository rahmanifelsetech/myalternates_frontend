import { lazy } from 'react';
import { AppRouteConfig } from '@shared/types/route';

const Dashboard = lazy(() => import('@shared/pages/Blank'));

export const investorRoutes: AppRouteConfig[] = [
  {
    key: 'dashboard',
    path: 'dashboard',
    component: Dashboard,
    authority: ['INVESTOR'],
  },
  // {
  //   key: 'portfolio',
  //   path: 'portfolio',
  //   component: Dashboard,
  //   authority: ['INVESTOR'],
  // },
  // {
  //   key: 'transactions',
  //   path: 'transactions',
  //   component: Dashboard,
  //   authority: ['INVESTOR'],
  // },
];
