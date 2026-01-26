import { PERMISSIONS } from "@/shared/constants/permissions";
import { User } from "@/shared/types/user";
import { isAdmin } from "@/shared/utils/permissionUtils";
import type { NavigationItem } from "@shared/types/navigation";

export const adminNavigation: NavigationItem[] = [
  {
    title: 'Dashboard',
    path: '/admin/dashboard',
    icon: 'grid',
    badge: undefined,
  },
  {
    title: 'Products',
    path: '/admin/products',
    icon: 'boxCube',
    permissions: [PERMISSIONS.PRODUCTS.READ],
  },
  {
    title: 'Categories',
    path: '/admin/categories',
    icon: 'folder',
    permissions: [PERMISSIONS.MASTERS.CATEGORY_READ],
  },
  {
    title: 'Users',
    path: '/admin/users',
    icon: 'userCircle',
    permissions: [PERMISSIONS.USERS.READ],
    children: [
      {
        title: 'Users',
        path: '/admin/users',
        icon: 'userCircle',
        permissions: [PERMISSIONS.USERS.READ],
      },
      {
        title: 'Roles',
        path: '/admin/roles',
        icon: 'lock',
        permissions: [PERMISSIONS.ROLES.READ],
      },
      {
        title: 'Permissions',
        path: '/admin/permissions',
        icon: 'checkLine',
        permissions: [PERMISSIONS.PERMISSIONS.READ],
      },
    ],
  },
  {
    title: 'Investors',
    path: '/admin/investors',
    icon: 'group',
    permissions: [PERMISSIONS.INVESTORS.READ],
    // children: [
    //   {
    //     title: 'Banks',
    //     path: '/admin/banks',
    //     icon: 'creditCard',
    //     permissions: [PERMISSIONS.BANKS.READ],
    //   },
    //   {
    //     title: 'Holders',
    //     path: '/admin/holders',
    //     icon: 'user',
    //     permissions: [PERMISSIONS.HOLDERS.READ],
    //   },
    // ],
  },
  {
    title: 'Investments',
    path: '/admin/investments',
    icon: 'dollarLine',
    permissions: [PERMISSIONS.INVESTMENTS.READ],
  },
  {
    title: 'Masters',
    path: '/admin/masters/fund-managers',
    icon: 'plugIn',
    children: [
      { title: 'Fund Managers', path: '/admin/masters/fund-managers', icon: 'userCircle', permissions: [PERMISSIONS.MASTERS.FUND_MANAGER_READ] },
      { title: 'Asset Classes', path: '/admin/masters/asset-classes', icon: 'grid', permissions: [PERMISSIONS.MASTERS.ASSET_CLASS_READ] },
      { title: 'Benchmarks', path: '/admin/masters/benchmarks', icon: 'grid', permissions: [PERMISSIONS.MASTERS.BENCHMARK_READ] },
    ]
  },
  {
    title: 'AMCs',
    path: '/admin/amcs',
    icon: 'briefcase',
    permissions: [PERMISSIONS.AMCS.READ],
  },
//   @~S Good afternoon, this is Aquib from dev team, 
// in this sheet we have strategy code and in the api we have scheme code for schemes. due to this there were duplicate naming. 
  {
    title: 'Schemes',
    path: '/admin/schemes',
    icon: 'docs',
    permissions: [PERMISSIONS.SCHEMES.READ],
  },
  // {
  //   title: 'Logs',
  //   path: '/admin/uploads/logs',
  //   icon: 'list',
  // },
  {
    title: 'Data Upload',
    path: '/admin/uploads',
    icon: 'upload',
    permissions: [
      PERMISSIONS.DATA_UPLOAD.DAILY_VALUATION_READ,
      PERMISSIONS.DATA_UPLOAD.HOLDING_READ,
      PERMISSIONS.DATA_UPLOAD.MARKET_LIST_READ,
      PERMISSIONS.DATA_UPLOAD.TRANSACTION_READ,
      PERMISSIONS.DATA_UPLOAD.INDEX_HISTORY_READ,
    ],
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

export const getFilteredNavigation = (user: User | null): NavigationItem[] => {
  if (!user) return [];

  const userPermissions = user.permissions || [];

  if(isAdmin(user)) {
    return adminNavigation;
  }

  const filterItems = (items: NavigationItem[]): NavigationItem[] => {
    return items.reduce((acc: NavigationItem[], item) => {
      const hasAccess = !item.permissions || item.permissions.some(p => userPermissions.includes(p));

      if (hasAccess) {
        const newItem = { ...item };
        if (item.children) {
          newItem.children = filterItems(item.children);
          if (newItem.children.length > 0) {
            acc.push(newItem);
          }
        } else {
          acc.push(newItem);
        }
      }
      return acc;
    }, []);
  };

  // console.log("Filtered Navigation for user:", user.email, filterItems(adminNavigation));

  return filterItems(adminNavigation);
};

