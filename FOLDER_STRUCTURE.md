# 🏗️ PRODUCTION-READY FOLDER STRUCTURE

## Complete Directory Tree

```
src/
│
├─📁 app/                          # Application Entry Point & Configuration
│  ├─ App.tsx                       # Main React component wrapper
│  ├─ router.tsx                    # Central routing configuration
│  ├─ store.ts                      # Redux store setup with all slices
│  ├─ providers.tsx                 # Global context providers
│  └─ index.ts                      # Module barrel export
│
├─📁 modules/                       # Feature Modules (UX Apps + Core)
│  │
│  ├─📁 auth/                       # 🔐 AUTHENTICATION MODULE (Core)
│  │  ├─📁 api/
│  │  │  └─ authApi.ts              # RTK Query auth endpoints
│  │  ├─📁 guards/
│  │  │  ├─ RequireAuth.tsx         # Authentication gate
│  │  │  └─ RequirePermission.tsx   # Permission & Role guards
│  │  ├─📁 hooks/
│  │  │  └─ useAuth.ts              # useAuth, useHasPermission, useHasRole, etc.
│  │  ├─📁 store/
│  │  │  └─ authSlice.ts            # Redux auth state + actions
│  │  ├─📁 utils/
│  │  │  └─ permissions.ts          # hasPermission, hasRole, canAccess utils
│  │  ├─📁 types/
│  │  │  └─ index.ts                # LoginRequest, AuthState, etc.
│  │  ├─📁 pages/
│  │  │  ├─ SignIn.tsx
│  │  │  └─ SignUp.tsx
│  │  └─ index.ts                   # Barrel export
│  │
│  ├─📁 admin/                      # 👨‍💼 ADMIN UX MODULE
│  │  ├─📁 layout/
│  │  │  ├─ AdminLayout.tsx
│  │  │  └─ AdminNav.tsx
│  │  ├─📁 pages/
│  │  │  ├─📁 dashboard/
│  │  │  │  ├─ AdminDashboardPage.tsx
│  │  │  │  ├─ api.ts               # Dashboard-specific RTK endpoints
│  │  │  │  ├─ hooks.ts             # Dashboard-specific hooks
│  │  │  │  ├─ types.ts             # Dashboard-specific types
│  │  │  │  ├─ schema.ts            # Zod/Yup form schemas
│  │  │  │  └─📁 components/        # Dashboard sub-components
│  │  │  ├─📁 users/
│  │  │  │  ├─ UsersPage.tsx
│  │  │  │  ├─ api.ts
│  │  │  │  ├─ hooks.ts
│  │  │  │  ├─ types.ts
│  │  │  │  ├─ schema.ts
│  │  │  │  └─📁 components/
│  │  │  ├─📁 investors/
│  │  │  ├─📁 distributors/
│  │  │  ├─📁 compliance/
│  │  │  ├─📁 reports/
│  │  │  └─📁 settings/
│  │  ├─📁 api/                     # Admin-wide API endpoints
│  │  │  ├─ usersApi.ts
│  │  │  ├─ investorsApi.ts
│  │  │  └─ distributorsApi.ts
│  │  ├─📁 types/                   # Admin domain types
│  │  │  └─ index.ts
│  │  ├─ routes.tsx                 # Admin routing
│  │  ├─ navigation.ts              # Admin nav config
│  │  └─ index.ts                   # Barrel export
│  │
│  ├─📁 investor/                   # 👤 INVESTOR UX MODULE
│  │  ├─📁 layout/
│  │  │  ├─ InvestorLayout.tsx
│  │  │  └─ InvestorNav.tsx
│  │  ├─📁 pages/
│  │  │  ├─📁 dashboard/
│  │  │  ├─📁 portfolio/
│  │  │  ├─📁 transactions/
│  │  │  ├─📁 kyc/
│  │  │  └─📁 profile/
│  │  ├─📁 api/                     # Investor-specific API endpoints
│  │  ├─📁 types/                   # Investor domain types
│  │  ├─ routes.tsx
│  │  ├─ navigation.ts
│  │  └─ index.ts
│  │
│  ├─📁 distributor/                # 🤝 DISTRIBUTOR UX MODULE
│  │  ├─📁 layout/
│  │  │  ├─ DistributorLayout.tsx
│  │  │  └─ DistributorNav.tsx
│  │  ├─📁 pages/
│  │  │  ├─📁 dashboard/
│  │  │  ├─📁 investors/
│  │  │  ├─📁 commissions/
│  │  │  └─📁 reports/
│  │  ├─📁 api/                     # Distributor-specific API endpoints
│  │  ├─📁 types/                   # Distributor domain types
│  │  ├─ routes.tsx
│  │  ├─ navigation.ts
│  │  └─ index.ts
│  │
│  └─📁 shared/                     # 🔄 SHARED STATE (Domain Slices)
│     └─📁 store/
│        ├─ productSlice.ts         # Product state
│        ├─ portfolioSlice.ts       # Portfolio state
│        ├─ transactionSlice.ts     # Transaction state
│        └─ uiSlice.ts              # UI state (sidebar, theme, etc.)
│
├─📁 shared/                        # 🛠️ SHARED INFRASTRUCTURE
│  ├─📁 api/
│  │  ├─ apiClient.ts               # Axios instance with interceptors
│  │  ├─ rtkQueryService.ts         # RTK Query base service
│  │  └─ index.ts
│  ├─📁 components/
│  │  ├─ LoadingFallback.tsx
│  │  └─ index.ts
│  ├─📁 config/
│  │  └─ api.config.ts              # 🔧 API_CONFIG, HttpStatusCode, etc.
│  ├─📁 constants/
│  │  └─ index.ts                   # 📋 All global constants
│  ├─📁 hooks/
│  │  └─ index.ts                   # useFetch, etc.
│  ├─📁 layout/
│  │  └─ AppLayout.tsx              # Main app wrapper
│  ├─📁 pages/
│  │  └─ NotFound.tsx               # 404 page
│  ├─📁 types/
│  │  ├─ index.ts                   # 📌 ALL GLOBAL TYPES
│  │  └─ export.ts
│  ├─📁 utils/
│  │  ├─ error.ts                   # parseApiError, logError, etc.
│  │  └─ index.ts                   # Utility functions
│  └─📁 store/                      # RTK Query API slices
│
├─📁 assets/
│  ├─📁 images/
│  ├─📁 icons/
│  └─📁 fonts/
│
├─ App.tsx                          # ⚠️ DEPRECATED (Old entry point)
├─ main.tsx                         # ✅ React DOM entry
├─ index.css                        # Global styles
├─ vite-env.d.ts
└─ svg.d.ts
```

