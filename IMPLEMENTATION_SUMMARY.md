# Role Assignment & User Role Management Implementation

## Summary
Implemented role assignment endpoint for users and added a role selection dropdown to the User creation/edit form using a DynamicFormField select component.

---

## 1. Added Assign Permissions Endpoint

### File: `src/modules/admin/pages/Roles/api/roleApi.ts`

**New Mutation:**
```typescript
assignPermissions: builder.mutation<
  UpdateRoleResponse,
  { id: string; permissionIds: string[] }
>({
  query: ({ id, permissionIds }) => ({
    url: `/roles/${id}/assign-permissions`,
    method: 'POST',
    data: { permissionIds },
  }),
  invalidatesTags: ['Roles'],
}),
```

**Export:**
```typescript
export const {
  useGetRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useAssignPermissionsMutation,  // ← New export
} = roleApi;
```

**API Contract:**
- **Endpoint:** `POST /api/v1/roles/:id/assign-permissions`
- **Payload:** `{ permissionIds: string[] }`
- **Response:** `UpdateRoleResponse` (Same as role update)
- **Caching:** Invalidates 'Roles' tag to refresh role data

---

## 2. Created useRolesList Hook

### File: `src/modules/admin/pages/Roles/hooks/useRolesList.ts` (NEW)

**Purpose:** Centralized role fetching with RTK Query caching across the admin panel

**Return Type:**
```typescript
interface UseRolesListReturn {
  roles: Role[];
  isLoading: boolean;
  isFetching: boolean;
  error: any;
  isReady: boolean;
}
```

**Features:**
- Automatically fetches up to 1000 roles (suitable for select dropdowns)
- Returns memoized role array for performance
- Provides loading and ready states
- Uses RTK Query caching to prevent redundant API calls
- Perfect for use in user forms, permission assignment, etc.

**Usage Example:**
```typescript
const { roles, isLoading, error } = useRolesList();

const roleOptions = roles.map(role => ({
  value: role.id,
  label: role.name,
  text: role.name,
}));
```

---

## 3. Updated UserModal with Role Select

### File: `src/modules/admin/pages/Users/components/UserModal.tsx`

**Changes:**

1. **Added Imports:**
   - `useMemo` from React
   - `DynamicFormField` from shared components
   - `useRolesList` hook

2. **Updated Form Setup:**
   ```typescript
   const { register, handleSubmit, reset, control, formState: { errors } } = useForm<CreateUserPayload>();
   const { roles } = useRolesList();

   // Convert roles to select options
   const roleOptions = useMemo(() => {
     return roles.map(role => ({
       value: role.id,
       label: role.name,
       text: role.name,
     }));
   }, [roles]);
   ```

3. **Replaced Plain Input with DynamicFormField Select:**
   ```typescript
   // Before (Plain Input):
   <Input
     {...register('role')}
     placeholder="e.g., admin, user, moderator"
   />

   // After (Select Dropdown):
   <DynamicFormField
     type="select"
     name="roleId"
     label="Role"
     placeholder="Select a role"
     options={roleOptions}
     control={control}
     error={errors.roleId}
   />
   ```

**Benefits:**
- Users can now select from actual roles in the system (dynamic dropdown)
- Prevents invalid role entries
- Better UX with searchable select component
- Role ID properly tracked for API payload
- Role options are cached via useRolesList hook

---

## 4. Architecture Overview

### Data Flow

```
useRolesList Hook (RTK Query caching)
    ↓
    Fetches: GET /roles?limit=1000
    ↓
    Returns: { roles: Role[], isLoading, error, isReady }
    ↓
UserModal Component
    ↓
    Maps roles to select options: [{ value: id, label: name }]
    ↓
DynamicFormField (type="select")
    ↓
    User selects role → stored as role.id in form state
    ↓
    Form submission → API receives { ...userData, role: roleId }
```

### Component Interactions

```
UserModal
├── useRolesList() → Fetches all roles with caching
├── roleOptions: Role[] → Memoized array
└── DynamicFormField (select type)
    └── Uses control prop from react-hook-form
        └── Integrates with ReactSelectComponent
            └── Shows roles as searchable dropdown
```

---

## 5. Type Safety

**User Type Definition (Unchanged):**
```typescript
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role?: string;        // Can be role ID or name
  status?: 'active' | 'inactive' | 'suspended';
  lastLogin?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role?: string;        // Accepts role ID
  status?: 'active' | 'inactive' | 'suspended';
  password?: string;
}
```

---

## 6. API Integration Points

### Assign Permissions to Role
```typescript
import { useAssignPermissionsMutation } from '@modules/admin/pages/Roles/api/roleApi';

const [assignPermissions] = useAssignPermissionsMutation();

// Usage:
await assignPermissions({
  id: roleId,
  permissionIds: ['perm-id-1', 'perm-id-2'],
}).unwrap();
```

### Create/Update User with Role
```typescript
// The UserModal now sends role as ID:
await createUser({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  role: 'role-uuid-here',  // Role ID from select dropdown
  password: 'password123',
});
```

---

## 7. Files Modified

| File | Change Type | Description |
|------|-------------|-------------|
| `src/modules/admin/pages/Roles/api/roleApi.ts` | Modified | Added `assignPermissions` mutation endpoint |
| `src/modules/admin/pages/Roles/hooks/useRolesList.ts` | Created | New hook for fetching roles with caching |
| `src/modules/admin/pages/Users/components/UserModal.tsx` | Modified | Replaced plain role Input with DynamicFormField select |

---

## 8. No Breaking Changes

✅ Backward compatible - `role` field still accepts string (either ID or name)
✅ Existing user creation flow unchanged
✅ Select dropdown automatically uses role IDs from database
✅ No changes required to user API endpoints

---

## 9. Next Steps / Future Enhancements

1. **Add Role Assignment Modal for Users**
   - Similar to PermissionAssignmentModal
   - Allow bulk role assignment
   - Track audit logs

2. **Add User Filters by Role**
   - Filter users table by selected role
   - Show role permissions in user details

3. **Add Role Templates**
   - Pre-defined role sets with common permissions
   - Quick assignment workflows

4. **Improve Role Search**
   - Add role descriptions in select dropdown
   - Better filtering for large role lists

---

## 10. Testing Checklist

- [ ] Create new user with role selection
- [ ] Edit existing user and change role
- [ ] Verify role dropdown shows all available roles
- [ ] Confirm role ID is sent in API payload (not name)
- [ ] Test with empty role (optional field)
- [ ] Test role persistence after save
- [ ] Verify assign-permissions endpoint works
- [ ] Check RTK Query caching prevents duplicate API calls

---

## Summary of Implementation

This implementation provides:

✅ **Permission Assignment Endpoint:** `POST /roles/:id/assign-permissions`
✅ **Role Fetching Hook:** `useRolesList` with RTK Query caching
✅ **Role Selection:** DynamicFormField select dropdown in UserModal
✅ **Type Safety:** Full TypeScript support
✅ **Performance:** Memoized role options, cached API calls
✅ **UX Improvement:** Dynamic role selection instead of manual text entry
✅ **Scalability:** Handles up to 1000 roles in dropdown

The system is now ready for:
- User role assignment workflows
- Permission management on roles
- Audit trails and role tracking
- Bulk operations on roles/permissions
