# 🔐 Dynamic Permission & Role System

## Overview

This app implements a flexible, **dynamic permission and role system** that supports:

1. **Default Roles** (always available):
   - `ADMIN` - Full system access
   - `INVESTOR` - Investor features
   - `DISTRIBUTOR` - Distributor features
   - `EMPLOYEE` - Employee features

2. **Dynamic Roles**: Any custom role can be added (not limited to defaults)

3. **Dynamic Permissions**: Fine-grained permission control with module/action based access

## Architecture

### Files Involved

```
src/
├── types/index.ts                          # Type definitions
├── utils/permissionUtils.ts               # Permission utility functions
├── config/guards/
│   ├── ProtectedRoute.tsx                 # Authentication check
│   ├── RoleBasedRoute.tsx                 # Role-based access
│   └── PermissionGuard.tsx                # Permission-based access
└── store/slices/authSlice.ts              # Auth state management
```

### Types

**User Interface** - Supports dynamic roles and permissions:
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;                    // Can be 'ADMIN', 'INVESTOR', or any custom role
  employeeRole?: EmployeeRole;       // Optional employee-specific role
  permissions?: Permission[];        // Dynamic permissions
  avatar?: string;
  phoneNumber?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}
```

**Permission Interface** - Module/action based:
```typescript
interface Permission {
  id: string;
  name: string;
  description?: string;
  module: string;                   // e.g., 'products', 'portfolio', 'admin'
  action: string;                   // e.g., 'create', 'read', 'update', 'delete'
  createdAt?: string;
  updatedAt?: string;
}
```

## Usage

### 1. Check User Role

```typescript
import { hasRole, isAdmin, isInvestor } from '@utils/permissionUtils';

// Check specific role
if (hasRole(user, 'ADMIN')) {
  // User is admin
}

// Use helper functions
if (isAdmin(user)) {
  // User is admin
}

if (isInvestor(user)) {
  // User is investor
}
```

### 2. Check Any/All Roles

```typescript
import { hasAnyRole, hasAllRoles } from '@utils/permissionUtils';

// Check if user has any of the roles
if (hasAnyRole(user, ['ADMIN', 'DISTRIBUTOR'])) {
  // User is either admin or distributor
}

// Check if user has all roles (usually just one unless multi-role system)
if (hasAllRoles(user, ['ADMIN'])) {
  // User has admin role
}
```

### 3. Check Permissions

```typescript
import { hasPermission, hasAnyPermission, hasAllPermissions } from '@utils/permissionUtils';

// Check single permission
if (hasPermission(user, 'products.create')) {
  // User can create products
}

// Check if user has any permission
if (hasAnyPermission(user, ['products.read', 'portfolio.read'])) {
  // User can read products or portfolio
}

// Check if user has all permissions
if (hasAllPermissions(user, ['products.read', 'products.update'])) {
  // User can read and update products
}
```

### 4. Module/Action Based Permissions

```typescript
import { canPerformAction, getModulePermissions } from '@utils/permissionUtils';

// Check if user can perform specific action on module
if (canPerformAction(user, 'products', 'create')) {
  // User can create products
}

// Get all permissions for a module
const productPerms = getModulePermissions(user, 'products');
// Returns: [
//   { id: '1', name: 'products.read', module: 'products', action: 'read' },
//   { id: '2', name: 'products.create', module: 'products', action: 'create' }
// ]
```

## Components

### ProtectedRoute

Checks if user is authenticated:

```tsx
import ProtectedRoute from '@config/guards/ProtectedRoute';

<ProtectedRoute>
  <DashboardPage />
</ProtectedRoute>
```

### RoleBasedRoute

Checks if user has required role (supports default + dynamic roles):

```tsx
import RoleBasedRoute from '@config/guards/RoleBasedRoute';

// Single role
<RoleBasedRoute requiredRoles={['ADMIN']}>
  <AdminDashboard />
</RoleBasedRoute>

// Multiple roles
<RoleBasedRoute requiredRoles={['ADMIN', 'DISTRIBUTOR']}>
  <ManagementPage />
</RoleBasedRoute>

// Custom fallback
<RoleBasedRoute 
  requiredRoles={['ADMIN']} 
  fallback={<div>Access Denied</div>}
>
  <AdminPage />
</RoleBasedRoute>
```

### PermissionGuard

Flexible permission checking (shows/hides content):

```tsx
import PermissionGuard from '@config/guards/PermissionGuard';

