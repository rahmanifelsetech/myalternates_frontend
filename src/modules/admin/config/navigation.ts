import type { NavigationItem } from "@shared/types/navigation";

export const adminNavigation: NavigationItem[] = [
  {
    title: 'Dashboard',
    path: '/admin/dashboard',
    icon: 'grid',
    badge: undefined,
  },
  // {
  //   title: 'Distributors',
  //   path: '/admin/distributors',
  //   icon: 'bolt',
  // },
  // {
  //   title: 'Investors',
  //   path: '/admin/investors',
  //   icon: 'group',
  // },
  // {
  //   title: 'Users',
  //   path: '/admin/users',
  //   icon: 'userCircle',
  // },
  // {
  //   title: 'Roles',
  //   path: '/admin/roles',
  //   icon: 'lock',
  // },
  // {
  //   title: 'Permissions',
  //   path: '/admin/permissions',
  //   icon: 'checkLine',
  // },
  {
    title: 'Users',
    path: '/admin/users',
    icon: 'userCircle',
    children: [
      {
        title: 'Users',
        path: '/admin/users',
        icon: 'userCircle',
      },
      {
        title: 'Roles',
        path: '/admin/roles',
        icon: 'lock',
      },
      {
        title: 'Permissions',
        path: '/admin/permissions',
        icon: 'checkLine',
      },
    ],
  },
  // {
  //   title: 'Amc',
  //   path: '/admin/amcs',
  //   icon: 'briefcase',
  // },
  {
    title: 'Products',
    path: '/admin/products',
    icon: 'boxCube',
  },
  // {
  //   title: 'Transactions',
  //   path: '/admin/transactions',
  //   icon: 'dollarLine',
  // },
  // {
  //   title: 'Reports',
  //   path: '/admin/reports',
  //   icon: 'bar2',
  // },
  // {
  //   title: 'Settings',
  //   path: '/admin/settings',
  //   icon: 'settings',
  // },
];
