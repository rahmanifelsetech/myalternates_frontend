import { lazy } from 'react';
import { AppRouteConfig } from '@shared/types/route';

const Dashboard = lazy(() => import('@modules/investor/pages/Dashboard/Dashboard'));
const PmsPortfolio = lazy(() => import('@modules/investor/pages/Portfolio/PMS/PmsPortfolio'));
const MfPortfolio = lazy(() => import('@modules/investor/pages/Portfolio/MF/MfPortfolio'));
const SifPortfolio = lazy(() => import('@modules/investor/pages/Portfolio/SIF/SifPortfolio'));

export const investorRoutes: AppRouteConfig[] = [
  {
    key: 'dashboard',
    path: 'dashboard',
    component: Dashboard,
    authority: ['INVESTOR'],
  },
  {
    key: 'portfolio',
    path: 'portfolio',
    component: Dashboard,
    authority: ['INVESTOR'],
  },
  {
    key: 'portfolio-pms',
    path: 'portfolio/pms',
    component: PmsPortfolio,
    authority: ['INVESTOR'],
  },
  {
    key: 'portfolio-mf',
    path: 'portfolio/mf',
    component: MfPortfolio,
    authority: ['INVESTOR'],
  },
  {
    key: 'portfolio-sif',
    path: 'portfolio/sif',
    component: SifPortfolio,
    authority: ['INVESTOR'],
  },
  {
    key: 'portfolio-aif',
    path: 'portfolio/aif',
    component: Dashboard,
    authority: ['INVESTOR'],
  },
  {
    key: 'portfolio-gift',
    path: 'portfolio/gift',
    component: Dashboard,
    authority: ['INVESTOR'],
  },
  {
    key: 'transactions',
    path: 'transactions',
    component: Dashboard,
    authority: ['INVESTOR'],
  },
];
