/**
 * Permission UI Configuration
 * 
 * ⚠️ CLIENT-SIDE UI HELPER ONLY
 * 
 * This file groups and labels permissions for UI display purposes.
 * It helps organize the permission selection interface when creating/editing roles.
 */

export interface PermissionUI {
  slug: string;
  label: string;
  description?: string;
}

export interface PermissionGroupUI {
  label: string;
  description?: string;
  permissions: PermissionUI[];
}

export const PERMISSIONS = {
  USERS: {
    CREATE: 'users.create',
    READ: 'users.read',
    UPDATE: 'users.update',
    DELETE: 'users.delete',
    ASSIGN: 'users.manage_roles',
  },
  ROLES: {
    CREATE: 'roles.create',
    READ: 'roles.read',
    UPDATE: 'roles.update',
    DELETE: 'roles.delete',
    ASSIGN: 'roles.manage_permissions',
  },
  PERMISSIONS: {
    CREATE: 'permissions.create',
    READ: 'permissions.read',
    UPDATE: 'permissions.update',
    DELETE: 'permissions.delete',
  },
  PRODUCTS: {
    CREATE: 'products.create',
    READ: 'products.read',
    UPDATE: 'products.update',
    DELETE: 'products.delete',
  },
  DATA_UPLOAD: {
    DAILY_VALUATION_CREATE: 'data_upload.daily_valuation.create',
    HOLDING_CREATE: 'data_upload.holding.create',
    MARKET_LIST_CREATE: 'data_upload.market_list.create',
    TRANSACTION_CREATE: 'data_upload.transaction.create',
    INDEX_HISTORY_CREATE: 'data_upload.index_history.create',
    DAILY_VALUATION_READ: 'data_upload.daily_valuation.read',
    HOLDING_READ: 'data_upload.holding.read',
    MARKET_LIST_READ: 'data_upload.market_list.read',
    TRANSACTION_READ: 'data_upload.transaction.read',
    INDEX_HISTORY_READ: 'data_upload.index_history.read',
  },
  MASTERS: {
    ASSET_CLASS_CREATE: 'masters.asset_class.create',
    ASSET_CLASS_READ: 'masters.asset_class.read',
    ASSET_CLASS_UPDATE: 'masters.asset_class.update',
    ASSET_CLASS_DELETE: 'masters.asset_class.delete',
    BENCHMARK_CREATE: 'masters.benchmark.create',
    BENCHMARK_READ: 'masters.benchmark.read',
    BENCHMARK_UPDATE: 'masters.benchmark.update',
    BENCHMARK_DELETE: 'masters.benchmark.delete',
    FUND_MANAGER_CREATE: 'masters.fund_manager.create',
    FUND_MANAGER_READ: 'masters.fund_manager.read',
    FUND_MANAGER_UPDATE: 'masters.fund_manager.update',
    FUND_MANAGER_DELETE: 'masters.fund_manager.delete',
    CATEGORY_CREATE: 'masters.category.create',
    CATEGORY_READ: 'masters.category.read',
    CATEGORY_UPDATE: 'masters.category.update',
    CATEGORY_DELETE: 'masters.category.delete',
  },
  SCHEMES: {
    CREATE: 'schemes.create',
    READ: 'schemes.read',
    UPDATE: 'schemes.update',
    DELETE: 'schemes.delete',
  },
  AMCS: {
    CREATE: 'amcs.create',
    READ: 'amcs.read',
    UPDATE: 'amcs.update',
    DELETE: 'amcs.delete',
  },
};