---

## 📊 Module Architecture Details

### Auth Module Structure
```
modules/auth/
├── 🛡️ guards/          → RequireAuth, RequirePermission, RequireRole
├── 🎣 hooks/           → useAuth, useHasPermission, useHasRole, etc.
├── 🔌 api/             → Login, Signup, Refresh, ChangePassword
├── 📦 store/           → Auth state management
├── 🛠️ utils/           → Permission checking logic
├── 📝 types/           → LoginRequest, AuthState, PermissionContext
└── 📄 pages/           → SignIn, SignUp
```

### UX Modules (Admin, Investor, Distributor)
```
modules/{module}/
├── 🎨 layout/          → Layout + Navigation components
├── 📄 pages/           → Feature pages (each mini-app)
│   └── Each page:
│       ├── Page.tsx
│       ├── api.ts      → Page API endpoints
│       ├── hooks.ts    → Page hooks
│       ├── types.ts    → Page types
│       ├── schema.ts   → Form schemas
│       └── components/ → Sub-components
├── 🔌 api/             → Module-wide API endpoints
├── 📝 types/           → Module domain types
├── 🗺️ routes.tsx       → Route definitions
├── 📍 navigation.ts    → Nav configuration
└── 📦 index.ts         → Barrel export
```

### Shared Module Structure
```
shared/
├── 🔌 api/             → Axios client + RTK Query base
├── 🎨 components/      → Reusable UI (LoadingFallback, etc.)
├── ⚙️ config/          → API_CONFIG, HttpStatusCode, ApiErrorCode
├── 📋 constants/       → Routes, permissions, validation rules
├── 🎣 hooks/           → Shared hooks (useFetch, etc.)
├── 🏗️ layout/          → App shell (AppLayout)
├── 📄 pages/           → Error pages (NotFound, etc.)
├── 📝 types/           → Global types (ALL API, Auth, Common)
└── 🛠️ utils/           → Error handling, formatters, helpers
```

