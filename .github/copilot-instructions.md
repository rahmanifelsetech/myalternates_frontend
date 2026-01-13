# AI Copilot Instructions for MyAlternates Frontend

This document provides comprehensive guidance for AI coding assistants (Claude, Copilot, Cursor, etc.) working on the MyAlternates frontend codebase. Follow these patterns and conventions to maintain consistency and quality.

---

## 📋 Project Overview

**Stack:** React 19 + TypeScript + Tailwind CSS + Vite
**State Management:** RTK Query (server state) + Redux Toolkit (local state)
**Architecture:** Feature-Based / Domain-Driven with `src/modules/` structure
**UI Components:** Custom shared component library in `src/shared/components/`
**Form Handling:** React Hook Form + Zod validation
**Dark Mode:** Supported via `dark:` class prefixes

---

## 🏗️ Core Architecture Principles

### 1. Directory Structure

All features follow strict module organization under `src/modules/`:

```
src/modules/admin/pages/FeatureName/
├── api/                      # RTK Query endpoints
│   └── featureNameApi.ts     # All API definitions
├── components/               # Feature-specific UI components
│   ├── FeatureNameModal.tsx
│   ├── FeatureNameTable.tsx
│   ├── FeatureNameFilter.tsx
│   └── FeatureNameSelector.tsx
├── hooks/                    # Custom logic hooks
│   └── useFeatureName.ts     # Wraps mutations with useAsyncMutation
├── schema/                   # Zod validation schemas
│   └── featureNameSchema.ts
├── types/                    # TypeScript interfaces
│   └── featureName.ts
└── FeatureName.tsx           # Main page component (orchestrator)
```

**Critical:** Always follow this structure. Each file has a specific purpose and location.

### 2. Shared Components Location

**Never create custom UI components.** All UI elements must come from `src/shared/components/`:

```
src/shared/components/
├── common/                   # Reusable utilities & wrappers
│   ├── ComponentCard.tsx     # Container with title/description
│   ├── Pagination.tsx        # Pagination controls
│   ├── ConfirmationModal.tsx # Standard confirm dialog
│   └── CanAccess.tsx         # Permission gating wrapper
├── ui/                       # UI atoms
│   ├── button/
│   │   ├── Button.tsx
│   │   └── IconButton.tsx
│   ├── input/
│   │   └── Input.tsx
│   ├── select/
│   │   └── Select.tsx
│   ├── modal/
│   │   └── Modal.tsx
│   ├── table/
│   │   ├── Table.tsx
│   │   ├── TableHeader.tsx
│   │   ├── TableBody.tsx
│   │   ├── TableRow.tsx
│   │   └── TableCell.tsx
│   └── badge/
│       └── Badge.tsx
└── form/                     # Form-specific components
    ├── DynamicFormField.tsx
    ├── FormCheckbox.tsx
    ├── FormSelect.tsx
    └── FormTextarea.tsx
```

### 3. Import Path Conventions

Use **absolute imports with path aliases** defined in `vite.config.ts`:

```typescript
// ✅ CORRECT
import { Button } from '@shared/components/ui/button/Button';
import { Pagination } from '@shared/components/common/Pagination';
import ConfirmationModal from '@/shared/components/common/ConfirmationModal';
import { useGetUsersQuery } from '../api/userApi';
import { User } from '../types/user';

// ❌ WRONG
import { Button } from '../../../shared/components/ui/button/Button';
import ConfirmationModal from '@shared/components/common/ConfirmationModal'; // inconsistent
import Button from '@/shared/components/ui/button/Button'; // named import exists
```

**Path Aliases:**
- `@` → `/src`
- `@shared` → `/src/shared`
- `@modules` → `/src/modules`
- `@app` → `/src/app`

### 4. Naming Conventions

**Files & Folders:**
```
✅ FeatureName.tsx (PascalCase for components)
✅ featureNameApi.ts (camelCase for utilities)
✅ useFeatureName.ts (camelCase hooks)
✅ featureName.ts (camelCase for types)
✅ featureNameSchema.ts (camelCase for schemas)
```

