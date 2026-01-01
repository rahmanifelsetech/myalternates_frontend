import { lazy } from 'react';
import { AppRouteConfig } from '@shared/types/route';

const SignIn = lazy(() => import('@/modules/open/auth/pages/SignIn'));
const SignUp = lazy(() => import('@/modules/open/auth/pages/SignUp'));
const ChangePassword = lazy(() => import('@/modules/open/auth/pages/ChangePassword'));
const ForgotPassword = lazy(() => import('@/modules/open/auth/pages/ForgotPassword'));

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
  {
    key: 'change-password',
    path: 'change-password',
    component: ChangePassword,
  },
  {
    key: 'forgot-password',
    path: 'forgot-password',
    component: ForgotPassword,
  }
  
];