---

## 🔑 Key Files by Purpose

### Global Configuration
- **API Config**: `shared/config/api.config.ts`
- **Constants**: `shared/constants/index.ts`
- **Redux Store**: `app/store.ts`
- **Router**: `app/router.tsx`

### Global Types
- **Location**: `shared/types/index.ts`
- **Includes**: ApiResponse, ApiError, User, Permission, AuthState, etc.

### Error Handling
- **Location**: `shared/utils/error.ts`
- **Functions**: parseApiError, logError, getUserFriendlyMessage

### API Infrastructure
- **Axios**: `shared/api/apiClient.ts`
- **RTK Query**: `shared/api/rtkQueryService.ts`

### Authentication
- **Redux**: `modules/auth/store/authSlice.ts`
- **API**: `modules/auth/api/authApi.ts`
- **Guards**: `modules/auth/guards/`
- **Utilities**: `modules/auth/utils/permissions.ts`

---

## 🚀 Usage Examples

### Protect a Route
```typescript
// In router.tsx
<Route
  path="/admin"
  element={
    <RequireAuth>
      <RequirePermission resource="admin" action="read">
        <AdminLayout />
      </RequirePermission>
    </RequireAuth>
  }
/>
```

### Check Permission in Component
```typescript
const AdminPanel = () => {
  const canDelete = useHasPermission('users', 'delete');
  
  return canDelete && <DeleteButton />;
};
```

### Create API Endpoint
```typescript
// modules/admin/api/usersApi.ts
export const usersApi = rtkQueryService.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<User[], PaginationParams>({
      query: (params) => ({
        url: '/admin/users',
        method: 'GET',
        params,
      }),
      providesTags: ['User'],
    }),
    createUser: builder.mutation<User, CreateUserRequest>({
      query: (data) => ({
        url: '/admin/users',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});
```

### Create Page
```
modules/admin/pages/users/
├── UsersPage.tsx       (component)
├── api.ts             (endpoints)
├── hooks.ts           (useGetUsers, useCreateUser, etc.)
├── types.ts           (User, CreateUserRequest)
├── schema.ts          (Zod schemas)
└── components/
    └── UserForm.tsx
```

---

## 📋 Checklist for New Features

### Adding a New Page
- [ ] Create `modules/{module}/pages/{feature}/` folder
- [ ] Create: `Page.tsx`, `api.ts`, `hooks.ts`, `types.ts`, `schema.ts`
- [ ] Add route to `modules/{module}/routes.tsx`
- [ ] Update `modules/{module}/navigation.ts`
- [ ] Add permission checks if needed

### Adding API Endpoints
- [ ] Create `modules/{module}/api/{feature}Api.ts`
- [ ] Use `rtkQueryService.injectEndpoints()`
- [ ] Export hooks: `useGet{Feature}Query`, `useCreate{Feature}Mutation`
- [ ] Add proper tag types for cache invalidation

### Sharing Code
- [ ] UI Component → `shared/components/`
- [ ] Hook → `shared/hooks/index.ts`
- [ ] Utility → `shared/utils/`
- [ ] Type → `shared/types/index.ts`
- [ ] Constant → `shared/constants/index.ts`

### Permission System
- [ ] Check permission with `useHasPermission(resource, action)`
- [ ] Guard route with `<RequirePermission>`
- [ ] Add permission to backend response
- [ ] Add resource/action to constants if new

---

## ✅ Design Principles Implemented

✔️ **Module-First**: Each UX app is self-contained  
✔️ **Authorization**: Backend-authoritative RBAC + Permissions  
✔️ **Type Safety**: Full TypeScript, no implicit any  
✔️ **API First**: All data via RTK Query  
✔️ **Centralized Config**: One place for all global settings  
✔️ **Error Handling**: Standardized across app  
✔️ **State Management**: Redux + RTK Query + Context  
✔️ **Code Organization**: Feature-first, no page imports between modules  
✔️ **Scalability**: Easily add new modules or pages  
✔️ **Maintainability**: Clear structure, barrel exports, consistent patterns

---

**Architecture Version**: 1.0  
**Created**: December 21, 2025  
**Framework**: React 19 + TypeScript 5 + Vite  
**State Management**: Redux Toolkit + RTK Query  
**Form Validation**: Zod/Yup  
**HTTP Client**: Axios with interceptors