**Variables & Functions:**
```typescript
✅ const [isLoading, setIsLoading] = useState(false);
✅ const handleCreateUser = () => { };
✅ const ITEMS_PER_PAGE = 10; // Constants
✅ const userOptions = []; // Arrays
```

---

## 🔄 Data Flow Patterns

### RTK Query Pattern (Critical!)

**Every data-fetching feature must follow this exact pattern:**

#### 1. Types First (`types/featureName.ts`)

```typescript
import { PaginatedResponse, ApiError } from '@shared/types/api';

// Main entity interface
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

// Create/Update payloads (different from entity)
export interface CreateUserPayload {
  name: string;
  email: string;
  role: string;
}

export interface UpdateUserPayload extends Partial<CreateUserPayload> {
  id: string;
}

// Filter params
export interface UserFilters {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
}

// API Response types
export type GetUsersResponse = PaginatedResponse<User>;
export type CreateUserResponse = SingleResponse<User>;
export type UpdateUserResponse = SingleResponse<User>;
export type DeleteUserResponse = void;
```

#### 2. API Endpoints (`api/featureNameApi.ts`)

```typescript
import RtkQueryService from '@shared/services/rtkService';
import { /* all types */ } from '../types/featureName';

// Step 1: Enhance service with tags
const featureApiWithTags = RtkQueryService.enhanceEndpoints({
  addTagTypes: ['Features', 'Feature'],
});

// Step 2: Inject endpoints
const featureApi = featureApiWithTags.injectEndpoints({
  endpoints: (builder) => ({
    // Query endpoints (read-only)
    getFeatures: builder.query<GetFeaturesResponse, FeatureFilters>({
      query: (params) => ({
        url: '/features',
        method: 'GET',
        params, // Automatically serialized to query string
      }),
      providesTags: ['Features'], // Cache key
    }),

    getFeatureById: builder.query<GetFeatureResponse, string>({
      query: (id) => ({
        url: `/features/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'Feature', id }],
    }),

    // Mutation endpoints (write)
    createFeature: builder.mutation<CreateFeatureResponse, CreateFeaturePayload>({
      query: (data) => ({
        url: '/features',
        method: 'POST',
        data, // Request body
      }),
      invalidatesTags: ['Features'], // Clear cache on success
    }),

    updateFeature: builder.mutation<UpdateFeatureResponse, UpdateFeaturePayload>({
      query: ({ id, ...data }) => ({
        url: `/features/${id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        'Features',
        { type: 'Feature', id },
      ],
    }),

    deleteFeature: builder.mutation<DeleteFeatureResponse, string>({
      query: (id) => ({
        url: `/features/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Features'],
    }),
  }),
});

// Step 3: Export hooks
export const {
  useGetFeaturesQuery,
  useGetFeatureByIdQuery,
  useCreateFeatureMutation,
  useUpdateFeatureMutation,
  useDeleteFeatureMutation,
} = featureApi;
```

**Key RTK Query Rules:**
- Query hooks: `use` + PascalCase endpoint + `Query`
- Mutation hooks: `use` + PascalCase endpoint + `Mutation`
- Always define `providesTags` on queries
- Always define `invalidatesTags` on mutations matching query tags
- Use `params` for query strings, `data` for request bodies

#### 3. Custom Hook Wrapper (`hooks/useFeatureName.ts`)

```typescript
import { useCallback } from 'react';
import { useAsyncMutation } from '@shared/hooks/useAsyncMutation';
import {
  useCreateFeatureMutation,
  useUpdateFeatureMutation,
  useDeleteFeatureMutation,
} from '../api/featureApi';

