import { LazyExoticComponent, ComponentType } from 'react';

export interface AppRouteConfig {
  key: string;
  path: string;
  component: LazyExoticComponent<ComponentType<any>> | ComponentType<any>;
  authority?: string[];
  permissions?: string[];
  children?: AppRouteConfig[];
}
