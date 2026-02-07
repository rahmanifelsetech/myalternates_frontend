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
const MarketLists = lazy(() => import('@modules/admin/pages/Masters/MarketList/MarketList'));
const IndexHistories = lazy(() => import('@modules/admin/pages/Masters/IndexHistories/IndexHistories'))
const SchemeList = lazy(() => import('@modules/admin/pages/Schemes/SchemeList'));
const CreateScheme = lazy(() => import('@modules/admin/pages/Schemes/CreateScheme'));
const EditScheme = lazy(() => import('@modules/admin/pages/Schemes/EditScheme'));
const Uploads = lazy(() => import('@modules/admin/pages/Uploads/Uploads'));
// const DataProcessingHistory = lazy(() => import('@modules/admin/pages/Logs/DataProcessingHistory'));
const Amcs = lazy(() => import('@modules/admin/pages/Amcs/Amcs'));
const CreateAmc = lazy(() => import('@modules/admin/pages/Amcs/CreateAmc'));
const EditAmc = lazy(() => import('@modules/admin/pages/Amcs/EditAmc'));
const Investors = lazy(() => import('@modules/admin/pages/Investors/Investors'));
const InvestorDetail = lazy(() => import('@modules/admin/pages/Investors/InvestorDetail'));
const CreateInvestor = lazy(() => import('@modules/admin/pages/Investors/CreateInvestor'));
const EditInvestor = lazy(() => import('@modules/admin/pages/Investors/EditInvestor'));
const Banks = lazy(() => import('@modules/admin/pages/Banks/Banks'));
const CreateBank = lazy(() => import('@modules/admin/pages/Banks/CreateBank'));
const EditBank = lazy(() => import('@modules/admin/pages/Banks/EditBank'));
const Holders = lazy(() => import('@modules/admin/pages/Holders/Holders'));
const CreateHolder = lazy(() => import('@modules/admin/pages/Holders/CreateHolder'));
const EditHolder = lazy(() => import('@modules/admin/pages/Holders/EditHolder'));
const Distributors = lazy(() => import('@modules/admin/pages/Distributors/Distributors'));
const CreateDistributor = lazy(() => import('@modules/admin/pages/Distributors/CreateDistributor'));
const EditDistributor = lazy(() => import('@modules/admin/pages/Distributors/EditDistributor'));

export const adminRoutes: AppRouteConfig[] = [
  {
    key: 'dashboard',
    path: 'dashboard',
    component: Dashboard,
    authority: ['ADMIN'],
  },
  {
    key: 'distributors',
    path: 'distributors',
    component: Distributors,
    authority: ['ADMIN'],
  },
  {
    key: 'distributors-create',
    path: 'distributors/create',
    component: CreateDistributor,
    authority: ['ADMIN'],
  },
  {
    key: 'distributors-edit',
    path: 'distributors/edit/:id',
    component: EditDistributor,
    authority: ['ADMIN'],
  },
  // {
  //   key: 'investors',
  //   path: 'investors',
  //   component: Dashboard,
  //   authority: ['ADMIN'],
  // },
  {
    key: 'investments',
    path: 'investments',
    component: lazy(() => import('@modules/admin/pages/Investments/Investments')),
    authority: ['ADMIN'],
  },
  {
    key: 'investments-create',
    path: 'investments/create',
    component: lazy(() => import('@modules/admin/pages/Investments/CreateInvestment')),
    authority: ['ADMIN'],
  },
  {
    key: 'investments-edit',
    path: 'investments/edit/:id',
    component: lazy(() => import('@modules/admin/pages/Investments/EditInvestment')),
    authority: ['ADMIN'],
  },
  {
    key: 'investors',
    path: 'investors',
    component: Investors,
    authority: ['ADMIN'],
  },
  {
    key: 'investors-create',
    path: 'investors/create',
    component: CreateInvestor,
    authority: ['ADMIN'],
  },
  {
    key: 'investors-edit',
    path: 'investors/edit/:id',
    component: EditInvestor,
    authority: ['ADMIN'],
  },
  {
    key: 'investors-detail',
    path: 'investors/:id',
    component: InvestorDetail,
    authority: ['ADMIN'],
  },
  {
    key: 'banks',
    path: 'banks',
    component: Banks,
    authority: ['ADMIN'],
  },
  {
    key: 'banks-create',
    path: 'banks/create',
    component: CreateBank,
    authority: ['ADMIN'],
  },
  {
    key: 'banks-edit',
    path: 'banks/edit/:id',
    component: EditBank,
    authority: ['ADMIN'],
  },
  {
    key: 'holders',
    path: 'holders',
    component: Holders,
    authority: ['ADMIN'],
  },
  {
    key: 'holders-create',
    path: 'holders/create',
    component: CreateHolder,
    authority: ['ADMIN'],
  },
  {
    key: 'holders-edit',
    path: 'holders/edit/:id',
    component: EditHolder,
    authority: ['ADMIN'],
  },
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
    key: 'market-list',
    path: 'masters/market-list',
    component: MarketLists,
    authority: ['ADMIN'],
  },
  {
    key: 'index-history',
    path: 'masters/index-history',
    component: IndexHistories,
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
  // {
  //   key: 'data-processing-history',
  //   path: 'logs/data-processing-history',
  //   component: DataProcessingHistory,
  //   authority: ['ADMIN'],
  // },
  {
    key: 'edit-scheme',
    path: 'schemes/edit/:id',
    component: EditScheme,
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