export const useFeatureName = () => {
  const { execute } = useAsyncMutation();

  const [createMutation] = useCreateFeatureMutation();
  const [updateMutation] = useUpdateFeatureMutation();
  const [deleteMutation] = useDeleteFeatureMutation();

  // Wrap with error handling & toasts
  const handleCreate = useCallback(
    (data) =>
      execute(createMutation, data, {
        successMessage: 'Feature created successfully!',
        errorMessage: 'Failed to create feature',
      }),
    [createMutation, execute]
  );

  const handleUpdate = useCallback(
    (data) =>
      execute(updateMutation, data, {
        successMessage: 'Feature updated successfully!',
        errorMessage: 'Failed to update feature',
      }),
    [updateMutation, execute]
  );

  const handleDelete = useCallback(
    (id) =>
      execute(deleteMutation, id, {
        successMessage: 'Feature deleted successfully!',
        errorMessage: 'Failed to delete feature',
      }),
    [deleteMutation, execute]
  );

  return {
    handleCreate,
    handleUpdate,
    handleDelete,
  };
};
```

### Component Structure Pattern

#### 1. Modal Components (Form Input)

```typescript
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Modal from '@shared/components/ui/modal/Modal';
import Button from '@shared/components/ui/button/Button';
import DynamicFormField from '@shared/components/form/DynamicFormField';
import { featureSchema, type FeatureSchemaType } from '../schema/featureSchema';
import { useFeatureName } from '../hooks/useFeatureName';

interface FeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Feature;
  onSuccess?: () => void;
}

export const FeatureModal: React.FC<FeatureModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onSuccess,
}) => {
  const { handleCreate, handleUpdate } = useFeatureName();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
  } = useForm<FeatureSchemaType>({
    resolver: zodResolver(featureSchema),
    defaultValues: initialData || {},
  });

  const onSubmit = useCallback(
    async (data: FeatureSchemaType) => {
      try {
        const handler = initialData ? handleUpdate : handleCreate;
        await handler(initialData ? { id: initialData.id, ...data } : data);
        onSuccess?.();
        onClose();
      } catch (error) {
        // Error already handled by useAsyncMutation
      }
    },
    [initialData, handleCreate, handleUpdate, onSuccess, onClose]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>{initialData ? 'Edit' : 'Create'} Feature</h2>

        <DynamicFormField
          control={control}
          name="name"
          label="Name"
          type="text"
          error={errors.name?.message}
        />

        <Button type="submit" isLoading={isSubmitting}>
          {initialData ? 'Update' : 'Create'}
        </Button>
      </form>
    </Modal>
  );
};
```

#### 2. Table Components (Data Display)

```typescript
import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from '@shared/components/ui/table';
import Button from '@shared/components/ui/button/Button';
import Badge from '@shared/components/ui/badge/Badge';

interface FeatureTableProps {
  data: Feature[];
  isLoading?: boolean;
  onEdit?: (feature: Feature) => void;
  onDelete?: (id: string) => void;
}