export const PERMISSION_GROUPS: Record<string, PermissionGroupUI> = {
  users: {
    label: 'User Management',
    description: 'Manage user accounts and access',
    permissions: [
      { slug: PERMISSIONS.USERS.CREATE, label: 'Create User', description: 'Allows creating new users.' },
      { slug: PERMISSIONS.USERS.READ, label: 'View Users', description: 'Allows viewing user information.' },
      { slug: PERMISSIONS.USERS.UPDATE, label: 'Update User', description: 'Allows updating user information.' },
      { slug: PERMISSIONS.USERS.DELETE, label: 'Delete User', description: 'Allows deleting users.' },
      { slug: PERMISSIONS.USERS.ASSIGN, label: 'Manage Roles', description: 'Allows assigning and revoking roles for users.' },
    ],
  },

  roles: {
    label: 'Role Management',
    description: 'Manage roles and their permissions',
    permissions: [
      { slug: PERMISSIONS.ROLES.CREATE, label: 'Create Role', description: 'Allows creating new roles.' },
      { slug: PERMISSIONS.ROLES.READ, label: 'View Roles', description: 'Allows viewing role information.' },
      { slug: PERMISSIONS.ROLES.UPDATE, label: 'Update Role', description: 'Allows updating role information.' },
      { slug: PERMISSIONS.ROLES.DELETE, label: 'Delete Role', description: 'Allows deleting roles.' },
      { slug: PERMISSIONS.ROLES.ASSIGN, label: 'Manage Permissions', description: 'Allows assigning and revoking permissions for roles.' },
    ],
  },

  permissions: {
    label: 'Permission Management',
    description: 'View available system permissions',
    permissions: [
      { slug: PERMISSIONS.PERMISSIONS.CREATE, label: 'Create Permission', description: 'Allows creating new permissions.' },
      { slug: PERMISSIONS.PERMISSIONS.READ, label: 'View Permissions', description: 'Allows viewing available permissions.' },
      { slug: PERMISSIONS.PERMISSIONS.UPDATE, label: 'Update Permission', description: 'Allows updating permission information.' },
      { slug: PERMISSIONS.PERMISSIONS.DELETE, label: 'Delete Permission', description: 'Allows deleting permissions.' },
    ],
  },

  products: {
    label: 'Product Management',
    description: 'Manage product catalog',
    permissions: [
      { slug: PERMISSIONS.PRODUCTS.CREATE, label: 'Create Product', description: 'Allows creating new products.' },
      { slug: PERMISSIONS.PRODUCTS.READ, label: 'View Products', description: 'Allows viewing product information.' },
      { slug: PERMISSIONS.PRODUCTS.UPDATE, label: 'Update Product', description: 'Allows updating product information.' },
      { slug: PERMISSIONS.PRODUCTS.DELETE, label: 'Delete Product', description: 'Allows deleting products.' },
    ],
  },

  schemes: {
    label: 'Scheme Management',
    description: 'Manage investment schemes',
    permissions: [
      { slug: PERMISSIONS.SCHEMES.CREATE, label: 'Create Scheme', description: 'Allows creating schemes.' },
      { slug: PERMISSIONS.SCHEMES.READ, label: 'View Schemes', description: 'Allows viewing schemes.' },
      { slug: PERMISSIONS.SCHEMES.UPDATE, label: 'Update Scheme', description: 'Allows updating schemes.' },
      { slug: PERMISSIONS.SCHEMES.DELETE, label: 'Delete Scheme', description: 'Allows deleting schemes.' },
    ],
  },

  amcs: {
    label: 'AMC Management',
    description: 'Manage AMCs',
    permissions: [
      { slug: PERMISSIONS.AMCS.CREATE, label: 'Create AMC', description: 'Allows creating new AMCs.' },
      { slug: PERMISSIONS.AMCS.READ, label: 'View AMCs', description: 'Allows viewing AMC information.' },
      { slug: PERMISSIONS.AMCS.UPDATE, label: 'Update AMC', description: 'Allows updating AMC information.' },
      { slug: PERMISSIONS.AMCS.DELETE, label: 'Delete AMC', description: 'Allows deleting AMCs.' },
    ],
  },

  masters: {
    label: 'Master Data Management',
    description: 'Manage asset classes, benchmarks, fund managers, etc.',
    permissions: [
      // Asset Classes
      { slug: PERMISSIONS.MASTERS.ASSET_CLASS_CREATE, label: 'Create Asset Class', description: 'Allows creating asset classes.' },
      { slug: PERMISSIONS.MASTERS.ASSET_CLASS_READ, label: 'View Asset Classes', description: 'Allows viewing asset classes.' },
      { slug: PERMISSIONS.MASTERS.ASSET_CLASS_UPDATE, label: 'Update Asset Class', description: 'Allows updating asset classes.' },
      { slug: PERMISSIONS.MASTERS.ASSET_CLASS_DELETE, label: 'Delete Asset Class', description: 'Allows deleting asset classes.' },
      // Benchmarks
      { slug: PERMISSIONS.MASTERS.BENCHMARK_CREATE, label: 'Create Benchmark', description: 'Allows creating benchmarks.' },
      { slug: PERMISSIONS.MASTERS.BENCHMARK_READ, label: 'View Benchmarks', description: 'Allows viewing benchmarks.' },
      { slug: PERMISSIONS.MASTERS.BENCHMARK_UPDATE, label: 'Update Benchmark', description: 'Allows updating benchmarks.' },
      { slug: PERMISSIONS.MASTERS.BENCHMARK_DELETE, label: 'Delete Benchmark', description: 'Allows deleting benchmarks.' },
      // Fund Managers
      { slug: PERMISSIONS.MASTERS.FUND_MANAGER_CREATE, label: 'Create Fund Manager', description: 'Allows creating fund managers.' },
      { slug: PERMISSIONS.MASTERS.FUND_MANAGER_READ, label: 'View Fund Managers', description: 'Allows viewing fund managers.' },
      { slug: PERMISSIONS.MASTERS.FUND_MANAGER_UPDATE, label: 'Update Fund Manager', description: 'Allows updating fund managers.' },
      { slug: PERMISSIONS.MASTERS.FUND_MANAGER_DELETE, label: 'Delete Fund Manager', description: 'Allows deleting fund managers.' },
      // Categories
      { slug: PERMISSIONS.MASTERS.CATEGORY_CREATE, label: 'Create Category', description: 'Allows creating categories.' },
      { slug: PERMISSIONS.MASTERS.CATEGORY_READ, label: 'View Categories', description: 'Allows viewing categories.' },
      { slug: PERMISSIONS.MASTERS.CATEGORY_UPDATE, label: 'Update Category', description: 'Allows updating categories.' },
      { slug: PERMISSIONS.MASTERS.CATEGORY_DELETE, label: 'Delete Category', description: 'Allows deleting categories.' },
    ],
  },

  data_upload: {
    label: 'Data Upload',
    description: 'Upload and manage bulk data',
    permissions: [
      { slug: PERMISSIONS.DATA_UPLOAD.DAILY_VALUATION_CREATE, label: 'Upload Daily Valuations', description: 'Allows uploading daily valuations.' },
      { slug: PERMISSIONS.DATA_UPLOAD.DAILY_VALUATION_READ, label: 'View Daily Valuations', description: 'Allows viewing daily valuations.' },
      { slug: PERMISSIONS.DATA_UPLOAD.HOLDING_CREATE, label: 'Upload Holdings', description: 'Allows uploading holdings.' },
      { slug: PERMISSIONS.DATA_UPLOAD.HOLDING_READ, label: 'View Holdings', description: 'Allows viewing holdings.' },
      { slug: PERMISSIONS.DATA_UPLOAD.MARKET_LIST_CREATE, label: 'Upload Market List', description: 'Allows uploading market list.' },
      { slug: PERMISSIONS.DATA_UPLOAD.MARKET_LIST_READ, label: 'View Market List', description: 'Allows viewing market list.' },
      { slug: PERMISSIONS.DATA_UPLOAD.TRANSACTION_CREATE, label: 'Upload Transactions', description: 'Allows uploading transactions.' },
      { slug: PERMISSIONS.DATA_UPLOAD.TRANSACTION_READ, label: 'View Transactions', description: 'Allows viewing transactions.' },
      { slug: PERMISSIONS.DATA_UPLOAD.INDEX_HISTORY_CREATE, label: 'Upload Index History', description: 'Allows uploading index history.' },
      { slug: PERMISSIONS.DATA_UPLOAD.INDEX_HISTORY_READ, label: 'View Index History', description: 'Allows viewing index history.' },
    ],
  },
};

/**
 * Get all permission UI configs as a flat array
 * Useful for filtering and searching permissions
 */
export const getAllPermissionsUI = (): PermissionUI[] => {
  return Object.values(PERMISSION_GROUPS).flatMap(group => group.permissions);
};

/**
 * Get a specific permission's UI config by slug
 */
export const getPermissionUI = (slug: string): PermissionUI | undefined => {
  return getAllPermissionsUI().find(p => p.slug === slug);
};
