# API Examples: Role Assignment & User Management

## 1. Assign Permissions to a Role

### Backend Endpoint
```
POST /api/v1/roles/:id/assign-permissions
Authorization: Bearer <token>
Content-Type: application/json

{
  "permissionIds": ["perm-uuid-1", "perm-uuid-2", "perm-uuid-3"]
}

Response:
{
  "success": true,
  "data": {
    "id": "role-uuid",
    "name": "Editor",
    "description": "Can create and edit content",
    "permissions": ["perm-uuid-1", "perm-uuid-2", "perm-uuid-3"],
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-12-23T14:45:30Z"
  }
}
```

### Frontend Hook Usage
```typescript
import { useAssignPermissionsMutation } from '@modules/admin/pages/Roles/api/roleApi';
import { useToast } from '@shared/hooks/useToast';

function AssignPermissionsButton({ roleId, selectedPermissionIds }) {
  const [assignPermissions, { isLoading }] = useAssignPermissionsMutation();
  const { success: toastSuccess, error: toastError } = useToast();

  const handleAssign = async () => {
    try {
      const result = await assignPermissions({
        id: roleId,
        permissionIds: selectedPermissionIds,
      }).unwrap();
      
      toastSuccess('Permissions assigned successfully!');
      console.log('Updated role:', result);
    } catch (error: any) {
      toastError(error?.data?.message || 'Failed to assign permissions');
    }
  };

  return (
    <button onClick={handleAssign} disabled={isLoading}>
      {isLoading ? 'Assigning...' : 'Assign Permissions'}
    </button>
  );
}
```

---

## 2. Create User with Role

### Backend Endpoint
```
POST /users
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "roleId": "role-uuid-here",
  "password": "SecurePassword123!",
  "status": "active"
}

Response:
{
  "success": true,
  "data": {
    "id": "user-uuid",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "roleId": "role-uuid-here",
    "status": "active",
    "createdAt": "2024-12-23T10:00:00Z",
    "updatedAt": "2024-12-23T10:00:00Z"
  }
}
```

### Frontend Component Usage
```typescript
import { UserModal } from '@modules/admin/pages/Users/components/UserModal';
import { useUsers } from '@modules/admin/pages/Users/hooks/useUsers';

function UsersPage() {
  const { handleCreate } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (formData: CreateUserPayload) => {
    // formData will contain:
    // {
    //   firstName: string,
    //   lastName: string,
    //   email: string,
    //   phone?: string,
    //   roleId?: string (role ID from select dropdown),
    //   password?: string,
    //   status?: string
    // }
    
    const result = await handleCreate(formData);
    if (result.success) {
      setIsModalOpen(false);
      // Users list will auto-refresh due to RTK Query invalidation
    }
  };

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>Add User</button>
      
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        isLoading={false}
      />
    </>
  );
}
```

---

## 3. Update User with Role

### Backend Endpoint
```
PUT /users/:userId
Authorization: Bearer <token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "roleId": "new-role-uuid",
  "status": "active"
}

Response:
{
  "success": true,
  "data": {
    "id": "user-uuid",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "phone": "+1234567890",
    "roleId": "new-role-uuid",
    "status": "active",
    "updatedAt": "2024-12-23T14:30:00Z"
  }
}
```

### Frontend Component Usage
```typescript
function EditUserModal({ user, onClose }) {
  const { handleUpdate } = useUsers();

  const handleSubmit = async (formData: CreateUserPayload) => {
    const result = await handleUpdate({
      id: user.id,
      ...formData
      // This will send the new role ID to the API
    });
    
    if (result.success) {
      onClose();
    }
  };

  return (
    <UserModal
      isOpen={true}
      onClose={onClose}
      onSubmit={handleSubmit}
      user={user}
      isLoading={false}
    />
  );
}
```

---

## 4. Get Roles for Dropdown

### Backend Endpoint
```
GET /roles?limit=1000
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": [
    {
      "id": "role-uuid-1",
      "name": "Admin",
      "description": "Full system access",
      "slug": "admin",
      "permissions": ["perm-1", "perm-2"],
      "createdAt": "2024-01-01T00:00:00Z"
    },
    {
      "id": "role-uuid-2",
      "name": "Editor",
      "description": "Can create and edit content",
      "slug": "editor",
      "permissions": ["perm-2", "perm-3"],
      "createdAt": "2024-01-02T00:00:00Z"
    },
    {
      "id": "role-uuid-3",
      "name": "Viewer",
      "description": "Read-only access",
      "slug": "viewer",
      "permissions": ["perm-3"],
      "createdAt": "2024-01-03T00:00:00Z"
    }
  ],
  "pagination": {
    "total": 3,
    "page": 1,
    "limit": 1000,
    "hasMore": false
  }
}
```

