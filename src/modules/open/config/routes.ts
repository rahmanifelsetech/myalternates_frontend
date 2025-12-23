import { lazy } from 'react';
import { AppRouteConfig } from '@shared/types/route';

const SignIn = lazy(() => import('@/modules/open/auth/pages/SignIn'));
const SignUp = lazy(() => import('@/modules/open/auth/pages/SignUp'));

export const openRoutes: AppRouteConfig[] = [
  {
    key: 'signin',
    path: 'signin',
    component: SignIn,
  },
  {
    key: 'signup',
    path: 'signup',
    component: SignUp,
  },
];
