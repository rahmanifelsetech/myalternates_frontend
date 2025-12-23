/**
 * Permission UI Configuration
 * 
 * ⚠️ CLIENT-SIDE UI HELPER ONLY
 * 
 * This file groups and labels permissions for UI display purposes.
 * It helps organize the permission selection interface when creating/editing roles.
 * 
 * ✅ WHAT THIS IS FOR:
 * - Grouping related permissions (Users, Roles, Products, etc.)
 * - Providing user-friendly labels and descriptions
 * - Controlling display order in permission selection screens
 * - Building the admin permission assignment interface
 * 
 * ❌ WHAT THIS IS NOT:
 * - Source of truth for available permissions
 * - Used for security/authorization decisions
 * - An exhaustive list of all permissions (backend is authoritative)
 * 
 * The actual permission data (id, name, slug) is fetched from the backend API.
 * Always validate permissions on the server side.
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

export const PERMISSION_GROUPS: Record<string, PermissionGroupUI> = {
  users: {
    label: 'User Management',
    description: 'Manage user accounts and access',
    permissions: [
      { slug: 'users.create', label: 'Create Users', description: 'Create new user accounts' },
      { slug: 'users.read', label: 'View Users', description: 'View user information' },
      { slug: 'users.update', label: 'Edit Users', description: 'Modify user details and settings' },
      { slug: 'users.delete', label: 'Delete Users', description: 'Remove user accounts' },
      { slug: 'users.export', label: 'Export Users', description: 'Export user data' },
      { slug: 'users.import', label: 'Import Users', description: 'Bulk import user accounts' },
    ],
  },

  roles: {
    label: 'Role Management',
    description: 'Manage roles and their permissions',
    permissions: [
      { slug: 'roles.create', label: 'Create Roles', description: 'Create new roles' },
      { slug: 'roles.read', label: 'View Roles', description: 'View role information' },
      { slug: 'roles.update', label: 'Edit Roles', description: 'Modify role details' },
      { slug: 'roles.delete', label: 'Delete Roles', description: 'Remove roles' },
      { slug: 'roles.manage_permissions', label: 'Manage Role Permissions', description: 'Assign permissions to roles' },
    ],
  },

  permissions: {
    label: 'Permission Management',
    description: 'View available system permissions',
    permissions: [
      { slug: 'permissions.read', label: 'View Permissions', description: 'View system permissions' },
    ],
  },

  products: {
    label: 'Product Management',
    description: 'Manage product catalog',
    permissions: [
      { slug: 'products.create', label: 'Create Products', description: 'Create new products' },
      { slug: 'products.read', label: 'View Products', description: 'View product information' },
      { slug: 'products.update', label: 'Edit Products', description: 'Modify product details' },
      { slug: 'products.delete', label: 'Delete Products', description: 'Remove products' },
      { slug: 'products.publish', label: 'Publish Products', description: 'Publish products to store' },
      { slug: 'products.archive', label: 'Archive Products', description: 'Archive products' },
    ],
  },

  dashboard: {
    label: 'Dashboard & Analytics',
    description: 'Access dashboards and reports',
    permissions: [
      { slug: 'dashboard.view', label: 'View Dashboard', description: 'Access main dashboard' },
      { slug: 'dashboard.analytics', label: 'View Analytics', description: 'Access analytics data' },
      { slug: 'dashboard.reports', label: 'View Reports', description: 'Access system reports' },
    ],
  },

  settings: {
    label: 'System Settings',
    description: 'Configure system settings',
    permissions: [
      { slug: 'settings.manage', label: 'Manage Settings', description: 'Configure system settings' },
      { slug: 'settings.audit_log', label: 'View Audit Log', description: 'Access audit trail' },
      { slug: 'settings.system_config', label: 'System Configuration', description: 'Configure system parameters' },
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