### Frontend Hook Usage
```typescript
import { useRolesList } from '@modules/admin/pages/Roles/hooks/useRolesList';

function UserForm() {
  const { roles, isLoading, error } = useRolesList();

  if (isLoading) return <div>Loading roles...</div>;
  if (error) return <div>Error loading roles</div>;

  const roleOptions = roles.map(role => ({
    value: role.id,
    label: role.name,
    text: role.name,
  }));

  return (
    <form>
      {/* Other form fields */}
      
      <DynamicFormField
        type="select"
        name="roleId"
        label="Role"
        placeholder="Select a role"
        options={roleOptions}
        control={control}
        error={errors.roleId}
      />
      
      {/* Other form fields */}
    </form>
  );
}
```

---

## 5. Complete User Creation Flow

```typescript
import { useUsers } from '@modules/admin/pages/Users/hooks/useUsers';
import { CreateUserPayload } from '@modules/admin/pages/Users/types/user';

function CompleteUserCreationExample() {
  const { handleCreate, isCreating } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUserCreation = async (formData: CreateUserPayload) => {
    // Form data from UserModal will include:
    // {
    //   firstName: "John",
    //   lastName: "Doe",
    //   email: "john.doe@example.com",
    //   phone: "+1234567890",
    //   roleId: "role-uuid-from-select",
    //   password: "SecurePassword123!",
    //   status: "active"
    // }

    const result = await handleCreate(formData);
    
    if (result.success) {
      // User created successfully
      setIsModalOpen(false);
      // Table will auto-refresh via RTK Query invalidation
      
      const newUser = result.data;
      console.log('Created user:', {
        id: newUser.id,
        name: `${newUser.firstName} ${newUser.lastName}`,
        email: newUser.email,
        roleId: newUser.roleId,
        status: newUser.status
      });
    } else {
      // Handle error
      console.error('Failed to create user:', result.error);
    }
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>
        Create New User
      </button>

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleUserCreation}
        isLoading={isCreating}
      />
    </div>
  );
}
```

---

## 6. Error Handling Examples

### Permission Denied
```typescript
// Backend Response:
{
  "success": false,
  "error": "Insufficient permissions to assign roles",
  "statusCode": 403
}

// Frontend:
try {
  await assignPermissions({ id: roleId, permissionIds }).unwrap();
} catch (error: any) {
  if (error?.status === 403) {
    toastError('You don\'t have permission to assign roles');
  }
}
```

### Invalid Role ID
```typescript
// Backend Response:
{
  "success": false,
  "error": "Role not found",
  "statusCode": 404
}

// Frontend:
try {
  await createUser({ ...formData, role: 'invalid-uuid' }).unwrap();
} catch (error: any) {
  if (error?.status === 404) {
    toastError('Selected role no longer exists');
  }
}
```

### Validation Error
```typescript
// Backend Response:
{
  "success": false,
  "error": "Validation failed",
  "statusCode": 400,
  "details": {
    "email": "Email already exists",
    "role": "Role ID is invalid"
  }
}

// Frontend:
try {
  await createUser(formData).unwrap();
} catch (error: any) {
  if (error?.data?.details) {
    Object.entries(error.data.details).forEach(([field, message]) => {
      console.error(`${field}: ${message}`);
    });
  }
}
```

---

## 7. Caching & Performance

### RTK Query Caching Strategy

```typescript
// useRolesList caches GET /roles?limit=1000
// Multiple components using this hook will share the same cache
// Cache is invalidated only when:
// - createRole, updateRole, deleteRole, assignPermissions are called
// - Manual cache invalidation is triggered

// Benefits:
// ✓ First load: API call made
// ✓ Subsequent loads (within same session): Cached data returned instantly
// ✓ Other components using useRolesList: Get same cached data
// ✓ Any role mutation: All cached data automatically refreshed
```

### Component Re-rendering

```typescript
// UserModal won't re-render unnecessarily because:
// 1. roleOptions is memoized with useMemo
// 2. React.memo wraps components if needed
// 3. RTK Query returns same reference for unchanged data

// Example optimization:
const roleOptions = useMemo(() => {
  return roles.map(role => ({
    value: role.id,
    label: role.name,
    text: role.name,
  }));
}, [roles]); // Only recalculates when roles array reference changes
```

---

## Summary of Request/Response Contracts

| Operation | Method | Endpoint | Request | Response |
|-----------|--------|----------|---------|----------|
| Get Roles | GET | `/roles?limit=1000` | Query params | `PaginatedResponse<Role>` |
| Create User | POST | `/users` | `CreateUserPayload` | `SingleResponse<User>` |
| Update User | PUT | `/users/:userId` | `UpdateUserPayload` | `SingleResponse<User>` |
| Assign Permissions | POST | `/roles/:id/assign-permissions` | `{ permissionIds: string[] }` | `SingleResponse<Role>` |

All requests require `Authorization: Bearer <token>` header.