export const FeatureTable: React.FC<FeatureTableProps> = ({
  data,
  isLoading,
  onEdit,
  onDelete,
}) => {
  if (isLoading) return <div>Loading...</div>;
  if (!data?.length) return <div>No features found</div>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((feature) => (
          <TableRow key={feature.id}>
            <TableCell>{feature.name}</TableCell>
            <TableCell>
              <Badge variant={feature.active ? 'success' : 'default'}>
                {feature.active ? 'Active' : 'Inactive'}
              </Badge>
            </TableCell>
            <TableCell>
              <Button
                size="sm"
                onClick={() => onEdit?.(feature)}
              >
                Edit
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => onDelete?.(feature.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
```

#### 3. Filter Components (Refinement)

```typescript
import React, { useCallback } from 'react';
import Button from '@shared/components/ui/button/Button';
import Input from '@shared/components/ui/input/Input';
import Select from '@shared/components/ui/select/Select';

interface FeatureFilterProps {
  onFilter: (filters: FeatureFilters) => void;
  isLoading?: boolean;
}

export const FeatureFilter: React.FC<FeatureFilterProps> = ({
  onFilter,
  isLoading,
}) => {
  const [search, setSearch] = React.useState('');
  const [status, setStatus] = React.useState('');

  const handleApplyFilters = useCallback(() => {
    onFilter({
      search: search || undefined,
      status: status || undefined,
    });
  }, [search, status, onFilter]);

  const handleClearFilters = useCallback(() => {
    setSearch('');
    setStatus('');
    onFilter({});
  }, [onFilter]);

  return (
    <div className="flex gap-4">
      <Input
        placeholder="Search features..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">All Statuses</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </Select>

      <Button onClick={handleApplyFilters} isLoading={isLoading}>
        Filter
      </Button>

      {(search || status) && (
        <Button variant="outline" onClick={handleClearFilters}>
          Clear
        </Button>
      )}
    </div>
  );
};
```

#### 4. Main Page Component (Orchestrator)

```typescript
import React, { useState, useCallback, useMemo } from 'react';
import ComponentCard from '@shared/components/common/ComponentCard';
import { Pagination } from '@shared/components/common/Pagination';
import Button from '@shared/components/ui/button/Button';
import { PlusIcon } from '@shared/icons';
import { useGetFeaturesQuery } from './api/featureApi';
import { FeatureModal } from './components/FeatureModal';
import { FeatureTable } from './components/FeatureTable';
import { FeatureFilter } from './components/FeatureFilter';
import type { Feature, FeatureFilters } from './types/feature';

const ITEMS_PER_PAGE = 10;

const FeatureName: React.FC = () => {
  // State
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<FeatureFilters>({});
  const [showModal, setShowModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<Feature | undefined>();

  // API
  const { data: featuresData, isLoading } = useGetFeaturesQuery({
    page,
    limit: ITEMS_PER_PAGE,
    ...filters,
  });

  // Handlers
  const handleEdit = useCallback((feature: Feature) => {
    setSelectedFeature(feature);
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setSelectedFeature(undefined);
  }, []);

  const handleModalSuccess = useCallback(() => {
    setPage(1); // Reset to first page on success
  }, []);

  // Pagination metadata
  const paginationMeta = useMemo(
    () => ({
      page,
      limit: ITEMS_PER_PAGE,
      total: featuresData?.metaData?.total || 0,
      totalPages: featuresData?.metaData?.totalPages || 1,
    }),
    [page, featuresData?.metaData]
  );

  return (
    <div className="space-y-4">
      <ComponentCard
        title="Features"
        header={
          <Button startIcon={<PlusIcon />} onClick={() => setShowModal(true)}>
            Add Feature
          </Button>
        }
      >
        <FeatureFilter onFilter={setFilters} isLoading={isLoading} />

        <FeatureTable
          data={featuresData?.data || []}
          isLoading={isLoading}
          onEdit={handleEdit}
        />

        {featuresData && paginationMeta.totalPages > 1 && (
          <Pagination meta={paginationMeta} onPageChange={setPage} />
        )}
      </ComponentCard>

      <FeatureModal
        isOpen={showModal}
        onClose={handleCloseModal}
        initialData={selectedFeature}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
};

export default FeatureName;
```

---

## 🔐 Permission & Access Control

### Using CanAccess Component

```typescript
import { CanAccess } from '@shared/components/common/CanAccess';
import { PERMISSIONS } from '@shared/constants/permissions';

// Wrap UI elements that require permission
<CanAccess permissionKey={PERMISSIONS.USERS.CREATE}>
  <Button onClick={handleCreate}>Create User</Button>
</CanAccess>

// With fallback UI
<CanAccess
  permissionKey={PERMISSIONS.PRODUCTS.DELETE}
  fallback={<span className="text-gray-400">No permission</span>}
>
  <Button variant="danger">Delete</Button>
</CanAccess>
```

### Permission Keys

Permission keys are defined in `src/shared/constants/permissions.ts`:
```typescript
export const PERMISSIONS = {
  USERS: { CREATE: 'users.create', READ: 'users.read', /* ... */ },
  PRODUCTS: { CREATE: 'products.create', POPULATE: 'products.populate', /* ... */ },
  // etc...
};
```

**Always use `CanAccess` to gate sensitive operations.**

---

## 📝 Form Validation with Zod

### Schema Definition (`schema/featureNameSchema.ts`)

```typescript
import { z } from 'zod';

export const featureSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email').optional(),
  status: z.enum(['active', 'inactive']),
  description: z.string().max(500, 'Max 500 characters'),
});

// Export inferred type for use in components
export type FeatureSchemaType = z.infer<typeof featureSchema>;
```

### Form Implementation

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { featureSchema, type FeatureSchemaType } from '../schema/featureSchema';

const { control, handleSubmit, formState: { errors } } = useForm<FeatureSchemaType>({
  resolver: zodResolver(featureSchema),
});
```

---

## 🎨 Shared Component Examples

### Button Component

```typescript
import Button from '@shared/components/ui/button/Button';

<Button>Default</Button>
<Button variant="primary">Primary</Button>
<Button variant="danger">Delete</Button>
<Button variant="outline">Outlined</Button>
<Button size="sm">Small</Button>
<Button isLoading>Loading...</Button>
<Button startIcon={<PlusIcon />}>With Icon</Button>
<Button disabled>Disabled</Button>
```

### Modal Component

```typescript
import Modal from '@shared/components/ui/modal/Modal';

<Modal isOpen={isOpen} onClose={onClose}>
  <div className="p-4">
    <h2>Modal Title</h2>
    <p>Content here</p>
  </div>
</Modal>
```

### ConfirmationModal Component

```typescript
import ConfirmationModal from '@shared/components/common/ConfirmationModal';

<ConfirmationModal
  isOpen={showConfirm}
  onClose={() => setShowConfirm(false)}
  onConfirm={handleConfirm}
  title="Confirm Action"
  description="Are you sure you want to proceed?"
  isLoading={isLoading}
/>
```

### Pagination Component

```typescript
import { Pagination } from '@shared/components/common/Pagination';
import type { PaginationMeta } from '@shared/types/pagination';

const meta: PaginationMeta = {
  page: 1,
  limit: 10,
  total: 100,
  totalPages: 10,
};

<Pagination meta={meta} onPageChange={setPage} />
```

### ComponentCard Container

```typescript
import ComponentCard from '@shared/components/common/ComponentCard';

<ComponentCard
  title="My Feature"
  desc="Optional description"
  header={<Button>Action</Button>}
>
  {/* Content */}
</ComponentCard>
```

### Badge Component

```typescript
import Badge from '@shared/components/ui/badge/Badge';

<Badge variant="success">Active</Badge>
<Badge variant="danger">Failed</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="default">Inactive</Badge>
```

### Input Component

```typescript
import Input from '@shared/components/ui/input/Input';

<Input
  placeholder="Enter text"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  disabled={false}
/>
```

### Select Component

```typescript
import Select from '@shared/components/ui/select/Select';

<Select value={value} onChange={(e) => setValue(e.target.value)}>
  <option value="">Select...</option>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
</Select>
```

### Table Components

```typescript
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from '@shared/components/ui/table';

<Table>
  <TableHeader>
    <TableRow>
      <TableCell>Name</TableCell>
      <TableCell>Email</TableCell>
    </TableRow>
  </TableHeader>
  <TableBody>
    {items.map((item) => (
      <TableRow key={item.id}>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.email}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

---

## ⚡ Advanced Patterns

### Error Handling with useAsyncMutation

The `useAsyncMutation` hook automatically handles:
- API errors → Toast notifications
- Form validation errors → Field-level error mapping
- Loading states

```typescript
const { execute } = useAsyncMutation();
const [mutation] = useMutationHook();

const handleSubmit = async (data) => {
  try {
    await execute(mutation, data, {
      successMessage: 'Success!',
      errorMessage: 'Failed!',
    });
  } catch (error) {
    // Error already displayed as toast
  }
};
```

### useMemo for Performance

Use `useMemo` to create stable references for callback dependencies:

```typescript
const paginationMeta = useMemo(
  () => ({
    page,
    totalPages: data?.metaData?.totalPages || 1,
    limit: ITEMS_PER_PAGE,
    total: data?.metaData?.total || 0,
  }),
  [page, data?.metaData]
);

const confirmationDescription = useMemo(
  () => `Populate ${selectedEntity?.label}? This will fetch ~${selectedEntity?.estimatedRecords} records`,
  [selectedEntity]
);
```

### useCallback for Event Handlers

Memoize handlers to prevent unnecessary re-renders:

```typescript
const handleEdit = useCallback((item) => {
  setSelectedItem(item);
  setShowModal(true);
}, []);

const handleCloseModal = useCallback(() => {
  setShowModal(false);
  setSelectedItem(undefined);
}, []);
```

### Custom Hook for Complex Logic

Extract mutation logic into custom hooks:

```typescript
// hooks/useUserManagement.ts
export const useUserManagement = () => {
  const { execute } = useAsyncMutation();
  const [createMutation] = useCreateUserMutation();

  const handleCreate = useCallback(
    (data) =>
      execute(createMutation, data, {
        successMessage: 'User created!',
        errorMessage: 'Failed to create user',
      }),
    [createMutation, execute]
  );

  return { handleCreate };
};

// In component
const { handleCreate } = useUserManagement();
```

---

## 🐛 Debugging & Common Issues

### Issue: Component doesn't update after API mutation
**Cause:** Missing `invalidatesTags` in mutation
**Fix:** Ensure mutation has `invalidatesTags: ['EntityName']` matching query `providesTags`

### Issue: Pagination not working
**Cause:** Incorrect meta structure
**Fix:** Pass `metaData` from API response with fields: `page`, `totalPages`, `limit`, `total`

```typescript
// ✅ Correct
const meta = {
  page: data.metaData.page,
  totalPages: data.metaData.totalPages,
  limit: 10,
  total: data.metaData.total,
};

// ❌ Wrong
const meta = data.pagination; // API uses metaData
```

### Issue: Permission check not working
**Cause:** Incorrect permission key
**Fix:** Use `PERMISSIONS` constant from `@shared/constants/permissions`

### Issue: Form fields not showing validation errors
**Cause:** Not using `DynamicFormField` or `error` prop not connected
**Fix:** Use `error={errors.fieldName?.message}` pattern

### Issue: Infinite re-renders
**Cause:** Missing dependencies in `useMemo`/`useCallback`
**Fix:** Include all dependencies in dependency arrays

---

## ✅ New Module Checklist

When creating a new feature module:

- [ ] **Types** (`types/featureName.ts`) - Define all interfaces
- [ ] **Schema** (`schema/featureNameSchema.ts`) - Zod validation
- [ ] **API** (`api/featureNameApi.ts`) - RTK Query endpoints with tags
- [ ] **Custom Hook** (`hooks/useFeatureName.ts`) - Mutations wrapped with `useAsyncMutation`
- [ ] **Modal** (`components/FeatureNameModal.tsx`) - Create/Edit form
- [ ] **Table** (`components/FeatureNameTable.tsx`) - Data display
- [ ] **Filter** (`components/FeatureNameFilter.tsx`) - Search/filter controls
- [ ] **Main Page** (`FeatureName.tsx`) - Orchestrator combining all above
- [ ] **Route** - Register in `src/modules/admin/config/routes.ts`
- [ ] **Navigation** - Add to `src/modules/admin/config/navigation.ts`

---

## 🚀 Best Practices

1. **Always use shared components** - Never create custom UI unless it doesn't exist
2. **Follow naming conventions** - Consistency makes code discoverable
3. **Use TypeScript types** - Catch errors at compile time, not runtime
4. **Validate with Zod** - Define schemas close to where they're used
5. **Wrap mutations** - Use custom hooks with `useAsyncMutation` for consistency
6. **Memoize properly** - Use `useMemo`/`useCallback` for stable references
7. **Add permission checks** - Gate sensitive operations with `CanAccess`
8. **Handle errors gracefully** - Let `useAsyncMutation` show toasts automatically
9. **Test edge cases** - Empty states, loading states, error states
10. **Document complex logic** - Add JSDoc comments for non-obvious patterns

---

## 📚 Key Files to Review

When starting work:
- [PROJECT_UNDERSTANDING.md](../PROJECT_UNDERSTANDING.md) - Architecture overview
- [ACTUAL_IMPORT_PATHS.md](../ACTUAL_IMPORT_PATHS.md) - Component import reference
- `src/shared/services/rtkService.ts` - Base RTK Query setup
- `src/shared/hooks/useAsyncMutation.ts` - Error handling wrapper
- `src/shared/components/` - All available UI components
- `src/modules/admin/pages/Users/` - Reference implementation

---

**Last Updated:** 2024
**Maintained By:** MyAlternates Development Team