// Check single permission
<PermissionGuard requiredPermissions={['products.create']}>
  <CreateProductButton />
</PermissionGuard>

// Check role-based access
<PermissionGuard requiredRoles={['ADMIN']}>
  <AdminPanel />
</PermissionGuard>

// Check all permissions (requireAll=true)
<PermissionGuard 
  requiredPermissions={['products.read', 'products.update']} 
  requireAll={true}
>
  <EditProductForm />
</PermissionGuard>

// Custom fallback instead of null
<PermissionGuard 
  requiredPermissions={['portfolio.view']}
  fallback={<div>Subscribe to view portfolio</div>}
>
  <PortfolioView />
</PermissionGuard>

// Redirect instead of fallback
<PermissionGuard 
  requiredPermissions={['admin.access']}
  redirectTo="/upgrade"
>
  <PremiumFeature />
</PermissionGuard>
```

## Default Roles

### ADMIN
- Full system access
- Manage users, products, permissions
- View all transactions and reports

### INVESTOR
- View available products
- Manage own portfolio
- View transactions
- View reports

### DISTRIBUTOR
- Manage products (view/list)
- Manage own portfolio
- View transactions
- View reports
- Manage clients

### EMPLOYEE
- View products
- View transactions
- Create/manage reports
- Dashboard access

## Defining Permissions

Backend should define permissions like:

```typescript
const permissions = [
  // Products permissions
  { id: '1', name: 'products.read', module: 'products', action: 'read' },
  { id: '2', name: 'products.create', module: 'products', action: 'create' },
  { id: '3', name: 'products.update', module: 'products', action: 'update' },
  { id: '4', name: 'products.delete', module: 'products', action: 'delete' },
  
  // Portfolio permissions
  { id: '5', name: 'portfolio.read', module: 'portfolio', action: 'read' },
  { id: '6', name: 'portfolio.update', module: 'portfolio', action: 'update' },
  
  // Admin permissions
  { id: '7', name: 'admin.users', module: 'admin', action: 'manage_users' },
  { id: '8', name: 'admin.products', module: 'admin', action: 'manage_products' },
];
```

## Integration with Redux

The auth slice stores user and permissions:

```typescript
// State
state.auth = {
  user: {
    id: '123',
    name: 'John Doe',
    role: 'INVESTOR',
    permissions: [
      { name: 'products.read', module: 'products', action: 'read' },
      { name: 'portfolio.read', module: 'portfolio', action: 'read' },
    ],
    // ... other fields
  },
  token: 'jwt-token',
  isAuthenticated: true,
  loading: false,
  error: null
}

// Access in components
const { user } = useAppSelector(state => state.auth);

// Check permissions
if (user && hasPermission(user, 'products.create')) {
  // Show create button
}
```

## Best Practices

1. **Use Helper Functions**: Always use utility functions from `permissionUtils` instead of checking `user.permissions` directly

2. **Check at Route Level**: Use guards at route level for page protection

3. **Check at Component Level**: Use PermissionGuard for fine-grained feature access

4. **Handle Null Users**: Always check if user exists before accessing properties

5. **Use Custom Roles**: Don't limit to default roles - support dynamic custom roles

6. **Centralize Permissions**: Define all permissions in backend, return with user

7. **Module-Based**: Organize permissions by module for easier management

## Example: Complete Feature Access

```tsx
// Page level - check role
<RoleBasedRoute requiredRoles={['ADMIN', 'DISTRIBUTOR']}>
  <ProductsManagement />
</RoleBasedRoute>

// Component level - check permissions
<PermissionGuard requiredPermissions={['products.create']}>
  <CreateProductButton />
</PermissionGuard>

<PermissionGuard requiredPermissions={['products.delete']}>
  <DeleteProductButton />
</PermissionGuard>
```

## Migration Guide

If you had hardcoded role checking:

**Before:**
```typescript
if (user?.role === 'ADMIN') {
  // ...
}
```

**After:**
```typescript
import { isAdmin } from '@utils/permissionUtils';

if (isAdmin(user)) {
  // ...
}
```

---

**Note**: This system is flexible enough to handle:
- ✅ Default roles (ADMIN, INVESTOR, DISTRIBUTOR, EMPLOYEE)
- ✅ Custom/dynamic roles (any string)
- ✅ Fine-grained permissions (module + action)
- ✅ Multi-role users (if needed)
- ✅ Permission inheritance (can be implemented)
